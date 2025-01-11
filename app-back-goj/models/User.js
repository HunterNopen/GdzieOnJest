const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: { type: String, maxlength: 64, required: true },
    userSurname: { type: String, maxlength: 128, required: true },
    role: { type: String, maxlength: 64 },
    lastUpdate: { type: Date, default: Date.now },
    preferenceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Preferences' }],
    searchHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'HistorySearch' },
    permissionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],   
  });
  
  module.exports = mongoose.model('User', userSchema, "User");
  