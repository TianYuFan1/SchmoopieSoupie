class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  /**
   * @returns the next node
   */
  get_next() {
    return this.queue.shift()[0];
  }

  /**
   * Adds node to the priority queue
   * @param {div} obj
   * @param {int} priority
   * @returns null
   */
  add(obj, priority) {
    if (this.queue.length == 0) {
      this.queue.push([obj, priority]);
      return;
    }
    for (var i = 0; i < this.queue.length; i++) {
      var element = this.queue[i];
      if (priority < element[1]) {
        this.queue.splice(i, 0, [obj, priority]);
        return;
      }
    }
    this.queue.push([obj, priority]);
  }

  /**
   * @returns whether the priority queue is empty
   */
  is_empty() {
    return this.queue.length < 1;
  }
}
