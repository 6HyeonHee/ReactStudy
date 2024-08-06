import React from 'react';
import '../App.css';

function ComList({ myData, onEdit, onDelete, editingComment }) {
  const DeleteAction = (commentNo) => {
    // 삭제 확인 창 표시
    const confirmed = window.confirm('정말로 이 댓글을 삭제하시겠습니까?');

    if (confirmed) {
      // 사용자가 삭제를 확인한 경우 onDelete 호출
      onDelete(commentNo);
    }
  };
  // const EditAction = (comment) => {
  //   if (editingComment && editingComment.no === comment.no) {
  //     // 현재 수정 모드가 활성화된 댓글과 동일한 댓글의 수정 버튼 클릭 시 경고창 표시
  //     window.alert(
  //       '현재 수정 모드가 활성화되어 있습니다. 수정취소를 먼저 눌러주세요'
  //     );
  //     return;
  //   }

  //   onEdit(comment);
  // };

  return (
    <table id="boardTable">
      <tbody>
        {myData.map((com) => (
          <React.Fragment key={com.no}>
            <tr>
              <td>{com.no}</td>
              <td>Writer: {com.writer}</td>
              <td>
                Date: {com.date}
                <button type="button" onClick={() => onEdit(com)}>
                  수정
                </button>
                <button type="button" onClick={() => DeleteAction(com.no)}>
                  삭제
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="subject">
                {com.comment}
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default ComList;
