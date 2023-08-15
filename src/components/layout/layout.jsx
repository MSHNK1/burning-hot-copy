import { styled } from "styled-components";
import LinesBar from "./linesBar/linesBar";
import Reels from "./reels/reels";

const LayoutCont = styled.div`
    display: flex;
    justify-content: space-between;
`;

function Layout() {
  return (
    <LayoutCont className="user-select-none">
        <LinesBar />
        <Reels />
        <LinesBar right={"true"} />
    </LayoutCont>
  )
}

export default Layout;