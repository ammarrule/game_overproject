import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import axios from 'axios';


class News extends Component{
  constructor(){
    super();
    this.state = {
      newsFeed: [{}]
    }
  }

  componentWillMount() {
    axios.get('http://localhost:8080/news/')
      .then(res =>{
        this.setState({
          newsFeed: res.data.newsArray          
        })
      })      
      .catch(error =>{
        console.log(error)
      })    
  }

  render(){
    let newsList = []
    for(let i = 0; i < this.state.newsFeed.length; i++){
      newsList.push(
          <div className="newsBox">
          <div className="newsImg">
            <img className="img-thumbnail actualImg" src={this.state.newsFeed[i].urlToImage}/>
          </div>
          <div className="newsDescription">
            <h3 className="newsTitle">{this.state.newsFeed[i].title}</h3>
            <div className="news-desc-url">
              <h4>{this.state.newsFeed[i].description}</h4>
              <p><a href={this.state.newsFeed[i].url}>Click for full article at IGN</a></p>
            </div>
          </div>          
        </div>        
      )
    }
    return(
      <div className="newsfeed-wrapper">
        <div className="news-page-heading">
          <h1 className="news-title">News Feed</h1>
          {newsList}
        </div>             
      </div>
    )
  }
}

export default News;