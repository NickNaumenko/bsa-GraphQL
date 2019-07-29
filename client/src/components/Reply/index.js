import React from 'react';
import { Comment } from "semantic-ui-react";

const Reply = props => {
  const { id, text } = props;

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{id}</Comment.Author>
        <Comment.Text>{text}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default Reply;