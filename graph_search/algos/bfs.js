class BFS {
  constructor(start, end) {
    this.search = new UninformedSearch(start, end, Queue);
  }

  run() {
    this.search.run();
  }
}
