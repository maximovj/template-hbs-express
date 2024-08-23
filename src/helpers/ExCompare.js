const ExCompare = (valueA, operator, valueB, options) => {
    let result = false;
    switch (operator) {
        case '<': result = valueA < valueB; break;
        case '>': result = valueA > valueB; break;
        case '<=': result = valueA <= valueB; break;
        case '>=': result = valueA >= valueB; break;
        case '==': result = valueA == valueB; break;
        case '!==': result = valueA !== valueB; break;
        case '===': result = valueA === valueB; break;
    }
    return result ? options.fn(this) : options.inverse(this);
};

module.exports = { ExCompare };