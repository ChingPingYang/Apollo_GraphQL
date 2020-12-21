const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    content: {
      type: String,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("messages", MessageSchema);

module.exports = Message;
