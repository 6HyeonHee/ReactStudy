import './App.css';
import { useState, useEffect } from 'react';

// Box컴포넌트 : Props를 통해 <div>의 스타일을 전달받음
const Box = ({ createBoxStyle }) => {
  // State : 초기값으로 빈 객체를 설정
  const [style, setStyle] = useState({});

  /*
  Props를 통해 전달받은 createBoxStyle이 변경될때마다 호출되도록 정의함.
  */
  useEffect(() => {
    console.log('박스 키우기');
    // 호출될떄마다 State를 변경한다.
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  return <div style={style}></div>;
};

function App() {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = () => {
    return {
      backgroundColor: 'pink',
      width: `${size}px`,
      height: `${size}px`,
    };
  };
  return (
    <div
      className="App"
      style={{
        backgroundColor: isDark ? 'black' : 'white',
      }}
    >
      <h2>useCallback</h2>
      <input
        type="number"
        value={size}
        step={5}
        onChange={(e) => setSize(e.target.value)}
      />
      <button onClick={() => setIsDark(!isDark)}>테마변경</button>
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
}

export default App;
