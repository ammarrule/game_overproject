import React, {Component} from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';

class GameList extends Component {
  render(){
    let gameList = []
    for(let i = 0; i < this.props.games.length; i++){
      gameList.push(
        <div className="row">
          <div className="gameBox col-md-8 col-lg-8 col-sm-12">
              <div className="gameTitle"><h2>{this.props.games[i].name}</h2></div>
              <div className="gamePoster col md-2 col-lg-2 col-sm-12 col-xs-12">
                <img className="img-thumbnail actualImg img-responsive" src={this.props.games[i].image}/>
              </div>
              <div className="gameDescription col md-7 col-lg-7 col-sm-12 col-xs-12"><h4>{this.props.games[i].deck}</h4></div>
              <div className="rating-wrapper col md-2 col-lg-2 col-sm-12 col-xs-12">
                <div><span>metacritic score</span></div>
                <div className="meta-rating"><span className="rating-text">{this.props.games[i].metarating}</span></div>
                <div><span>gamespot score</span></div>
                <div className="gs-rating"><span className="rating-text">{this.props.games[i].gsrating}</span></div>  
                <div className="price-box">
                  <span className="price">From {this.props.games[i].price}</span><a href={this.props.games[i].priceLink}><button className="btn btn-success price-btn">Buy Now from Amazon</button></a>
              </div>            
              </div>
              
          </div>
        </div>
      )
    }
    
    return(
      <div className="gameview-container">
        <div className="search-wrapper">
          <input className="form-control search-bar" type="text" placeholder="Search Games" value={this.props.value} onChange={this.props.searchInput}/>
          <Link to='/searchresult' style={{ textDecoration: 'none' }} className="search-btn"><i className="fa fa-search" aria-hidden="true"></i></Link>       
        </div>
        {gameList}       
      </div>
    )
  }
}

export default GameList;