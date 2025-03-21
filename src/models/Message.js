// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, '请输入弹幕内容'],
    maxlength: [100, '弹幕内容不能超过100个字符']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { collection: 'message' });  // 指定集合名为message

// 检查模型是否已定义，防止热重载时报错
export default mongoose.models.Message || mongoose.model('Message', MessageSchema);