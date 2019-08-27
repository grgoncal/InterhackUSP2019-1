import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import GoogleMapReact from 'google-map-react';

import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core';

import Pin from './pins/Pin'

const styles = theme => {}

class Map extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Grid style={{height:'90vh', width:'100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDGEWNVLm8TWwDNAUBCUeN2Ppm8MssonJA'}}
                    defaultCenter={{lat: -22.0072, lng: -47.8948}}
                    defaultZoom={18.5}>
                    <Pin color='yellow' lat={-22.0076} lng={-47.894966}/>
                    <Pin color='yellow' lat={-22.007458} lng={-47.895368}/>
                    <Pin color='red' lat={-22.00694} lng={-47.8954}/>
                    <Pin color='green' lat={-22.006993} lng={-47.894995}/>
                    <Pin color='red' lat={-22.007596} lng={-47.894320}/>
                    <Pin color='yellow' lat={-22.00725} lng={-47.8943}/>
                </GoogleMapReact>
            </Grid>
        )
    }
}   

function mapStateToProps(state){
    return
}

function mapDispatchToProps(dispatch){
    return
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Map)));
