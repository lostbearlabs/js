
/*
Copyright (c) 2010-2011 Eric R. Johnson, http://www.lostbearlabs.com

All code on LostBearLabs.com is made available under the terms of the
Artistic License 2.0, for details please see:
   http://www.opensource.org/licenses/artistic-license-2.0.php
*/

(function() {
  var NUM, WIDTH, dx, dy, initData, midLineGreen, midLineYellow, onTimer1, paper, timer1, updatePositions, x, y;

  WIDTH = 400;

  timer1 = null;

  paper = null;

  midLineYellow = null;

  midLineGreen = null;

  NUM = 16;

  x = [];

  y = [];

  dx = [];

  dy = [];

  initData = function() {
    var atEnd, i, x0, y0, _results;
    paper = Raphael("TheCanvas", WIDTH, WIDTH);
    this.manager = new ShapeManager(paper, WIDTH);
    _results = [];
    for (i = 0; 0 <= NUM ? i <= NUM : i >= NUM; 0 <= NUM ? i++ : i--) {
      x0 = (i + 1) * WIDTH / (NUM + 2);
      y0 = WIDTH / 2;
      atEnd = i === 0 || i === NUM;
      this.manager.add(x0, y0, atEnd);
      x.push(x0);
      y.push(y0);
      dx.push(0);
      _results.push(dy.push(0));
    }
    return _results;
  };

  updatePositions = function() {
    var ax, ay, f1, f2x, f2y, f3x, f3y, f4x, f4y, i, _results;
    f1 = 2.0;
    f2x = 1.0;
    f2y = 1.0;
    f3x = 0.05;
    f3y = 0.05;
    f4x = 0.1;
    f4y = 0.1;
    for (i = 0; 0 <= NUM ? i <= NUM : i >= NUM; 0 <= NUM ? i++ : i--) {
      if (i === 0 || i === NUM) continue;
      if (this.manager.isTracked(i)) continue;
      ax = 0;
      ay = 0;
      ay = f1;
      ax = 0;
      ax += f2x * (x[i - 1] - x[i]);
      ay += f2y * (y[i - 1] - y[i]);
      ax += f2x * (x[i + 1] - x[i]);
      ay += f2y * (y[i + 1] - y[i]);
      ax -= f4x * dx[i];
      ay -= f4y * dy[i];
      dx[i] += f3x * ax;
      dy[i] += f3y * ay;
    }
    _results = [];
    for (i = 0; 0 <= NUM ? i <= NUM : i >= NUM; 0 <= NUM ? i++ : i--) {
      if (this.manager.isTracked(i)) {
        x[i] = this.manager.getX(i);
        _results.push(y[i] = this.manager.getY(i));
      } else {
        x[i] += dx[i];
        y[i] += dy[i];
        _results.push(this.manager.setXY(i, x[i], y[i]));
      }
    }
    return _results;
  };

  onTimer1 = function() {
    return updatePositions();
  };

  $(document).ready(function() {
    initData();
    return timer1 = setInterval(onTimer1, 100);
  });

  $(document).unload(function() {
    if (timer1 !== null) clearInterval(timer1);
    return timer1 = null;
  });

}).call(this);
