class UCS {
  /**
   * Creates an UCS algorithm
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
   * @param {div} current
   * @param {WeakMap} cost_so_far
   * @returns the cost to arrive at the div
   */
  calculate_gn(current, cost_so_far) {
    return cost_so_far.get(current) + 1;
  }

  /**
   * There is no heuristic for UCS
   * @returns 0
   */
  calculate_hn(neighbor, end) {
    return 0;
  }

  /**
   * @param {int} gn
   * @param {div} neighbor
   * @param {WeakMap} cost_so_far
   * @returns whether div should be visited
   */
  should_visit(gn, neighbor, cost_so_far) {
    return !cost_so_far.has(neighbor) || gn < cost_so_far.get(neighbor);
  }
}
