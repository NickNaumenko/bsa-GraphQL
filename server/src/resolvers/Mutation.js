function postMessage(parent, args, context) {
  return context.prisma.createMessage({
    text: args.text
  });
}

async function postReply(parent, args, context) {
  const messageExists = await context.prisma.$exists.message({
    id: args.messageId
  });

  if (!messageExists) {
    throw new Error(`Message with ID ${args.messageId} does not exists`);
  }

  return context.prisma.createReply({
    text: args.text,
    message: { connect: { id: args.messageId } }
  });
}

async function addLike(parent, args, context) {
  const message = await context.prisma.message({
    id: args.messageId
  });
  let data;

  if (!message) {
    throw new Error(`Message with ID ${args.messageId} does not exists`);
  }

  if (args.value === true) {
    likes = message.likes;
    likes++;
    data = { likes };
  } else if (args.value === false) {
    dislikes = message.dislikes;
    dislikes++;
    data = { dislikes };
  }

  return context.prisma.updateMessage(
    {
      data,
      where: {
        id: args.messageId
      }
    }
  );
}

module.exports = {
  postMessage,
  postReply,
  addLike
}