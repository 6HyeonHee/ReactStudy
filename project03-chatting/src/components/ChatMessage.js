import { useSearchParams } from 'react-router-dom';
import '../Chat.css';
import React, { useEffect, useRef, useState } from 'react';
import { child, onValue, push, ref, set } from 'firebase/database';
import { realtime } from '../realtimeConfig';

// 날짜와 시간 포맷 함수
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString(undefined, options);
};

const scrollTop = (chatWindow) => {
  console.log('scrollTop 호출됨');
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

function ChatMessage() {
  // 쿼리스트링으로 전달된 파라미터를 조작할 때 사용하는 라우터 훅
  const [searchParams, setSearchParams] = useSearchParams();
  // 2개의 파라미터를 읽어온다.
  const roomId = searchParams.get('roomId');
  const userId = searchParams.get('userId');
  // 채팅내역이 보여지는 부분의 DOM 참조
  const chatWindow = useRef();
  const timerRef = useRef(0);

  // 채팅 데이터 저장용 State
  const [chatData, setChatData] = useState('');

  // Realtime에 대화내역 저장
  function messageWrite(chatRoom, chatId, ChatMessage) {
    // 고유키 생성
    const newPostKey = push(child(ref(realtime), 'tempValue')).key;
    const timestamp = new Date().toISOString(); // 현재 날짜와 시간을 ISO 문자열 형식으로 저장
    // '방명' 하위에 '고유키'로 구분하여 대화내역을 입력
    set(ref(realtime, chatRoom + '/' + newPostKey), {
      id: chatId,
      message: ChatMessage,
      timestamp: timestamp,
    });
    console.log('입력성공');
  }

  // Realtime 리스너 정의
  const dbRef = ref(realtime, roomId);
  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      clearInterval(timerRef.current);
      timerRef.current = setTimeout(() => {
        scrollTop(chatWindow.current);
      }, 300);
      let showDiv = [];
      snapshot.forEach((childSnapshot) => {
        // const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        const messageDate = formatDate(childData.timestamp);

        // console.log("리스너", childKey, childData.id, userId);
        if (childData.id === userId) {
          // 내가 보낸 메세지는 우측으로 정렬
          showDiv.push(
            <div className="myMsg Msg" style={{ textAlign: 'right' }}>
              <div>{userId}</div>
              {messageDate}
              <div className="chatting chatme">{childData.message}</div>

              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="avatar 1"
                style={{ width: '45px', height: '100%' }}
              />
            </div>
          );
        } else {
          // 상대방이 보낸 메세지는 좌측으로 정렬
          showDiv.push(
            <div className="otherMsg Msg">
              {/* 해당부분을 작성한 아이디로 바꾸고 싶음. */}
              <div>{childData.id}</div>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                alt="avatar 1"
                style={{ width: '45px', height: '100%' }}
              />
              <div className="chatting chatother">{childData.message}</div>
              {messageDate}
            </div>
          );
        }
        // 스크롤바를 제일 아래로 내려줌.
        scrollTop(chatWindow.current);
      });
      // State를 변경해서 대화내역을 새롭게 렌더링 한다.
      setChatData(showDiv);
    });
  }, []);

  return (
    <>
      <div className="App">
        <div className="header">
          <h2 style={{ textAlign: 'center' }}>chatRoom</h2>
          <button
            id="closeBtn"
            onClick={() => {
              window.self.close();
            }}
          ></button>
        </div>
        <div id="chatWindow" ref={chatWindow}>
          {chatData}
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              let chatRoom = e.target.chatRoom.value;
              let chatId = e.target.chatId.value;
              if (chatId === '') {
                alert('대화명을 입력하세요');
                return;
              }
              let message = e.target.message.value;
              if (message === '') {
                alert('메세지를 입력하세요');
                return;
              }
              console.log('submit', chatRoom, chatId, message);
              // 입력한 폼값을 정리해서 Realtime에 입력
              messageWrite(chatRoom, chatId, message);
              // 입력이 완료되면 <input>을 비워준다.
              e.target.message.value = '';
            }}
          >
            <input type="hidden" name="chatRoom" value={roomId} />
            <input type="hidden" name="chatId" value={userId} />
            <input
              type="text"
              name="message"
              placeholder="메세지를 입력하세요"
            />
            <button className="sendBtn" type="submit"></button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
