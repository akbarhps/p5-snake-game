function Cell(y, x) {
    this.y = y;
    this.x = x;

    this.draw = (type) => {
        strokeWeight(1);
        if (type === 'food') {
            fill(0, 255, 0);
        } else if (type === 'body') {
            fill(255, 0, 0);
        } else {
            fill(255);
        }
        rect(this.y * cellWidth, this.x * cellHeight, cellWidth, cellHeight);
    };
}