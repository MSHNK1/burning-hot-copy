import './spinSettings.css';
import arrow1 from "../../../../assets/images/arrow-1.svg";
import arrow2 from "../../../../assets/images/arrow-2.svg";
import { styled } from 'styled-components';
import { useRef, useState } from 'react';
import CurlyButton from './curlyButton/curlyButton';

const TurboSpin = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 120px;
    left: -44px;
    height: 110px;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
    z-index: 100;
`;

function SpinSettings() {
    const [isScaling, setIsScaling] = useState(false);
    const [scalingTimeout, setScalingTimeout] = useState(null);
    const audioRef1 = useRef(null);
    const audioRef2 = useRef(null);
    
    const startScaling = () => {
        if (!isScaling) {
            setIsScaling(true);
            audioRef1.current.play();
        }
        
        if (scalingTimeout) {
            clearTimeout(scalingTimeout);
        }
        
        setScalingTimeout(
            setTimeout(() => {
                setIsScaling(false);
                audioRef1.current.pause(); 
                audioRef1.current.currentTime = 0; 
                audioRef2.current.play(); 
            }, 1000)
        );
    };
    
    const stopScaling = () => {
        audioRef1.current.pause(); 
        audioRef1.current.currentTime = 0; 
        if (scalingTimeout) {
            clearTimeout(scalingTimeout);
        }
        setIsScaling(false);
    };

    return (
        <>
            <audio ref={audioRef1}>
                <source src="/src/assets/audio/balloon.mp3" type="audio/mpeg" />
                <p>Your browser does not support the audio element.</p>
            </audio>
            <audio ref={audioRef2}>
                <source src="/src/assets/audio/balloon-blows-up.wav" type="audio/wav" />
                <p>Your browser does not support the audio element.</p>
            </audio>

            <TurboSpin onPointerLeave={stopScaling} onPointerUp={stopScaling} onPointerDown={startScaling} className={`${isScaling && "scaling"}`}>
                <svg viewBox="0 0 500 500" style={{height: "100%"}}>
                    <circle cx="50%" cy="50%" r="247" fill="none" stroke="white" strokeWidth="4" />
                    <circle cx="50%" cy="50%" r="245" fill="black" fillOpacity={0.8} />
                    <path id="curve" d="M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97" />
                    <text width="500">
                        <textPath xlinkHref="#curve">
                            HOLD FOR TURBO SPIN
                        </textPath>
                    </text>
                </svg>

                <img 
                    src={arrow1} 
                    alt='curly arrow' 
                    draggable="false"
                    style={{
                        position: "absolute",
                        top: "6%",
                        left: "17%",
                        width: "67%"
                    }}
                />
                
                <img 
                    src={arrow2} 
                    alt='curly arrow' 
                    draggable="false"
                    style={{
                        position: "absolute",
                        top: "33%",
                        left: "17%",
                        width: "67%"
                    }}
                />
            </TurboSpin>
            <CurlyButton top={true}></CurlyButton>
            <CurlyButton></CurlyButton>
        </>
    )
}

export default SpinSettings