/*! ConvexHullDemo 2022-04-29 */
define([], function() {
    function a(a, b) {
        void 0 === b ? (this.x = a[0], this.y = a[1]) : (this.x = a, this.y = b)
    }

    function b(a, b, c) {
        return b.minus(a).isLeftTurn(c.minus(a))
    }

    function c(c, d, e) {
        return b(new a(c[0], c[1]), new a(d[0], d[1]), new a(e[0], e[1]))
    }

    a.prototype.plus = function(b) {
        return new a(this.x + b.x, this.y + b.y)
    };

    a.prototype.minus = function(b) {
        return new a(this.x - b.x, this.y - b.y)
    };

    a.prototype.dot = function(a) {
        return this.x * a.x + this.y * a.y
    };

    a.prototype.isLeftTurn = function(a) {
        return this.x * a.y - a.x * this.y > 0
    };

    a.prototype.isParallel = function(a) {
        var b = this.x * a.y - a.x * this.y;
        return Boolean(0 === b)
    };

    a.prototype.lensq = function() {
        return this.dot(this)
    };

    return {
        Vec: a,
        isCcw: b,
        isCcwA: c
    }
});