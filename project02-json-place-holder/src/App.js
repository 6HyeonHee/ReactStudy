import { useEffect, useState } from 'react';
import './App.css';

function Myphoto(props) {
  let [myPhoto, setMyPhoto] = useState([]);
  let [myPage, setMyPage] = useState(1);

  useEffect(
    function () {
      fetch('https://jsonplaceholder.typicode.com/albums/' + myPage + '/photos')
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          setMyPhoto(json);
        });
      return () => {
        console.log('#Life', 'LifeGood=>4.useEffect실행2');
      };
    },
    [myPage]
  );

  const PageChange = (event) => {
    setMyPage(event.target.value);
  };

  // 빈 배열 생성
  let trTag = [];
  // 데이터 개수만큼 tr태그 반복
  for (let i = 0; i < myPhoto.length; i++) {
    let data = myPhoto[i];

    trTag.push(
      <tr key={data.id}>
        <td className="photo">
          <img src={data.thumbnailUrl} alt={data.title} />
        </td>
        <td className="titleName">
          <a
            href="/"
            data-id={data.id}
            onClick={(e) => {
              e.preventDefault();
              props.myLinkClick(e.target.dataset.id);
            }}
          >
            {data.title}
          </a>
        </td>
      </tr>
    );
  }
  console.log('#Life', 'LifeGood=>2.return실행(rednder와 동일)');
  return (
    <div id="contactList">
      <div>
        <label htmlFor="pageSelect">Select Page: </label>
        <select id="pageSelect" value={myPage} onChange={PageChange}>
          {[...Array(100).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <table border="1">
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

const ContentBody = (props) => {
  return (
    <div id="contactView">
      <h2>{props.myResult.name}</h2>
      <ul>
        <li>albumId : {props.myResult.albumId}</li>
        <li>id : {props.myResult.id}</li>
        <li>title : {props.myResult.title}</li>
        <li>url : {props.myResult.url}</li>
        <li>
          thumbnailUrl :
          <img
            src={props.myResult.thumbnailUrl}
            alt="{props.myResult.thumbnailUrl}"
            className="myImg"
          />
        </li>
      </ul>
    </div>
  );
};

function App() {
  var [myResult, setMyResult] = useState({});
  return (
    <div className="App">
      <h2>연락처 API 연동하기</h2>
      <div className="grid">
        <div className="col1">
          <Myphoto
            myLinkClick={(no) => {
              console.log('클릭', no);
              fetch('https://jsonplaceholder.typicode.com/photos/' + no)
                .then((response) => {
                  return response.json();
                })
                .then((json) => {
                  console.log('결과', json);
                  setMyResult(json);
                });
            }}
          ></Myphoto>
        </div>
        <div className="col2">
          <ContentBody myResult={myResult}></ContentBody>
        </div>
      </div>
    </div>
  );
}

export default App;
