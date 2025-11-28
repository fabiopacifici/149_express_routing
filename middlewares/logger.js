function logger(req, res, next) {
  //console.log(req);

  console.log(`[${new Date().toLocaleString()}] - Method: ${req.method} | Url ${req.originalUrl}`);
  next()

}


module.exports = logger