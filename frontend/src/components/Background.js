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
   return (
      <BackgroundLayer>
         <QuoteCard className="quote-card"></QuoteCard>
         <Controls className="control-card"></Controls>
         {/* <VisualizerComponent AUDIO_URL="./music/Lucky_Ones.mp3"></VisualizerComponent> */}
      </BackgroundLayer>
   )
}
