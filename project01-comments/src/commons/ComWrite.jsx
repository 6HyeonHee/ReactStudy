import React from 'react';

function ComWrite({ writeAction }) {
  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          let writer = event.target.writer.value;
          let comment = event.target.comment.value;

          writeAction(writer, comment);

          // 폼 초기화
          event.target.writer.value = '';
          event.target.comment.value = '';
        }}
      >
        <table id="boardTable">
          <tbody>
            <tr>
              <td id="writer">
                Writer : <input type="text" name="writer" required />
              </td>
              <td rowSpan="2">
                <input type="submit" value="댓글작성" id="btn" />
              </td>
            </tr>
            <tr>
              <td>
                <textarea name="comment" required></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </>
  );
}

export default ComWrite;
