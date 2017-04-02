import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import axios from 'axios';
import io from 'socket.io-client';

class Graphs extends Component {
    constructor(){
        super();

        this.state = {
            ps4Array : [],
            xboxoneArray : [],
            ps4counter: 0,
            xboxonecounter: 0,
            ps4tweet: {},
            xboxonetweet: {},
            changeTweet: true
        }
        this.onClickSelect = this.onClickSelect.bind(this);

        this.socket = io.connect('http://localhost:8080');
        this.socket.on('ps4', (data)=> {
            
            
            if(this.state.changeTweet){
                this.setState({
                    ps4tweet: data,
                    changeTweet: false
                }) 
                setTimeout(()=> {
                    this.setState({
                        changeTweet: true                        
                    })
                }, 5000)
            } 
            this.setState({                 
                 ps4Array: this.state.ps4Array.concat(data),
                 ps4counter: this.state.ps4Array.length + 1
            })
            
        })
        this.socket.on('xboxone', (data)=> {
            console.log(data)
            this.setState({
                xboxonetweet: data,
                xboxoneArray: this.state.xboxoneArray.concat(data),
                xboxonecounter: this.state.xboxoneArray.length + 1
            })
            
        })
    }

    onClickSelect(system){
        console.log('click')
        if(system === 'ps4'){
            this.setState({
                ps4counter: 0,            
                ps4Array: [],            
                ps4tweet: {}            
            })
        } else {
            this.setState ({
                xboxonecounter: 0,
                xboxoneArray: [],
                xboxonetweet: {}
            })
        }
        this.socket.emit('tweetStream', { system: system });
    }

    render(){
        const ps4counterStyle = {
           height: 10 * this.state.ps4counter
        }

        const xboxcounterStyle = {
            height: 10  * this.state.xboxonecounter
        }
        // 
        return(
            <div className="graph-wrapper">
                <div className="graph-title"><h1 className="graph-title-text">Graphs</h1></div>
                <div className="actual-graph">
                    <button className="btn btn-primary ps4-btn" onClick={() =>{this.onClickSelect("ps4")}}>PS4</button>
                    <div className="ps4-graph" style={ps4counterStyle}>tweet count:{this.state.ps4counter}</div>
                    <button className="btn btn-primary xbox-btn" onClick={() =>{this.onClickSelect("xboxone")}}>XBOX-ONE</button>
                    <div className="xbox-graph" style={xboxcounterStyle}>{this.state.xboxonecounter}</div>
                    <div className="ps4-feed">{this.state.ps4tweet.text}</div>
                    {/*<div className="xbox-feed"></div>*/}
                    <div className="line"></div>
                </div>
            </div>
        )
    }
}

export default Graphs;