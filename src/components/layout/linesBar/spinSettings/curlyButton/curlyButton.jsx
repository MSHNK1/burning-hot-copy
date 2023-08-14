import { styled } from "styled-components";
import PropTypes from "prop-types";
import './curlyButton.css';
import arrow from '../../../../../assets/images/one-arrow.svg';
import play from '../../../../../assets/images/play.svg';

const Settings = styled.div`
    position: absolute;
    cursor: pointer;
`;

function CurlyButton(props) {
    return (
        <>
            {props.top ? (
                <Settings className="topSettings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="58" viewBox="0 0 64 58" fill="none">
                        <path d="M63 57.0008C41 45.0005 23 45.0005 1 57.0008V20.0007C13.5225 -5.32063 49.5281 -5.3488 63 20.0007V57.0008Z" stroke="rgb(131 231 141)" strokeWidth="3"/>
                    </svg>
                    <img src={arrow} alt="arrow" draggable="false" style={{width: "31px", position: "absolute", left: "15px", top: "11px"}}/>
                    <img src={play} alt="play" draggable="false" style={{width: "12px", position: "absolute", left: "27px", top: "19px"}}/>
                </Settings>
                ) : (
                <Settings className="bottomSettings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="58" viewBox="0 0 64 58" fill="none">
                        <path d="M63 57.0008C41 45.0005 23 45.0005 1 57.0008V20.0007C13.5225 -5.32063 49.5281 -5.3488 63 20.0007V57.0008Z" stroke="rgb(96 175 233)" strokeWidth="3"/>
                    </svg>
                </Settings>
                )
            }
        </>
    )
}

CurlyButton.propTypes = {
    top: PropTypes.bool,
};

export default CurlyButton;