function Cat(color) {
    Character.prototype.call(this);
    this.color = color;
}

Cat.prototype.getColor = function () {
    return this.color;
};
