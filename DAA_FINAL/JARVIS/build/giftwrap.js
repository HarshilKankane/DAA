/*! ConvexHullDemo 2022-04-29 */
define(["geom"], function(a) {
    function b(b) {
        function e(a) {
            m.push({
                lines: a,
                hull: l.slice()
            })
        }
        var f, g, h, i, j, k = b[0],
            l = [],
            m = [];
        if (b.length < 2) return [];
        for (i = 1; i < b.length; i++) f = b[i], (f[1] < k[1] || f[1] === k[1] && f[0] < k[0]) && (k = f);
        for (l = [], g = k; l.length < 2 || l[0] !== g;) {
            for (l.push(g), e({
                    points: [],
                    style: {}
                }), h = null, j = 0; j < b.length; j++)(f = b[j]) !== g && f !== h && (null !== h ? (e([{
                points: [g, h],
                style: c
            }, {
                points: [g, f],
                style: d
            }]), a.isCcwA(g, f, h) && (h = f, e([{
                points: [g, h],
                style: c
            }]))) : (h = f, e([{
                points: [g, h],
                style: c
            }])));
            g = h
        }
        return l.push(g), e([]), m
    }
    const c = {
            color: "red",
            width: 1,
            dash: "dash",

        },
        d = {
            color: "black",
            width: 1,
            dash: "dot",

        };
    return b
});