import React from 'react'
import styled from 'styled-components'

function QuoteCard() {
   const CardComponent= styled.div`
      width:60vw;
      height:60vh;
      max-height:448px;
      border-radius: 20px;
      display:flex;
      justify-content:center;
      place-items:center;

      background-color:rgba(255,255,255,0.05);
      margin-bottom:20px;
   `;
   const TextContent= styled.p`
      font-family: 'Poppins';
      font-size: 2rem;
      text-align:left;
      color: #fefefe;
      width: 70%;
      position: relative;
      top:-20px;
   `;
   return (
      <CardComponent>
         <TextContent>
            Anim duis cillum ullamco qui labore commodo elit fugiat.
         </TextContent>
      </CardComponent>
   )
}
export default QuoteCard;