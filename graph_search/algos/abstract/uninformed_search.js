class UninformedSearch extends Search {
  /**
   * Creates an uninformed search
   * @param {div} start
   * @param {div} end
   * @param {*} Frontier
   */
  constructor(start, end, Frontier) {
    super(start, end);

    this.frontier = new Frontier();
  }

  /**
   * Initializes start div
   */
  initialize_start() {
    this.frontier.add(this.start);
    this.came_from.set(this.start, null);
  }

  /**
   * @param {div} div
   * @returns whether the div should be visited
   */
  should_visit(div) {
    return !this.came_from.has(div);
  }

  /**
   * Add the neighboring div to the frontier
   * @param {div} neighbor
   * @param {div} current
   */
  add_to_exploration(neighbor, current) {
    this.frontier.add(neighbor);
    this.came_from.set(neighbor, current);
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
        set_div_background(current, "purple");
      }
      // Get div neighbors
      var neighbors = get_neighbors(current);
      // Iterate over neighbors
      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        // Check if it is already explored
        if (this.should_visit(neighbor)) {
          this.add_to_exploration(neighbor, current);
          // Check if div is end
          if (this.is_end(neighbor)) {
            this.set_found(true);
            break;
          } else {
            set_div_background(neighbor, "orange");
          }
        }
      }
      // Wait for 100ms
      await sleep(100);
    }
    // Trace the path from beginning to end
    trace_path(this.came_from, this.start, this.end);
  }
}
