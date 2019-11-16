class Node {
    constructor(val, priority) {
        this.value = val;
        this.priority = priority;
        this.next = null;
    }
}

class PriorityQueue {
    constructor() {
        this.first = null;
    }

    //complexity O(n)
    insert(value, priority) {
        const newNode = new Node(value, priority);
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

    //complexity O(1)
    remove() {
        const first = this.first;
        this.first = this.first.next;
        return this.first;
    }

}