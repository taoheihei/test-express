var Layer = function(path, fn){
  this.handle = fn;
  this.path= path;
  this.name = fn.name || '<anonymous>'
}

Layer.prototype.handle_request = function(req, res, next) {
  console.log('layer.handle_request');
  var fn = this.handle;
  try{
    fn(req, res, next);
  }
  catch(err){
    next(err);
  }
}

Layer.prototype.match = function (path) {
  if(path === this.path || path === '*'){
    return true;
  }
  return false;
}

module.exports = Layer;