import React, { Component } from 'react'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStepBackward, faStepForward, faList } from '@fortawesome/free-solid-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { TilingSprite } from '@pixi/sprite-tiling';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

export default class controls extends Component {
   constructor(props){
      super(props);
      
      this.state={
         isPlaying: false,
         currentIndex:0,
         currentSong:this.props.trackList.trackList[0],
         // nextSong:this.props.trackList.trackList[2],
         // prevSong:this.props.trackList.trackList[0]
      };
      this.changeButton=this.changeButton.bind(this);
      this.SkipSong=this.SkipSong.bind(this);
      // this.updateMeta=this.updateMeta.bind(this);
      // this.start=this.start.bind(this);
   }
   // SkipSong(){
   //    console.log(this.props.trackList.trackList);
   // }
   // updateMeta(){
   //    console.log("update  Meta");
   // }
   SkipSong(forward){
      if(forward){
         let cr=(this.state.currentIndex==this.props.trackList.trackList.length-1)?0:(this.state.currentIndex+1);

         this.setState({
            currentIndex: cr
         });
      }
      else{
         let cr=(this.state.currentIndex==0)?(this.props.trackList.trackList.length-1):(this.state.currentIndex-1);

         this.setState({
            currentIndex: cr
         });
      }
      // this.updateMeta();
      this.setState({
         currentSong: this.props.trackList.trackList[this.state.currentIndex],
      })
      window.SetAudio(this.state.currentSong.src);
      console.log(this.state.currentSong);
   }
   // updateMeta(){
   //    this.setState({
   //       currentSong:this.props.trackList.trackList[this.state.currentIndex],
   //       nextSong:this.props.trackList.trackList[this.state.currentIndex+1],
   //       prevSong:this.props.trackList.trackList[this.state.currentIndex-1]
   //    })
   // }
   changeButton(){
      if(this.state.isPlaying){
         console.log("paused");
         this.setState({isPlaying:false});
         window.setPlayPause(false);
      }
      else{
         console.log("playing");
         this.setState({isPlaying:true});
         window.setPlayPause(true);
      }
   }
   
   render() {
      console.log(this.state);
     
      return (
         <div>
            <MusicPlayer>
               <ControlElement className="song-details">
                  <div className="song-name">
                     {this.state.currentSong.name}
                  </div>
                  <div className="artist">
                     {this.state.currentSong.artist}
                  </div>
               </ControlElement>
               <ControlElement className="prev" onClick={()=>{
                  this.SkipSong(false);
                  console.log(this.state.currentSong.src);
                  // window.SetAudio(this.state.currentSong.src);
               }}>
                  <div className="fontawesome-icon">
                     <FontAwesomeIcon icon={faStepBackward} ></FontAwesomeIcon>
                  </div>
               </ControlElement>
               <ControlElement className="play-pause" onClick={this.changeButton}>
                  <div className="fontawesome-icon">
                     <FontAwesomeIcon id='play-pause-icon' icon={this.state.isPlaying?faPause:faPlay}/>
                  </div>
                  
               </ControlElement>
               <ControlElement className="next" onClick={()=>{
                  this.SkipSong(true);
                  console.log(this.state.currentSong.src);
                  // window.SetAudio(this.state.currentSong.src);
               }}>
                  <div className="fontawesome-icon">
                  <FontAwesomeIcon icon={faStepForward} ></FontAwesomeIcon>
                  </div>
               </ControlElement>
               <ControlElement className="playlist">
                  <div className="fontawesome-icon">
                     <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                  </div>
               </ControlElement>
            </MusicPlayer>
         </div>
      )
   }
}
const MusicPlayer=styled.div`
         width:600px;
         height:70px;
         background-color:rgba(255,255,255,0.05);
         padding:20px;
         
         font-size:1.5rem;
         border-radius:15px;
         color:#fefefe;

         display:grid;
         grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
         grid-template-rows: 1fr;
         gap: 0px 10px;
         grid-template-areas:
            "song-details song-details song-details song-details song-details song-details prev play-pause next playlist";

         .prev {
            grid-area: prev;
            display:flex;
            place-items: center;
         }
         .play-pause { grid-area: play-pause;}
         .next { grid-area: next;}
         .playlist { grid-area: playlist;}
         .song-details {
            grid-area: song-details;
            display:flex;
            flex-direction:column;
            justify-content:center;
            place-items:flex-start;
            text-align:left;   

            padding:0 20px;
         }

         .song-details .song-name{
            font-size:1.2rem;
            font-weight:400;
         }
         .song-details .artist{
            font-size:1rem;
            font-weight:600;
            color:#cdcdcd;
         }

      `; 
      const ControlElement=styled.div`
         /* padding:0 30px; */
         text-align:center;
         display:flex;
         justify-content:center;
         place-items: center;
         
         font-size:1.2rem;
         color:#cdcdcd;
         .fontawesome-icon{
            width:50px;
            height:50px;

            display:flex;
            justify-content:center;
            place-items:center;

            border-radius:50px;

            transition:0.2s ease-in-out;
         }
         &:hover > .fontawesome-icon {
            background-color: rgba(255,255,255,0.3);
            transition:0.2s ease-in-out;
         }    

      `;
