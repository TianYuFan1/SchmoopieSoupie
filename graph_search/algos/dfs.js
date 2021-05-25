class DFS {
  constructor(start, end) {
    this.search = new UninformedSearch(start, end, Stack);
  }

  run() {
    this.search.run();
  }
}
