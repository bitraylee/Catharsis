import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
export default class QuoteCardClass extends Component {
    constructor() {
        super();
        this.state = {
            content: null,
            score: null,
        };
        this.getQuote = this.getQuote.bind(this);
    }
    async getQuote(action = null, score = null) {
        let url = `http://localhost:2000/quote`;
        if (action !== null && score !== null) {
            url += `/${action}?s=${score}`;
        }
        await axios(url)
            .then((res) => {
                let q = res.data.quote;
                let s = res.data.score;
                this.setState({
                    content: q,
                    score: s,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //Tobe edited and api call need to added in this section
    componentDidMount() {
        let data = this.getQuote();
        console.log(data);
    }
    render() {
        return (
            <div style={{ overflow: "hidden" }}>
                <FlexContainer>
                    <button
                        onClick={() => {
                            this.getQuote("left", this.state.score);
                        }}
                    >
                        Dislike
                    </button>
                    <button
                        onClick={() => {
                            this.getQuote("right", this.state.score);
                        }}
                    >
                        Like
                    </button>
                </FlexContainer>
                <CardComponent>
                    <TextContent>{this.state.content}</TextContent>
                </CardComponent>
            </div>
        );
    }
}
const CardComponent = styled.div`
    width: 60vw;
    height: 60vh;
    max-height: 448px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    place-items: center;

    background-color: rgba(255, 255, 255, 0.05);
    margin-bottom: 20px;
`;
const TextContent = styled.p`
    font-family: "Poppins";
    font-size: 2rem;
    text-align: left;
    color: #fefefe;
    width: 70%;
    position: relative;
    top: -20px;
`;
const FlexContainer = styled.div`
    position: absolute;
    top: 5vh;
    left: 5vw;
    width: 90vw;
    height: 90vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: none;
    z-index: -1;
    /* background-color: red; */

    button {
        padding: 10px 20px;
        border-radius: 10px;
        background: none;
        border: none;
        color: #fefefe;
        font-size: 1.7rem;
        font-family: "Poppins";

        -webkit-transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
        transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
    }
    button:hover {
        background: rgba(255, 255, 255, 0.12);

        -webkit-transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
        transition: all 0.3s cubic-bezier(0.19, 0.69, 0.22, 0.89);
    }
`;
