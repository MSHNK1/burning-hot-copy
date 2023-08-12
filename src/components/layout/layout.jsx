import { styled } from "styled-components";
import LinesBar from "./linesBar/linesBar";

const LayoutCont = styled.div`
    display: flex;
    justify-content: space-between;
`;

function Layout() {
  return (
    <LayoutCont className="user-select-none">
        <LinesBar></LinesBar>
        {/* <Symbols></Symbols> */}
        <LinesBar right={"true"}></LinesBar>
    </LayoutCont>
  )
}

export default Layout;