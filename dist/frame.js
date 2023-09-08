"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
class Frame {
    constructor(roll1, roll2) {
        this.roll1 = roll1;
        this.roll2 = roll2;
    }
    getDisplayedRoll1() {
        if (this.roll1 === undefined && this.roll1 != 0) {
            return;
        }
        return this.isStrike() ? "X" : this.roll1;
    }
    getDisplayedRoll2() {
        if (this.roll2 === undefined && this.roll2 != 0) {
            return;
        }
        else if (this.roll2 === 10) {
            return "X";
        }
        return this.isSpare() ? "/" : this.roll2;
    }
    isStrike() {
        return this.roll1 === 10;
    }
    isSpare() {
        return this.roll1 != undefined && this.roll2 != undefined && this.roll1 + this.roll2 === 10;
    }
    isDone() {
        return this.isStrike() || this.roll2 != undefined;
    }
}
exports.Frame = Frame;
