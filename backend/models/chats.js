const mongoose=require('mongoose');

const ChatSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    message: String,
    fileUrl: String,
    status: { type: String, default: "sent" },
    timestamp: { type: Date, default: Date.now },
  });
  const Chat = mongoose.model("Chat", ChatSchema);