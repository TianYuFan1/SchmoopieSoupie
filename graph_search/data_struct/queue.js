class Queue {
  /**
   * Creates a Queue
   */
  constructor() {
    this.queue = [];
  }

  /**
   * Adds a node to the queue
   * @param {*} node
   */
  add(node) {
    this.queue.push(node);
  }

  /**
   * @returns the next node in the queue
   */
  get_next() {
    return this.queue.shift();
  }

  /**
   * @returns whether the queue is empty
   */
  is_empty() {
    return this.queue.length < 1;
  }
}
