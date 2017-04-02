import React, {Component} from 'react';
import {Router, Route, browserHistory, Link} from 'react-router';
import axios from 'axios';

class SearchResult extends Component {
  constructor(){
    super();
    this.state = {
        searchedGame: {},
        loading: true
    }
    this.searchedGameSubmit = this.searchedGameSubmit.bind(this);
  }

  componentWillMount(){
    this.searchedGameSubmit()
  }
  searchedGameSubmit(){     
    axios.get('http://localhost:8080/search/' + this.props.value)
    .then(res => {     
      console.log(res.data)
     this.setState({
       searchedGame: res.data,
       loading: false
     })
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  render(){
    if (this.state.loading === true){
      return (
              <div className="load spin"><i className="fa fa-usd dollar-load" aria-hidden="true"></i>
                <h3>Loading</h3>
              </div>            
      )
    }
    if(this.state.searchedGame.err){
      return(
         <div className="gameview-container">
            <div className="search-wrapper">
              <input className="form-control search-bar" type="text" placeholder="Search Games" value={this.props.value} onChange={this.props.searchInput}/>
              <button className="btn-search-result"><i className="fa fa-search search-btn" aria-hidden="true" onClick={this.searchedGameSubmit}></i></button>
            </div>     
            <div className="gameBox col-md-8 col-lg-8 col-sm-12">
              <div className="gameTitle"><h2>Sorry! No results found!</h2></div>
              <div className="gamePoster col md-2 col-lg-2 col-sm-12">
                <img className="img-thumbnail actualImg" src="https://img.clipartfest.com/3200438693663cdff878c547659ae695_missing-workouts-no-big-deal-no-big-deal-shrug-clipart_328-320.gif"/>
              </div>
              <div className="gameDescription col md-7 col-lg-7 col-sm-12"><h4>Please try searching again!</h4></div>
              <div className="rating-wrapper col md-2 col-lg-2 col-sm-12">
                <div><span>metacritic score</span></div>
                <div className="meta-rating"><span className="rating-text"><i className="fa fa-frown-o" aria-hidden="true"></i></span></div>
                <div><span>gamespot score</span></div>
                <div className="gs-rating "><span className="rating-text"><i className="fa fa-frown-o" aria-hidden="true"></i></span></div>
              </div>             
            </div>
            <Link to="/gamelist"><button className="btn btn-success btn-back">Back to List</button></Link>
        </div>
      )
    } else {
      //this is determining class for metacritic rating//
      let ratingClassName
             
      if (this.state.searchedGame.metaRating < 60){
        ratingClassName = "meta-rating-bad"
      } else if (this.state.searchedGame.metaRating < 80){        
        ratingClassName ="meta-rating-alright"
        } else {
          ratingClassName="meta-rating-good"
        }
        //this is determining class for gs rating//
        let gsRatingClassName 
        if(this.state.searchedGame.gsRating < 6){
          gsRatingClassName = "gs-rating-bad"
        } else if (this.state.searchedGame.gsRating < 8){
          gsRatingClassName = "gs-rating-alright"
        } else {
          gsRatingClassName="gs-rating-good"
        }    
      
      return(
          <div className="gameview-container">
            <div className="search-wrapper">
              <input className="form-control search-bar" type="text" placeholder="Search Games" value={this.props.value} onChange={this.props.searchInput}/>
              {/*{/*<Link to='/searchresult' style={{ textDecoration: 'none' }} className="search-btn"><i className="fa fa-search" aria-hidden="true"></i></Link>*/}
              <button className="btn-search-result"><i className="fa fa-search search-btn" aria-hidden="true" onClick={this.searchedGameSubmit}></i></button>
            </div>     
            <div className="gameBox col-md-8 col-lg-8 col-sm-12">
              <div className="gameTitle"><h2>{this.state.searchedGame.name}</h2></div>
              <div className="gamePoster col md-2 col-lg-2 col-sm-12">
                <img className="img-thumbnail actualImg" src={this.state.searchedGame.image}/>
              </div>
              <div className="gameDescription col md-7 col-lg-7 col-sm-12"><h4>{this.state.searchedGame.deck}</h4></div>
              <div className="rating-wrapper col md-2 col-lg-2 col-sm-12">
                <div><span>metacritic score</span></div>
                <div className={"meta-rating " + ratingClassName}><span className="rating-text">{this.state.searchedGame.metaRating}</span></div>
                <div><span>gamespot score</span></div>
                <div className={"gs-rating " + gsRatingClassName}><span className="rating-text">{this.state.searchedGame.gsRating}</span></div>
                <div className="price-box">
                  <span className="price">From {this.state.searchedGame.price}</span><a href={this.state.searchedGame.priceLink}><button className="btn btn-success price-btn">Buy Now from Amazon</button></a>
                </div>
              </div>
              
            </div>
            <Link to="/gamelist"><button className="btn btn-success btn-back">Back to List</button></Link>
        </div>
      )
    }
  }
}

export default SearchResult;