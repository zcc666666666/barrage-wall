// models/Danmaku.js
import mongoose from 'mongoose';

const DanmakuSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, '请输入弹幕内容'],
    maxlength: [100, '弹幕内容不能超过100个字符']
  },
  color: {
    type: String,
    default: '#ffffff'
  },
  position: {
    type: Number,
    default: () => Math.floor(Math.random() * 80) // 随机位置
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 检查模型是否已定义，防止热重载时报错
export default mongoose.models.Danmaku || mongoose.model('Danmaku', DanmakuSchema);