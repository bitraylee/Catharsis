import React from 'react'
import styled from 'styled-components'
import QuoteCard from './QuoteCard';

export default function Background() {
   const BackgroundLayer=styled.div`
      width:100vw;
      height:100vh;
      display:flex;
      justify-content:center;
      place-items:center;
      z-index:10;
      position:absolute;
      top:0;
      left:0;
      background-color:none;
      backdrop-filter: blur(20px);
      --webkit-backdrop-filter:blur(20px);
   `;
   return (
      <BackgroundLayer>
         <QuoteCard></QuoteCard>
      </BackgroundLayer>
   )
}
