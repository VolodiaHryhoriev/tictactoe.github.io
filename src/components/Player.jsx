import React from 'react'
import { useState } from 'react'

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEdit() {
        setIsEditing(isEditing => !isEditing);
        if (isEditing) {
        onChangeName(symbol, playerName);
        }
    }

  return (
    <li className={isActive ? 'active':undefined}>
        <span>
            {isEditing ? <input type="text" required value={playerName} onChange={(e) => setPlayerName(e.target.value)} className='player' /> : <span className="player-name">{playerName}</span>}
            <span className="player-symbol">{symbol}</span>
        </span>
            <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}