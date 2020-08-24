var tape = require('tape'),
    Bounds = require('../').Bounds;

tape('Bounds should support constructor without arguments', t => {
  var b = new Bounds();
  t.equal(b.x1, +Number.MAX_VALUE);
  t.equal(b.y1, +Number.MAX_VALUE);
  t.equal(b.x2, -Number.MAX_VALUE);
  t.equal(b.y2, -Number.MAX_VALUE);
  t.end();
});

tape('Bounds should support constructor with bounds argument', t => {
  var b = new Bounds((new Bounds()).set(1,1,2,2));
  t.equal(b.x1, 1);
  t.equal(b.y1, 1);
  t.equal(b.x2, 2);
  t.equal(b.y2, 2);
  t.end();
});

tape('Bounds should support clone', t => {
  var a = (new Bounds()).set(1,1,2,2);
  var b = a.clone();
  t.notEqual(a, b);
  t.equal(b.x1, 1);
  t.equal(b.y1, 1);
  t.equal(b.x2, 2);
  t.equal(b.y2, 2);
  t.end();
});

tape('Bounds should support set', t => {
  var b = (new Bounds()).set(1,1,2,2);
  t.equal(b.x1, 1);
  t.equal(b.y1, 1);
  t.equal(b.x2, 2);
  t.equal(b.y2, 2);
  t.end();
});

tape('Bounds should support add point', t => {
  var b = (new Bounds()).add(1,1).add(2,2);
  t.equal(b.x1, 1);
  t.equal(b.y1, 1);
  t.equal(b.x2, 2);
  t.equal(b.y2, 2);
  t.end();
});

tape('Bounds should support expand', t => {
  var b = (new Bounds()).add(1,1).add(2,2).expand(1);
  t.equal(b.x1, 0);
  t.equal(b.y1, 0);
  t.equal(b.x2, 3);
  t.equal(b.y2, 3);
  t.end();
});

tape('Bounds should support round', t => {
  var b = (new Bounds()).add(0.5, 0.5).add(1.5, 1.5).round();
  t.equal(b.x1, 0);
  t.equal(b.y1, 0);
  t.equal(b.x2, 2);
  t.equal(b.y2, 2);
  t.end();
});

tape('Bounds should support translate', t => {
  var b = (new Bounds()).set(1,1,2,2).translate(2,3);
  t.equal(b.x1, 3);
  t.equal(b.y1, 4);
  t.equal(b.x2, 4);
  t.equal(b.y2, 5);
  t.end();
});

tape('Bounds should support rotate', t => {
  var b = (new Bounds()).set(0,0,2,2).rotate(Math.PI, 0, 0);
  t.true(Math.abs(b.x1 - -2) < 1e-10);
  t.true(Math.abs(b.y1 - -2) < 1e-10);
  t.true(Math.abs(b.x2 - 0) < 1e-10);
  t.true(Math.abs(b.y2 - 0) < 1e-10);
  t.end();
});

tape('Bounds should support union', t => {
  var b = (new Bounds()).set(1,1,3,3).union((new Bounds()).set(2,2,5,5));
  t.equal(b.x1, 1);
  t.equal(b.y1, 1);
  t.equal(b.x2, 5);
  t.equal(b.y2, 5);
  t.end();
});

tape('Bounds should support encloses', t => {
  var a = (new Bounds()).set(1,1,3,3),
      b = (new Bounds()).set(2,2,5,5),
      c = (new Bounds()).set(3,3,4,4);
  t.false(a.encloses(b));
  t.false(a.encloses(c));
  t.false(b.encloses(a));
  t.true(b.encloses(c));
  t.false(c.encloses(a));
  t.false(c.encloses(b));
  t.end();
});

tape('Bounds should support intersects', t => {
  var a = (new Bounds()).set(1,1,3,3),
      b = (new Bounds()).set(2,2,5,5),
      c = (new Bounds()).set(4,4,5,5);
  t.true(a.intersects(b));
  t.false(a.intersects(c));
  t.true(b.intersects(a));
  t.true(b.intersects(c));
  t.false(c.intersects(a));
  t.true(c.intersects(b));
  t.end();
});

tape('Bounds should support alignsWith', t => {
  var a = (new Bounds()).set(1,1,5,5),
      b = (new Bounds()).set(1,2,8,4),
      c = (new Bounds()).set(5,5,8,8);
  t.true(a.alignsWith(b));
  t.true(b.alignsWith(a));
  t.false(a.alignsWith(c));
  t.false(c.alignsWith(a));
  t.true(b.alignsWith(c));
  t.true(c.alignsWith(b));
  t.end();
});

tape('Bounds should support contains', t => {
  var b = (new Bounds()).set(1,1,3,3);
  t.false(b.contains(0,0));
  t.true(b.contains(1,1));
  t.true(b.contains(2,2));
  t.true(b.contains(3,3));
  t.false(b.contains(4,4));
  t.end();
});

tape('Bounds should support width', t => {
  var b = (new Bounds()).set(1,1,3,5);
  t.equal(b.width(), 2);
  t.end();
});

tape('Bounds should support height', t => {
  var b = (new Bounds()).set(1,1,3,5);
  t.equal(b.height(), 4);
  t.end();
});
