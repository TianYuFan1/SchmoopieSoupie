class Search {
  /**
   * Creates a search algorithm
   * @param {div} start
   * @param {div} end
   */
  constructor(start, end) {
    // Store start and end div
    this.start = start;
    this.end = end;
    // Stores whether end div is found
    this.is_found = false;
    // Stores where div comes from
    this.came_from = new WeakMap();
  }

  /**
   * @returns whether the search is done
   */
  is_search_not_done() {
    return !this.frontier.is_empty() && !this.is_found;
  }

  /**
   * @param {div} div
   * @returns whether the div is the start div
   */
  is_start(div) {
    return div == this.start;
  }

  /**
   * @param {div} div
   * @returns whether the div is the end div
   */
  is_end(div) {
    return div == this.end;
  }

  /**
   *  Sets the found flag to a boolean value
   * @param {boolean} flag
   */
  set_found(flag) {
    this.is_found = flag;
  }
}
