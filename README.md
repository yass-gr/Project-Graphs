# Project Knights Travails

A learning project implementing a chess knight's shortest path finder using graph traversal algorithms.

## Learning Project

This project solves the classic "Knights Travails" problem from The Odin Project. It models a chessboard as a graph where each square is a node, and valid knight moves are edges between nodes.

## What I Learned

### Graph Theory Fundamentals
- **Graph Representation**: Chessboard squares as nodes, knight moves as edges
- **Adjacency Matrix**: 64x64 matrix where `matrix[i][j] = 1` if a knight can move from square `i` to square `j`
- **Adjacency List**: Map storing each node's neighbors for efficient traversal

### Breadth-First Search (BFS)
- BFS explores nodes level-by-level, guaranteeing the shortest path in unweighted graphs
- Key components:
  - **Queue**: FIFO structure for level-order exploration
  - **Visited/Processed**: Track explored nodes to avoid cycles
  - **Parent Map**: Store each node's predecessor for path reconstruction

### Path Reconstruction
- After BFS finds the target, backtrack through parent references
- Start from target, follow parents until reaching `null` (start node)

## How to Use

```bash
node knightTravails.js
```

Output:
```
You made it in 3 moves! Here's your path:
[ 3, 3 ]
[ 1, 2 ]
[ 2, 4 ]
[ 4, 3 ]
```

To change the start/target positions, edit line 113:
```js
board.knightMoves([0, 0], [7, 7]); // from top-left to bottom-right
```

## Analysis

### Time Complexity
- **Graph Construction**: O(64²) = O(1) - fixed 8x8 board
- **BFS**: O(V + E) where V = 64 vertices, E ≈ 336 edges (each square has 2-8 possible moves)

### Space Complexity
- **Adjacency Matrix**: O(64²) = O(1)
- **Adjacency List**: O(V + E) = O(1)
- **BFS Queue/Parents**: O(V) = O(1)

### Design Decisions
| Aspect | Choice | Reason |
|--------|--------|--------|
| Graph Storage | Matrix + List | Flexibility for different operations |
| Path Tracking | Single Map | O(1) parent lookups vs O(n) array search |
| Visited Check | Separate Set | Clean separation of "discovered" vs "processed" |

### Why BFS Guarantees Shortest Path
BFS processes nodes in order of their distance from the start. When the target is first reached, no shorter path exists (otherwise the target would have been discovered earlier in the queue).

## Visualization UI

To make the algorithm easier to interact with and understand, a beautiful web-based UI has been added. You can simply open `index.html` in any modern web browser to visually place the start and end positions, and watch the knight animate through the shortest path!

**Note on Authorship:** The core algorithmic graph logic (`knightTravails.js`) was written entirely by me as part of the learning project. The interactive user interface (`index.html`, `ui.js`, and `style.css`) was generated with the assistance of AI strictly for visualization and demonstration purposes.
