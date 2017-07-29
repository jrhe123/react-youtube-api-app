import React, { Component } from 'react';

const API = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA'
const channelID = 'UC29ju8bIPH5as8OGnQzwJyA'
const limit = 5;
var offset = 1;

var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${limit}`


class Youtube extends Component {

  constructor(props){

    super(props);
    this.state = {  
      resultyt : []
    };
  }

  componentWillMount(){
    fetch(finalURL)
    .then((response) => response.json())
    .then((responseJson) => {
      const resultyt = responseJson.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
      this.setState({resultyt});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  clicked(){
    offset++;
    var page = limit * offset;
    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${page}`

    fetch(finalURL)
    .then((response) => response.json())
    .then((responseJson) => {
      const resultyt = responseJson.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId);
      this.setState({resultyt});
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

    console.log(this.state);
    return (
      <div>
        <button onClick={this.clicked.bind(this)}>Get videos</button>

        {
          this.state.resultyt.map((link, idx) => {
            var frame = <div key={idx} className="youtube"><iframe width="560" height="315" src={link} frameBorder="0" allowFullScreen></iframe></div>
            return frame;
          })
        }
                
      </div>
      );
  }

}

export default Youtube;