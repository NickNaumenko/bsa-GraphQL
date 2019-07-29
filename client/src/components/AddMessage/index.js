import React, { useState } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button } from "semantic-ui-react";
import { MESSAGE_QUERY, POST_MESSAGE_MUTATION } from '../../queries';

const AddMessage = props => {
  const [text, setText] = useState('');

  const _updateStoreAfterAddingMessage = (store, newMessage) => {
    const orderBy = 'createdAt_DESC';
    const data = store.readQuery({
      query: MESSAGE_QUERY,
      variables: {
        orderBy
      }
    });

    store.writeQuery({
      query: MESSAGE_QUERY,
      data
    });
  };

  return (
    <Mutation
      mutation={POST_MESSAGE_MUTATION}
      variables={{ text }}
      update={(store, { data: { postMessage } }) => {
        _updateStoreAfterAddingMessage(store, postMessage);
      }}
      onCompleted={() => setText('')}
    >
      {messageMutation => (
        <Form onSubmit={messageMutation}>
          <Form.TextArea
            value={text}
            autoFocus
            onChange={e => setText(e.target.value)} />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Mutation>
  )
}

export default AddMessage;