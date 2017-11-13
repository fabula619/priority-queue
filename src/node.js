class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    appendChild(node) {
        if (this.right == null && this.left != null) {
            this.right = node;
            this.right.parent = this;
        }
        if (this.left == null) {
            this.left = node;
            this.left.parent = this;
        }
    }

    removeChild(node) {
        if (this.left == node) {
            this.left.parent = null;
            this.left = null;
        }
        else if (this.right == node) {
            this.right.parent = null;
            this.right = null;
        }
        else
            throw err;
    }

    remove() {
        if (this.parent != null)
            this.parent.removeChild(this);
        else {
            this.obj = null;
        }
    }

    swapWithParent() {
        if(this.parent != null) {

            let flag = -1;
            if(this.parent.parent !=null) {
                if (this.parent.parent.left == this.parent)
                    flag = 1;
                if (this.parent.parent.right == this.parent)
                    flag = 0;
            }
            var for_right = this.parent.right;
            var for_left = this.parent.left;
            var chi_left = this.left;
            var chi_right = this.right;
            var our_child = this;
            var parent = this.parent;

            var temp_reference = parent.parent;
            let left_flag=false;
            if(this == this.parent.left)
                left_flag = true;
            parent.parent = this;
            our_child.parent = temp_reference;
            if(left_flag) {
                our_child.left = parent;
                if(for_right != null) {
                    our_child.right = for_right;
                    our_child.right.parent = our_child;
                }
            }
            else
            {
                our_child.right = parent;
                if( for_left !=null) {
                    our_child.left = for_left;
                    our_child.left.parent = our_child;
                }
            }
            parent.left = chi_left
            parent.right = chi_right;
            if(chi_left!=null)
                parent.left.parent =  parent;
            if(chi_right!=null)
                parent.right.parent = parent;
            if(flag ==1 )
                our_child.parent.left = our_child;
            else if(flag ==0)
                our_child.parent.right = our_child;
        }

    }
}
module.exports = Node;