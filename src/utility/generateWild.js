export const generateWild = () => {
    const randomNumber = +(Math.random() * 100).toFixed(2);
    const threeProbability = 0.2;
    const twoProbability = threeProbability + 2;
    const oneProbability = twoProbability + 10;
    const zeroProbability = 100;
    
    let result;

    // Determine the outcome based on the random number
    if (randomNumber < threeProbability) {
        result = 3;
    } else if (randomNumber < twoProbability) {
        result = 2;
    } else if (randomNumber < oneProbability) {
        result = 1;
    } else if (randomNumber < zeroProbability) {
        result = 0;
    } else {
        alert("Error in generateWild()");
        result = "other"; // in case randomNumber is greater than 100
    }

    console.log(randomNumber, result, "wild");

    return result;
}