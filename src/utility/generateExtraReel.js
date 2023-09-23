export const generateExtraReel = () => {
    const randomNumber = +(Math.random() * 100).toFixed(2);
    
    let result;

    if (randomNumber < 12) {
        result = true;
    } else if (randomNumber <= 100) {
        result = false;
    } else {
        alert("Error in generateExtraReel()");
        result = "other";
    }

    // console.log(randomNumber, result, "GeneratedExtraReel");

    return result;
}

//kargi iyo 20-ze