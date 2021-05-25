class AStar {
  constructor(start, end) {
    this.search = new InformedSearch(
      start,
      end,
      this.calculate_gn,
      this.calculate_hn,
      this.should_visit
    );
  }

  run() {
    this.search.run();
  }

  calculate_gn(current, cost_so_far) {
    return cost_so_far.get(current) + 1;
  }

  calculate_hn(neighbor, end) {
    return euclidean_heuristic(neighbor, end);
  }

  should_visit(gn, neighbor, cost_so_far) {
    return !cost_so_far.has(neighbor) || gn < cost_so_far.get(neighbor);
  }
}
