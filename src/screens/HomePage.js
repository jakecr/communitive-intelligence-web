import React, { useEffect, useContext, useState } from 'react'
import { Context as PrepContext } from '../context/PrepContext'
import { Context as CommunicationContext } from '../context/CommunicationContext'
import { FaRegUser } from 'react-icons/fa'
import { MdSpeakerNotes, MdReport, MdCancel } from 'react-icons/md'
import IconInput from '../components/IconInput'
import Footer from '../components/Footer'
import Header from '../components/Header'

const NotFoundPage = () => {
    const { state, clearErrorMessage, newConversation, removeResponse, reportMessage, saveConversation, saveUsername, sendMessage } = useContext(CommunicationContext)
    const { state: color, setColorScheme } = useContext(PrepContext)
    
    const [ reportingIndex, setReportingIndex ] = useState(null)
    const [ hasAcceptedRules, setHasAcceptedRules ] = useState(false)
    const [ message, setMessage ] = useState('')
    const [ username, setUsername ] = useState('')

    useEffect(() => {
        clearErrorMessage()
        setColorScheme()
    }, [])

    return (
        <div>
            <title>Home - Communitive Intelegence</title>
        
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />
                
                {!state.username 
                ? <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        borderTop: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary, 
                        borderBottom: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary 
                    }}
                >
                    {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                    <form 
                        autoComplete="off" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            saveUsername({ username })
                        }}
                    >
                        <div className='u-center'>
                            <IconInput 
                                Icon={FaRegUser}
                                type='text' 
                                value={username} 
                                name='Username' 
                                autoFocus={true} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>
                        
                        <div className='u-center'>
                            <button 
                                className='button button--tertiary' 
                                style={{ 
                                    backgroundColor: color.tertiary, 
                                    borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                }}
                            >
                                Accept username &rarr;
                            </button>
                        </div>
                    </form>
                </div>
                : !hasAcceptedRules
                ? <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        borderTop: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary, 
                        borderBottom: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary 
                    }}
                >
                    <ol className='u-margin-bottom-small'>
                        <li style={{ color: color.contrast }}>
                            Please don't say anything offensive.
                        </li>
                        
                        <li style={{ color: color.contrast }}>
                            Please don't just type nonsense, because the bot will concider what you say in it's future conversations.
                        </li>
                        
                        <li style={{ color: color.contrast }}>
                            Enjoy :).
                        </li>
                    </ol>

                    <form 
                        autoComplete="off" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            setHasAcceptedRules(true)
                        }}
                    >   
                        <div className='u-center'>
                            <button 
                                className='button button--tertiary' 
                                style={{ 
                                    backgroundColor: color.tertiary, 
                                    borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                }}
                                autoFocus={true} 
                            >
                                Accept rules &rarr;
                            </button>
                        </div>
                    </form>
                </div>
                : <div>
                    <div className='form__container'>
                        <div 
                            className='form u-width-large' 
                            style={{ 
                                backgroundColor: color.secondary, 
                                borderTop: color.isSimple 
                                    ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                    : '2px solid ' + color.tertiary, 
                                borderBottom: color.isSimple 
                                    ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                    : '2px solid ' + color.tertiary
                            }}
                        >
                            {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                            <div className='u-center plan__group plan__group--top'>
                                <form 
                                    autoComplete="off" 
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        sendMessage({ username: state.username, message, conversation: state.conversation })
                                        setMessage('')
                                    }}
                                >
                                    <IconInput
                                        Icon={MdSpeakerNotes}
                                        type='text' 
                                        value={message} 
                                        name='Message' 
                                        onChange={(e) => setMessage(e.target.value)} 
                                    />

                                    <button 
                                        className='button button--tertiary u-margin-left' 
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                    >
                                        Send message
                                    </button>
                                </form>
                            </div>
                            
                            {state.conversation.slice(0).reverse().map((messageItem, messageIndex) => {
                                return (
                                    <div key={messageIndex}>
                                        {messageIndex == reportingIndex
                                        ? <div className='message'>
                                            <div>
                                                <button 
                                                    className='button button--tertiary u-margin-bottom-tiny' 
                                                    style={{ 
                                                        backgroundColor: color.tertiary, 
                                                        borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                                    }}
                                                    onClick={() => {
                                                        removeResponse({ text: messageItem.text })
                                                        setReportingIndex(null)
                                                    }}
                                                >
                                                    This is offensive to me
                                                </button>
                                            
                                                <button 
                                                    className='button button--tertiary' 
                                                    style={{ 
                                                        backgroundColor: color.tertiary, 
                                                        borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                                    }}
                                                    onClick={() => {
                                                        reportMessage({ text: messageItem.text })
                                                        setReportingIndex(null)
                                                    }}
                                                >
                                                    There is a better response
                                                </button>
                                            </div>
                                            
                                            <a 
                                                className='message__options--report'
                                                onClick={() => setReportingIndex(null)}
                                            >
                                                <MdCancel className='u-color-red' style={{ fontSize: '3rem' }}/>
                                            </a>
                                        </div>
                                        : <div className='message'>
                                            <div className='message__info'>
                                                <p 
                                                    className='message__info--text' 
                                                    style={{ color: color.contrast }}
                                                >
                                                    <strong>{messageItem.username}: </strong> {messageItem.text}
                                                </p>
                                            </div>

                                            
                                            {messageItem.username === 'Bot' && messageItem.text !== 'I don\'t know how to respond to that. What do you think I should say?'
                                            && <div className='message__options'>
                                                <a 
                                                    className='message__options--report'
                                                    onClick={() => setReportingIndex(messageIndex)}
                                                >
                                                    <MdReport className='u-color-orange' style={{ fontSize: '3rem' }}/>
                                                </a>
                                            </div>}
                                        </div>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {state.conversation.length > 2
                    && <div className='form__container'>
                        <div 
                            className='form u-width-large' 
                            style={{ 
                                backgroundColor: color.secondary, 
                                borderTop: color.isSimple 
                                    ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                    : '2px solid ' + color.tertiary, 
                                borderBottom: color.isSimple 
                                    ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                    : '2px solid ' + color.tertiary
                            }}
                        >
                            <p style={{ color: color.contrast }}>If you think that the bot could learn from this conversation please click save conversation before you leave!</p>

                            <div className='u-center'>
                                <button 
                                    className='button button--tertiary u-margin-left' 
                                    style={{ 
                                        backgroundColor: color.tertiary, 
                                        borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                    }}
                                    onClick={() => {
                                        saveConversation({ conversation: state.conversation })
                                    }}
                                >
                                    Save conversation
                                </button>

                                <button 
                                    className='button button--tertiary u-margin-left' 
                                    style={{ 
                                        backgroundColor: color.tertiary, 
                                        borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                    }}
                                    onClick={() => {
                                        newConversation()
                                    }}
                                >
                                    New conversation
                                </button>
                            </div>
                        </div>
                    </div>}
                </div>}
            </div>

            <Footer 
                colorPrimary={color.primary}
                colorTertiary={color.tertiary}
                colorContrast={color.contrast}
                theme={color.theme}
            />
        </div>
    )
}

export default NotFoundPage