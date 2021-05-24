class BFS {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.is_found = false;
    // Note: all store div
    this.frontier = []; // FIFO (queue, shift)
    this.came_from = new WeakMap();
    this.already_visited = [];
  }

  async run() {
    // Initialize first coordinate
    this.frontier.push(this.start);
    this.already_visited.push(this.start);
    this.came_from[this.start] = null;

    // While there are still grid cells to explore
    while (this.frontier.length > 0 && !this.is_found) {
      var current = this.frontier.shift();
      if (current != this.start) {
        current.style.backgroundColor = "purple";
      }
      // Get neighbors
      var neighbors = get_neighbors(current);
      // Iterate over neighbors
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        if (!this.already_visited.includes(neighbor)) {
          this.frontier.push(neighbor);
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
}
