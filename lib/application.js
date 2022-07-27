const http = require('http');
const Router = require('./router');
const methods = require('methods');
function Application(){
  this._router = new Router();
}

Application.prototype.listen = function(){
  var self = this;
  var server = http.createServer(function(req, res){
    console.log('http.createservice');

    self.handle(req,res);
  });

  return server.listen.apply(server, arguments);
}

Application.prototype.handle = function(req,res){
  
  console.log('app.handle');
  if(!res.send){
    res.send = function(body){
      res.writeHead(200, {
        'content-type': 'text/plain'
      });
      res.end(body);
   }
  }

  var done = function(err){
    res.writeHead(404, {
      'Content-Type': 'text/plain'
    });

    if(err) {
      console.log(err);
      res.end('404: ' + err);
    } else {
        var msg = 'Cannot find' + req.method + ' ' + req.url;
        res.end(msg);
    }
  }
  this._router.handle(req,res, done);
}

methods.forEach(method => {
  method = method.toLowerCase();
  Application.prototype[method] = function(path, fn) {
    this._router[method].apply( this._router,arguments);
  }
})
module.exports = Application;
