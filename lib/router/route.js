const Layer = require("./layer");
const methods = require('methods');
var Route = function(){
  // this.path = path;
  this.stack = [];
  this.method = {};
}


Route.prototype.handle_method = function(method) {
  var name = method.toLowerCase();
  return Boolean(this.method[name])
}

// Route.prototype.get = function(path, fn){
//   var layer = new Layer(path, fn);
//   layer.method = 'get';
//   this.method['get'] = true;
//   this.stack.push(layer);
// }

methods.forEach(method => {
  method = method.toLowerCase();
  Route.prototype[method] = function(fn) {
    var layer = new Layer('/',fn);
    layer.method = method;
    this.method[method] = true;
    this.stack.push(layer);
  }
})


Route.prototype.dispatch =  function(req, res) {
  var self = this;
  var method = req.method.toLowerCase();
  self.stack.forEach(s=>{
    if(method === s.method){
      return s.handle_request(req, res);
    }
  });
  // var idx =0, stack = self.stack;
  // function next(err) {
  //   if(err && err === 'route'){
  //     return done();
  //   }

  //   if(err && err === 'router'){
  //     return done(err);
  //   }

  //   if(idx>=stack.length){
  //     return done(err);
  //   }

  //   var layer = stack[idx++];
  //   if(method !== layer.method){
  //     return next(err);
  //   }
  //   if(err){
  //     return done(err);
  //   }else {
  //     return layer.handle_request(req, res, next);
  //   }
  // }
  // next();
}



module.exports = Route;