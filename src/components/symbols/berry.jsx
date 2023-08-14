import allSymbols from "../../assets/images/reelImages.jpg";
import "./symbols.css";


function Berry() {
  return (
    <div style={{overflow: "hidden", width: "178px", height: "180px"}}>
      <img className="berry" src={allSymbols} />
    </div>
  )
}

export default Berry;