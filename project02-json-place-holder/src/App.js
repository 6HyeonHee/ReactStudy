import { useEffect, useState } from 'react';
import './App.css';

function Myphoto(props) {
  let [myJSON, setMyJSON] = useState([]);

  useEffect(function () {
    fetch('https://jsonplaceholder.typicode.com/albums/1/photos')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setMyJSON(json);
      });
    return () => {
      console.log('#Life', 'useEffect 실행 ==> 컴포넌트 언마운트');
    };
  }, []);

  // 빈 배열 생성
  let trTag = [];
  // 데이터 개수만큼 tr태그 반복
  for (let i = 0; i < myJSON.length; i++) {
    let data = myJSON[i];
    console.log(data);

    trTag.push(
      <tr key={data.id}>
        <td className="photo">
          <img src={data.thumbnailUrl} alt={data.title} />
        </td>
        <td className="titleName">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              props.onProfile(data);
            }}
          >
            {data.title}
          </a>
        </td>
      </tr>
    );
  }
  return (
    <div className="col1">
      <table>
        <thead>
          <tr>
            <th className="row1">photo</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>{trTag}</tbody>
      </table>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>연락처 API 연동하기</h2>
      <div className="grid">
        <Myphoto
          onProfile={(sData) => {
            console.log(sData);
            let info = `
              albumId: ${sData.albumId}
              id: ${sData.id}
              title: ${sData.title}
              url: ${sData.url}
              thumbnailUrl: ${sData.thumbnailUrl}
              `;
            alert(info);
          }}
        ></Myphoto>
        <div className="col2">
          <p>albumId:</p>
          <p>id:</p>
          <p>title:</p>
          <p>url:</p>
          <p>thumbnailUrl:</p>
        </div>
      </div>
    </div>
  );
}

export default App;
