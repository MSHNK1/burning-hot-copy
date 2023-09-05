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
    flex-direction: column;
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
    const symbolsList = props.symbols;
    const [symbol1, setSymbol1] = useState("seven");
    const [symbol2, setSymbol2] = useState("seven");
    const [symbol3, setSymbol3] = useState("seven");

    let symbLength = symbolsList.length;

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

        setSymbol1(symbolsList[topSymb]);
        setSymbol2(symbolsList[midSymb]);
        setSymbol3(symbolsList[botSymb]);
        
        console.log("Number of List:", (props.listNumber + 1),"   Symbols in the reel:", topSymb, midSymb, botSymb);
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
    symbols: PropTypes.array,
    listNumber: PropTypes.number,
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