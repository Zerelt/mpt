import React ,{Component} from 'react';
import {hot} from 'react-hot-loader';
  

class AudioBox extends Component {
  render(){
    let songNr=this.props.songNr;
    let myTrack = this.props.musicData[songNr].songSrc;
    return(
      <div className="audioBox">
        <audio preload='auto' type='audio/mpeg'
          onLoadedMetadata={this.props.handleMetadata}
          src={require('../audio/'+myTrack)}>
        </audio>
      </div>
    )
  }
}
        
export default hot(module)(AudioBox);
