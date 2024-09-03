from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
from random import randint
from collections import namedtuple
import matplotlib.pyplot as plt

Point = namedtuple('Point', 'x y')

from random import randint
from collections import namedtuple
import matplotlib.pyplot as plt


Point = namedtuple('Point', 'x y')

def flipped(pts):
    return [Point(-p.x, -p.y) for p in pts]

def quickselect(ls, idx, lo=0, hi=None, depth=0):
    if hi is None:
        hi = len(ls)-1
    if lo == hi:
        return ls[lo]
    pivot = randint(lo, hi)
    ls = list(ls)
    ls[lo], ls[pivot] = ls[pivot], ls[lo]
    cur = lo
    for run in range(lo+1, hi+1):
        if ls[run] < ls[lo]:
            cur += 1
            ls[cur], ls[run] = ls[run], ls[cur]
    ls[cur], ls[lo] = ls[lo], ls[cur]
    if idx < cur:
        return quickselect(ls, idx, lo, cur-1, depth+1)
    elif idx > cur:
        return quickselect(ls, idx, cur+1, hi, depth+1)
    else:
        return ls[cur]

def bridge(pts, v_line):
    candidates = set()
    if len(pts) == 2:
        return tuple(sorted(pts))
    pairs = []
    modify_s = set(pts)
    while len(modify_s) >= 2:
        pairs += [tuple(sorted([modify_s.pop(), modify_s.pop()]))]
    if len(modify_s) == 1:
        candidates.add(modify_s.pop())
    slopes = []
    for pi, pj in pairs[:]:
        if pi.x == pj.x:
            pairs.remove((pi, pj))
            candidates.add(pi if pi.y > pj.y else pj)
        else:
            slopes += [(pi.y-pj.y)/(pi.x-pj.x)]
    median_index = len(slopes)//2 - (1 if len(slopes) % 2 == 0 else 0)
    median_slope = quickselect(slopes, median_index)
    small = {pairs[i] for i, slope in enumerate(slopes) if slope < median_slope}
    equal = {pairs[i] for i, slope in enumerate(slopes) if slope == median_slope}
    large = {pairs[i] for i, slope in enumerate(slopes) if slope > median_slope}
    max_slope = max(p.y-median_slope*p.x for p in pts)
    max_set = [p for p in pts if p.y-median_slope*p.x == max_slope]
    left = min(max_set)
    right = max(max_set)
    if left.x <= v_line and right.x > v_line:
        return (left, right)
    if right.x <= v_line:
        candidates |= {p for _, p in large | equal}
        candidates |= {p for pair in small for p in pair}
    if left.x > v_line:
        candidates |= {p for p, _ in small | equal}
        candidates |= {p for pair in large for p in pair}
    return bridge(candidates, v_line)

def connect(lower, upper, pts):
    if lower == upper:
        return [lower]
    max_left = quickselect(pts, len(pts)//2-1)
    min_right = quickselect(pts, len(pts)//2)
    left, right = bridge(pts, (max_left.x + min_right.x)/2)
    pts_left = {left} | {p for p in pts if p.x < left.x}
    pts_right = {right} | {p for p in pts if p.x > right.x}
    return connect(lower, left, pts_left) + connect(right, upper, pts_right)

def upper_hull(pts):
    lower = min(pts)
    lower = max({p for p in pts if p.x == lower.x})
    upper = max(pts)
    pts = {lower, upper} | {p for p in pts if lower.x < p.x < upper.x}
    return connect(lower, upper, pts)

def convex_hull(pts):
    upper = upper_hull(pts)
    lower = flipped(upper_hull(flipped(pts)))
    if upper[-1] == lower[0]:
        del upper[-1]
    if upper[0] == lower[-1]:
        del lower[-1]
    return upper + lower




@app.route('/compute-convex-hull', methods=['POST'])
def compute_convex_hull():
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    data = request.get_json()

    if 'points' not in data:
        return jsonify({"error": "Missing 'points' in JSON"}), 400

    points = [Point(x, y) for x, y in data['points']]

    hull = convex_hull(points)
    result = [(p.x, p.y) for p in hull]

    return jsonify({'convexHull': result, 'points': data['points']})

if __name__ == '__main__':
    app.run(debug=True)