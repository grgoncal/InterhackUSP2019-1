import React, { Component, Fragment } from "react"
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import Home from "./components/common/Home"
import Navbar from "./components/common/Navbar"

class Routes extends Component {
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Fragment>
                        <Navbar/>
                        <Route path='/' component={Home}/>
                    </Fragment>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Routes;