import React, { useState } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button } from "semantic-ui-react";
import { MESSAGE_QUERY, POST_REPLY_MUTATION } from "../../queries";

const ReplyForm = props => {
  const { messageId, toggleForm } = props;
  const [text, setText] = useState('');

  const _updateStoreAfterAddingReply = (store, newReply, messageId) => {
    const orderBy = 'createdAt_DESC';
    const data = store.readQuery({
      query: MESSAGE_QUERY,
      variables: {
        orderBy
      }
    });

    const message = data.messages.messagesList.find(
      item => item.id === messageId
    );
    message.replies.push(newReply);
    store.writeQuery({ query: MESSAGE_QUERY, data });
    toggleForm(false);
  }

  return (
    <Mutation
      mutation={POST_REPLY_MUTATION}
      variables={{ messageId, text }}
      update={(store, { data: { postReply } }) => {
        _updateStoreAfterAddingReply(store, postReply, messageId)
      }}
    >
      {postMutation => (
        <Form onSubmit={postMutation}>
          <Form.TextArea
            value={text}
            autoFocus
            onChange={e => setText(e.target.value)}
          />
          <Button type="submit">Submit</Button>
          <Button
            onClick={() => toggleForm(false)}
            type="button"
          >
            Cancel
          </Button>
        </Form>
      )}      
    </Mutation>
  )
}

export default ReplyForm;