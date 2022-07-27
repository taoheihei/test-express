const Layer = require('./layer');
var Route = require('./route');
const methods = require('methods');
var Router = function(){
  this.stack = [new Layer('*', function(req, res) {
      res.writeHead(404, {'content-type': 'text/plain'});
      res.end('404');
     })
  ];
  this.stack = [];
  this.method = {};
}

// Router.prototype.get = function(path, fn){
//   var route = this.route(path);
//   route.get(path, fn);
//   return this;
// }
methods.forEach(method => {
  Router.prototype[method] = function(path, fn) {
    var route = this.route(path);
    route[method].call(route, fn);
    return this;
  }
});


Router.prototype.route=  function(path) { 
  var route= new Route();
  var layer = new Layer(path, function(req, res){
    route.dispatch(req, res);
  });
  // var layer = new Layer(path , function(req, res, done){
  //      route.dispatch(req, res, done);
  //     });
  layer.route = route;
  this.stack.push(layer);
  return route;
}

Router.prototype.handle = function(req, res,done){
  console.log('router.handle');
  console.log(res);
  const self = this;
  const method = req.method;
  // let idx = 0, stack = this.stack;
  // function next(err) {
  //   console.log(idx);
  //   var layerError = err === 'route'? null: err;
  //   if(layerError === 'router'){
  //     return done(null);
  //   }

  //   if(idx>=stack.length || layerError){
  //     return done(layerError);
  //   }
    
  //   var layer = stack[idx++];
  //   console.log(layer);
  //   if(layer.match(req.url) && layer.route && layer.route.handle_method(method)){
  //     return layer.handle_request(req, res, next);
  //   } else {
  //     return next(layerError);
  //   }
  // }
  // next();
  for(const layer of this.stack){
    if(layer.match(req.url) && layer.route && layer.route.handle_method(method) ){
     
      return  layer.handle_request(req, res);
    }
  }
  return  this.stack[0].handle_request(req,res);
}

module.exports = Router;