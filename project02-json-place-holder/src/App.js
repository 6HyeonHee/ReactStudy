import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h2>연락처 API 연동하기</h2>
      <div className="grid">
        <div className="col1">
          <table>
            <thead>
              <th className="row1">photo</th>
              <th>title</th>
            </thead>
            <tbody>
              <tr>
                <td className="photo">내용</td>
                <td className="titleName">내용</td>
              </tr>
              <tr>
                <td className="photo">내용</td>
                <td className="titleName">내용</td>
              </tr>
              <tr>
                <td className="photo">내용</td>
                <td className="titleName">내용</td>
              </tr>
              <tr>
                <td className="photo">내용</td>
                <td className="titleName">내용</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col2">
          <p>albumId</p>
          <p>id</p>
          <p>title</p>
          <p>url</p>
          <p>thumbnailUrl</p>
        </div>
      </div>
    </div>
  );
}

export default App;
