import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import SongList from './SongList';
import MusicBar from './MusicBar';
import AudioBox from './AudioBox';
import Visualizer from './Visualizer';
import Disc from './Disc'
import '../style/style.scss';



class App extends Component {
  constructor(props){
      super(props);
      this.state={
        height:window.innerHeight,
        width:window.innerWidth,
        musicData:[
          {trackName:'god fury',
          artist:'anno domini beats',
          songSrc:'God Fury.mp3',
          albumArt:'track0.png', 
          arrPos:0},
          {trackName:'ever felt pt1',
          artist:'otis mcDonald',
          songSrc:'Ever Felt pt1.mp3',
          albumArt:'track1.png', 
          arrPos:1},
          {trackName:'still standing',
          artist:'anno domini beats',
          songSrc:'Still Standing.mp3',
          albumArt:'track2.png',
          arrPos:2},
          {trackName:'gut check',
          artist:'ethan meixsell',
          songSrc:'Gut Check.mp3',
          albumArt:'track3.png',
          arrPos:3}
        ],
        audioStatus: 'paused',
        songNr:0,
        trackDurationRaw:'0',
        trackCurrentTimeRaw:'0',
        trackDuration:'0',
        trackCurrentTime:'0',

        volumeValue:'0.42',
        progressValue:'0',

        chosenCurrentTime:'',

        showList:false,
        sortMode:'posDown'
      }

      this.createVisualization = this.createVisualization.bind(this);

      this.handleResize=this.handleResize.bind(this);
      this.handleAudioStatus = this.handleAudioStatus.bind(this);
      this.stopPlayback = this.stopPlayback.bind(this);
      this.checkKeepPlaying = this.checkKeepPlaying.bind(this);
      this.nextTrack = this.nextTrack.bind(this);
      this.prevTrack = this.prevTrack.bind(this);
      this.onSongClick = this.onSongClick.bind(this);
      this.handleMetadata = this.handleMetadata.bind(this);
      this.handleCurrentTime = this.handleCurrentTime.bind(this);
      this.formatNumbers = this.formatNumbers.bind(this);
      this.handleVolume = this.handleVolume.bind(this);
      this.handleProgress = this.handleProgress.bind(this);
      this.handlePlaylist = this.handlePlaylist.bind(this);
      this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount(){
      this.createVisualization();
      this.currentTimeCallback = setInterval(()=>this.handleCurrentTime(), 500);
      //audio was higher than we set in state on initial page load, so we fix it here
      ReactDOM.findDOMNode(this.audioContainer).children[0].volume = this.state.volumeValue;
      window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount(){
    clearInterval(this.currentTimeCallback);
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize() {
    this.setState({
      height:window.innerHeight,
      width:window.innerWidth
    });
  }
  
  checkKeepPlaying(){
    let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
      if (this.state.audioStatus === 'play') {
          this.setState({audioStatus:'play'});
          audioRef.play();
      } else {
        this.setState({audioStatus:'paused'});
      }
      //============= was in handleCurrentTime; automatically moves on to the next track if it's not the last
      if (  (this.state.trackCurrentTime === this.state.trackDuration) && 
            (this.state.audioStatus==='play') && 
            (this.state.songNr<this.state.musicData.length-1) ){
              this.setState({audioStatus:'stopped'});
              setTimeout(()=>{this.setState({audioStatus:'play'})},150);
              let keepPlaying = ()=>{
                let songNr = this.state.songNr;
                this.setState({songNr:songNr+1});
              }
              setTimeout(keepPlaying(),200);
      } 
      else if( (this.state.trackCurrentTime === this.state.trackDuration) && 
                (this.state.songNr===this.state.musicData.length-1)){
                  this.setState({audioStatus:'stopped'},
                    ()=>{
                      audioRef.pause(); 
                      audioRef.currentTime=0;
                    }
                  );
                  /*
                    last song plays another time without this; 
                    state updates the audioStatus to 'paused' slightly late and so it plays another time without pausing the audio element
                    although it gives a warning in the console, it does what it's supposed to - to interrupt the .play()
                    when it reaches the end of the last track
                    and we set currentTime to 0 to remove the 'moveIt_now' class in Disc.js and get the disc back
                  */
      }
  }

  handleAudioStatus(){
    let audioStatus = this.state.audioStatus;
    let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
    if (audioStatus === 'paused' || audioStatus === 'stopped' ) {
      this.setState({audioStatus:'play'});
      audioRef.play(); 
    } else {
      this.setState({audioStatus:'paused'});
      audioRef.pause();
    }
  }

  stopPlayback(){
    let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
    this.setState({audioStatus:'stopped'});
    audioRef.pause();
    audioRef.currentTime = 0;
  }

  nextTrack(){
    if (this.state.songNr < this.state.musicData.length - 1) {
      //briefly change audioStatus state to 'stopped' for rightside translate animation
      this.setState({audioStatus:'stopped',songNr:this.state.songNr+1});
      setTimeout(()=>{
        this.setState({
          audioStatus:'play'
        },
        ()=>this.checkKeepPlaying()); //to start playback on track change
      },500) //delay to let the animation run
    }
  }

  prevTrack(){
    if (this.state.songNr >0) {
      //briefly change audioStatus state to 'stopped' for rightside translate animation
      this.setState({audioStatus:'stopped',songNr:this.state.songNr-1});
      setTimeout(() => {
        this.setState({
          audioStatus:'play'
        },
        ()=>this.checkKeepPlaying()); //to start playback on track change
      }, 500); //delay to let the animation run
    }
  }

  onSongClick(x){
    this.checkKeepPlaying();
    this.setState({
      songNr: x,
      audioStatus:'play'
    });
  }

  handleCurrentTime(){
    let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
    let trackTime = audioRef.currentTime;
    let trackMin = (String(trackTime/60)).split('.')[0];
    let trackSec = (String(trackTime%60)).split('.')[0];
    this.setState({
      trackCurrentTime:this.formatNumbers(trackMin)+':'+this.formatNumbers(trackSec),
      trackCurrentTimeRaw:trackTime
    });
    this.checkKeepPlaying();
  }

  handleMetadata(e){
    const duration = e.currentTarget.duration;
    let trackMin = (String(duration/60)).split('.')[0];
    let trackSec = (String(duration%60)).split('.')[0];
    this.setState({
      trackDuration:this.formatNumbers(trackMin)+':'+this.formatNumbers(trackSec),
      trackDurationRaw:duration
    });
  }

  formatNumbers(x){
    return x<10 ? '0'+x : x;
  }

  handleVolume(e){
    let chosenVolume = e.target.value;
    let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
    this.setState({volumeValue: chosenVolume},
      ()=>{
        audioRef.volume = chosenVolume;
      });
  }

  handleProgress(e){
    let selectedTime = (this.state.trackDurationRaw*this.state.progressValue)/100;
    let trackMin = (String(selectedTime/60)).split('.')[0];
    let trackSec = (String(selectedTime%60)).split('.')[0];
    let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
    audioRef.currentTime = e.target.value;
    this.setState({
      chosenCurrentTime: e.target.value,
      trackCurrentTime:this.formatNumbers(trackMin)+':'+this.formatNumbers(trackSec)
    });
  }

  handlePlaylist () {
    this.setState({showList: !this.state.showList});
  }

  handleSort(x){
    let sortMode=this.state.sortMode;
    if (x!==sortMode) {
      let newSongNr='';
      let musicData = this.state.musicData;
      let sortedMusicData = musicData.sort((a,b)=>{
        switch(x) {
          case 'posUp':
            return a.arrPos < b.arrPos;
            break;
          case 'posDown':
            return a.arrPos > b.arrPos;
            break;
          case 'nameUp':
            return a.trackName < b.trackName;
            break;
          case 'nameDown':
            return a.trackName > b.trackName;
            break;
          case 'artistUp':
            return a.artist < b.artist
            break;
          case 'artistDown':
            return a.artist > b.artist
        }
      });

      let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
      let songSourceName=audioRef.src.substring(audioRef.src.lastIndexOf('/')+1).replace(/%20/g,' ');
      let sortedSrc = sortedMusicData.map((item,id)=>{
        let songName = item.songSrc.substring(item.songSrc.lastIndexOf('/')+1);
        if(songName === songSourceName) {
          newSongNr=id;
          return;}
        });

      this.setState({
        songNr:newSongNr,
        sortMode:x,
        musicData:sortedMusicData
      });
    }
  }

  createVisualization(){
      let context = new AudioContext();
      let analyser = context.createAnalyser();
      let canvas = ReactDOM.findDOMNode(this.myCanvas).children[0].children[0].children[0];
      let ctx = canvas.getContext('2d');
      
      let audioRef = ReactDOM.findDOMNode(this.audioContainer).children[0];
      audioRef.crossOrigin = "anonymous";
      let audioSrc = context.createMediaElementSource(audioRef);
      audioSrc.connect(analyser);
      audioSrc.connect(context.destination);
      analyser.connect(context.destination);
      analyser.smoothingTimeConstant = 0.8;

      function renderFrame(){
          let freqData = new Uint8Array(analyser.frequencyBinCount);
          requestAnimationFrame(renderFrame);
          analyser.getByteFrequencyData(freqData);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // console.log(freqData)
          ctx.fillStyle = '#fafafa';
          let bars = 30;
          for (var i = 0; i < bars; i++) {
              let bar_x = i * 12;
              let bar_width = 3;
              let bar_height = -(freqData[i] / 2);
              ctx.fillRect(bar_x, canvas.height, bar_width, bar_height)
              ctx.lineJoin = "round";
              ctx.lineWidth = 20;
          }
      };
      renderFrame();
  }

  render() {

      return (
        <div className="app">
          <Visualizer
            ref={(myCanvas) => {this.myCanvas = myCanvas}}
            handlePlaylist={this.handlePlaylist}/>
          
          <Disc 
            trackCurrentTimeRaw={this.state.trackCurrentTimeRaw}
            audioStatus={this.state.audioStatus}
            musicData={this.state.musicData}
            songNr={this.state.songNr}/>
          <MusicBar
            audioStatus={this.state.audioStatus}
            volumeValue={this.state.volumeValue}
            trackDurationRaw={this.state.trackDurationRaw}
            trackCurrentTimeRaw={this.state.trackCurrentTimeRaw}
            trackDuration={this.state.trackDuration}
            trackCurrentTime={this.state.trackCurrentTime}
            handleVolume={this.handleVolume}
            handleProgress={this.handleProgress}
            nextTrack={this.nextTrack} 
            prevTrack={this.prevTrack}
            stopPlayback={this.stopPlayback}
            handleAudioStatus={this.handleAudioStatus}/>
            <SongList 
              height={this.state.height}
              width={this.state.width}
              songNr={this.state.songNr}
              handleSort={this.handleSort}
              sortMode={this.state.sortMode}
              showList={this.state.showList}
              handlePlaylist={this.handlePlaylist}
              musicData={this.state.musicData} 
              onSongClick={this.onSongClick}/>
            <AudioBox 
              ref={(audioContainer) => {this.audioContainer = audioContainer}}
              handleMetadata={this.handleMetadata}
              musicData={this.state.musicData}
              songNr={this.state.songNr}/>
        </div>
        );
      }
}

ReactDOM.render(<App />, document.getElementById('app'));