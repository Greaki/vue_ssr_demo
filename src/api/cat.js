export const getCat = () => {
  return fetch("https://cat-fact.herokuapp.com/facts/random").then(res =>
    res.json()
  );
};
