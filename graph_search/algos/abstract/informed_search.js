class InformedSearch extends Search {
  /**
   * Creates an informed search
   * @param {div} start
   * @param {div} end
   * @param {func} calculate_gn
   * @param {func} calculate_hn
   * @param {func} should_visit
   */
  constructor(start, end, calculate_gn, calculate_hn, should_visit) {
    super(start, end);

    this.calculate_gn = calculate_gn;
    this.calculate_hn = calculate_hn;
    this.should_visit = should_visit;

    this.frontier = new PriorityQueue();
    this.cost_so_far = new WeakMap();
  }

  /**
   * Initializes the search
   */
  initialize_start() {
    this.frontier.add(this.start, 0);
    this.came_from.set(this.start, null);
    this.cost_so_far.set(this.start, 0);
  }

  /**
   * Triggers the search
   */
  async run() {
    // Initialize the search
    this.initialize_start();

    // Continue the search while it is not done
    while (this.is_search_not_done()) {
      // Get next div
      var current = this.frontier.get_next();
      // If div is the end
      if (this.is_end(current)) {
        // Set the end as found
        this.set_found(true);
        break;
      }
      // If the div is not the start
      if (!this.is_start(current)) {
        // Set the div as explored
        set_div_background(current, "purple");
      }
      // Retrieve the neighbors of the div
      var neighbors = get_neighbors(current);
      // Iterate through the neighbors
      for (var i = 0; i < neighbors.length; i++) {
        // Get the neighbor
        var neighbor = neighbors[i];
        // Calculate the cost-so-far
        var gn = this.calculate_gn(current, this.cost_so_far);
        // Determine whether div should be visited
        if (this.should_visit(gn, neighbor, this.cost_so_far)) {
          // Update the cost-so-far
          this.cost_so_far.set(neighbor, gn);
          // Priority = cost-so-far + heuristic
          var priority = gn + this.calculate_hn(neighbor, this.end);
          // Add the neighbor to the frontier
          this.frontier.add(neighbor, priority);
          // Update where the cell comes from
          this.came_from.set(neighbor, current);
          // If the neighbor is not the end
          if (!this.is_start(neighbor) && !this.is_end(neighbor)) {
            // Set the div as frontier
            set_div_background(neighbor, "orange");
          }
        }
      }
      // Sleep for 100ms
      await sleep(100);
    }
    // Display the path
    trace_path(this.came_from, this.start, this.end);
  }
}
