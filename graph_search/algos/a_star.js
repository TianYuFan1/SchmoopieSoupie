class AStar {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.is_found = false;
    // Note: all store div
    this.frontier = new PriorityQueue(); // Priority Queue
    this.came_from = new WeakMap();
    this.cost_so_far = new WeakMap();
  }

  async run() {
    // Initialize start coordinate
    this.frontier.enqueue(this.start, 0);
    this.came_from[this.start] = null;
    this.cost_so_far.set(this.start, 0);

    // While end coordinate not reached
    while (this.frontier.get_length() > 0 && !this.is_found) {
      // Get next node in queue
      var current = this.frontier.dequeue()[0];

      // Check if end coordinate has been reached
      if (current == this.end) {
        this.is_found = true;
        break;
      }

      // Mark coordinate as explored
      if (current != this.start) {
        current.style.backgroundColor = "purple";
      }

      // Iterate through all neighbors
      var neighbors = get_neighbors(current);

      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        var new_cost = this.cost_so_far.get(current) + 1;

        if (
          !this.cost_so_far.has(neighbor) ||
          new_cost < this.cost_so_far.get(neighbor)
        ) {
          this.cost_so_far.set(neighbor, new_cost);
          var priority = new_cost + this.euclidean_heuristic(neighbor);
          this.frontier.enqueue(neighbor, priority); // TODO, ALREADY IN
          this.came_from.set(neighbor, current);
          neighbor.style.backgroundColor = "orange";
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
