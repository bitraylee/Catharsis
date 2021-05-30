import { checkMaxIfStatementsInShader } from '@pixi/core';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function QuoteCard({content}) {
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
   const FlexContainer=styled.div`
   position: absolute;
   top:5vh;
   left:5vw;
   width:90vw;
   height: 90vh;
   display: flex;
   justify-content: space-between;
   align-items: center ;
   background:none;
   z-index: -1;
   /* background-color: red; */

   button{
      padding: 10px 20px;
      border-radius: 10px;
      background: none;
      border: none;
      color:#fefefe;
      font-size: 1.7rem;
      font-family: "Poppins";

      -webkit-transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
      transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
   }
   button:hover{
      background: rgba(255,255,255,0.12);
      
      
      -webkit-transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
      transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
      
   }`;
   let contents=[
      "Anim duis cillum ullamco qui labore commodo elit fugiat.",
      "Dolore adipisicing irure officia nulla dolore sit quis sunt amet.",
      "Eiusmod deserunt labore sint occaecat pariatur qui id occaecat amet ad eiusmod.",
      "Irure amet cupidatat consequat ex sit et dolor Lorem in fugiat et laborum.",
   ];
   let [count, setCount]= useState(0);
   // let checkState=function(like){
   //    if(like){
   //       count=(count==contents.length-1)?0:count+1;
   //    }
   //    else{
   //       count=(count==0)?contents.length-1:count-1;
   //    }
   // }
   return (
      <div style={{overflow:'hidden'}}>
         <FlexContainer>
            <button onClick={()=>{
               // setCount(()=>{
               //    checkState(false);
               // });
               setCount((count==0)?contents.length-1:count-1);

               console.log(contents[count]+" "+count);
            }}
            >Dislike</button>
            <button onClick={()=>{
               // setCount(()=>{
               //    checkState(true);
               // }
               // );
               setCount((count==contents.length-1)?0:count+1);
               console.log(contents[count]+" "+count);
            }
            }>Like</button>
         </FlexContainer>
         <CardComponent>
            <TextContent>
               {contents[count]}
            </TextContent>
         </CardComponent>
      </div>
      
   )
}
export default QuoteCard;