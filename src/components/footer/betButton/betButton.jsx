import { styled } from "styled-components";
import { modifyNumber } from "../../../utility/numberUtils";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

let BetButton = styled.div`
    cursor: pointer;
    border-radius: 4px;
    padding: 0 8px;
    border: 1px solid white;
    background: #3f3c3c;

    & > p {
        font-size: 10px;
    }

    & > p:last-child,
    &.active > p {
        color: yellow;
    }

    &.active {
        background: #57a257;
        border-color: #63d763;
    }

    &:active:not(.active) {
        transform: translateY(4px);
        transition: transform .1s ease-in-out;
    }
`;

function Button(props) {
    const [activeBet, setActiveBet] = useState(0);
    const audioRef = useRef(null);
    
    const handleRoll = i => {
        setActiveBet(i);
        props.onRoll(i);
        if (!props.isMuted) {
            audioRef.current.play(); 
        }
    }

    return (
        <div>
            <p style={{fontSize: "12px", marginBottom: "11px"}}>
                {props.balanceAndLastWin >= props.bets[activeBet] 
                ? "PLEASE PLACE YOUR BETS"
                : "INSUFFICIENT BALANCE "}
            </p>

            <audio ref={audioRef}>
                <source src="/src/assets/audio/betButton.mp3" type="audio/mpeg" />
                <p>Your browser does not support the audio element.</p>
            </audio>

            <div style={{display: "flex", gap: "10px"}}>
                {props.bets.map((bet, index) => (
                    <BetButton 
                        key={index} 
                        className={`${index === activeBet ? "active" : ""}`} 
                        onClick={() => handleRoll(index)}
                    >
                        <p>EUR</p>
                        <h3>{modifyNumber(bet)}</h3>
                        <p>BET</p>
                    </BetButton>
                ))}
            </div>
        </div>
    );
}

Button.propTypes = {
    bets: PropTypes.array,
    balanceAndLastWin: PropTypes.number,
    isMuted: PropTypes.bool,
    onRoll: PropTypes.func,
};

export default Button;