import { keyframes, styled } from "styled-components";
import Symbol from "../../../symbols/symbol";
import PropTypes from "prop-types";

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


function Reel(props) {
    return (
        <ReelContainer className={props.isRolling ? "rolling" : ""}>
            {props.symbols.map((symbol, index) => (
                <Symbol key={index} name={symbol} />
            ))}
        </ReelContainer>
    )
}

Reel.propTypes = {
    symbols: PropTypes.array,
    isRolling: PropTypes.bool,
};

export default Reel;