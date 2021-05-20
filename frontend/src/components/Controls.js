import React, { Component } from 'react'

import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStepBackward, faStepForward, faList } from '@fortawesome/free-solid-svg-icons'
import { icon } from '@fortawesome/fontawesome-svg-core';

export default class controls extends Component {
   constructor(){
      super();
      this.state={
         isPlaying: false
      };
      this.changeButton=this.changeButton.bind(this);

      
   }
   
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
      
      return (
         <div>
            <MusicPlayer>
               <ControlElement className="song-details">
                  <div className="song-name">Song name</div>
                  <div className="artist">Artist</div>
               </ControlElement>
               <ControlElement className="prev" >
                  <div className="fontawesome-icon">
                     <FontAwesomeIcon icon={faStepBackward} ></FontAwesomeIcon>
                  </div>
               </ControlElement>
               <ControlElement className="play-pause" onClick={this.changeButton}>
                  <div className="fontawesome-icon">
                     <FontAwesomeIcon id='play-pause-icon' icon={this.state.isPlaying?faPause:faPlay}/>
                  </div>
                  
               </ControlElement>
               <ControlElement className="next"  >
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
