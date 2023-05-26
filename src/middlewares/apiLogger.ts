const apiLogger = (req, res, next) => {
  console.log(
    `[INFO] ${req.method} ${req.url} | params: ${JSON.stringify(
      req.params
    )} | query: ${JSON.stringify(req.query)} | body: ${JSON.stringify(
      req.body
    )}`
  );

  next();
};

export default apiLogger;
