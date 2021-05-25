class InformedSearch extends Search {
  constructor(start, end, calculate_gn, calculate_hn, should_visit) {
    super(start, end);

    this.calculate_gn = calculate_gn;
    this.calculate_hn = calculate_hn;
    this.should_visit = should_visit;

    this.frontier = new PriorityQueue();
    this.cost_so_far = new WeakMap();
  }

  initialize_start() {
    this.frontier.add(this.start, 0);
    this.came_from.set(this.start, null);
    this.cost_so_far.set(this.start, 0);
  }

  async run() {
    this.initialize_start();

    while (this.is_search_not_done()) {
      var current = this.frontier.get_next();

      if (this.is_end(current)) {
        this.set_found(true);
        break;
      }

      if (!this.is_start(current)) {
        set_div_background(current, "purple");
      }

      var neighbors = get_neighbors(current);

      for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        var gn = this.calculate_gn(current, this.cost_so_far);

        if (this.should_visit(gn, neighbor, this.cost_so_far)) {
          this.cost_so_far.set(neighbor, gn);
          var priority = gn + this.calculate_hn(neighbor, this.end);
          this.frontier.add(neighbor, priority);
          this.came_from.set(neighbor, current);
          if (!this.is_start(neighbor) && !this.is_end(neighbor)) {
            set_div_background(neighbor, "orange");
          }
        }
      }
      await sleep(100);
    }
    trace_path(this.came_from, this.start, this.end);
  }
}
