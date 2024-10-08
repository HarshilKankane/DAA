const LABEL_PREFIX = "p";
define(["geom"], function(a) {
    function b(b, c, d, e) {
        for (var f, g, h, i, j = e ? Plotly.newPlot : Plotly.plot, k = [], l = [], m = [], n = 0; n < b.length; n++) {
            f = b[n];
            f instanceof a.Vec ? (k.push(f.x), l.push(f.y)) : (k.push(f[0]), l.push(f[1]));
            m.push(LABEL_PREFIX + n);
        }
        g = {
            x: k,
            y: l,
            mode: c
        };
        d.line && d.line.name ? g.name = d.line.name : g.showlegend = !1;
        for (var o in d) g[o] = d[o];
        c.includes("text") && (g.text = m, g.textposition = "middle right");
        h = {
            xaxis: {
                title: "",
                range: [-1, 101],
                scaleanchor: ""
            },
            yaxis: {
                title: "",
                range: [-1, 101]
            },
            width: 500,
            height: 500,
            showlegend: !0,
            legend: {
                x: .15,
                y: 1.10,
                orientation: "h"
            },
            margin: {
                l: 60,
                r: 30,
                b: 60,
                t: 60,
                pad: 0
            },
            font: {
                size: 14
            }
        };
        i = {
            displayModeBar: !1,
            staticPlot: !0
        };
        j("convexhull", [g], h, i)
    }
    return {
        plot: b
    }
});