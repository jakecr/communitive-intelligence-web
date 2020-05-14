import createDataContext from './createDataContext'
import communitiveIntelligenceApi from '../api/communitiveIntelligence'

const planReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_ERROR_MESSAGE':
            return { ...state, errorMessage: action.payload }
        case 'CLEAR_ERROR_MESSAGE':
            return { ...state, errorMessage: '' }
        case 'SET_CONVERSATION':
            return { ...state, conversation: action.payload }
        case 'SET_USERNAME':
            return { ...state, username: action.payload }
        default:
            return state
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

const saveUsername = dispatch => ({ username }) => {
    if(username.trim().toLowerCase() == 'bot') {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'No no no! Something is wrong. You are supposed to be talking to Bot!!!' })
    }else {
        if(username.trim().toLowerCase().includes('dodd')) {
            dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Welcome back God Kind Dodd!' })
        }

        dispatch({ type: 'SET_USERNAME', payload: username })
    }
}

const sendMessage = dispatch => async ({ username, message, conversation }) => {
    if(conversation.length > 0 && conversation[conversation.length - 1].username == username) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Please wait for the bot to respond.' })
    }else if(message.replace(/\?|\,|\.|\s|\'|\!|\(|\)|\&|\/|\:|\;|\"/gi, '').toLowerCase().trim() == 'idontknowhowtorespondtothatwhatdoyouthinkishouldsay') {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'NICE TRY LAWWWWL' })
    }else if(message.replace(/\?|\,|\.|\s|\'|\!|\(|\)|\&|\/|\:|\;|\"/gi, '').toLowerCase().trim() == 'nothing') {
        try {
            const response = await communitiveIntelligenceApi.post('/save-conversation', { conversation } )
            const { error } = response.data
            if(error) {
                return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error })
            }else {
                return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Ok, thanks for talking with me!' })
            }
            
            dispatch({ type: 'SET_CONVERSATION', payload: [] })
        }catch(err) {
            dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
        }
    }else {
        let newConversation = [ ...conversation, { username, text: message } ]
        dispatch({ type: 'SET_CONVERSATION', payload: newConversation })
    
        try {
            const response = await communitiveIntelligenceApi.post('/get-response', { conversation: newConversation })
            const { botResponse, error } = response.data
            if(error) {
                return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
            }else {
                dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
            }

            newConversation.push({ username: 'Bot', text: botResponse })
            dispatch({ type: 'SET_CONVERSATION', payload: newConversation })
        }catch(err) {
            dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
        }
    }
}

const removeResponse = dispatch => async ({ text }) => {
    try {
        const response = await communitiveIntelligenceApi.post('/remove-response', { text } )
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }
        
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'The bot is only repeating someone else\'s response, but it will learn from your feedback. Sorry for the bots error and thank you for reporting it.' })
        dispatch({ type: 'SET_CONVERSATION', payload: [] })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const reportMessage = dispatch => async ({ text }) => {
    try {
        const response = await communitiveIntelligenceApi.post('/down-vote', { text } )
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }
        
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'The bot is only repeating someone else\'s response, but it will learn from your feedback. Sorry for the bots error and thank you for reporting it.' })
        dispatch({ type: 'SET_CONVERSATION', payload: [] })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const saveConversation = dispatch => async ({ conversation }) => {
    try {
        const response = await communitiveIntelligenceApi.post('/save-conversation', { conversation } )
        const { error } = response.data
        if(error) {
            return dispatch({ type: 'ADD_ERROR_MESSAGE', payload: error})
        }else {
            dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
        }
        
        dispatch({ type: 'SET_CONVERSATION', payload: [] })
    }catch(err) {
        dispatch({ type: 'ADD_ERROR_MESSAGE', payload: 'Failed to make request, try again later.' })
    }
}

const newConversation = dispatch => () => {
    dispatch({ type: 'SET_CONVERSATION', payload: [] })
    dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

export const { Provider, Context } = createDataContext(
    planReducer,
    { clearErrorMessage, newConversation, removeResponse, reportMessage, saveConversation, saveUsername, sendMessage },
    { errorMessage: '', username: null, conversation: [] }
)