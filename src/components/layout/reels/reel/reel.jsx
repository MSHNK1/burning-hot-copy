import { keyframes, styled } from "styled-components";
import Symbol from "../../../symbols/symbol";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from '../../../../store/actions/index';

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
    /* max-height: 456px; */
    overflow: hidden;
    
    &.rolling > * {
        animation: ${rollAnimation} 1s linear;
        /* animation: ${rollAnimation} .8s cubic-bezier(.17,.77,.06,.9); */
    }
`;


// export const Reel = (props) => {
function Reel(props) {
    const symbols = ["berry", "lemon", "orange", "seven", "star", "blueBerry", "blueBerry", "blueBerry", "grapes", "lemon", "grapes", "seven", "orange", "star", "grapes", "lucky", "lemon", "lemon", "orange", "orange", "seven", "grapes"];

    const [symbol1, setSymbol1] = useState(symbols[3]);
    const [symbol2, setSymbol2] = useState(symbols[3]);
    const [symbol3, setSymbol3] = useState(symbols[3]);

    let symbLength = symbols.length;

    function randomNumber(min) {
        return Math.floor(Math.random() * (symbLength - min) + min);
    }

    const generateSymbol = () => {
        let randNumber = randomNumber(0);
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
        // console.log(topSymb, midSymb, botSymb);
    }    
        
    useEffect(() => {
        if (props.isRolling) {
            generateSymbol();
            console.log(props.isRolling);
            props.onDoneRolling();
        }
    }, [props.isRolling]);

    return (
        <ReelContainer className={props.isRolling ? "rolling" : ""}>
            <Symbol name={symbol1} />
            <Symbol name={symbol2} />
            <Symbol name={symbol3} />
        </ReelContainer>
    )
}

Reel.propTypes = {
    isRolling: PropTypes.bool,
    onDoneRolling: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        isRolling: state.rolling.initialRolling
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onDoneRolling: () => dispatch(actions.doneRolling()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reel);