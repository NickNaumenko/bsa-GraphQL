import React, { useState } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button } from "semantic-ui-react";
import { POST_MESSAGE_MUTATION } from '../../queries';

import './style.css';

const AddMessage = props => {
  const [text, setText] = useState('');

  return (
    <div className="add-message container">
      <Mutation
        mutation={POST_MESSAGE_MUTATION}
        variables={{ text }}
        update={(store, { data: { postMessage } }) => {

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
    </div>
  )
}

export default AddMessage;