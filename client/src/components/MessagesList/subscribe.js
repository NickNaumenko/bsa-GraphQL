import {
  NEW_MESSAGE_SUBSCRIPTION,
  UPDATE_MESSAGE_SUBSCRIPTION,
  NEW_REPLY_SUBSCRIPTION
} from '../../queries';

export const toNewMessages = subscribeToMore => {
  subscribeToMore({
    document: NEW_MESSAGE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;

      const { newMessage } = subscriptionData.data;
      const exists = prev.messages.messagesList.find(({ id }) => id === newMessage.id);
      if (exists) return prev;
      const [cursor, hasMore] = [prev.messages.cursor, prev.messages.hasMore];

      return {
        ...prev, messages: {
          messagesList: [newMessage, ...prev.messages.messagesList],
          cursor,
          hasMore,
          __typename: prev.messages.__typename
        }
      };
    }
  });
};

export const toUpdateMessage = subscribeToMore => {
  subscribeToMore({
    document: UPDATE_MESSAGE_SUBSCRIPTION
  });
};

export const toNewReply = subscribeToMore => {
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