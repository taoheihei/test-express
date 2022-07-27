var Layer = function(path, fn){
  this.handle = fn;
  this.path= path;
  this.name = fn.name || '<anonymous>'
}

Layer.prototype.handle_request = function(req, res) {
  console.log('layer.handle_request');
  var fn = this.handle;
  console.log(res);
  try{
    fn(req, res);
  }
  catch(err){
    // next(err);
    console.log(err);
  }
}

Layer.prototype.match = function (path) {
  if(path === this.path || path === '*'){
    return true;
  }
  return false;
}

module.exports = Layer;