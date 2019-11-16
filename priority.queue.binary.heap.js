/*
If a given node is located at index 'x' in the array, its left child exists at
index = 2 x, and its right child exists at index = 2 x + 1. Each node 's parent exists
at index = x / 2(rounded down).
So the final binary heap array looks like this:

    [100, 19, 36, 17, 3, 25, 1, 2, 7]

And we can find any given child 's parent/children using our algorithm.  For instance,
the "25"
node exists at index = 5, therefore its parent must exist at 5 / 2 rounded down
which equals 2. It works!
*/
class Node {
  constructor(val, priority) {
    this.value = val;
    this.priority = priority;
    this.next = null;
  }
}

class PriorityQueue {
  constructor() {
    this.heap = [null];
  }

  //complexity O(log n)
  insert(value, priority) {
    const newNode = new Node(value, priority);
    this.heap.push(newNode);

    let currentNodeIndex = this.heap.length - 1;
    let currentNodeParentIndex = Math.floor(currentNodeIndex / 2);

    while (
      this.heap[currentNodeParentIndex] &&
      newNode.priority > this.heap[currentNodeParentIndex]
    ) {
      const parent = this.heap[currentNodeParentIndex];
      this.heap[currentNodeParentIndex] = newNode;
      this.heap[currentNodeIndex] = parent;
      currentNodeIndex = currentNodeParentIndex;
      currentNodeParentIndex = Math.floor(currentNodeIndex / 2);
    }

    if (!this.first || priority > this.first.priority) {
      newNode.next = this.first;
      this.first = newNode;
    } else {
      let auxNode = this.first;
      while (auxNode.next && priority < auxNode.next.priority) {
        auxNode = auxNode.next;
      }
      newNode.next = auxNode.next;
      auxNode = newNode;
    }
  }

  getQueue() {
    return this.heap;
  }

  //complexity O(log n)
  remove() {
    if (this.heap.length < 3) {
      const toReturn = this.heap.pop();
      this.heap[0] = null;
      return toReturn;
    }
    const toRemove = this.heap[1];
    this.heap[1] = this.heap.pop();
    let currentIdx = 1;
    let [left, right] = [2 * currentIdx, 2 * currentIdx + 1];
    let currentChildIdx =
      this.heap[right] && this.heap[right].priority >= this.heap[left].priority ?
      right :
      left;

    while (
      this.heap[currentChildIdx] &&
      this.heap[currentIdx].priority <= this.heap[currentChildIdx].priority
    ) {

      let currentNode = this.heap[currentIdx];
      let currentChildNode = this.heap[currentChildIdx];

      this.heap[currentChildIdx] = currentNode;
      this.heap[currentIdx] = currentChildNode;
      currentIdx = currentChildIdx;
      [left, right] = [2 * currentIdx, 2 * currentIdx + 1];
      currentChildIdx =
        this.heap[right] &&
        this.heap[right].priority >= this.heap[left].priority ?
        right :
        left;
    }
    return toRemove;
  }
}

let queue = new PriorityQueue();
queue.insert(100, 10);
queue.insert(19, 9);
queue.insert(36, 8);
queue.insert(17, 7);
queue.insert(3, 6);
queue.insert(25, 5);
queue.insert(1, 4);
queue.insert(2, 3);
let heap = queue.getQueue();


queue.remove();
heap = queue.getQueue();