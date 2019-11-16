class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element) {
        if (this.isEmpty()) {
            this.collection.push[elem];
        } else {
            let added = false;
            for (let i = 0; i < this.size(); i++) {
                if (element[1] < this.collection[i][1]) {
                    this.collection.splice(i, 0, element)
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(element)
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }
    size() {
        return this.collection.length - 1
    }

    isEmpty() {
        return this.size() === 0;
    }
}