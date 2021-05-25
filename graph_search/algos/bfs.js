class BFS {
  /**
   * Creates a BFS algorithm
   * @param {div} start
   * @param {div} end
   */
  constructor(start, end) {
    this.search = new UninformedSearch(start, end, Queue);
  }

  /**
   * Triggers an uninformed search
   */
  run() {
    this.search.run();
  }
}
