class DFS {
  /**
   * Creates an DFS algorithm
   * @param {div} start
   * @param {div} end
   */
  constructor(start, end) {
    this.search = new UninformedSearch(start, end, Stack);
  }

  /**
   * Triggers an uninformed search
   */
  run() {
    this.search.run();
  }
}
