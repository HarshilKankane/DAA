

define(["geom"], function (geom) {

    const CANDIDATE_LINE_STYLE = {color: 'red', width: 1, dash: 'dash', name: 'Candidate'};
    const TEST_LINE_STYLE = {color: 'blue', width: 1, dash: 'dot', name: 'Probe'};


    function giftWrap(points) {

        var p, pointOnHull, candidate, bottommost = points[0], hull = [], i, j, states = [];

        function pushState(linelist) {
            states.push({lines: linelist, hull: hull.slice()});
        }

        if (points.length < 2) {
            return [];
        }
        for (i = 1; i < points.length; i++) {
            p = points[i];
            if (p[1] < bottommost[1] || (p[1] === bottommost[1] && p[0] < bottommost[0])) {
                bottommost = p;
            }
        }

        hull = [];
        pointOnHull = bottommost;

        while (hull.length < 2 || (hull[0] !== pointOnHull)) {
            hull.push(pointOnHull);
            pushState({points:[], style:{}});
            candidate = null;

            for (j = 0; j < points.length; j++) {
                p = points[j];
                if (p === pointOnHull || p === candidate) continue;
                if (candidate === null) {
                    candidate = p;
                    pushState([{points: [pointOnHull, candidate], style: CANDIDATE_LINE_STYLE}]);
                    continue;
                }
                pushState([
                    {points: [pointOnHull, candidate], style: CANDIDATE_LINE_STYLE},
                    {points: [pointOnHull, p], style: TEST_LINE_STYLE}]);
                if (geom.isCcwA(pointOnHull, p, candidate)) {
                    candidate = p;
                    pushState([{points: [pointOnHull, candidate], style: CANDIDATE_LINE_STYLE}]);
                }
            }
            pointOnHull = candidate;
        }
        hull.push(pointOnHull);  // Close the loop
        pushState([]);
        //hull.pop();
        return states;
    }

    return giftWrap;
});
