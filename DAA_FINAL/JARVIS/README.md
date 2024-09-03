Convex Hull Visualization

Created by Vishva, Samyak, Harshil, and Akash

This project implements two popular algorithms for finding the convex hull of a set of points: Kirkpatrick-Seidel (KPS) and Jarvis March. It also provides interactive animations of the algorithms in two distinct web designs.

Algorithms:

Kirkpatrick-Seidel (KPS): This efficient divide-and-conquer algorithm recursively splits the point set based on their x-coordinates. It then identifies the edges that intersect the median x-coordinate and discards irrelevant points, leading to a linear-time solution for finding the convex hull points that lie on the vertical line defined by the median.
Jarvis March: This gift-wrapping approach starts with the leftmost point and iteratively finds the next point on the hull that forms the rightmost turn with the current point and the previously identified hull point. It continues until it circles back to the starting point.

Interact with the visualizations in Web Design 2 by adding/removing points, modifying existing points, and choosing the desired algorithm.
Authors:

Vishva Desai
Samyak Goel
Harshil Kankane
Akash 

We hope this comprehensive README file provides a clear and informative guide for users of your project!