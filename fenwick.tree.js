class FenwickTree {
  //pass an array of values or the size
  constructor(values, size) {
    if (!values) {
      this.tree = [size + 1];
    } else {
      this.tree = [...values];

      //create the tree

      this.tree.forEach((item, i) => {
        let j = i + this.lsb(i);
        if (j < this.tree.length) this.tree[j] += this.tree[i];
      });

      /*
      for(let i =0 ; i< this.tree.length; i++){
         let j = i + this.lsb(i);
        if (j < this.tree.length) this.tree[j] += this.tree[i];
      }
      */
    }
  }

  //REturn the values of the least significant bit LSB
  //lsb(108) = lsb(0b1101100) = 0b100 = 4
  lsb = value => {
    let bit = value & -value;
    console.log("bit: ", bit.toString(2));
    return bit;
  };

  //computes the prefix sum from [1,i], one based
  prefixSum(idx) {
    let sum = 0;
    while (i != 0) {
      sum += tree[i];
      i &= ~this.lsb(i); // i-= lsb(i)
    }
    return sum;
  }

  //returns the sum of the interval [i, j] one based
  sum = (i, j) => {
    if (j < i) return { error: "make sure j > i" };

    return this.prefixSum(j) - this.prefixSum(i - 1);
  };

  //add 'k' to  index i
  add(i, k) {
    while (i < this.tree.length) {
      (tree[i] += k), (i += this.lsb(i));
    }
  }

  //set index i to be equal to k
  set(i, k) {
    let value = this.sum(i, i);
    this.add(i, k - value);
  }
}
