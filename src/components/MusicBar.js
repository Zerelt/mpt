import React from 'react';
import { hot } from 'react-hot-loader';

const MusicBar = (props) => {
  let styleShowPlay = {
    transform: 'translateX(100%)'
  };
  let styleShowPause = {
    transform: 'translateY(0%)'
  };
  let showPlay= props.audioStatus =='paused' || props.audioStatus=='stopped' ? {transform:'translateX(0%)'} : styleShowPlay;
  let showPause= props.audioStatus =='play' ? styleShowPause : {transform:'translateX(-100%)'};

  return (
    <div className='musicBar'>
      <span onClick={props.prevTrack} className='mediaControl'>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 175.9 175.9">
          <g id="XMLID_87_">
            <path id="XMLID_89_" className="st0" d="M134.6,140.4L40.8,88.6c-0.5-0.3-0.5-1,0-1.3l93.7-51.8c0.4-0.2,0.9,0.1,0.9,0.7v103.6
              C135.4,140.3,135,140.6,134.6,140.4z"/>
            <line id="XMLID_88_" className="st0" x1="40.5" y1="140.5" x2="40.5" y2="35.4"/>
          </g>
        </svg>
      </span>
      <span onClick={props.handleAudioStatus} className='mediaControl'>
        <svg className='pauseBtn' style={showPause} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	        viewBox="0 0 187.8 187.8" >
          <g id="XMLID_27_">
            <line id="XMLID_28_" className="st0" x1="75.8" y1="51.2" x2="75.8" y2="136.5"/>
            <line id="XMLID_30_" className="st0" x1="112" y1="51.2" x2="112" y2="136.5"/>
          </g>
        </svg>
        <svg className='playBtn' style={showPlay} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 175.9 175.9">
          <g id="XMLID_27_">
            <path id="XMLID_50_" className="st0" d="M47,35.5l103.7,51.8c0.5,0.3,0.5,1,0,1.3L47,140.4c-0.5,0.2-1-0.1-1-0.7V36.2
              C46,35.6,46.5,35.3,47,35.5z"/>
          </g>
        </svg>
      </span>
      <span onClick={props.nextTrack} className='mediaControl'>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 175.9 175.9">
          <g id="XMLID_70_">
            <path id="XMLID_62_" className="st0" d="M41.4,35.5l93.7,51.8c0.5,0.3,0.5,1,0,1.3l-93.7,51.8c-0.4,0.2-0.9-0.1-0.9-0.7V36.2
              C40.5,35.6,41,35.3,41.4,35.5z"/>
            <line id="XMLID_69_" className="st0" x1="135.4" y1="35.4" x2="135.4" y2="140.5"/>
          </g>
        </svg>
      </span>
      <span onClick={props.stopPlayback} className='mediaControl'>
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 175.9 175.9">
          <g id="XMLID_43_">
            <rect id="XMLID_78_" x="38.8" y="38.8" className="st0" width="98.2" height="98.2"/>
          </g>
        </svg>
      </span>
      
      <div>
        {/* use Math.floor to display only integers */}
        <p>{Math.floor(props.volumeValue*100) + '%'}</p>
        <input type='range' 
        min='0' max='1'
        step='0.01'
        value={props.volumeValue} 
        onChange={props.handleVolume} 
        className='mediaControl_Vol' />
      </div>

      <div>
        <p>
          <span>{props.trackCurrentTime}</span>
          <span>/</span>
          <span>{props.trackDuration}</span>
        </p>
        <input type='range' 
        min='0' 
        max={Math.floor(props.trackDurationRaw)}
        value={props.trackCurrentTimeRaw} 
        onChange={props.handleProgress} 
        className='mediaControl_Progr' />
      </div>
    </div>
  )
};


export default hot(module)(MusicBar);