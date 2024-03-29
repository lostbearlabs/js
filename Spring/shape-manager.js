(function() {
  var ShapeManager, root,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ShapeManager = (function() {

    function ShapeManager(panel, size) {
      this.panel = panel;
      this.size = size;
      this.isTracked = __bind(this.isTracked, this);
      this.shapes = [];
      this.rDot = 10;
    }

    ShapeManager.prototype.isTracked = function(i) {
      return this.shapes[i].tracked;
    };

    ShapeManager.prototype.getX = function(i) {
      return this.shapes[i].attr("cx");
    };

    ShapeManager.prototype.getY = function(i) {
      return this.shapes[i].attr("cy");
    };

    ShapeManager.prototype.setXY = function(i, x, y) {
      return this.shapes[i].attr({
        cx: x,
        cy: y
      });
    };

    ShapeManager.prototype.add = function(x, y, atEnd) {
      var color, maxPos, minPos, onEnd, onMove, onStart, shape;
      shape = this.panel.circle(x, y, this.rDot);
      color = atEnd ? "#f00" : "#0f0";
      shape.attr("fill", color);
      shape.attr("stroke-width", "0");
      shape.attr({
        cx: x,
        cy: y
      });
      minPos = this.rDot;
      maxPos = this.size - this.rDot;
      this.shapes.push(shape);
      onMove = function(dx, dy, x, y, obj) {
        var cx, cy;
        cx = this.x0 + dx;
        cy = this.y0 + dy;
        cx = Math.max(cx, minPos);
        cy = Math.max(cy, minPos);
        cx = Math.min(cx, maxPos);
        cy = Math.min(cy, maxPos);
        return shape.attr({
          cx: cx,
          cy: cy
        });
      };
      onStart = function(x, y, obj) {
        this.x0 = shape.attr("cx");
        this.y0 = shape.attr("cy");
        shape.attr("opacity", 0.5);
        return shape.tracked = true;
      };
      onEnd = function(e, obj) {
        shape.tracked = false;
        return shape.attr("opacity", 1.0);
      };
      return shape.drag(onMove, onStart, onEnd);
    };

    return ShapeManager;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.ShapeManager = ShapeManager;

}).call(this);
