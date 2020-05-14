import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ColorsPage from '../screens/ColorsPage'
import HomePage from '../screens/HomePage'
import PrivacyPolicyPage from '../screens/PrivacyPolicyPage'
import NotFoundPage from '../screens/NotFoundPage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/colors' component={ColorsPage} exact={true} />
                <Route path='/privacy-policy' component={PrivacyPolicyPage} exact={true} />
                <Route path='/' component={HomePage} exact={true} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter