import React from 'react';
import { Query } from "react-apollo";
import { Loader, Comment } from "semantic-ui-react";
import Message from '../Message';
import { MESSAGE_QUERY } from '../../queries';
import * as subscribe from './subscribe';

const MessagesList = props => {
  const { orderBy, filter } = props;

  return (
    <Query query={MESSAGE_QUERY} variables={{ orderBy, filter }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <Loader active inline='centered' />;
        if (error) return <div>Fetch error</div>;
        subscribe.toNewMessages(subscribeToMore);
        subscribe.toUpdateMessage(subscribeToMore);
        subscribe.toNewReply(subscribeToMore);

        const { messages: { messagesList } } = data;

        return (
          <Comment.Group size="large">
            {messagesList.map(message => {
              return <Message key={message.id} {...message} />
            })}
          </Comment.Group>
        );
      }}
    </Query>
  );
};

export default MessagesList;