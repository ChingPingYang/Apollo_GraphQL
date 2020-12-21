const User = require("../models/User");
const Message = require("../models/Message");
const { AuthenticationError, UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getMessages: async (_, args, context) => {
      if (!context.token.id)
        throw new AuthenticationError(context.token.message);
      const { from } = args;
      try {
        const thePerson = await User.findById(from);
        if (!thePerson)
          throw new UserInputError("No conversation with this person.");

        // Find messages that matches "from" && "to"
        const twoPeopleID = [thePerson._id, context.token.id];
        const messages = await Message.find({
          from: { $in: twoPeopleID },
          to: { $in: twoPeopleID },
        }).sort({ createdAt: "asc" });
        return messages;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  Mutation: {
    sendMessage: async (parent, args, context) => {
      if (!context.token.id) {
        throw new AuthenticationError(context.token.message);
      }
      const { content, to } = args;
      // Check if content is empty
      if (content.trim() === "") throw new UserInputError("Content is empty");
      try {
        // Check if the recipient exists
        const recipient = await User.findById(to);
        if (!recipient) {
          throw new UserInputError(
            "The recipient to this message does not exist"
          );
        } else if (recipient.id === context.token.id) {
          throw new UserInputError("Can't send message to yourself.");
        }

        const message = new Message({
          content,
          from: context.token.id,
          to,
        });
        await message.save();
        return message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
