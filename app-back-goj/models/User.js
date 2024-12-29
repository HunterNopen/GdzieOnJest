const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, maxlength: 64, required: true },
    userSurname: { type: String, maxlength: 128, required: true },
    preferences: { type: mongoose.Schema.Types.ObjectId, ref: 'Preferences' },
    searchHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'HistorySearch' }],
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],
    role: { type: String, maxlength: 64 },
    lastModified: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('User', userSchema, "User");
  