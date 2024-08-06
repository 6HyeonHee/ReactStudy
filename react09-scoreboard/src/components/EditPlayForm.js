import React, { useState } from 'react';

// 함수 선언과 동시에 export 한다.
export default function AddPlayerForm(props) {
  const [playerName, setPlayName] = useState(props.playerName);
  return (
    <>
      <form
        className="form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();

          let playerName = e.target.player.value;
          props.onEditPlayer(props.playerIdx, playerName);
          props.setShowEdit(false);
        }}
      >
        <input
          type="text"
          name="player"
          minLength="10"
          className="input"
          placeholder="이름을 추가하세요"
          required
          onChange={(e) => {
            setPlayName(e.target.value);
          }}
          value={playerName}
        />
        <input type="submit" className="input" value="Edit" />
      </form>
    </>
  );
}
