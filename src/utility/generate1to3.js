export const generate1to3 = () => {
    const randomNumber = +(Math.random() * 300);
    
    let result;

    if (randomNumber < 100) {
        result = 1;
    } else if (randomNumber < 200) {
        result = 2;
    } else if (randomNumber < 300) {
        result = 3;
    } else {
        alert("Error in generate1to3()");
        result = "other";
    }

    console.log(randomNumber, result, "wildPosition");

    return result;
}