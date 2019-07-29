import React from 'react';
import { Mutation } from "react-apollo";
import { ADD_LIKE_MUTATION } from "../../queries";
import { Comment, Icon } from "semantic-ui-react";

const Actions = props => {
  const { messageId, likes, dislikes, onReply } = props;

  return (
    <Mutation
      mutation={ADD_LIKE_MUTATION}
    >
      {likeMutation => (
        <Comment.Actions>
          <Comment.Action
            onClick={e => {
              likeMutation({ variables: {messageId, value: true } });
            }}
          >
            <Icon name="thumbs up" />
            {likes}
          </Comment.Action>
          <Comment.Action
            onClick={e => {
              likeMutation({variables: {messageId,value: false } });
            }}
          >
            <Icon name="thumbs down" />
            {dislikes}
          </Comment.Action>
          <Comment.Action className="reply"
            onClick={onReply}
          >
            Reply
          </Comment.Action>
          </Comment.Actions>
      )}

    </Mutation>
  )
}

export default Actions;