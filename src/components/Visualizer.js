import React from 'react';
import {hot} from 'react-hot-loader';

const Visualizer = (props) => {
  return(
    <div className='leftSide'>
      <div className='visualsBox'>
        <div className='visualsBox_inner'>
          <canvas></canvas>
          <img className='faceProfile' src={require('../images/faceProfile.svg')}/>
        </div>
      </div>
      <div className='showHideList_outer'>
        <div className='showHideList' onClick={props.handlePlaylist}>playlist</div>
      </div>
    </div>
    )
};

export default hot(module)(Visualizer);