import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { withStyles } from '@material-ui/core/styles'
import { Grid, Paper, List, Button } from '@material-ui/core';

import Map from '../Map'

import '../../styles/place-list.css'
import '../../styles/items.css'

const styles = theme => {}

const itemList = [
    {
        Unidade: '55 - Instituto de Ciências Matemáticas e de Computação',
        Patrimonio: '055.000609',
        Incorporacao: '19/05/2000 - Processo: 99.1.583.55.3',
        Material: '450 - MONITORES DE VÍDEO',
        Local: 'LABES - LABORATÓRIO DE ENGENHARIA DE SOFTWARE',
        Local2: '1 0 laboratório 1-006',
        Verificado: '02/04/2019'
    },
    {
        Unidade: '55 - Instituto de Ciências Matemáticas e de Computação',
        Patrimonio: '055.000305',
        Incorporacao: '10/08/1999 - Processo: 99.1.439.55.0',
        Material: '450 - MONITORES DE VÍDEO',
        Local: 'LABGRAD - LABORATÓRIO DE GRADUAÇÃO DO ICMC',
        Local2: '6 3 laboratório 6-306',
        Verificado: '22/01/2019'
    },
    {
        Unidade: '55 - Instituto de Ciências Matemáticas e de Computação',
        Patrimonio: '055.006882',
        Incorporacao: '03/06/2008 - Processo: 06.1.947.55.2',
        Material: '450 - MONITORES DE VÍDEO',
        Local: 'SCC - DEPTO. DE CIÊNCIAS DE COMPUTAÇÃO',
        Local2: '1 1 laboratório 1-116',
        Verificado: '16/11/2018'
    },
    {
        Unidade: '55 - Instituto de Ciências Matemáticas e de Computação',
        Patrimonio: '055.002096',
        Incorporacao: '10/06/2003 - Processo: 02.1.402.55.2',
        Material: '450 - MONITORES DE VÍDEO',
        Local: 'SCE - DEPARTAMENTO DE COMPUTAÇÃO',
        Local2: '1 0 sala de trabalho 1-000c',
        Verificado: '02/04/2019'
    },
    {
        Unidade: '55 - Instituto de Ciências Matemáticas e de Computação',
        Patrimonio: '055.006578',
        Incorporacao: '17/07/2006 - Processo: 97.1.36.55.0',
        Material: '7935 - MESA PARA ESCRITÓRIO',
        Local: 'SME - DEPTO. DE MATEMÁTICA APLICADA E ESTATÍSTICA',
        Local2: '3 0 depósito 3-035',
        Verificado: '28/04/2019'
    },
    {
        Unidade: '55 - Instituto de Ciências Matemáticas e de Computação',
        Patrimonio: '055.001945',
        Incorporacao: '13/09/2001 - Processo: 01.1.564.55.1',
        Material: '15644 - POLTRONA DIRETOR',
        Local: 'ATAC - ASSISTÊNCIA TÉCNICA ACADÊMICA',
        Local2: '3 0 sala 3-001',
        Verificado: '13/10/2018'
    },
    {
        Unidade: '55 - Instituto de Ciências Matemáticas e de Computação',
        Patrimonio: '055.006083',
        Incorporacao: '26/04/2006 - Processo: 83.1.4990.1.8',
        Material: '9385 - ESTANTE PARA ESCRITÓRIO',
        Local: 'SVAPOPER - SERVIÇO DE APOIO OPERACIONAL',
        Local2: '3 0 depósito 3-035',
        Verificado: '28/04/2019'
    }
]

function Item1(props){
    console.log(props.props.block)
    if(props.props.block === '1' || props.props.block === 0){        
        return(
            <Paper className='item'>
                Patrimônio: <span class='id'>{itemList[0].Patrimonio}</span> | {itemList[0].Material}<br/>
                Local: {itemList[0].Local}<br/>
                Verificado em: {itemList[0].Verificado}
            </Paper>
        )
    }
    return null
}

function Item2(props){
    if(props.props.block === '6' || props.props.block === 0){        
        return(
            <Paper className='item'>
                Patrimônio: <span class='id'>{itemList[1].Patrimonio}</span> | {itemList[1].Material}<br/>
                Local: {itemList[1].Local}<br/>
                Verificado em: {itemList[1].Verificado}
            </Paper>
        )
    }
    return null
}

function Item3(props){
    if(props.props.block === '2' || props.props.block === 0){
        if(props.props.floor === '1' || props.props.floor >= 10){
            return(
                <Paper className='item'>
                    Patrimônio: <span class='id'>{itemList[2].Patrimonio}</span> | {itemList[2].Material}<br/>
                    Local: {itemList[2].Local}<br/>
                    Verificado em: {itemList[2].Verificado}
                </Paper>
            )
        }     
    }
    return null
}

function Item4(props){
    console.log(props.props)
    if(props.props.block === '2' || props.props.block === 0){
        if(props.props.floor === '0' || props.props.floor >= 10){
            return(
                <Paper className='item'>
                    Patrimônio: <span class='id'>{itemList[3].Patrimonio}</span> | {itemList[3].Material}<br/>
                    Local: {itemList[3].Local}<br/>
                    Verificado em: {itemList[3].Verificado}
                </Paper>
            )
        }     
    }
    return null
}

function Item5(props){
    if(props.props.block === '3' || props.props.block === 0){
        return(
            <Paper className='item'>
                Patrimônio: <span class='id'>{itemList[4].Patrimonio}</span> | {itemList[4].Material}<br/>
                Local: {itemList[4].Local}<br/>
                Verificado em: {itemList[4].Verificado}
            </Paper>
        )  
    }
    return null
}

function Item6(props){
    if(props.props.block === '3' || props.props.block === 0){
        return(
            <Paper className='item'>
                Patrimônio: <span class='id'>{itemList[5].Patrimonio}</span> | {itemList[5].Material}<br/>
                Local: {itemList[5].Local}<br/>
                Verificado em: {itemList[5].Verificado}
            </Paper>
        )  
    }
    return null
}

function Item7(props){
    if(props.props.block === '3' || props.props.block === 0){
        return(
            <Paper className='item'>
                Patrimônio: <span class='id'>{itemList[6].Patrimonio}</span> | {itemList[6].Material}<br/>
                Local: {itemList[6].Local}<br/>
                Verificado em: {itemList[6].Verificado}
            </Paper>
        )  
    }
    return null
}

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            selectedInstitute: '',
            block: 0,
            floor: 10
        }
    }

    onInstituteSelect = (event) => {
        if(this.state.selectedInstitute === event.currentTarget.id){
            this.setState({ selectedInstitute: '', block: 0, floor: 10 })
        }
        else{
            this.setState({ selectedInstitute: event.currentTarget.id})
        }
    }

    onBlockSelect = (event) => {
        if(this.state.block === event.currentTarget.id){
            this.setState({block: 0, floor: 10})
        }
        else{
            this.setState({block: event.currentTarget.id})
        }
    }

    onFloorSelect = (event) => {
        if(this.state.floor === event.currentTarget.id){
            this.setState({ block: 0, floor: 10})
        }
        else{
            this.setState({ floor: event.currentTarget.id})
        }
    }

    render(){
        return(
            <Grid container direction>
                <Grid item xs={4} style={{height:'100%', width:'100%'}}>
                    <Map/>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={'background'}>
                        <List style={{maxHeight: '97%', overflowY: 'auto', overflowX: 'hidden', maxWidth: '100%'}}>
                            <Grid container direction='column'>
                                <Button className={'institute'} variant='contained' id='ICMC' onClick={this.onInstituteSelect}>
                                    ICMC
                                </Button>
                                    {this.state.selectedInstitute === 'ICMC' ?
                                        <Grid container direction='column' alignItems='flex-end' spacing={1}>
                                            <Grid item>
                                                <Button className={'block first'} variant='contained' id={1} onClick={this.onBlockSelect}>
                                                    Bloco 1
                                                </Button>
                                            </Grid>
                                            <Grid item>
                                                <Button className={'block'} variant='contained' id={2} onClick={this.onBlockSelect}>
                                                    Bloco 2
                                                </Button>
                                                {this.state.block === '2' ?
                                                    <Grid container direction='column' alignItems='flex-end' spacing={1}>
                                                        <Grid item>
                                                            <Button className={'floor first'} variant='contained' id={0} onClick={this.onFloorSelect}>
                                                                Térreo
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button className={'floor'} variant='contained' id={1} onClick={this.onFloorSelect}>
                                                                1º Andar
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button className={'floor'} variant='contained' id={2} onClick={this.onFloorSelect}>
                                                                2º Andar
                                                            </Button>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button className={'floor'} variant='contained' id={3} onClick={this.onFloorSelect}>
                                                                3º Andar
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                :
                                                    null}
                                            </Grid>
                                            {[3,4,5].map((value, index) => {
                                                return(
                                                    <Grid item>
                                                        <Button className={'block'} variant='contained' id={index+3} onClick={this.onBlockSelect}>
                                                            Bloco {value}
                                                        </Button>
                                                    </Grid>
                                                )
                                            })}
                                            <Grid item>
                                                <Button className={'block last'} variant='contained' id={6} onClick={this.onBlockSelect}>
                                                    Bloco 6
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    :
                                        null}
                                <Button className={'institute'} variant='contained' id='EESC' onClick={this.onInstituteSelect}>
                                    EESC
                                </Button>
                                <Button className={'institute'} variant='contained' id='IAU' onClick={this.onInstituteSelect}>
                                    IAU
                                </Button>
                                <Button className={'institute'} variant='contained' id='IQSC' onClick={this.onInstituteSelect}>
                                    IQSC
                                </Button>
                                <Button className={'institute'} variant='contained' id='IFSC' onClick={this.onInstituteSelect}>
                                    IFSC
                                </Button>
                            </Grid>
                        </List>
                    </Paper>                  
                </Grid>
                <Grid item xs={4}>
                    <Paper className={'items-bg'}>
                        <List style={{maxHeight: '97%', overflowY: 'auto', overflowX: 'hidden', maxWidth: '100%'}}>
                            <Item1 props={this.state}/>
                            <Item2 props={this.state}/>
                            <Item3 props={this.state}/>
                            <Item4 props={this.state}/>
                            <Item5 props={this.state}/>
                            <Item6 props={this.state}/>
                            <Item7 props={this.state}/>
                        </List>                
                    </Paper>
                </Grid>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Home)));
