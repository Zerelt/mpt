import React from 'react';
import {hot} from 'react-hot-loader';

const CurrentTrackInfo = (props) => {
  let displayedInfo = props.musicData[props.songNr];
    return(
      <div className='displayedTrackTitle'>
        <h2> {displayedInfo.trackName} </h2>
        <p> by {displayedInfo.artist} </p>
      </div>
    )
};

export default hot(module)(CurrentTrackInfo);