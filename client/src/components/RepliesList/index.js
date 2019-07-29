import React from 'react';
import { Comment } from "semantic-ui-react";
import Reply from '../Reply';

const RepliesList = props => {
  const { replies } = props;
  return (
    <Comment.Group size="large">
      {replies.map(reply => <Reply key={reply.id} {...reply}/>)}
    </Comment.Group>
  )
}

export default RepliesList;