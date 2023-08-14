import { styled } from "styled-components";
import SpinSettings from "./spinSettings/spinSettings";
import PropTypes from "prop-types";

const Bar = styled.div`
    display: flex;
    flex-direction: column;
    outline: 3px solid #a3964e;
    border: 10px solid darkblue;
    margin: 32px 0;
    border-radius: 14px;
    width: min-content;
    background: darkblue;
    position: relative;

    & > p {
        font-size: 24px;
        text-shadow: 0px 0px 3px black;
    }

    & > p:first-child {
        border-top-right-radius: 8px;
        border-top-left-radius: 8px;
        color: yellow;
        text-shadow: 0px 0px 5px red;
        font-weight: bold;
        -webkit-text-stroke: 0.7px red;
    }
    
    & > p:last-child {
        border-bottom-right-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    & > p:not(:last-child) {
        margin-bottom: 1px;
    }
`;

const ShadowedText = styled.div`
    position: absolute;
    color: yellow;
    font-size: 13px;
    font-weight: bold;
    text-shadow: 0px 0px 5px red;
    -webkit-text-stroke: 0.7px red;
`;

const GreenSquare = styled.p`
    padding: 16px 8px;
    background: green;
    font-weight: bold;
    /* text-shadow: 0px 0px 5px black; */
    -webkit-text-stroke: 1px black;
`;


function LinesBar(props) {
  return (
    <Bar>
        <GreenSquare>5</GreenSquare>
        
        <ShadowedText style={{top: "36px", left: "-12px", fontSize: "20px"}}>LINES</ShadowedText>
        <ShadowedText style={{top: "54px", left: "-1px"}}>Fixed</ShadowedText>
        
        {props.right && <SpinSettings></SpinSettings>}

        <GreenSquare>4</GreenSquare>
        <GreenSquare>3</GreenSquare>
        <GreenSquare>2</GreenSquare>
        <GreenSquare>1</GreenSquare>
    </Bar>
  ) 
}

LinesBar.propTypes = {
    right: PropTypes.string,
};

export default LinesBar;