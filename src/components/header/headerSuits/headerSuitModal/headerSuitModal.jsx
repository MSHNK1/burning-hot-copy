import { styled } from "styled-components";
import PropTypes from "prop-types";
import { modifyNumber } from "../../../../utility/numberUtils";


let Hover = styled.div`
    position: absolute;
    top: 65px;
    background-color: black;
    border-radius: 4px;
    border: 1px solid white;
    width: calc(100% - 16px);
    height: max-content;
    padding: 8px;
    z-index: 2;
`;
let ModalArrow = styled.div`
    position: absolute;
    top: 58px;
    left: calc(50% - 7px);
    width: 14px;
    height: 14px;
    background-color: black;
    border-top: 1px solid white;
    border-right: 1px solid white;
    transform: rotate(315deg);
    z-index: 3;
`;
let Row = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    align-items: center;
    text-align: left;
    gap: 24px;
`;
let Line = styled.div`
    height: 2px;
    width: 100%;
    background: linear-gradient(0.25turn, black, white, black);
    margin: 0 0 4px;
`;

function HeaderSuitModal(props) {
    return (
        <div 
            style={{position: "absolute", width: "100%"}} 
            className={`modal animate__animated ${props.isShown ? "animate__bounceInDown" : ""}`}
        >
            <Hover>
                <Row>
                    <p>Largest winner:</p>
                    <p>{props.jackpot.largestWinnerDate.toLocaleDateString()}</p>
                </Row>
                <h5 style={{marginBottom: "4px"}}>
                    {modifyNumber(props.jackpot.largestWinnerAmount)} <span style={{color: "yellow", fontSize: "10px"}}>EUR</span>
                </h5>
                <Line></Line>
                <Row>
                    <p>Number<br/>of winners:</p>
                    <p  style={{color: "yellow", textAlign: "right"}}>{props.jackpot.NofWinners}</p>
                </Row>
                <Line></Line>
                <Row>
                    <p>Last winner:</p>
                    <p style={{textAlign: "right"}}>{props.jackpot.lastWinnerDate.toLocaleDateString()}</p>
                </Row>
                <p style={{marginTop: "12px", color: "yellow", fontSize: "10px"}}>{props.jackpot.code}</p>
                <h5 style={{margin: 0}}>{modifyNumber(props.jackpot.lastWinnerAmount)} <span style={{color: "yellow", fontSize: "10px"}}>EUR</span></h5>
            </Hover>
            <ModalArrow></ModalArrow>
        </div>
    );
}

HeaderSuitModal.propTypes = {
    jackpot: PropTypes.shape({
        largestWinnerDate: PropTypes.object,
        largestWinnerAmount: PropTypes.number,
        NofWinners: PropTypes.number,
        lastWinnerDate: PropTypes.object,
        lastWinnerAmount: PropTypes.number,
        code: PropTypes.number,
    }),
    isShown: PropTypes.bool,
};

export default HeaderSuitModal;
