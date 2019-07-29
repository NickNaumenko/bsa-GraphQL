import React from 'react';
import { Query } from "react-apollo";
import { Loader, Comment } from "semantic-ui-react";
import Message from '../Message';
import {
  NEW_MESSAGE_SUBSCRIPTION,
  MESSAGE_QUERY,
  UPDATE_MESSAGE_SUBSCRIPTION,
  NEW_REPLY_SUBSCRIPTION
} from '../../queries';

const MessagesList = props => {
  const { orderBy, filter } = props;

  const _subscribeToNewMessages = subscribeToMore => {
    subscribeToMore({
      document: NEW_MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { newMessage } = subscriptionData.data;
        const exists = prev.messages.messagesList.find(({ id }) => id === newMessage.id);
        if (exists) return prev;

        return {
          ...prev, messages: {
            messagesList: [newMessage, ...prev.messages.messagesList],
            count: prev.messages.messagesList.length + 1,
            __typename: prev.messages.__typename
          }
        };
      }
    });
  };

  const _subscribeToUpdateMessage = subscribeToMore => {
    subscribeToMore({
      document: UPDATE_MESSAGE_SUBSCRIPTION
    });
  };

  const _subscribeToNewReply = subscribeToMore => {
    subscribeToMore({
      document: NEW_REPLY_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { newReply } = subscriptionData.data;

        const message = prev.messages.messagesList.find(
          item => item.id === newReply.message.id
        );
        const exists = message.replies.find(({ id }) => id === newReply.id);
        if (exists) return prev;

        message.replies.push(newReply);

        return {
          ...prev
        }
      }
    });
  }

  return (
    <Query query={MESSAGE_QUERY} variables={{ orderBy, filter }}>
      {({ loading, error, data, subscribeToMore }) => {
        if (loading) return <Loader active inline='centered' />;
        if (error) return <div>Fetch error</div>;
        _subscribeToNewMessages(subscribeToMore);
        _subscribeToUpdateMessage(subscribeToMore);
        _subscribeToNewReply(subscribeToMore);

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