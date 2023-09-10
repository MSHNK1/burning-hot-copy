import { useState, useEffect } from "react";
import { styled } from "styled-components";
import Reel from "./reel/reel";
import { dollar, lucky, reelSymbolsList0, reelSymbolsList1, reelSymbolsList2, reelSymbolsList3, reelSymbolsList4, star } from "../../../utility/reelSymbolsList";
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';
import PropTypes from "prop-types";
import { seven } from '../../../utility/reelSymbolsList';
import { symbolsWeight } from "../../../utility/symbolsWeight";

const ReelsContainer = styled.div`
    width: calc(100% - 2 * 50px);
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 16px;
    margin: 16px 24px 8px;
`;

function Reels(props) {
    const reelsData = [
        reelSymbolsList0,
        reelSymbolsList1,
        reelSymbolsList2,
        reelSymbolsList3,
        reelSymbolsList4,
    ];

    const [lastWinPrize, setLastWinPrize] = useState(0);
    const [symbolsListArray, setSymbolsListArray] = useState([
        {id: 0, reel: [seven, seven, seven]}, 
        {id: 1, reel: [seven, seven, seven]}, 
        {id: 2, reel: [seven, seven, seven]}, 
        {id: 3, reel: [seven, seven, seven]}, 
        {id: 4, reel: [seven, seven, seven]}, 
    ])

    const payLine = [
        {id: 0, payLine0: []},  //000 - top
        {id: 1, payLine1: []},  //111 - middle
        {id: 2, payLine2: []},  //222 - bottom
        {id: 3, payLine3: []},  //01210 - top-bottom-top
        {id: 4, payLine4: []},  //21012 - bottom-top-bottom
    ];

    function addToPayline(reelIndex) {
        if (symbolsListArray[reelIndex].reel.includes("lucky")) {
            payLine[0].payLine0.push(lucky);
            payLine[1].payLine1.push(lucky);
            payLine[2].payLine2.push(lucky);
            payLine[3].payLine3.push(lucky);
            payLine[4].payLine4.push(lucky);
        } else {
            payLine[0].payLine0.push(symbolsListArray[reelIndex].reel[0]);
            payLine[1].payLine1.push(symbolsListArray[reelIndex].reel[1]);
            payLine[2].payLine2.push(symbolsListArray[reelIndex].reel[2]);

            switch (reelIndex) {
                case 0:
                case 4:
                    payLine[3].payLine3.push(symbolsListArray[reelIndex].reel[0]);
                    payLine[4].payLine4.push(symbolsListArray[reelIndex].reel[2]);
                    break;
                case 1:
                case 3:
                    payLine[3].payLine3.push(symbolsListArray[reelIndex].reel[1]);
                    payLine[4].payLine4.push(symbolsListArray[reelIndex].reel[1]);
                    break;
                case 2:
                    payLine[3].payLine3.push(symbolsListArray[reelIndex].reel[2]);
                    payLine[4].payLine4.push(symbolsListArray[reelIndex].reel[0]);
                    break;
                default:
                    alert("Error in addToPayLine() function!");
                    break;
            }
        }
        if (reelIndex === 4) {
            console.log(payLine);
            payRulesScatters();
            payRules();
        }
    }
    
    let winPrizeArray = [];

    function payRulesScatters() {
        let numberOfDollars = 0;
        let numberOfStars = 0;
        
        symbolsListArray.forEach(object => {
            if (object.reel.includes(dollar)) {
                numberOfDollars += 1;
            }
            
            if (object.reel.includes(star)) {
                numberOfStars += 1;
            }
        });

        if (numberOfDollars >= 3) {
            console.log(numberOfDollars, "-მაგი მოგება დოლარებით");
            payPrize(dollar, numberOfDollars);
        }
        
        if (numberOfStars == 3) {
            console.log(numberOfStars, "-მაგი მოგება ვარსკვლავებით");
            payPrize(star, numberOfStars);
        }
    }

    function payRules() {
        payLine.forEach(payLine => {
            let numberOfCombinedSymbols = 1;
            let payLineNumber = payLine[`payLine${payLine.id}`]
            
            for (let i = 0; payLineNumber[i + 1] === payLineNumber[i] || payLineNumber[i + 1] === lucky || payLineNumber[i + 1] === payLineNumber[0]; i++) {
                numberOfCombinedSymbols += 1;
            }

            if (numberOfCombinedSymbols >= 2 && payLineNumber[0] === seven) {
                console.log(numberOfCombinedSymbols, "-მაგი მოგება შვიდიანებით");

                // let bet = 0.15;
                // const symb = payLineNumber[0];
                // let winPrize = bet * symbolsWeight[symb][numberOfCombinedSymbols];
                // console.log(winPrize, "მოგება 7-იანებით");
                
                payPrize(payLineNumber[0], numberOfCombinedSymbols);
            }
            
            if (numberOfCombinedSymbols >= 3 && payLineNumber[0] !== seven && payLineNumber[0] !== star && payLineNumber[0] !== dollar) {
                // console.log(numberOfCombinedSymbols, "-მაგი მოგება", payLineNumber[0], "-ით");
                payPrize(payLineNumber[0], numberOfCombinedSymbols);
            }

            console.log(payLineNumber[0], payLineNumber[1], payLineNumber[2], payLineNumber[3], payLineNumber[4], numberOfCombinedSymbols);
        });

        let winPrize = winPrizeArray.reduce((accumulator, value) => {
            return accumulator + value;
        }, null);
        
        // let lastWinPrize = 0;
        if (winPrize > 0) {
            setLastWinPrize(winPrize);
            // lastWinPrize = winPrize;
        }

        props.onPayPrize(winPrize, lastWinPrize);
    }
    
    function payPrize(symbol, number) {
        let bet = 0.15;
        let oneWinPrize = bet * symbolsWeight[symbol][number];
        console.log(oneWinPrize, "მოგება", symbol, number);

        winPrizeArray.push(Number(oneWinPrize.toFixed(2)));

        // props.onPayPrize(winPrize);
    }

    function randomNumber(min, symbLength) {
        return Math.floor(Math.random() * (symbLength - min) + min);
    }
    
    const generateSymbol = (reelIndex) => {
        // console.log(payLine2);
        const newSymbolsListArray = [...symbolsListArray];
        const reel = newSymbolsListArray[reelIndex];
        // console.log(reelsData, reelIndex);
        const symbLength = reelsData[reelIndex].length;
        let randNumber = randomNumber(0, symbLength);
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

        reel.reel = [reelsData[reelIndex][topSymb], reelsData[reelIndex][midSymb], reelsData[reelIndex][botSymb]];
        
        // console.log(reelIndex, reel.reel[0], reel.reel[1], reel.reel[2]);
        // console.log(symbolsListArray);

        newSymbolsListArray[reelIndex] = reel;
        setSymbolsListArray(newSymbolsListArray);
        addToPayline(reelIndex);
    }

    useEffect(() => {
        if (props.isRolling) {
            reelsData.forEach((_, index) => {
                generateSymbol(index);
            });
            props.onDoneRolling();
        }
    }, [props.isRolling]);

    return (
        <ReelsContainer>
            {symbolsListArray.map((reelData) => (
                <Reel key={reelData.id} symbols={reelData.reel} />
            ))}
        </ReelsContainer>
  )
}

Reels.propTypes = {
    isRolling: PropTypes.bool,
    onDoneRolling: PropTypes.func,
    onPayPrize: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        isRolling: state.rolling.initialRolling
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onDoneRolling: () => dispatch(actions.doneRolling()),
        onPayPrize: (winPrize, lastWinPrize) => dispatch(actions.payPrize(winPrize, lastWinPrize)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reels);