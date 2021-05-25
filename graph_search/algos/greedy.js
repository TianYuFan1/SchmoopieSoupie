class Greedy {
  /**
   * Ceates a Greedy Algorithm
   * @param {div} start
   * @param {div} end
   */
  constructor(start, end) {
    this.search = new InformedSearch(
      start,
      end,
      this.calculate_gn,
      this.calculate_hn,
      this.should_visit
    );
  }

  /**
   * Triggers an informed search
   */
  run() {
    this.search.run();
  }

  /**
   * There is no cost-so-far for Greedy
   * @returns 0
   */
  calculate_gn(current, cost_so_far) {
    return 0;
  }

  /**
   * @param {div} neighbor
   * @param {div} end
   * @returns The heuristic between a div and the end
   */
  calculate_hn(neighbor, end) {
    return euclidean_heuristic(neighbor, end);
  }

  /**
   * @param {int} gn
   * @param {div} neighbor
   * @param {WeakMap} cost_so_far
   * @returns whether div should be visited
   */
  should_visit(gn, neighbor, cost_so_far) {
    return !cost_so_far.has(neighbor);
  }
}
