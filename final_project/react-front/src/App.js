import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import GameList from './components/GameList';
import SearchResult from './components/SearchResult';
import About from './components/About';
import News from './components/News';
import Graphs from './components/Graphs'
import {Link} from 'react-router';


class App extends Component {
  constructor(){
    super();
//==========================================================================================================================//
                                                      //STATE//
    this.state = {
      value: '',
      searchedGame:{},
      newsFeed: {}
    }
//==========================================================================================================================//
                                                      //BINDING//
    this.searchInput = this.searchInput.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);

  }                                                //END OF CONSTRUCTOR//
//==========================================================================================================================//
                                                      //METHODS//
searchInput(event){
  event.preventDefault();
  this.setState({
    value: event.target.value
  })
}

searchSubmit(event){ 
  event.preventDefault();     
}                                                  //END OF METHODS//
//=========================================================================================================================//
 
  render() {
    const games = this.props.route.games;
    return (
      <div className="App container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="row">
            <div className=" logo-fix col-md-3 col-lg-3 col-sm-12 col-xs-12">
              <h2 className="logo-title">Game_Over</h2>
              <div className="logo-logo spin"><i className="fa fa-usd dollar" aria-hidden="true"></i></div>
            </div>
          </div>
        </Link>
        
         <div className="sidebar">
            <div className="btn-group">
                <div className="link-1">
                  <Link to="/gamelist"><button className="btn1 gamelist"><i className="fa fa-gamepad btn-icon1" aria-hidden="true"></i></button></Link>
                </div>
                <div className="menuItem-1"><span>Games</span></div>
                <div className="link-2">
                  <Link to="/news"><button className="btn2 news"><i className="fa fa-gamepad btn-icon2" aria-hidden="true"></i></button></Link>
                </div>
                <div className="menuItem-2"><span>News</span></div>
                <div className="link-3">
                  <Link to="/graphs"><button className="btn3 infograph"><i className="fa fa-gamepad btn-icon3" aria-hidden="true"></i></button></Link>
                </div>
                <div className="menuItem-3"><span>Graphs</span></div>
                <div className="link-4">
                  <Link to="/contact"><button className="btn4 contact"><i className="fa fa-gamepad btn-icon4" aria-hidden="true"></i></button></Link>
                </div>
                <div className="menuItem-4"><span>Contact</span></div>
            </div>          
          </div>
        <div className="container">
          {React.cloneElement(
            this.props.children, 
            {games, 
            searchInput:this.searchInput, 
            value:this.state.value, 
            searchSubmit:this.searchSubmit, 
            searchedGame:this.state.searchedGame,
            newsFeed:this.state.newsFeed
            })}        
        </div>
      </div>
    );
  }
};







export default App; 

