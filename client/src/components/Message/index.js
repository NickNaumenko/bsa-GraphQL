import React, { useState } from 'react';
import { Comment } from "semantic-ui-react";
import ReapliesList from '../RepliesList';
import ReplyForm from '../ReplyForm';
import Actions from '../Actions';

const Message = (props) => {
  const [isFormShown, toggleForm] = useState(false);
  const { id, likes, dislikes, text, replies } = props;


  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{id}</Comment.Author>
        <Comment.Text>{text}</Comment.Text>
        <Actions
          messageId={id}
          likes={likes}
          dislikes={dislikes}
          onReply={() => toggleForm(!isFormShown)}
        />
      </Comment.Content>
      <ReapliesList replies={replies} />
      {isFormShown &&
        <ReplyForm
          messageId={id}
          toggleForm={toggleForm}
        />
      }
    </Comment>
  )
}

export default Message;