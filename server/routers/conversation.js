const express = require('express')
const Conversation = require('../models/Conversation')
const router = new express.Router()

router.post('/down-vote', async (req, res) => {
    const { text } = req.body

    try {
        const conversations = await Conversation.find( {} )
        
        let lastResponseRaw = text.replace(/\?|\,|\.|\s|\'|\!|\(|\)|\&|\/|\:|\;|\"/gi, '').toLowerCase().trim()

        for(let i = 0; i < conversations.length; i++) {
            for(let j = 0; j < conversations[i].messages.length; j++) {
                if(conversations[i].messages[j].raw == lastResponseRaw) {
                    conversations[i].messages[j].downVotes++

                    if(conversations[i].messages[j].downVotes > conversations[i].messages[j].upVotes && conversations[i].messages[j].downVotes > 1) {
                        await conversations[i].remove()
                    }else {
                        await conversations[i].save()
                    }
                    break
                }
            }
        }
        
        res.send()
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/get-response', async (req, res) => {
    const { conversation } = req.body

    try {
        const conversations = await Conversation.find( {} )
        
        let lastResponseRaw = conversation[conversation.length - 1].text.replace(/\?|\,|\.|\s|\'|\!|\(|\)|\&|\/|\:|\;|\"/gi, '').toLowerCase().trim()

        for(let i = 0; i < conversations.length; i++) {
            for(let j = 0; j < conversations[i].messages.length; j++) {
                if(conversations[i].messages[j].raw == lastResponseRaw && conversations[i].messages.length >= j + 2) {
                    if(conversations[i].messages[j + 1].text == 'I don\'t know how to respond to that. What do you think I should say?' && conversations[i].messages.length >= j + 3) {
                        return res.send({ botResponse: conversations[i].messages[j + 2].text })
                    }else{
                        return res.send({ botResponse: conversations[i].messages[j + 1].text })
                    }
                }
            }
        }

        res.send({ botResponse: 'I don\'t know how to respond to that. What do you think I should say?' })
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/remove-response', async (req, res) => {
    const { text } = req.body

    try {
        const conversations = await Conversation.find( {} )
        
        let lastResponseRaw = text.replace(/\?|\,|\.|\s|\'|\!|\(|\)|\&|\/|\:|\;|\"/gi, '').toLowerCase().trim()

        for(let i = 0; i < conversations.length; i++) {
            for(let j = 0; j < conversations[i].messages.length; j++) {
                if(conversations[i].messages[j].raw == lastResponseRaw) {
                    await conversations[i].remove()
                    break
                }
            }
        }

        res.send()
    }catch(err) {
        res.status(500).send()
    }
})

router.post('/save-conversation', async (req, res) => {
    const { conversation } = req.body

    try {
        let compiledConversation = conversation.map((item) => {
            return ({
                username: item.username,
                text: item.text,
                raw: item.text.replace(/\?|\,|\.|\s|\'|\!|\(|\)|\&|\/|\:|\;|\"/gi, '').toLowerCase().trim()
            })
        })

        const newConversation = new Conversation({ messages: compiledConversation })
        await newConversation.save()
        
        const conversations = await Conversation.find( {} )

        for(let i = 0; i < conversation.length; i++) {
            if(conversation[i].text !== 'I don\'t know how to respond to that. What do you think I should say?') {
                for(let j = 0; j < conversations.length; j++) {
                    for(let k = 0; k < conversations[j].messages.length; k++) {
                        if(compiledConversation[i].raw == conversations[j].messages[k].raw) {
                            conversations[j].messages[k].upVotes++
                            await conversations[j].save()
                            j = conversations.length
                            break
                        }
                    }
                }
            }
        }

        res.send()
    }catch(err) {
        res.status(500).send()
    }
})

module.exports = router