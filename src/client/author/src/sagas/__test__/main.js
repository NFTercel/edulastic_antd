Object.defineProperty(exports, "__esModule", { value: !0 });
exports.default = function(a, b) {
  let c = void 0;
  let d = b;
  return (
    d || (d = it),
    function(e, f) {
      d(e, function() {
        if (c instanceof Error) {
          const g = a.throw(c);
          c = f(...[g.value].concat(Array.prototype.slice.call(arguments)));
        } else {
          const _g = a.next(c);
          c = f(...[_g.value].concat(Array.prototype.slice.call(arguments)));
        }
      });
    }
  );
};
