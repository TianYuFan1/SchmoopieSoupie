class Stack {
  constructor() {
    this.queue = [];
  }

  add(node) {
    this.queue.push(node);
  }

  get_next() {
    return this.queue.pop();
  }

  is_empty() {
    return this.queue.length < 1;
  }
}
