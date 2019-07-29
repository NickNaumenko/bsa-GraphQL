import React, { useState } from 'react';
import { Mutation } from "react-apollo";
import { Form, Button } from "semantic-ui-react";
import { POST_REPLY_MUTATION } from "../../queries";

const ReplyForm = props => {
  const { messageId, toggleForm } = props;
  const [text, setText] = useState('');

  return (
    <Mutation
      mutation={POST_REPLY_MUTATION}
      variables={{ messageId, text }}
      update={(store, { data: { postReply } }) => {
        toggleForm(false);
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