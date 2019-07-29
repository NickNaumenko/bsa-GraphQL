async function messages(parent, args, context) {
  const where = args.filter ? {
    text_contains: args.filter
  } : {};

  const messagesList = await context.prisma.messages({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
    after: args.after
  });

  const lastMessage = messagesList[messagesList.length - 1];
  const [cursor, hasMore] = lastMessage
    ? [lastMessage.id, true]
    : ["", false];

  return {
    messagesList,
    cursor,
    hasMore
  };
}

module.exports = {
  messages
};