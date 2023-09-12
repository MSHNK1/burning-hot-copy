import { styled } from "styled-components";
import "./footer.css";
import { useContext, useRef, useState } from "react";
import { modifyNumber } from "../../utility/numberUtils";
import Button from "./betButton/betButton";
import { AudioContext } from "../../utility/AudioContext";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actions from '../../store/actions/index';
import { useEffect } from "react";

const FooterCont = styled.div`
    display: flex;
    justify-content: space-between;

    & > * {
        align-self: end;
    }
`;
const Fa = styled.div`
    background: black;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 10px;
    line-height: 0;
    cursor: pointer;
    position: relative;
`;
const Amount = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
`;

// export const Footer = (props) => {
function Footer(props) {
    const { isMuted, toggleMute } = useContext(AudioContext);
    const [balance, setBalance] = useState(20);
    const [roll, setRoll] = useState(false);
    const audioRef = useRef(null);
    const [counting, setCounting] = useState(false);
    const [displayedNumber, setDisplayedNumber] = useState(0);
    const finalNumber = props.winPrize;

    const toggleSpeaker = () => {
        toggleMute();

        if (!isMuted) {
            audioRef.current.pause(); 
            audioRef.current.currentTime = 0; 
        } else {
            audioRef.current.play(); 
        }
    };

    const handleFullscreenToggle = (show) => {
        switch (show) {
            case "show":
                document.documentElement.requestFullscreen();
                break;
            case "hide":
                document.exitFullscreen();
                break;
            default:
                alert("Error in handleFullscreenToggle() function!");
                break;
        }
    };

    const handleRoll = (i) => {
        if (bets[i] > balance + props.winPrize) return;

        if (counting) {
            setBalance(balance - bets[i] + props.winPrize);
        } else {
            setBalance(balance - bets[i]);
        }
        
        if (!counting) {
            setCounting(true);
        }

        setRoll(true);
        props.onInitiateRolling(bets[i]);
        console.log("გაშვება");
    };
    

    useEffect(() => {
        if (counting) {
            const interval = setInterval(() => {
              let newDisplayedNumber = +displayedNumber + 0.10;
              newDisplayedNumber = Math.min(newDisplayedNumber, finalNumber);
              setDisplayedNumber(newDisplayedNumber.toFixed(2));
              
              if (newDisplayedNumber >= finalNumber) {
                setCounting(false);
              }
            }, 100);
      
            return () => clearInterval(interval);
        }

        if (roll) {
            setBalance(prevBalance => prevBalance + props.winPrize);
            setRoll(false);
        }
    }, [counting, displayedNumber, finalNumber, balance, roll, props.bet, props.winPrize])
    
    // let bets = [0.15, 0.3, 0.75, 1.5, 3];
    let bets = [0.1, 0.2, 0.3, 0.4, 0.5];

    return (
        <FooterCont className="user-select-none">
            <Fa style={{position: "unset", padding: "10px 14px", fontSize: "8px", lineHeight: "8px"}}>
                MORE<br />GAMES
            </Fa>

            <audio ref={audioRef}>
                <source src="/src/assets/audio/speaker.wav" type="audio/wav" />
                <p>Your browser does not support the audio element.</p>
            </audio>
            <Fa onClick={toggleSpeaker}>
                <div className={`red-cross${isMuted ? "" : " hide"}`}>
                    <div className="line-1"></div>
                    <div className="line-2"></div>
                </div>
                <i className="fas fa-volume-up"></i>
            </Fa>
            
            <Amount>
                <p style={{fontSize: "12px", marginBottom: "6px"}}>BALANCE:</p>
                <p style={{fontSize: "28px", lineHeight: "36px"}}>{modifyNumber(balance)}</p>
                <p style={{fontSize: "10px"}}>EUR</p>
            </Amount>

            <Button isMuted={isMuted} balanceAndLastWin={balance + props.winPrize} bets={bets} onRoll={handleRoll} />

            <Amount>
                <p style={{fontSize: "12px", marginBottom: "6px"}}>LAST WIN:</p>
                {(props.lastWinPrize + props.winPrize) > 0 ? (
                    <>
                        <p style={{fontSize: "28px", lineHeight: "36px", height: "36px"}}>
                            {props.winPrize > 0 ? displayedNumber : modifyNumber(props.lastWinPrize)}
                        </p>
                        <p style={{fontSize: "10px", height: "15px"}}>EUR</p>
                    </>
                ) : (
                    <>
                        <p style={{height: "36px"}}></p>
                        <p style={{height: "15px"}}></p>
                    </>
                )}
            </Amount>

            <Fa className="fs" onClick={() => handleFullscreenToggle("hide")}>
                <i className="fas fa-compress-arrows-alt"></i>
            </Fa>
            <Fa className="ns" onClick={() => handleFullscreenToggle("show")}>
                <i className="fas fa-expand-arrows-alt"></i>
            </Fa>
            
            <Fa>
                <i className="fas fa-bars"></i>
            </Fa>
        </FooterCont>
    )
}

Footer.propTypes = {
    isRolling: PropTypes.bool,
    onInitiateRolling: PropTypes.func,
    winPrize: PropTypes.number,
    lastWinPrize: PropTypes.number,
    bet: PropTypes.number
};

const mapStateToProps = state => {
    return {
        winPrize: state.payingg.winPrize,
        lastWinPrize: state.payingg.lastWinPrize,
        bet: state.rolling.bet,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onInitiateRolling: (bet) => dispatch(actions.initiateRolling(bet)),
        onDoneRolling: () => dispatch(actions.doneRolling()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);