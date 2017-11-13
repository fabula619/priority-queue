const Node = require('./node');


class MaxHeap
{
    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.heapSize = 0;
    }

    push(data, priority) {
        let t = new Node(data, priority);
        this.insertNode(t);
        this.shiftNodeUp(t);
        this.heapSize++;
    }

    clear() {
        this.heapSize = 0;
        this.parentNodes = [];
        this.root = null;
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }
        this.heapSize --;
        let detached = this.detachRoot();
        if (this.isEmpty()) {
            return detached.data;
        }
        this.restoreRootFromLastInsertedNode(detached);
        this.shiftNodeDown(this.root);
        return detached.data;
    }

    detachRoot() {
        let root = this.root;
        let rootIndex = this.parentNodes.indexOf(root);
        if ( rootIndex >= 0) {
            this.parentNodes.splice(rootIndex, 1);
        }
        this.root = null;
        return root;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (typeof detached.data === 'undefined') {
            return;
        }
         let lastNode = this.parentNodes.pop();
         let lastNodeParent = lastNode.parent;
         this.root = lastNode;
        if(lastNodeParent != null) {
            this.root.parent = null;
            if (lastNodeParent.left == lastNode) {
                lastNodeParent.left = null;
            } else {
                lastNodeParent.right = null;
            }
        }
        if (detached.left != lastNode) {
            lastNode.left = detached.left;
            if (lastNode.left) {
                lastNode.left.parent = lastNode;
            }
        }
        if (detached.right != lastNode) {
            lastNode.right = detached.right;
            if (lastNode.right) {
                lastNode.right.parent = lastNode;
            }
        }
        if (lastNodeParent != detached) {
            this.parentNodes.unshift(lastNodeParent);
        }
        if (lastNode.left ==null || lastNode.right == null) {
            this.parentNodes.unshift(lastNode);
         }
    }

    isEmpty() {
        return this.parentNodes.length == 0;
    }

    size() {
        if (this.isEmpty()) {
            return 0;
        } else {
            return this.heapSize;
        }
    }

    clear() {
        this.heapSize = 0;
        this.parentNodes = [];
        this.root = null;
    }

    insertNode(node) {
        if (!this.root) {
            this.root = node;
        }
        else {
            this.parentNodes[0].appendChild(node);
        }
        this.parentNodes.push(node);
        if (this.parentNodes[0].left !=null && this.parentNodes[0].right != null) {
            this.parentNodes.shift();
        }
    }

    shiftNodeUp(node) {
        if (!node.parent) {
            this.root = node;
        }
        else if ( node.parent.priority < node.priority && node.parent != null ) {
            let parent = node.parent;
            let indexNode = this.parentNodes.indexOf(node);
            let indexParentNode = this.parentNodes.indexOf(parent);
            if (indexNode >= 0) {
                this.parentNodes[indexNode] = parent;
            }
            if (indexParentNode >= 0) {
                this.parentNodes[indexParentNode] = node;
            }
            node.swapWithParent();
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        if (node.left && node.right) {
            if (node.priority > node.left.priority && node.priority > node.right.priority) {
                return;
            }
            if (node.left.priority > node.right.priority) {
                this.shiftNodeUp(node.left);
                this.shiftNodeDown(node);
            }
            else if (node.left.priority < node.right.priority) {
                this.shiftNodeUp(node.right);
                this.shiftNodeDown(node);
            }
        } else if (node.left && !node.right) {
            if (node.priority > node.left.priority) {
                return;
            } else {
                this.shiftNodeUp(node.left);
                this.shiftNodeDown(node);
            }
        }
    }
}
// const h = new MaxHeap();
// h.push(42, 15);
// h.push(15, 14);
// h.push(0, 16);
// h.push(100, 100);
//
// h.pop();
// h.pop();
// h.pop();
// h.push(42, 15);
// h.push(15, 42);
//
// h.detachRoot();


module.exports = MaxHeap;