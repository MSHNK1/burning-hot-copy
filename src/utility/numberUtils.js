export const modifyNumber = number => {
    let modifiedNumber = number.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).replace(/,/g, ' ');

    return modifiedNumber;
};