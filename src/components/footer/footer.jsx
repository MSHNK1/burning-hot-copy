import { styled } from "styled-components";
import "./footer.css";
import { useContext, useRef, useState } from "react";
import { modifyNumber } from "../../utility/numberUtils";
import Button from "./betButton/betButton";
import { AudioContext } from "../../utility/AudioContext";

let FooterCont = styled.div`
    display: flex;
    justify-content: space-between;

    & > * {
        align-self: end;
    }
`;
let Fa = styled.div`
    background: black;
    border: 1px solid gray;
    border-radius: 4px;
    padding: 10px;
    line-height: 0;
    cursor: pointer;
    position: relative;
`;
let Amount = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
`;

function Footer() {
    const { isMuted, toggleMute } = useContext(AudioContext);
    const [balance, setBalance] = useState(2);
    const [lastWin, setLastWin] = useState(0);
    const audioRef = useRef(null);

    const toggleSpeaker = () => {
        toggleMute();

        if (!isMuted) {
            audioRef.current.pause(); 
            audioRef.current.currentTime = 0; 
        } else {
            audioRef.current.play(); 
        }
    }

    const handleFullscreenToggle = (show) => {
        switch (show) {
            case "show":
                document.documentElement.requestFullscreen();
                break;
            case "hide":
                document.exitFullscreen();
                break;
        }
    }

    const handleRoll = (i) => {
        if (bets[i] > balance + lastWin) return;

        if (i == 2) {
            setLastWin(1.5);
        } else {
            setLastWin(0);
        }
        const newBalance = balance - bets[i] + lastWin;

        // Update the state with the new balance
        setBalance(newBalance);
    }

    
    let bets = [0.15, 0.3, 0.75, 1.5, 3];

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

            <Button isMuted={isMuted} balanceAndLastWin={balance + lastWin} bets={bets} onRoll={handleRoll} />

            <Amount>
                <p style={{fontSize: "12px", marginBottom: "6px"}}>LAST WIN:</p>
                {modifyNumber(lastWin) > 0 ? (
                    <>
                        <p style={{fontSize: "28px", lineHeight: "36px", height: "36px"}}>{modifyNumber(lastWin)}</p>
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

export default Footer;