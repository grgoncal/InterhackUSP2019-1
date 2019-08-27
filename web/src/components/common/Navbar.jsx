import React, { Component, Fragment } from 'react'  
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import firebase from '../../firebase'

import '../../styles/navbar.css'
import { withStyles } from '@material-ui/core/styles'
import { Grid, AppBar, Typography, Avatar, Badge, Snackbar, Button, Dialog } from '@material-ui/core';

const MyBadge = withStyles(theme =>({
    badge: {
        top: '25%',
        right: '25%',
        backgroundColor: '#fcb421'
    }
}))(Badge)


class Navbar extends Component{
    constructor(props){
        super(props);
        this.ref = firebase.firestore().collection('alerts').where('timestamp', '>', new Date().getTime());
        this.unsubscribe = null;
        this.state = {
            alerts: [],
            message: '',
            newUpdate: false
        };
    }

    handleSnackBarClose = () => {
        this.setState({newUpdate: false})
    }

    onCollectionUpdate = (querySnapshot) => {
        const alerts = [];
        querySnapshot.forEach((doc) => {
            const { material, owner, patrimony } = doc.data();
            console.log(doc.data());
            alerts.push({
                key: doc.id,
                doc,
                owner,
                material,
                patrimony
            });
        })

        this.setState({
          alerts,
        }, () => (this.checkforUpdates()));

    }

    checkforUpdates = () => {
        if(this.state.alerts.length > 0){
            this.setState({newUpdate: true})
        }
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }


    render(){
        const { classes } = this.props;
        return(
            <Fragment>
                <AppBar className='navbar' position='static'>
                    <Grid container alignItems='center' className='content' justify='space-between'>
                        <Grid item>
                        <Typography className='title'>
                            Patr<span style={{color:'#fcb421'}}>USP</span>
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Avatar style={{backgroundColor:'#fcb421'}}>G</Avatar>
                        </Grid>
                    </Grid>
                </AppBar>
                <Dialog
                    open={this.state.newUpdate}
                    onClose={this.handleSnackBarClose}>
                    {this.state.alerts[this.state.alerts.length-1] !== undefined ?
                    <div>
                        Atenção {this.state.alerts[this.state.alerts.length-1].owner}!
                        <p>O item <span style={{color:'red'}}>{this.state.alerts[this.state.alerts.length-1].material}</span> deixou o prédio.</p>
                    </div>
                    :
                    null}
                </Dialog>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return  
}

function mapDispatchToProps(dispatch) {
    return
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
