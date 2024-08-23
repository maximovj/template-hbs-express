const blocks = {};
module.exports = {
    ExCompare: (valueA, operator, valueB, options) => {
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
    },
    yield: function (name, options) {
        if (!blocks[name]) {
            blocks[name] = [];
        }

        if (options.fn) {
            blocks[name].push(options.fn(this));
        }
        return null;
    },
    yieldFor: function (name) {
        const val = (blocks[name] || []).join("\n");
        blocks[name] = [];
        return val;
    }
};