class UninformedSearch {
  constructor(start, end, Frontier) {
    this.start = start;
    this.end = end;
    this.is_found = false;

    this.frontier = new Frontier();
    this.came_from = new WeakMap();
  }

  /**
   * Initializes start div
   */
  initialize_start() {
    this.frontier.add(this.start);
    this.came_from.set(this.start, null);
  }

  /**
   * @returns whether the search is done
   */
  is_search_not_done() {
    return !this.frontier.is_empty() && !this.is_found;
  }

  is_start(div) {
    return div == this.start;
  }

  is_end(div) {
    return div == this.end;
  }

  set_div_background(div, color) {
    div.style.backgroundColor = color;
  }

  is_already_explored(div) {
    return this.came_from.has(div);
  }

  add_to_exploration(neighbor, current) {
    this.frontier.add(neighbor);
    this.came_from.set(neighbor, current);
  }

  set_found(flag) {
    this.is_found = flag;
  }

  async run() {
    // Initialize first div
    this.initialize_start();

    // While there are still divs to explore
    while (this.is_search_not_done()) {
      // Get next div
      var current = this.frontier.get_next();
      // Set div as explored
      if (!this.is_start(current)) {
        this.set_div_background(current, "purple");
      }
      // Get div neighbors
      var neighbors = get_neighbors(current);
      // Iterate over neighbors
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        // Check if it is already explored
        if (!this.is_already_explored(neighbor)) {
          this.add_to_exploration(neighbor, current);
          // Check if div is end
          if (this.is_end(neighbor)) {
            this.set_found(true);
            break;
          } else {
            this.set_div_background(neighbor, "orange");
          }
        }
      }
      await sleep(100);
    }
    trace_path(this.came_from, this.start, this.end);
  }
}
