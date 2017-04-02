import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';


class About extends Component{
  render(){
    return(
      <div className="row">
        <div className="main-landing">
            <div className="landing-text col-md-8 col-lg-8 col-sm-12 col-xs-12">
              <h1><span className="welcome">Welcome</span><span className="to"> to</span><span className="game_over"> Game_Over!</span></h1>        
              <p className="landing-p">Game_Over is your one stop shop for game ratings, news and information! Game_Over is powered by GiantBomb, Twitter, IGN and GameSpot.</p>
            </div>
        </div>
      </div>
    )
  }
}

export default About;