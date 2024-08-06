import './App.css';
import { useState } from 'react';

import Board from './commons/Board';
import ComList from './commons/ComList';
import ComWrite from './commons/ComWrite';
import ComEdit from './commons/ComEdit';

function App() {
  const [myData, setMyData] = useState([
    {
      no: 1,
      comment: '오늘은 React공부하는날',
      writer: '낙짜쌤',
      date: '2023-01-01',
    },
    {
      no: 2,
      comment: '어제는 Javascript공부해씸',
      writer: '유겸이',
      date: '2023-03-03',
    },
    {
      no: 3,
      comment: '내일은 Project해야징',
      writer: '개똥이',
      date: '2023-05-05',
    },
  ]);

  const [editingComment, setEditingComment] = useState(null);

  // 댓글 작성
  const WriteActionProcess = (writer, comment) => {
    const newComment = {
      no: myData.length + 1,
      comment: comment,
      writer: writer,
      date: new Date().toISOString().split('T')[0],
    };

    setMyData([...myData, newComment]);
  };

  // 댓글 삭제
  const DeleteActionProcess = (commentNo) => {
    setMyData(myData.filter((comment) => comment.no !== commentNo));
  };

  // 댓글 수정
  const EditActionProcess = (updatedComment) => {
    setMyData(
      myData.map((comment) =>
        comment.no === updatedComment.no ? updatedComment : comment
      )
    );
    setEditingComment(null); // 수정 완료 후 폼 숨기기
  };

  const EditBackProcess = () => {
    setEditingComment(null); // 수정 취소 후 폼 숨기기
  };

  return (
    <div className="App">
      <Board />
      <ComList
        myData={myData}
        onDelete={DeleteActionProcess}
        onEdit={(comment) => setEditingComment(comment)}
      />
      {editingComment && (
        <ComEdit
          commentData={editingComment}
          onUpdate={EditActionProcess}
          editBack={EditBackProcess}
        />
      )}
      <ComWrite writeAction={WriteActionProcess} />
    </div>
  );
}

export default App;
