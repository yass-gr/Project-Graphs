class ChessBoardGraph {
  constructor() {
    this.vertics = [];
    this.makeVertics();
    this.adjacencyMatrix = Array.from(
      { length: this.vertics.length },
      () => new Array(),
    );
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
}

const board = new ChessBoardGraph();

board.makeAdjacencyMatrix();

console.log(board.adjacencyMatrix);
