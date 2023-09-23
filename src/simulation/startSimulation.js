import { generate1to3 } from "../utility/generate1to3";
import { generateExtraReel } from "../utility/generateExtraReel";
import { generateWild } from "../utility/generateWild";
import { bell, berry, dollar, grapes, lemon, orange, plum, reelSymbolsList0, reelSymbolsList1, reelSymbolsList2, reelSymbolsList3, reelSymbolsList4, seven, star, watermelon, wild } from "../utility/reelSymbolsList";
import { symbolsWeight } from "../utility/symbolsWeight";

export default function startSimulation() {
    let simulationResults = [];
    let simulationN = 10**7;
    let firstReel = [];
    let nonScatters = [berry, bell, watermelon, orange, seven, lemon, plum, grapes];

    const separateSymbolsResults = {
        seven: {
            2: 0, 
            3: 0, 
            4: 0,
            5: 0
        },
        berry: {
            3: 0,
            4: 0,
            5: 0
        },
        lemon: {
            3: 0,
            4: 0,
            5: 0
        },
        plum: {
            3: 0,
            4: 0,
            5: 0
        },
        orange: {
            3: 0,
            4: 0,
            5: 0
        },
        bell: {
            3: 0,
            4: 0,
            5: 0
        },
        grapes: {
            3: 0,
            4: 0,
            5: 0
        },
        watermelon: {
            3: 0,
            4: 0,
            5: 0
        },
        dollar: {
            3: 0,
            4: 0,
            5: 0
        },
        star: {
            3: 0,
        }
    };
    
    const symbolsRTPResults = {};
    const separateSymbolsRTPResults = {};
    const start = Date.now();

    const reelsData = [
        reelSymbolsList0,
        reelSymbolsList1,
        reelSymbolsList2,
        reelSymbolsList3,
        reelSymbolsList4,
    ];

    const developmentPurposeOnly = [
        reelSymbolsList0,
        reelSymbolsList1,
        reelSymbolsList2,
        reelSymbolsList3,
        reelSymbolsList4,
    ];
    console.log(developmentPurposeOnly);

    console.log(reelSymbolsList0.length, reelSymbolsList1.length, reelSymbolsList2.length, reelSymbolsList3.length, reelSymbolsList4.length);

    function oneSimulation(i) {
        const payLine = [
            {id: 0, payLine0: []},  //000 - top
            {id: 1, payLine1: []},  //111 - middle
            {id: 2, payLine2: []},  //222 - bottom
            {id: 3, payLine3: []},  //01210 - top-bottom-top
            {id: 4, payLine4: []},  //21012 - bottom-top-bottom
        ];

        const symbolsListArray = [
            {id: 0, reel: [seven, seven, seven]}, 
            {id: 1, reel: [seven, seven, seven]}, 
            {id: 2, reel: [seven, seven, seven]}, 
            {id: 3, reel: [seven, seven, seven]}, 
            {id: 4, reel: [seven, seven, seven]}, 
        ]
        // console.log(symbolsListArray);

        function addToPayline(reelIndex) {
            if (symbolsListArray[reelIndex].reel.includes("wild")) {
                for (let i = 0; i < payLine.length; i++) {
                    payLine[i]["payLine" + i].push(wild);
                }
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
                // console.log(payLine);
                payRulesScatters();
                payRulesNonScatters();
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
                // console.log(numberOfDollars, "-მაგი მოგება დოლარებით");
                payPrize(dollar, numberOfDollars);
            }
            
            if (numberOfStars == 3) {
                // console.log(numberOfStars, "-მაგი მოგება ვარსკვლავებით");
                payPrize(star, numberOfStars);
            }
        }

        function spreadWild(payLineNumber, numberOfCombinedSymbols) {
            const wildIndexesInPayline = [];
            for (let i = 1; i < numberOfCombinedSymbols; i++) {
                if (payLineNumber[i] === wild) {
                    wildIndexesInPayline.push(i);
                }
            }
            
            wildIndexesInPayline.forEach(i => {
                // const updatedArray = symbolsListArray;
                const updatedArray = [...symbolsListArray];
                const indexToChange = updatedArray.findIndex(item => item.id === i);
            
                updatedArray[indexToChange] = {
                    ...updatedArray[indexToChange],
                    reel: [wild, wild, wild],
                };
                // console.log(updatedArray);
                // console.log(symbolsListArray);
            });
        }

        function payRulesNonScatters() {
            payLine.forEach(payLine => {
                // console.log(payLine[`payLine${payLine.id}`]);
                let numberOfCombinedSymbols = 1;
                let payLineNumber = payLine[`payLine${payLine.id}`]
                
                for (let i = 0; payLineNumber[i + 1] === payLineNumber[i] || payLineNumber[i + 1] === wild || payLineNumber[i + 1] === payLineNumber[0]; i++) {
                    numberOfCombinedSymbols += 1;
                }

                if (numberOfCombinedSymbols >= 2 && payLineNumber[0] === seven) {
                    // console.log(numberOfCombinedSymbols, "შვიდიანებით მოგება");
                    payPrize(payLineNumber[0], numberOfCombinedSymbols);
                    spreadWild(payLineNumber, numberOfCombinedSymbols);
                }
                
                if (numberOfCombinedSymbols >= 3 && payLineNumber[0] !== seven && payLineNumber[0] !== star && payLineNumber[0] !== dollar) {
                    // console.log(numberOfCombinedSymbols, payLineNumber[0], "-ით", "მოგება");
                    payPrize(payLineNumber[0], numberOfCombinedSymbols);
                    spreadWild(payLineNumber, numberOfCombinedSymbols);
                }

                // console.log(payLineNumber[0], payLineNumber[1], payLineNumber[2], payLineNumber[3], payLineNumber[4], numberOfCombinedSymbols);
            });

            let winPrize = winPrizeArray.reduce((accumulator, value) => {
                return accumulator + value;
            }, null);

            simulationResults.push(winPrize ? winPrize : 0);
            
            if (i === simulationN - 1) {
                let resultsN = simulationResults.length;

                if (resultsN != simulationN) {
                    alert("Error! Number of Results does not match to the Number of Simulations!");
                }

                let simulationWin = 0;
                let squaredDifferencesSum = 0;
                let numberOfZeroWinning = 0;

                for (let i = 0; i < resultsN; i++) {
                    simulationWin += simulationResults[i];
                    
                    if (simulationResults[i] === 0) {
                        numberOfZeroWinning++;
                    }
                }

                let mean = simulationWin / resultsN;

                for (let i = 0; i < resultsN; i++) {   
                    squaredDifferencesSum += (simulationResults[i] - mean) ** 2;
                    // console.log(mean, squaredDifferencesSum);
                }
                
                let hitFrequency = (simulationN - numberOfZeroWinning) * 100 / simulationN;
                let simulationProfit = simulationWin / simulationN;
                let simulationProfitPercentage = simulationProfit * 100;
                let variance = squaredDifferencesSum / (simulationN - 1);
                
                for (const symbol in separateSymbolsResults) {
                    separateSymbolsRTPResults[symbol] = {};
                    
                    const resultObj = separateSymbolsResults[symbol];
                    const weightObj = symbolsWeight[symbol];
                    
                    for (const number in resultObj) {
                        separateSymbolsRTPResults[symbol][number] = +(resultObj[number] * weightObj[number] * 100 / simulationN).toFixed(2);
                    }
                }

                for (const symbol in separateSymbolsRTPResults) {
                    const symbolData = separateSymbolsRTPResults[symbol];
                    let sum = 0;
                    
                    for (const key in symbolData) {
                        sum += symbolData[key];
                    }

                    symbolsRTPResults[symbol] = +sum.toFixed(2);
                }

                console.log(mean);
                console.log(simulationResults);
                
                console.group("Results");
                    console.log("Final balance:", simulationWin);
                    console.log("RTP in %:", simulationProfitPercentage);
                    console.log("Hit Frequency in %:", hitFrequency);
                    console.log("Variance:", variance);
                    console.log(+simulationN, "Simulations in", Date.now() - start, "ms");
                console.groupEnd();
                
                console.log(separateSymbolsResults);
                console.log(separateSymbolsRTPResults);
                console.log(symbolsRTPResults);

                console.dir({
                    "Number of simulations:": simulationN,
                    "Final balance:": simulationWin,
                    "RTP in %:": simulationProfitPercentage,
                    "Hit Frequency in %:": hitFrequency,
                })
            }
            
            // if (winPrize > 0) {
            //     setLastWinPrize(winPrize);
            // }

            // props.onPayPrize(winPrize, lastWinPrize);
        }

        function payPrize(symbol, number) {
            // let bet = 1;
            // console.log("payPrize:", bet, props.bet);
            let oneWinPrize = symbolsWeight[symbol][number];
            // let oneWinTimePrize = symbolsWeight[symbol][number];
            // console.log("მოგება EUR:", oneWinPrize, symbol, number);
            // console.log(`მოგება არის ${oneWinPrize}-მაგი ${number} ${symbol}-თ`);
            // console.log(symbol, number);
            separateSymbolsResults[symbol][number] += 1;
            // separateSymbolsRTPResults[symbol][number] += +(oneWinPrize * 100 / simulationN);

            // console.log(separateSymbolsResults);
            // console.log(separateSymbolsRTPResults);

            winPrizeArray.push(Number(oneWinPrize.toFixed(2)));
        }

        function randomNumber(min, symbLength) {
            return Math.floor(Math.random() * (symbLength - min) + min);
        }
        
        const generateSymbol = (reelIndex, wildReel, wildPosition) => {
            const reel = symbolsListArray[reelIndex];
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
            
            // console.log(wildReel);
            let extraReel = false;
            if (reelIndex === 1 && wildReel.length === 0) {
                extraReel = generateExtraReel();
            }
            // console.log(extraReel);
            if (extraReel) {
                // const firstReel = [symbolsListArray[0][reel]];
                // console.log(firstReel);
                let secondReel = nonScatters.filter(item => !firstReel.includes(item));
                let randomSymbol = randomNumber(0, secondReel.length); 
                // console.log(secondReel, randomSymbol, secondReel[randomSymbol]);

                reel.reel = [secondReel[randomSymbol], secondReel[randomSymbol], secondReel[randomSymbol]];
            } else {
                reel.reel = [reelsData[reelIndex][topSymb], reelsData[reelIndex][midSymb], reelsData[reelIndex][botSymb]];
            }

            if (reelIndex === 0) {
                firstReel = reel.reel;
            }

            //insert wild(s)
            const hasStar = reel.reel.includes(star);
            const hasDollar = reel.reel.includes(dollar);

            for (let i = 0; i < wildReel.length; i++) {
                if (reelIndex === wildReel[i]) {
                    if (!hasStar && !hasDollar) {
                        reel.reel[wildPosition[i] - 1] = wild;
                    } else if (hasStar) {
                        let starIndex = reel.reel.indexOf("star");
                        reel.reel[starIndex] = wild;
                    } else if (hasDollar) {
                        let dollarIndex = reel.reel.indexOf("dollar");
                        reel.reel[dollarIndex] = wild;
                    }
                }
            }

            // console.log(reelIndex, reel, symbolsListArray);
            
            addToPayline(reelIndex);
        }

        let isRolling = true;

        if (isRolling) {
            let wildAmount;
            let wildReel = [];
            let wildPosition = [];
            let wildReelItem;
            let index;
            
            wildAmount = generateWild();
            // console.log(+wildAmount, "wild");

            if (wildAmount > 0 && wildAmount <= 3) {
                switch (wildAmount) {
                    case 1:
                        wildReel.push(generate1to3());
                        wildPosition.push(generate1to3());
                        // console.log("1 wild", wildReel, wildPosition);
                        break;
                        
                    case 2:
                        wildReel = [1, 2, 3];
                        wildReelItem = generate1to3();
                        index = wildReel.indexOf(wildReelItem);
                        wildReel.splice(index, 1);
                        
                        wildPosition.push(generate1to3(), generate1to3());
                        
                        // console.log("2 wild", wildReel, wildPosition);
                        break;
                    case 3:
                        wildReel = [1, 2, 3];
                        wildPosition.push(generate1to3());
                        
                        // console.log("3 wild", wildReel, wildPosition);
                        break;

                    default:
                        alert("Error in wild amount switch!");
                        break;
                }
            }

            reelsData.forEach((_, index) => {
                generateSymbol(index, wildReel, wildPosition);
            });
            isRolling = false;
        }
    }

    for (let i = 0; i < simulationN; i++) {
        oneSimulation(i);
    }
}