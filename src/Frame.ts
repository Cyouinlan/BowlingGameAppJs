export class Frame {
  roll1?: number;
  roll2?: number;

  constructor(roll1?: number) {
   this.roll1 = roll1;
  }

  getDisplayedRoll1(): string | number | undefined {
    if(this.roll1 === undefined && this.roll1 != 0){
        return
    }
    return this.isStrike() ? "X" : this.roll1;
  }

  getDisplayedRoll2() : string | number | undefined  {
    if(this.roll2 === undefined && this.roll2 != 0){
      return
    } else if(this.roll2 === 10) {
      return "X";
    }
    return this.isSpare() ? "/" : this.roll2;
  }

  isStrike(): boolean {
    return this.roll1 === 10;
  }

  isSpare(): boolean {
    return this.roll1 != undefined && this.roll2 != undefined && this.roll1 + this.roll2 === 10;
  }

  isDone(): boolean {
    return this.isStrike() || this.roll2 != undefined;
  }
}
