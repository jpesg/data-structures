class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }


    // function to be implemented 
    // insert(data) 
    insert(data) {
        let newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.inserNode(this.root, newNode);
        }
    }
    // remove(data) 
    remove(data) {
        this.root = removeNode(this.root, data);
    }

    //balance difference by one
    isBalanced() {
        return this.findMinHeight() >= this.findMaxHeight() - 1
    }

    //distance root node to the first leaf node without two children 
    findMinHeight(node = this.root) {
        if (!node) return -1
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);

        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }

    //distance root node to the last child node(bottom node)
    findMaxHeight(node = this.root) {
        if (!node) return -1
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);

        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }

    inOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();

            function traverseInOrder(node) {
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return result;
        };
    }
    preOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();

            function traversePreOrder(node) {
                result.push(node.data);
                node.left && traversePreOrder(node.left);
                node.right && traversePreOrder(node.right);
            };
            traversePreOrder(this.root);
            return result;
        };
    }
    postOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();

            function traversePostOrder(node) {
                node.left && traversePostOrder(node.left);
                node.right && traversePostOrder(node.right);
                result.push(node.data);
            };
            traversePostOrder(this.root);
            return result;
        }
    }

    levelOrder() {
        let result = [];
        let Q = [];
        if (this.root != null) {
            Q.push(this.root);
            while (Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                };
                if (node.right != null) {
                    Q.push(node.right);
                };
            };
            return result;
        } else {
            return null;
        };
    };
}

const insertNode = (node, newNode) => {
    if (newNode.data < node.data) {
        if (!node.left) {
            node.left = newNode;
            return null;
        } else {
            return insertNode(node.left, newNode)
        }
    } else if (newNode.data > node.data) {
        if (!node.right) {
            node.right = newNode;
            return null;
        } else {
            return insertNode(node.right, newNode)
        }
    } else {
        return null;
    }
}


const removeNode = (node, data) => {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        // node has no children 
        if (node.left == null && node.right == null) {
            return null;
        }
        // node has no left child 
        if (node.left == null) {
            return node.right;
        }
        // node has no right child 
        if (node.right == null) {
            return node.left;
        }
        // node has two children 
        var tempNode = node.right;
        while (tempNode.left !== null) {
            tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    } else {
        node.right = removeNode(node.right, data);
        return node;
    }
}

const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);

console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
bst.add(10);
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
console.log('inOrder: ' + bst.inOrder());
console.log('preOrder: ' + bst.preOrder());
console.log('postOrder: ' + bst.postOrder());

console.log('levelOrder: ' + bst.levelOrder());