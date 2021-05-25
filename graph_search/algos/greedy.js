class Greedy {
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
    return 0;
  }

  calculate_hn(neighbor, end) {
    return euclidean_heuristic(neighbor, end);
  }

  should_visit(gn, neighbor, cost_so_far) {
    return !cost_so_far.has(neighbor);
  }
}
