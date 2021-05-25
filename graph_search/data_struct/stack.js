class Stack {
  /**
   * Creates a stack
   */
  constructor() {
    this.queue = [];
  }

  /**
   * Adds a node to the stack
   * @param {*} node
   */
  add(node) {
    this.queue.push(node);
  }

  /**
   * @returns the next node
   */
  get_next() {
    return this.queue.pop();
  }

  /**
   * @returns whether the stack is empty
   */
  is_empty() {
    return this.queue.length < 1;
  }
}
