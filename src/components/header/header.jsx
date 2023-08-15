import { styled } from "styled-components";
import HeaderSuits from "./headerSuits/headerSuits";
import useIncrementInterval from "../../customHooks/useIncrementInterval";

const HeaderDiv = styled.div`
    cursor: default;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 100;
`;

function Header() {
    let clubsAmount = useIncrementInterval(97.44, 0.01, 50);
    let diamondsAmount = useIncrementInterval(517.67, 0.01, 100);
    let heartsAmount = useIncrementInterval(130389.11, 0.01, 300);
    let spadesAmount = useIncrementInterval(1638303.29, 0.01, 1000);

    let jackpotInfo = {
        clubs: {
            largestWinnerDate: new Date("2022-02-24"),
            largestWinnerAmount: 1631.20,
            NofWinners: 238696,
            lastWinnerDate: new Date("2023-08-08"),
            code: 310744,
            lastWinnerAmount: 107.56
        },
        diamonds: {
            largestWinnerDate: new Date("2023-06-24"),
            largestWinnerAmount: 3900.93,
            NofWinners: 88034,
            lastWinnerDate: new Date("2023-08-08"),
            code: 915783,
            lastWinnerAmount: 342.62
        },
        hearts: {
            largestWinnerDate: new Date("2022-12-24"),
            largestWinnerAmount: 790661.42,
            NofWinners: 632,
            lastWinnerDate: new Date("2023-04-08"),
            code: 126227,
            lastWinnerAmount: 236488.73
        },
        spades: {
            largestWinnerDate: new Date("2022-06-18"),
            largestWinnerAmount: 6123754.22,
            NofWinners: 24,
            lastWinnerDate: new Date("2023-03-27"),
            code: 176319,
            lastWinnerAmount: 1102402.35
        }
    }

    return (
        <HeaderDiv className="user-select-none">
            <HeaderSuits suit={"clubs"} amount={clubsAmount} jackpot={jackpotInfo.clubs} />
            <HeaderSuits suit={"diamonds"} amount={diamondsAmount} jackpot={jackpotInfo.diamonds} />
            <h3 style={{whiteSpace: "nowrap", color: "lightgreen", textShadow: "3px 0px 50px darkgreen"}}>
                BURNING HOT
            </h3>
            <HeaderSuits suit={"hearts"} amount={heartsAmount} jackpot={jackpotInfo.hearts} />
            <HeaderSuits suit={"spades"} amount={spadesAmount} jackpot={jackpotInfo.spades} />
        </HeaderDiv>
    )
}

export default Header;