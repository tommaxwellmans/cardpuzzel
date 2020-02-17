function IntentGenerator () {}

IntentGenerator.prototype.generate = function () {
    return Math.floor(Math.random() * 10) % 2;
};