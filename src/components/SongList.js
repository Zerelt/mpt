import React from 'react';
import { hot } from 'react-hot-loader';
import {Scrollbars} from 'react-custom-scrollbars-cbx';

const SongList = (props) => {
  let sortPosUp= props.sortMode=='posUp' ? 'sortSelected' : '';
  let sortPosDown= props.sortMode=='posDown' ? 'sortSelected' : '';
  let sortNameUp= props.sortMode=='nameUp' ? 'sortSelected' : '';
  let sortNameDown= props.sortMode=='nameDown' ? 'sortSelected' : '';
  let sortArtistUp= props.sortMode=='artistUp' ? 'sortSelected' : '';
  let sortArtistDown= props.sortMode=='artistDown' ? 'sortSelected' : '';

  let showSongList = (props.showList || ((props.width<=1024) && props.width < props.height)) ? 'showSongList' : '';
  let musicData = props.musicData;

  let sortedMusicData = musicData.map((item,id)=>{
    let showNowPlaying = props.songNr == id ? {display:'block',transform:'translateX(0%)'} : {transform:'translateX(150%)'};
    let spanDecorated = props.songNr == id ? 'spanDecorated' : '';
    return(
      <li key={id} 
      onClick={()=>{props.onSongClick(id);
      }}>
        <span className={spanDecorated}>{item.trackName}</span>
        <span>{item.artist}</span>
        <svg style={showNowPlaying} version="1.1" id="Layer_1" 
        x="0px" y="0px" viewBox="0 0 50 50">
        <g id="XMLID_58_">
          <line id="XMLID_57_" className="st0" x1="2" y1="16.5" x2="2" y2="48"/>
          <line id="XMLID_59_" className="st0" x1="11.2" y1="25.1" x2="11.2" y2="48"/>
          <line id="XMLID_53_" className="st0" x1="20.7" y1="2.2" x2="20.7" y2="48"/>
          <line id="XMLID_54_" className="st0" x1="30.4" y1="11.5" x2="30.4" y2="48"/>
          <line id="XMLID_55_" className="st0" x1="40" y1="32.2" x2="40" y2="48"/>
          <line id="XMLID_56_" className="st0" x1="48" y1="20.8" x2="48" y2="48"/>
        </g>
        </svg>
      </li>
    );
  });
  return (
    <div className={'songList ' + showSongList}>
        <span className='closeBtn' onClick={props.handlePlaylist}>&#10006;</span>
        <div className='sortingContainer'>
          <p>Sort by:</p>
          <span className={'sortOption '+ sortPosUp} onClick={()=>props.handleSort('posUp')}>date &#8673;</span>
          <span className={'sortOption '+ sortPosDown} onClick={()=>props.handleSort('posDown')}>date &#8675;</span>
          <span className={'sortOption '+ sortNameUp} onClick={()=>props.handleSort('nameUp')}>title &#8673;</span>
          <span className={'sortOption '+ sortNameDown} onClick={()=>props.handleSort('nameDown')}>title &#8675;</span>
          <span className={'sortOption '+ sortArtistUp} onClick={()=>props.handleSort('artistUp')}>artist &#8673;</span>
          <span className={'sortOption '+ sortArtistDown} onClick={()=>props.handleSort('artistDown')}>artist &#8675;</span>
        </div>
        <div className='listScrollContainer'>
          <Scrollbars style={{flex:1}} className='customScrollbars'>
            <ul>
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
              {sortedMusicData}
            </ul>
          </Scrollbars>
        </div>
    </div>
  )
};


export default hot(module)(SongList);