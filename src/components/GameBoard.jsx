

export default function GameBoard({ onSelectSquare, board }) {

    
//     const [gameBoard, setGameBoard] = useState(initialGameBoard);

//     function handleSelectSquare(rowIndex, cellIndex) {
//        setGameBoard(prevGameBoard => { 
//         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
//         updatedGameBoard[rowIndex][cellIndex] = playerSymbol;
//         return updatedGameBoard;
//     })
//     onSelectSquare();
// };

  return (
    <ol id="game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                {row.map((activePlayerSymbol, cellIndex) => (
                    <li key={cellIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, cellIndex)} disabled={activePlayerSymbol !== null}>
                            {activePlayerSymbol}
                        </button>
                    </li>
                ))}
                </ol>
            </li>
        ))}
    </ol>
  )
}