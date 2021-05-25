class Search {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.found = false;

    this.came_from = new WeakMap();
  }

  is_search_not_done() {
    return !this.frontier.is_empty() && !this.is_found;
  }

  is_start(div) {
    return div == this.start;
  }

  is_end(div) {
    return div == this.end;
  }

  set_found(flag) {
    this.is_found = flag;
  }
}
