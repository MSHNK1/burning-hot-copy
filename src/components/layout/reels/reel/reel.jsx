import { keyframes, styled } from "styled-components";
import Symbol from "../../../symbols/symbol";
import { useState } from "react";

const rollAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(${156.55 * 8}px);
  }
`;

const ReelContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    border: 4px solid gold;
    border-radius: 4px;
    max-height: 456px;
    overflow: hidden;
    
    &.rolling > * {
        animation: ${rollAnimation} .8s cubic-bezier(.17,.77,.06,.9);
    }
`;


function Reel() {
    const symbols = ["berry", "lemon", "orange", "seven", "star", "blueBerry", "blueBerry", "blueBerry", "grapes", "lemon", "grapes", "seven", "orange", "star", "grapes", "lucky", "lemon", "lemon", "orange", "orange", "seven", "grapes"];

    const [isRolling, setIsRolling] = useState(false);
    const [symbol1, setSymbol1] = useState(symbols[3]);
    const [symbol2, setSymbol2] = useState(symbols[3]);
    const [symbol3, setSymbol3] = useState(symbols[3]);

    const handleClick = () => {
        setIsRolling(true);
        setTimeout(() => {
            setIsRolling(false);
        }, 1000); // Duration of animation

        generateSymbol();
    };
    

    let symbLength = symbols.length;

    function randomNumber(min) {
        return Math.floor(Math.random() * (symbLength - min) + min);
    }

    const generateSymbol = () => {
        let randNumber = randomNumber(0);
        // console.log(randNumber);
        // let symbol = symbols[randNumber];
        // console.log(symbol);
        let topSymb = randNumber;
        let midSymb;
        let botSymb;

        switch (randNumber) {
            case (symbLength - 2):
                midSymb = randNumber + 1;
                botSymb = 0;
                break;
            case (symbLength - 1):
                midSymb = 0;
                botSymb = 1;
                break;
            default:
                midSymb = randNumber + 1;
                botSymb = randNumber + 2;
                break;
        }

        setSymbol1(symbols[topSymb]);
        setSymbol2(symbols[midSymb]);
        setSymbol3(symbols[botSymb]);
        console.log(topSymb, midSymb, botSymb);
    }
    
    return (
        <ReelContainer className={isRolling ? "rolling" : ""} onClick={handleClick}>
            <Symbol name={symbol1} />
            <Symbol name={symbol2} />
            <Symbol name={symbol3} />
        </ReelContainer>
    )
}

export default Reel;