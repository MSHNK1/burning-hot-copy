import { styled } from "styled-components";
import Reel from "./reel/reel";

const ReelsContainer = styled.div`
    width: calc(100% - 2 * 50px);
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    gap: 16px;
    margin: 16px 24px 8px;
`;

function Reels() {
    return (
        <ReelsContainer>
            <Reel />
            <Reel />
            <Reel />
            <Reel />
            <Reel />
        </ReelsContainer>
  )
}


export default Reels;