import React, { Component } from 'react'

import '../../styles/circles.css'

export default function Pin(props){
    return(
        <div className={`${props.color} + circle`}></div>
    )
}