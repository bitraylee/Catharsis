import React, { Component, useEffect } from 'react'


export default function VisualizerComponent(props) {   
   useEffect(()=>{
      window.startVisualizer(props.audio_url);
   });
   return (
      <div>
         {/* <h2 class="message">PLAY</h2> */}
         <div id="stage-cover"></div>
      </div>
   )
}