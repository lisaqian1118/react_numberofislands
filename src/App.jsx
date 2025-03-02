import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {




  return (
     <Grid />
  )
}


function Grid() {
    const [rows, setRows] = useState(1);
    const [cols, setCols] = useState(1);
    const [grid, setGrid] = useState([]);
    const [islandCount, setIslandCount] = useState(0);

  const handleCountIslands = () => {
    // Create a deep copy of the grid to avoid modifying state directly
    const gridCopy = grid.map(row => [...row]);
    setIslandCount(numIslands(gridCopy));
  };


    const numIslands = (grid) => {
      if (!grid || grid.length === 0) return 0;

      let count = 0;
      const rows = grid.length;
      const cols = grid[0].length;

      const dfs = (i, j) => {
        if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] === "0") return;
        grid[i][j] = "0"; // Mark visited land as water

   //     setGrid(grid);

        dfs(i + 1, j); // Down
        dfs(i - 1, j); // Up
        dfs(i, j + 1); // Right
        dfs(i, j - 1); // Left
      };

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j] === "1") {
            count++;
            dfs(i, j);
          }
        }
      }
      return count;
    };



    const createGrid = () => {
        const newGrid = Array.from({length : rows}, () => Array(cols).fill("0"));

        console.log(newGrid);
        setGrid(newGrid);
    };


      // Function to toggle land/water on click
    const toggleCell = (i, j) => {
    console.log("cell is updated" + i + j);

    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === i && cIdx === j ? (cell === "0" ? "1" : "0") : cell))
    );
        setGrid(newGrid);
    };

  // Function to render the grid
  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: "flex" }}>
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            onClick={() => toggleCell(rowIndex, colIndex)}
            style={{
              width: 30,
              height: 30,
              border: "1px solid black",
              backgroundColor: cell === "1" ? "blue" : "white",
            }}
          ></div>
        ))}
      </div>
    ));
  };



   return (
   <div>
     <h1> Number of Islands </h1>

     {/* Input for grid size */}
     <div>
        <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Math.max(1, +e.target.value))}
            placeholder="Rows"
        />

        <input
            type="number"
            value={cols}
            onChange={(e) => setCols(Math.max(1, +e.target.value))}
            placeholder="Columns"
        />

        <button onClick={createGrid}>Generate Grid</button>
        <div>{renderGrid()}</div>
      </div>

    <button onClick={handleCountIslands} style={{ marginTop: "10px", padding: "10px" }}>
      Count Islands
    </button>
    <h2>Islands Found: {islandCount}</h2>
   </div>

   )
}

export default App




