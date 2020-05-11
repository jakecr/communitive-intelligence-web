import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as CommunicationProvider } from './context/CommunicationContext'
import { Provider as PrepProvider } from './context/PrepContext'
import AppRouter from './routers/AppRouter'

const jsx = (
    <PrepProvider>
        <CommunicationProvider>
            <AppRouter />
        </CommunicationProvider>
    </PrepProvider>
)

ReactDOM.render(jsx, document.getElementById('app'))