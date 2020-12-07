import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

/* COUNTER TWO App */
// import AppCounter from './components/Counter Two/AppCounter'

// Vildy Project
import Vidly from './components/Vidly/VidlyApp'
console.log("SUPERMAN", process.env.REACT_APP_NAME)

ReactDOM.render(
    <BrowserRouter>
        <Vidly />
    </BrowserRouter>, document.getElementById('root'))  