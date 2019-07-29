import React from 'react';
import { Query } from "react-apollo";
import { Loader, Comment } from "semantic-ui-react";
import Message from '../Message';
import { MESSAGE_QUERY } from '../../queries';
import * as subscribe from './subscribe';
import InfiniteScroll from 'react-infinite-scroller';

import './style.css';

const MessagesList = props => {
  const { orderBy, filter } = props;
  let after, hasMore;
  const first = 5;

  return (
    <Query
      query={MESSAGE_QUERY}
      variables={{ orderBy, filter, after, first }}
    >
      {({ loading, error, data, fetchMore, subscribeToMore }) => {
        if (loading) return <Loader active inline='centered' />;
        if (error) return <div>Fetch error</div>;

        subscribe.toNewMessages(subscribeToMore);
        subscribe.toUpdateMessage(subscribeToMore);
        subscribe.toNewReply(subscribeToMore);

        const { messages } = data;
        const { messages: { messagesList } } = data;
        hasMore = messages.hasMore;

        const loadMore = () => {
          after = messages.cursor;

          fetchMore({
            query: MESSAGE_QUERY,
            variables: { orderBy, filter, after, first },
            updateQuery: (prev, { fetchMoreResult }) => {
              const prevMessages = prev.messages.messagesList;
              const newMessages = fetchMoreResult.messages.messagesList;
              const newCursor = fetchMoreResult.messages.cursor;
              hasMore = fetchMoreResult.messages.hasMore;

              return {
                ...prev, messages: {
                  ...messages,
                  cursor: newCursor,
                  hasMore,
                  messagesList: [...prevMessages, ...newMessages]
                }             
              }
            }
          });
        };

        return (
          <Comment.Group size="large" className="messages-list">
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              useWindow={false}
              loader={<Loader key="loader" active inline='centered'  />}
            >
              {messagesList.map(message => {
                return <Message key={message.id} {...message} />
              })}
            </InfiniteScroll>
          </Comment.Group>
        );
      }}
    </Query>
  );
};

export default MessagesList;