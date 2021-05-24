class Greedy {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.is_found = false;
    // Note: all store div
    this.frontier = new PriorityQueue(); // Priority Queue
    this.came_from = new WeakMap();
    this.already_visited = [];
  }

  async run() {
    // Initialize first coordinate
    this.frontier.enqueue(this.start, 0);
    this.already_visited.push(this.start);
    this.came_from[this.start] = null;

    // While there are still grid cells to explore
    while (this.frontier.get_length() > 0 && !this.is_found) {
      var current = this.frontier.dequeue();
      if (current != this.start) {
        current.style.backgroundColor = "purple";
      }
      // Get neighbors
      var neighbors = get_neighbors(current);
      // Iterate over neighbors
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        if (!this.already_visited.includes(neighbor)) {
          var heuristic = this.euclidean_heuristic(neighbor);
          this.frontier.enqueue(neighbor, heuristic);
          this.already_visited.push(neighbor);
          //   this.came_from[neighbor] = current;
          this.came_from.set(neighbor, current);
          if (neighbor == this.end) {
            this.is_found = true;
            break;
          } else {
            neighbor.style.backgroundColor = "orange";
          }
        }
      }
      await sleep(100);
    }
    this.trace_path();
  }

  trace_path() {
    var current = this.end;
    while (current != null) {
      if (current != this.start && current != this.end) {
        current.style.backgroundColor = "blue";
      }
      current = this.came_from.get(current);
    }
  }

  euclidean_heuristic(div) {
    var current_coord = get_grid_cell_coord(div);
    var goal_coord = get_grid_cell_coord(this.end);
    var dist_sqr =
      Math.pow(current_coord[0] - goal_coord[0], 2) +
      Math.pow(current_coord[1] - goal_coord[1], 2);
    return Math.sqrt(dist_sqr);
  }
}
