const blocks = {};
function yield(name, options) {
    if (!blocks[name]) {
        blocks[name] = [];
    }

    if (options.fn) {
        blocks[name].push(options.fn(this));
    }
    return null;
}

function yieldFor(name) {
    const val = (blocks[name] || []).join("\n");
    blocks[name] = [];
    return val;
}

module.exports = { yield, yieldFor };