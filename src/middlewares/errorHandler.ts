import logger from './logger';

const errorHandler = (err, req, res) => {
  logger.error(
    `${req.method} ${req.url} | params: ${JSON.stringify(
      req.params
    )} | query: ${JSON.stringify(req.query)} | body: ${JSON.stringify(
      req.body
    )} | error: ${err.message}`
  );
  res.status(500).json({ error: err.message });
  return;
};

export default errorHandler;
