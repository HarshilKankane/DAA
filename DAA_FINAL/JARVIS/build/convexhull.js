/*! ConvexHullDemo 2022-04-29 */
require(["geom","plotter","giftwrap"], function(a, b, c, d) {
    const e = {color: "blue", width: 2},
          f = {color: "blue",  symbol: 'star',size: 15},
          g = {color: "violet", size: 11},
          h = {jarvis: c},
          i = {jarvis: "markers"};
    
    
    
    new Vue({
        el: "#app",
        data: {
            points: [],
            countString: "10",
            states: [],
            currentStateIndex: 0,
            stateIndexString: "0",
            algorithm: "jarvis",
            togglefileuploadhelp: false,
            algorithmExecutionTime: null, 
        },
        mounted: function() {
            this.start()
        },
        watch: {
            stateIndexString: function() {
                this.currentStateIndex = parseInt(this.stateIndexString);
                this.plot();
            }
        },
        computed: {
            startDisabled: function() {
                return Boolean(0 === this.points.length)
            },
            nextDisabled: function() {
                return Boolean(this.currentStateIndex >= this.states.length - 1)
            },
            previousDisabled: function() {
                return Boolean(0 === this.currentStateIndex)
            },
            statesMax: function() {
                return this.states.length - 1
            }
        },
        methods: {
            upload: function(a) {
                var b = new FileReader,
                    c = a.target.files[0],
                    d = this;
                
                b.onload = function(a) {
                    d.clear();
                    for(var b = a.target.result, c = b.match(/[0-9]+/g), e = 0; e < c.length; e += 2) {
                        d.points.push([parseInt(c[e]), parseInt(c[e+1])]);
                    }
                    d.start()
                };
                b.readAsText(c)
            },
            resetfile: function(a) {
                this.$refs.file.value = ""
            },
            clear: function() {
                this.points = [];
                this.states = [];
                this.currentStateIndex = 0;
                this.plot();
            },
            start: function() {
                const startTime = performance.now();
            
                this.states = h[this.algorithm](this.points);
            
                const endTime = performance.now();
                this.algorithmExecutionTime = endTime - startTime;
            
                this.currentStateIndex = 0;
                this.plot();
              },
            next: function() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
                this.intervalId = setInterval(() => {
                    if (this.currentStateIndex < this.states.length - 1) {
                        this.currentStateIndex += 1;
                        this.plot();
                    } else {
                        clearInterval(this.intervalId);
                    }
                }, 500); // Change this value to adjust the speed of iteration
            },
            previous: function() {
                this.currentStateIndex -= 1;
                this.plot();
            },
            addPoints: function() {
                function a(a, b) {
                    return d.points.find(function(c) {
                        return c[0] == a && c[1] == b
                    })
                }
                for(var b, c, d = this, e = 0; e < parseInt(this.countString);) {
                    b = Math.floor(100 * Math.random());
                    c = Math.floor(100 * Math.random());
                    if (!a(b, c)) {
                        this.points.push([b, c]);
                        e += 1;
                    }
                }
                this.start();
            },
            beforeDestroy: function() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }
            },

            plot: function() {
                var a, c, d, h;
                if (this.stateIndexString = "" + this.currentStateIndex, h = i[this.algorithm],b.plot(this.points, h, {
                    marker: g, 
                    xaxis: {range: [0, 50]}, 
                    yaxis: {range: [0, 50]}, 
                    plot_bgcolor: 'rgba(70, 130, 180, 0.7)' // Translucent bluish background
                }, true), this.states.length > 0) {
                    a = this.states[this.currentStateIndex];
                    c = a.lines;
                    b.plot(a.hull, "lines+markers", {line: e, marker: f});
                    for(var j = 0; j < c.length; j++) {
                        d = c[j];
                        b.plot(d.points, "lines", {line: d.style});
                    }
                }
            }
        }
    });
});