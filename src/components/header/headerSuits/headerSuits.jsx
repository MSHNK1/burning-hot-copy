import { useState } from "react";
import PropTypes from "prop-types";
import { modifyNumber } from "../../../utility/numberUtils";

import { styled } from "styled-components";
import './headerSuits.css';

import HeaderSuitModal from "./headerSuitModal/headerSuitModal";

import clubs from "/assets/images/Card-clubs.svg";
import diamonds from "/assets/images/Card-diamonds.svg";
import hearts from "/assets/images/Card-hearts.svg";
import spades from "/assets/images/Card-spades.svg";


let SuitContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: min-content;
    width: 100%;
    border: 1px solid white;
    border-radius: 4px;
    background-color: #2a3129;
    position: relative;
`;
let Image = styled.img`
    height: 36px;
    width: auto;
    border-right: 1px solid white;
    padding: 4px;
    `;
let Jackpot = styled.div`
    display: flex;
    align-items: center;
    padding-right: 4px;
`;
let Amount = styled.p`
    font-size: 24px;
    border-right: 1px solid white;
    margin: 0;
    padding-right: 4px;
    white-space: nowrap;
`;
let Currency = styled.div`
    display: flex;
    flex-direction: column;
`;


function HeaderSuits(props) {
    let suits = [];
    suits.push(clubs, diamonds, hearts, spades);
    const selectedSuit = suits.find((suit) => suit.includes(props.suit));

    const [isShowModal, setToggleModal] = useState(false);

    const showModal = () => {
        setToggleModal(true);
    }

    const hideModal = () => {
        setToggleModal(false);
    }


    return (
        <>
            <SuitContainer onPointerEnter={showModal} onPointerLeave={hideModal}>
                {isShowModal && <HeaderSuitModal isShown={isShowModal} jackpot={props.jackpot} />}
                <Image draggable="false" src={selectedSuit} alt={selectedSuit} />
                <Jackpot>
                    <Amount>{modifyNumber(props.amount)}</Amount>
                    <Currency>
                        <p className="currency">E</p>
                        <p className="currency">U</p>
                        <p className="currency">R</p>
                    </Currency>
                </Jackpot>
            </SuitContainer>
        </>
    );
}

HeaderSuits.propTypes = {
    suit: PropTypes.oneOf(["clubs", "diamonds", "hearts", "spades"]).isRequired,
    amount: PropTypes.number,
    jackpot: PropTypes.object,
};

export default HeaderSuits;
