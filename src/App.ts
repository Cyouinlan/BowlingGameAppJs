import { createInterface } from "readline";
import { Frame } from "./Frame";

const numberFrames = 10;

const frames: Frame[] = [];
const totalsScore: number[] = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function recordRolls() {
  if (isRecordingOver()) {
    rl.close();
  } else {
    rl.question("Combien de quilles tombées ? ", (answer: string) => {
      const pins: number = parseInt(answer);
      if (!isPinsNumberValid(pins)) {
        console.log("Nombre de quilles invalides");
        recordRolls();
        return;
      }
      registerRoll(pins);
      displayScores();
      recordRolls();
    });
  }
}

function getFrameLine(): string {
  let frameLine: string = "Frame       |";
  for (let i = 0; i < numberFrames; i++) {
    frameLine += i < 9 ?  `  ${i + 1}  |` : `  ${i + 1} |`;
  }
  return frameLine;
}

function getFrameScoreLine(): string {
  let frameScoreLine: string = "Frame score |";
  for (let i = 0; i < frames.length; i++) {
    if (i > 9) {
      frameScoreLine = getLastFrameScore(frameScoreLine);
    } else {
      frameScoreLine +=
        frames[i].getDisplayedRoll2() !== undefined
          ? `${frames[i].getDisplayedRoll1()} + ${frames[i].getDisplayedRoll2()}|`
          : `  ${frames[i].getDisplayedRoll1()}  |`;
    }
  }
  return frameScoreLine;
}

function calculateAndPushSum(sum: number) {
  if (totalsScore.length > 0) {
    totalsScore.push(totalsScore[totalsScore.length - 1] + sum);
  } else {
    totalsScore.push(sum);
  }
}

function handleStrikeAfterStrikeFrames(previousPreviousFrame: Frame, previousFrame: Frame, currentFrame: Frame) {
  if (
    previousPreviousFrame.isStrike() &&
    previousFrame.isStrike() &&
    currentFrame.roll1 !== undefined &&
    currentFrame.roll2 === undefined
  ) {
    const sum = previousPreviousFrame.roll1! + previousFrame.roll1! + currentFrame.roll1;
    calculateAndPushSum(sum);
  }
}

function handleSpareFrames(previousFrame: Frame, currentFrame: Frame) {
  if (previousFrame.isSpare() && currentFrame.roll2 === undefined) {
    const sum = previousFrame.roll1! + previousFrame.roll2! + currentFrame.roll1!;
    calculateAndPushSum(sum);
  }
}

function handleRegularFramesAfterStrike(previousFrame: Frame, currentFrame: Frame) {
  if (previousFrame.isStrike() && currentFrame.roll1 !== undefined && currentFrame.roll2 !== undefined) {
    const sum = previousFrame.roll1! + currentFrame.roll1 + currentFrame.roll2;
    calculateAndPushSum(sum);
  }
}

function getTotalScoreLine() {
  const currentFrame = frames.length > 0 ? frames[frames.length - 1] : null;
  if (currentFrame) {
    if (frames.length > 2) {
      const previousFrame = frames[frames.length - 2];
      const previousPreviousFrame = frames[frames.length - 3];
      handleStrikeAfterStrikeFrames(previousPreviousFrame, previousFrame, currentFrame);
    }
    if (frames.length > 1) {
      const previousFrame = frames[frames.length - 2];
      handleSpareFrames(previousFrame, currentFrame);
      handleRegularFramesAfterStrike(previousFrame, currentFrame);
    }
    if (currentFrame.isDone() && !currentFrame.isStrike() && !currentFrame.isSpare()) {
      const sum = currentFrame.roll1! + currentFrame.roll2!;
      calculateAndPushSum(sum);
    }
  }
  let totalScoreLine = "Total score |";
  for (let i = 0; i < totalsScore.length; i++) {
    totalsScore[i] > 99 ? (totalScoreLine += ` ${totalsScore[i]} |`) : (totalScoreLine += `  ${totalsScore[i]} |`);
  }
  return totalScoreLine;
}

function displayScores() {
  console.log("\b");
  console.log(getFrameLine());
  console.log(getFrameScoreLine());
  console.log(getTotalScoreLine());
}

function isPinsNumberValid(pins: number): boolean {
  const roll1CurrentFrame =
    frames.length > 0 && !frames[frames.length - 1].isDone() ? frames[frames.length - 1].roll1 : null;
  if (roll1CurrentFrame) {
    return roll1CurrentFrame + pins <= 10;
  }
  return !Number.isNaN(pins) && pins >= 0 && pins <= 10;
}

function registerRoll(pins: number) {
  if (frames.length < 11 && (frames.length === 0 || frames[frames.length - 1].isDone())) {
    frames.push(new Frame(pins));
    return;
  }
  frames[frames.length - 1].roll2 = pins;
}

function isRecordingOver() {
  if (frames.length > 1) {
    const currentFrame = frames[frames.length - 1];
    const previousFrame = frames[frames.length - 2];
    if (
      frames.length > 9 &&
      currentFrame.roll1 !== undefined &&
      currentFrame.roll2 !== undefined &&
      !currentFrame.isSpare() &&
      !currentFrame.isStrike()
    ) {
      return true;
    }
    if (frames.length > 9 && previousFrame.isSpare()) {
      return true;
    }
    console.log(frames.length > 10 && previousFrame.isStrike() && currentFrame.roll2 !== undefined);
    if (frames.length > 10 && previousFrame.isStrike() && currentFrame.roll2 !== undefined ) {
      return true;
    }
  }
}

function getLastFrameScore(framesScoreLine: string): string {
  const currentFrame = frames[frames.length - 1];
  const previousFrame = frames[frames.length - 2];
  if (previousFrame.isSpare()) {
    framesScoreLine = framesScoreLine.slice(0, -6);
    framesScoreLine += `${previousFrame.getDisplayedRoll1()}+${previousFrame.getDisplayedRoll2()}+${currentFrame.getDisplayedRoll1()}|`;
  }
  if (previousFrame.isStrike()) {
    framesScoreLine = framesScoreLine.slice(0, -6);
    framesScoreLine += currentFrame.getDisplayedRoll2() === undefined ? `${previousFrame.getDisplayedRoll1()} + ${currentFrame.getDisplayedRoll1()}|` : `${previousFrame.getDisplayedRoll1()}+${currentFrame.getDisplayedRoll1()}+${currentFrame.getDisplayedRoll2()}|`;

  }
  return framesScoreLine;
}

function startGame() {
  recordRolls();
}

startGame();
