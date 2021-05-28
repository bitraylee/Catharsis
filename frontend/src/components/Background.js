import React from 'react'
import styled from 'styled-components'
// import AudioVisualizer from './AudioVisualizer';
import Controls from './Controls';
import QuoteCard from './QuoteCard';
import VisualizerComponent from './VisualizerComponent'

export default function Background() {
   const BackgroundLayer=styled.div`
      width:100vw;
      height:100vh;
      
      z-index:10;
      position:absolute;
      top:0;
      left:0;
      background-color:none;
      backdrop-filter: blur(20px);
      --webkit-backdrop-filter:blur(20px);

      display:flex;
      justify-content:center;
      place-items:center;
      flex-direction:column;
   `;
   const trackList=[{
      trackno:1,
      name:"Moonlight Sonata (1st Movement)",
      artist: "Beethoven, Rosseu",
      src:"./music/Beethoven - Moonlight Sonata (1st Movement).mp3"
   },
   {
      trackno:2,
      name:"Water Ripples",
      artist: "Enno Aare",
      src:"./music/Enno Aare - Water Ripples.mp3"
   },
   {
      trackno:3,
      name:"Lucky Ones",
      artist: "Lana Del Ray",
      src:"./music/Lucky_Ones.mp3"
   }];
   return (
      <BackgroundLayer>
         <QuoteCard className="quote-card"></QuoteCard>
         <Controls className="control-card" trackList={{trackList}}></Controls>
      </BackgroundLayer>
   )
}
