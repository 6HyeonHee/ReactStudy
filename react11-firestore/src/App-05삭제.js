import './App.css';
import { firestore } from './firestoreConfig';
import {
  doc,
  deleteDoc,
  getDoc,
  collection,
  getDocs,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

function App() {
  // State 생성
  const [showData, setShowData] = useState([]);

  // 렌더링이 완료된 후 members 컬렉션의 도큐먼트를 가져온다.
  useEffect(() => {
    const getCollection = async () => {
      let trArray = [];

      const querySnapshot = await getDocs(collection(firestore, 'members'));

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        let memberInfo = doc.data();
        // console.log("파싱", doc.id, memberInfo.pass, memberInfo.name, memberInfo.regidate);

        trArray.push(
          <option key={doc.id} value={doc.id}>
            {memberInfo.name}
          </option>
        );
      });
      return trArray;
    };

    // 함수를 호출하여 반환된 값으로 State를 변경한다.
    getCollection().then((result) => {
      console.log('result', result);

      setShowData(result);
    });
  }, []);

  // <input> 태그 설정을 위한 State 생성
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [name, setName] = useState('');

  return (
    <div className="App">
      <h2>Firebase - Firestore 연동 App</h2>
      <h3>개별 조회 및 삭제하기</h3>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          // 아이디가 채워졌는지 확인
          let id = event.target.id.value;
          console.log('삭제', id);
          if (id === '') {
            alert('사용자를 먼저 선택해주세요');
            return;
          }

          // 선택한 아이디를 통해 members 컬렉션에서 삭제한다.
          await deleteDoc(doc(firestore, 'members', event.target.id.value));

          setId('');
          setPass('');
          setName('');
        }}
      >
        <div class="input-group" id="myForm">
          {/* <select>에서 항목을 선택하면 해당 도큐먼트를 가져온 후
          <input>에 내용을 채워준다. */}
          <select
            className="form-control"
            onChange={async (e) => {
              let user_id = e.target.value;
              // console.log('선택', user_id);

              // 컬렉션명과 아이디(도큐먼트)를 통해 값을 얻어온다.
              const docRef = doc(firestore, 'members', user_id);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                // console.log('Document data:', docSnap.data());
                let callData = docSnap.data();

                setId(user_id);
                setPass(callData.pass);
                setName(callData.name);
              } else {
                console.log('No such document!');
              }
            }}
          >
            <option value="">선택하세요</option>
            {showData}
          </select>
          <button type="submit" className="btn btn-danger">
            삭제
          </button>
        </div>
        <table className="table table-bordered">
          <tr>
            <td>컬렉션(테이블)</td>
            <td>
              <input
                type="text"
                name="collection"
                value="members"
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>아이디(변경불가)</td>
            <td>
              <input
                type="text"
                name="id"
                value={id}
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input
                type="text"
                name="pass"
                value={pass}
                className="form-control"
              />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input
                type="text"
                name="name"
                value={name}
                className="form-control"
              />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default App;
