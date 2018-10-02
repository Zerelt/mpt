import React from 'react';
import {hot} from 'react-hot-loader';
import CurrentTrackInfo from './CurrentTrackInfo';

const Disc = (props) => {
  let albumArt=props.musicData[props.songNr].albumArt;
  
  let addedClass='';
  if (props.audioStatus == 'play') {
    addedClass='disc_Play';
  } else if (props.audioStatus=='paused' && props.trackCurrentTimeRaw>0 ){
    let newName = ()=>{addedClass='disc_Pause';}
    setTimeout(newName(),90);
  } else {
    let newName = ()=>{addedClass='disc_Reset';}
    setTimeout(newName(),90);
  }

  let moveIt = {
    transform: 'translate(100%)'
  };
  let moveIt_now = (props.audioStatus=='stopped' && props.trackCurrentTimeRaw>0) ? moveIt : 
                        {transform:'translate(0%)'};

  return(
    <div className='rightSide' style={moveIt_now}>
      <div className='rightSide_mid'>
        <div className='rightSide_inner'>
          <img className={'discSvg '+addedClass} 
            src={require('../images/disc.svg')} />
          <img className={'album '+addedClass} 
            src={require('../images/'+albumArt)} />
          <img className={'overlay '+addedClass} 
            src={require('../images/discOverlay.svg')} />
        </div>
      </div>
      <CurrentTrackInfo {...props} />
    </div>
  )
};

export default hot(module)(Disc);