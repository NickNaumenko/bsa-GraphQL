import gql from 'graphql-tag';

export const MESSAGE_QUERY = gql`
  query messageQuery(
    $orderBy: MessageOrderByInput
    $filter: String
    $after: ID
    $first: Int
  ) {
    messages(
      orderBy: $orderBy
      filter: $filter
      after: $after
      first: $first
    ) {
      cursor
      hasMore
      messagesList {
        id
        text
        likes
        dislikes
        replies {
          id
          text
        }
      }
    }
  }
`;

export const POST_MESSAGE_MUTATION = gql`
  mutation PostMutation($text: String!) {
    postMessage(text: $text) {
      id
      text
      likes
      dislikes
      replies {
        id
        text
      }
    }
  }
`;

export const ADD_LIKE_MUTATION = gql`
  mutation AddLike($messageId: ID!, $value: Boolean!) {
    addLike(messageId: $messageId, value: $value) {
      id
    }
  }
`;

export const POST_REPLY_MUTATION = gql`
  mutation PostReply($messageId: ID!, $text: String!) {
    postReply(messageId: $messageId, text: $text) {
      id
      text
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    newMessage {
      id
      text
      likes
      dislikes
      replies {
        id
        text
      }
    }
  }
`;

export const UPDATE_MESSAGE_SUBSCRIPTION = gql`
  subscription {
    updatedMessage {
      id
      text
      likes
      dislikes
      replies {
        id
        text
      }
    }
  }
`;

export const NEW_REPLY_SUBSCRIPTION = gql`
  subscription {
    newReply {
      id
      text
      message {
        id
      }
    }
  }
`;