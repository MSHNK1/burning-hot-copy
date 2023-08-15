import { styled } from "styled-components";
import Symbol from "../../../symbols/symbol";

const ReelContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 4px solid gold;
    border-radius: 4px;
`;

function Reel() {
    return (
        <ReelContainer>
            <Symbol name={"berry"} />
            <Symbol name={"lemon"} />
            <Symbol name={"orange"} />
        </ReelContainer>
    )
}

export default Reel;