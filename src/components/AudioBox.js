import React from 'react';
import {hot} from 'react-hot-loader';

const AudioBox = (props) => {
  let songNr=props.songNr;
  let myTrack = props.musicData[songNr].songSrc;
 
    return(
      <div className="audioBox">
        <audio 
          onLoadedMetadata={props.handleMetadata}
          src={require('../audio/'+myTrack)}>
        </audio>
      </div>
    )
}

export default hot(module)(AudioBox);