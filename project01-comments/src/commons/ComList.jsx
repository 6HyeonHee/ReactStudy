import React from 'react';
import '../App.css';

function ComList({ myData, onEdit, onDelete }) {
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
                <button type="button" onClick={() => onDelete(com.no)}>
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
