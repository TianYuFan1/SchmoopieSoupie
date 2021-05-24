class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  dequeue() {
    return this.queue.shift()[0];
  }

  enqueue(obj, priority) {
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

  is_empty() {
    return this.queue.length < 1;
  }

  get_queue() {
    return this.queue;
  }

  get_length() {
    return this.queue.length;
  }
}
