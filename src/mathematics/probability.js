import { reelSymbolsList0, reelSymbolsList4 } from "../utility/reelSymbolsList";
import { symbolsWeight } from "../utility/symbolsWeight";


export default function probabilityCalculator() {
    const symbolCounts = {
        reel0: {},
        reel1: {},
        reel2: {},
        reel3: {},
        reel4: {},
    };
    const symbolProbabilitys = {
        reel0: {},
        reel1: {},
        reel2: {},
        reel3: {},
        reel4: {},
    };

    calculateSymbolProbForReel(reelSymbolsList0, "reel0");
    calculateSymbolProbForReel(reelSymbolsList4, "reel4");
    
    function calculateSymbolProbForReel(reelSymbolsList, reel) {
        for (const symbol of reelSymbolsList) {
            if (!symbolCounts[reel][symbol]) {
                symbolCounts[reel][symbol] = 1;
            } else {
                symbolCounts[reel][symbol]++;
            }
        }
            
        for (const key in symbolCounts[reel]) {
            symbolProbabilitys[reel][key] = symbolCounts[reel][key] / reelSymbolsList.length;
            // console.log(key + " count:", symbolCounts[reel][key]);
            // console.log(key + " probability in reel 1:", symbolProbabilitys[reel][key]);
        }
    }

    // console.log("რაოდენობა", symbolCounts);
    // console.log("ალბათობა", symbolProbabilitys);

    const pStar = (3 * 3 / 50) * (3 * 2 / 50) * (3 * 3 / 50);
    const RTPstar = pStar * symbolsWeight["star"][3];
    // console.log("RTP of star is: " + RTPstar * 100 + "%");
    
    
    const pDollar5 = (3 * 3 / 50) * (3 * 3 / 50) * (2 * 3 / 50) * (3 * 3 / 50) * (3 * 3 / 50);
    const pDollar4 = (3 * 3 / 50) * (3 * 3 / 50) * (2 * 3 / 50) * (3 * 3 / 50) * ((50 - 3 * 3) / 50) * 4 + (3 * 3 / 50) * (3 * 3 / 50) * ((50 - 2 * 3) / 50) * (3 * 3 / 50) * (3 * 3 / 50) * 1;
    const pDollar3 = (3 * 3 / 50) * (3 * 3 / 50) * (2 * 3 / 50) * (3 * 3 / 50) * ((50 - 3 * 3) / 50) * 4 + (3 * 3 / 50) * (3 * 3 / 50) * ((50 - 2 * 3) / 50) * (3 * 3 / 50) * (3 * 3 / 50) * 6;
    
    const RTPdollar5 = pDollar5 * symbolsWeight["dollar"][5];
    const RTPdollar4 = pDollar4 * symbolsWeight["dollar"][4];
    const RTPdollar3 = pDollar3 * symbolsWeight["dollar"][3];

    const RTPdollar = RTPdollar5 + RTPdollar4 + RTPdollar3;
    // console.log("RTP of dollar is: " + RTPdollar * 100 + "%");
    // console.log("RTP of dollar3 is: " + RTPdollar3 * 100 + "%");
    // console.log("RTP of dollar4 is: " + RTPdollar4 * 100 + "%");
    // console.log("RTP of dollar5 is: " + RTPdollar5 * 100 + "%");


    const RTPscatters = RTPstar + RTPdollar;
    console.log(RTPscatters * 100 + "%");
}

