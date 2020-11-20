// nodejs代码
// express是我们web服务器
const express = require("express");
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const axios = require("axios");
const MemoryFS = require("memory-fs");

// 获取express实例
const server = express();

// 获取绝对路由函数
function resolve(dir) {
  // 把当前执行js文件绝对地址和传入dir做拼接
  return path.resolve(__dirname, dir);
}

// webpack配置文件
const webpackConf = require("@vue/cli-service/webpack.config");
const serverCompiler = webpack(webpackConf);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

// 处理favicon
const favicon = require("serve-favicon");
server.use(favicon(path.join(__dirname, "../public", "favicon.ico")));

server.use(express.static(resolve("../dist/client"), { index: false }));
// server.use(express.static(resolve("../public"), { index: false }));

const { createBundleRenderer } = require("vue-server-renderer");

// 监听文件修改，实时编译获取最新的 vue-ssr-server-bundle.json
let bundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err;
  }
  stats = stats.toJson();
  stats.errors.forEach(error => console.error(error));
  stats.warnings.forEach(warn => console.warn(warn));
  const bundlePath = path.join(
    webpackConf.output.path,
    "vue-ssr-server-bundle.json"
  );
  bundle = JSON.parse(mfs.readFileSync(bundlePath, "utf-8"));
  console.log("New bundle generated.");
});

const handleRequest = async (req, res) => {
  if (!bundle) {
    res.body = "等待webpack打包完成后再访问";
    return;
  }

  // 获取最新的 vue-ssr-client-manifest.json
  const clientManifestResp = await axios.get(
    `http://localhost:8080/vue-ssr-client-manifest.json`
  );

  const clientManifest = clientManifestResp.data;

  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template: fs.readFileSync(
      path.resolve(__dirname, "../public/index.html"),
      "utf-8"
    ),
    clientManifest
  });

  return renderer;
};

// 编写路由处理不同url请求
server.get("*", async (req, res) => {
  console.log("访问路径", req.url);
  // 构造上下文
  const context = {
    title: "ssr test",
    url: req.url // 首屏地址
  };
  // 渲染输出
  const renderer = await handleRequest(req, res);
  try {
    const html = await renderer.renderToString(context);
    // 响应给前端
    res.send(html);
  } catch (error) {
    res.status(500).send("服务器渲染出错");
  }
});

// 监听端口
server.listen(4000, () => {
  console.log("server running!");
});
