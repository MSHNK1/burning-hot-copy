import { styled } from "styled-components";
import Reel from "./reel/reel";

const ReelsContainer = styled.div`
    width: calc(100% - 2 * 50px);
    height: 100%;
    border: 1px solid red;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 16px;
`;

function Reels() {

    return (
        <ReelsContainer>
            <Reel></Reel>
        </ReelsContainer>
  )
}

export default Reels;