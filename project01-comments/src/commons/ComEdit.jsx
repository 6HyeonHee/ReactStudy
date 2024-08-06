import React, { useState } from 'react';

function ComEdit({ commentData, onUpdate, editBack }) {
  const [writer, setWriter] = useState(commentData.writer);
  const [comment, setComment] = useState(commentData.comment);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate({
      ...commentData,
      writer,
      comment,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <table id="boardTable">
          <tbody>
            <tr>
              <td id="writer">
                Writer:
                <input
                  type="text"
                  name="writer"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                />
                <button type="button" onClick={() => {}}>
                  수정 취소
                </button>
              </td>
              <td rowSpan="2">
                <input type="submit" value="댓글수정" id="btn" />
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

export default ComEdit;
