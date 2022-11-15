export const truncateString = (fullStr, strLen) => {
    if (fullStr.length > strLen) {
        return fullStr.substring(0, strLen) + "...";
    }
};
