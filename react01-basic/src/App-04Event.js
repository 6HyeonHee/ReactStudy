import './App.css';

/*
이벤트 처리
: HTML에서는 이벤트 핸들러를 작성할 때 대소문자를 구분하지 않는다.
하지만 React에서는 이벤트명의 첫글자를 반드시 대문자로 기술해야 한다.
또한 이벤트는 자식 컴포넌트가 부모 컴포넌트로 데이터를 전달하는 용도로
사용된다.
*/
function MyBody(props) {
  const liTag1 = [], liTag2 = [];


  for (let i = 0; i < props.propData1.length; i++) {
    console.log(props.propData1[i]);
    liTag1.push(
      <li key = {i}>{props.propData1[i]}</li>
    );
  }

  let keyCnt = 0;
  for (let row of props.propData2) {
    liTag2.push(
      <li key = {keyCnt++}>{row}</li>
     );
  }

  return (
    <ol>
      {/* 첫번째 경고창은 고정된 메세지를 알림창으로 띄워준다.
      props로 전달된 기능을 자식 컴포넌트에서 그대로 사용하는 형식이다.
      아래 링크를 클릭하는 경우 알림창이 뜨고, 닫으면 화면이 새로고침 된다.*/}
      <li><a href="/" onClick={() => {props.onMyAlert1();}}>프론트앤드</a></li>
      <ul>
        {liTag1}
      </ul>
      <li>
        {/* 이벤트 객체를 통해 새로고침 되지 않도록 요청을 중단시킨다. 
        React는 비동기 방식으로 화면을 전환하므로 화면이 새로고침되면 안된다. */}
        <a href="/" onClick={(e) => {
        // click 이벤트를 차단한다.
        e.preventDefault();
        props.onMyAlert2('백엔드');}}>
          백엔드
        </a>
      </li>
      <ul>
        {liTag2}
      </ul>
    </ol>
  );
}

function App() {
  const myData1 = ['HTML5', 'CSS', 'JavaScript', 'jQuery'];
  const myData2 = ['JAVA', 'Oracle', 'JSP', 'Spring Boot'];

  return (
    <div className="App">
      <h2>React - Event 전달하기</h2>
      <MyBody propData1 = {myData1} propData2 = {myData2}
        onMyAlert1 = {function () {
          alert('알림창을 띄웁니다.');
        }}
        onMyAlert2 = {function (msg) {
          alert(msg);
        }}>
      </MyBody>
    </div>
  );
}

export default App;
