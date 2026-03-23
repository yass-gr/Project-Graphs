class ChessBoardGraph {
  constructor() {
    this.vertics = [];
    this.makeVertics();
    this.adjacencyMatrix = Array.from(
      { length: this.vertics.length },
      () => new Array(),
    );
    this.adjacencyList = new Map();
  }

  makeVertics() {
    for (let i = 0; i <= 7; i++) {
      for (let f = 0; f <= 7; f++) {
        this.vertics.push([i, f]);
      }
    }
  }

  makeAdjacencyMatrix(edgeCheckCallback = this.isEdgeForKnigntMove) {
    let v = this.vertics;
    for (let i = 0; i < v.length; i++) {
      for (let f = 0; f < v.length; f++) {
        if (edgeCheckCallback(v[i], v[f])) {
          this.adjacencyMatrix[i].push(1);
        } else {
          this.adjacencyMatrix[i].push(0);
        }
      }
    }
  }

  makeAdjacencyList(edgeCheckCallback = this.isEdgeForKnigntMove) {
    for (let i = 0; i < this.vertics.length; i++) {
      this.adjacencyList.set(this.vertics[i].toString(), []);
    }
    for (let i = 0; i < this.vertics.length; i++) {
      for (let f = 0; f < this.vertics.length; f++) {
        if (edgeCheckCallback(this.vertics[i], this.vertics[f])) {
          this.adjacencyList
            .get(this.vertics[i].toString())
            .push(this.vertics[f]);
        }
      }
    }
  }

  isEdgeForKnigntMove(v1, v2) {
    let possibleMoves = [];
    //add all possible knight moves for that knight
    possibleMoves.push([v1[0] + 1, v1[1] + 2]); //1
    possibleMoves.push([v1[0] + -1, v1[1] + 2]); //2
    possibleMoves.push([v1[0] + -2, v1[1] + 1]); //3
    possibleMoves.push([v1[0] + -2, v1[1] + -1]); //4
    possibleMoves.push([v1[0] + -1, v1[1] + -2]); //5
    possibleMoves.push([v1[0] + 1, v1[1] + -2]); //6
    possibleMoves.push([v1[0] + 2, v1[1] + -1]); //7
    possibleMoves.push([v1[0] + 2, v1[1] + 1]); //8

    possibleMoves = possibleMoves.reduce((acc, curr) => {
      if (JSON.stringify(curr) == JSON.stringify(v2)) {
        acc = true;
      }
      return acc;
    }, false);

    return possibleMoves;
  }

  knightMoves(start, target) {
    let queue = [start];
    let parents = new Map();
    let processed = new Set();
    parents.set(start.toString(), null);

    while (queue.length > 0) {
      let curr = queue.shift();
      let currStr = curr.toString();

      if (currStr === target.toString()) break;
      if (processed.has(currStr)) continue;
      processed.add(currStr);

      let matrixIndex = curr[0] * 8 + curr[1];
      for (let i = 0; i < this.adjacencyMatrix[matrixIndex].length; i++) {
        if (this.adjacencyMatrix[matrixIndex][i] === 1) {
          let neighbor = this.vertics[i];
          let neighborStr = neighbor.toString();
          if (!parents.has(neighborStr)) {
            parents.set(neighborStr, currStr);
            queue.push(neighbor);
          }
        }
      }
    }

    let path = [];
    let curr = target.toString();
    while (curr != null) {
      path.unshift(curr.split(",").map(Number));
      curr = parents.get(curr);
    }

    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach((p) => console.log(p));
  }
}

const board = new ChessBoardGraph();

board.makeAdjacencyMatrix();
board.makeAdjacencyList();
board.knightMoves([3, 3], [4, 3]);
