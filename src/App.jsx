import { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log'
import GameOver from './components/GameOver'
import { use } from 'react'

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const winningCombinations = [
[{ row: 0, cell: 0 }, { row: 0, cell: 1 }, { row: 0, cell: 2 },],
[{ row: 1, cell: 0 }, { row: 1, cell: 1 }, { row: 1, cell: 2 },],
[{ row: 2, cell: 0 }, { row: 2, cell: 1 }, { row: 2, cell: 2 },],
[{ row: 0, cell: 0 }, { row: 1, cell: 0 }, { row: 2, cell: 0 },],
[{ row: 0, cell: 1 }, { row: 1, cell: 1 }, { row: 2, cell: 1 },],
[{ row: 0, cell: 2 }, { row: 1, cell: 2 }, { row: 2, cell: 2 },],
[{ row: 0, cell: 0 }, { row: 1, cell: 1 }, { row: 2, cell: 2 },],
[{ row: 0, cell: 2 }, { row: 1, cell: 1 }, { row: 2, cell: 0 },],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = 'X';
      if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        activePlayer = 'O';        
      }
  return activePlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];
    for (let turn of gameTurns) {
        const { square, player } = turn;        
        const { row, cell } = square;
        gameBoard[row][cell] = player; 
    }
    return gameBoard;
}

function determineWinner(gameBoard, players) {
  let winner = undefined;

  for (let combination of winningCombinations) {
    let firstSquareSymbol = gameBoard[combination[0].row][combination[0].cell];
    let secondSquareSymbol = gameBoard[combination[1].row][combination[1].cell];
    let thirdSquareSymbol = gameBoard[combination[2].row][combination[2].cell];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
    winner = players[firstSquareSymbol];
  }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = determineWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, cellIndex) {
    setGameTurns(prevGameTurns => {
      const currentPlayer = deriveActivePlayer(prevGameTurns);
      const updatedGameTurns = [{ square: { row: rowIndex, cell: cellIndex }, player: currentPlayer }, ...prevGameTurns];
      return updatedGameTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(playerSymbol, newName) {
    setPlayers(prevPlayers => {
      return { ...prevPlayers, [playerSymbol]: newName }
    })
  }

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
            <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange} />
            <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange} />  
        </ol>
        {(winner || hasDraw) ? <GameOver winner={winner} onRematch={handleRematch} /> : null}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
