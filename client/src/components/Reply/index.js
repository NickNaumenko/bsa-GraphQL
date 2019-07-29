import React from 'react';
import { Comment, Icon } from "semantic-ui-react";

const Reply = props => {
  const { id, text, likes, dislikes } = props;

  return (
    <Comment>
      <Comment.Content>
        <Comment.Author>{id}</Comment.Author>
        <Comment.Text>{text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action>
            <Icon name="thumbs up" />
            {likes}
          </Comment.Action>
          <Comment.Action>
            <Icon name="thumbs down" />
            {dislikes}
          </Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
  );
};

export default Reply;