import { styled } from "styled-components";
import Reel from "./reel/reel";
import { reelSymbolsList1, reelSymbolsList2, reelSymbolsList3, reelSymbolsList4, reelSymbolsList5 } from "../../../utility/reelSymbolsList";

const ReelsContainer = styled.div`
    width: calc(100% - 2 * 50px);
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 16px;
    margin: 16px 24px 8px;
`;

function Reels() {
    const reelsData = [
        reelSymbolsList1,
        reelSymbolsList2,
        reelSymbolsList3,
        reelSymbolsList4,
        reelSymbolsList5,
    ];

    return (
        <ReelsContainer>
            {reelsData.map((reelSymbolsList, index) => (
                <Reel listNumber={index} key={index} symbols={reelSymbolsList} />
            ))}
        </ReelsContainer>
  )
}

export default Reels;