const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    raw: {
        type: String,
        required: true,
        trim: true
    },
    upVotes: {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    }
})

const conversationSchema = new mongoose.Schema({
    messages: [ messageSchema ]
})

const Conversation = mongoose.model('Conversation', conversationSchema)

module.exports = Conversation