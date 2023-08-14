import { styled } from "styled-components";
// import reels from '../../../../../src/assets/images/reelImages.jpg';
import Berry from "../../../symbols/berry";
import Lemon from "../../../symbols/lemon";


const ReelContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

function Reel() {
    return (
        <ReelContainer>
            <Berry></Berry>
            <Lemon></Lemon>
            {/* <img src={reels} style={{width: "80px"}} /> */}
            {/* <img src={reels} style={{width: "80px"}} /> */}
            {/* <img src={reels} style={{width: "80px"}} /> */}
            {/* <img src={reels} style={{width: "80px"}} /> */}
        </ReelContainer>
    )
}

export default Reel;