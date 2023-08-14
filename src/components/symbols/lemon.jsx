import allSymbols from "../../assets/images/reelImages.jpg";
import "./symbols.css";


function Lemon() {
  return (
    <div style={{overflow: "hidden", width: "178px", height: "180px"}}>
      <img className="lemon" src={allSymbols} />
    </div>
  )
}

export default Lemon; 