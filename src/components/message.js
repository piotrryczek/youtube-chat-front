import React, { memo } from 'react';
import classnames from 'classnames';
import axios from 'axios';

const Message = (props) => {
  const {
    _id: messageId,
    content,
    authorName,
    isOwner,
    isSponsor,
    isModerator,
    isQuestion,
    // canEdit,
  } = props;

  const messageClasses = classnames('message', {
    owner: isOwner,
    sponsor: isSponsor,
    moderator: isModerator,
    question: isQuestion,
  });

  const unsetQuestion = async () => {
    axios.patch(`http://localhost:8000/messages/${messageId}/unsetQuestion`);
  }

  const setQuestion = async () => {
    axios.patch(`http://localhost:8000/messages/${messageId}/setQuestion`);
  }

  return (
    <div className={messageClasses}>
      <p>{authorName}: {content}</p>
      {isQuestion
        ? (<button onClick={unsetQuestion} type="button">Cofnij Pytanie</button>)
        : (<button onClick={setQuestion} type="button">Ustaw Pytanie</button>)}
    </div>
  );
}

export default memo(Message);
