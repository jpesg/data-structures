class UnionFind {
    constructor() {
        //the number of elements in this union find
        let size = [];
        // used to track the sizes of each of the components
        let sz = [];
        //mapping
        //id[i] points to the parent of i, if id[i] = i then i is a root node
        let id = [];
        //tracks the number of components in the union find
        let numComponents = 0;
    }

    UnionFind(size) {
        if (size <= 0) {
            throw console.error('Size <= 0 is not allowed')
        }
        this.size = size;
        this.numComponents = size;
        this.sz = [size];
        this.id = [size];
        for (let i = 0; i < size; i++) {
            this.id[i] = i; //link to itself (self, root)
            this.sz[i] = 1; //each component is originally o fsie one
        }
    }

    printUnionInfo() {
        console.log("sz: ", this.sz);
        console.log("id: ", this.id);
        console.log("size: ", this.size);
        console.log("numComponents: ", this.numComponents);

    }
    //find wich component 'p' belongs to, takes amortized constant time
    find(p) {
        //find the root of the component
        let root = p;
        while (root != this.id[root]) {
            root = this.id[root];
        }
        //compress the path leading back to the root
        //doing this operation is called path compresion
        //and is what gives us amortized constant time complexity
        while (p != root) {
            let next = this.id[p];
            this.id[p] = root;
            p = next;
        }

        return root;
    }

    //return whether or not the elements p and q are in the same component
    connected(p, q) {
        return this.find(p) === this.find(q);
    }

    //return the size of the component p belongs to
    componentSize(p) {
        return this.sz[this.find(p)]
    }

    //return the number of elements in the union
    sizeUnion() {
        return this.size
    }
    //return the number of remaining components
    components() {
        return this.numComponents;
    }

    //unify the components containening elements p and q
    unify(p, q) {
        let root1 = this.find(q);
        let root2 = this.find(p);

        //these elements are already in the same group
        if (root1 === root2) return;

        //merge two components together
        //merge smaller component into the large one
        if (this.sz[root1] < this.sz[root2]) {
            this.sz[root2] += this.sz[root1];
            this.id[root1] = root2;
        } else {
            this.sz[root1] += this.sz[root2];
            this.id[root2] = root1;
        }

        this.numComponents--;
    }
}

let union = new UnionFind();
union.UnionFind(5)
union.unify(0, 1)
union.printUnionInfo()
union.unify(3, 4)
union.printUnionInfo()
union.unify(2, 3)
union.printUnionInfo()
union.unify(4, 1)
union.printUnionInfo()