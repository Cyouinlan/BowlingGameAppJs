import {
  LARGEST_TWO_DIGIT_NUMBER,
  MAX_NUMBER_COLUMNS,
  NUMBER_TO_REMOVE_ON_A_FRAME
} from '../constants';
import { Frame } from '../frame';


/**
 * La fonction retourne la ligne du tableau 'Frame score |' enrichie grâce à la liste de frames selon deux cas,
 * soit on a atteint la limite du tableau, soit non
 * @param frames la liste des frames actuel
 * @returns le string à afficher pour la ligne du tableau Frame Score
 */
export function getFrameScoreLine(frames: Frame[]): string {
  let frameScoreLine: string = 'Frame score |';

  for (let i = 0; i < frames.length; i++) {
    if (i > MAX_NUMBER_COLUMNS - 1) {
      frameScoreLine = getLastFrameScore(frameScoreLine, frames);
    } else {
      frameScoreLine +=
        frames[i].getDisplayedRoll2() !== undefined
          ? `${frames[i].getDisplayedRoll1()} + ${frames[
            i
          ].getDisplayedRoll2()}|`
          : `  ${frames[i].getDisplayedRoll1()}  |`;
    }
  }

  return frameScoreLine;
}

/**
 * La fonction vérifie si il existe un Frame. Si c'est le cas elle vérifie dans quel cas de figure on se situe :
 * Double Strike; Spare; Strike; Régulier puis elle génère la ligne totalScoreLine correspondant à la ligne
 *  des scores dans le tableau
 * @param frames la liste des frames actuel 
 * @param totalsScore la liste des totaux de score
 * @returns la ligne des scores dans le tableau
 */
export function getTotalScoreLine(frames: Frame[], totalsScore: number[]) {
  const currentFrame = frames.length > 0 ? frames[frames.length - 1] : null;

  if (currentFrame) {
    //Il y a assez de frames pour gérer double strikes
    if (frames.length > 2) {
      const previousFrame = frames[frames.length - 2];
      const previousPreviousFrame = frames[frames.length - 3];
      handleTripleStrikeFrames(
        previousPreviousFrame,
        previousFrame,
        currentFrame,
        totalsScore
      );
    }

    //Il existe au moins deux frames pour permettre de gérer le cas du frame après
    //un Spare ou après un Strike si l'actuel n'est pas un Strike
    if (frames.length > 1) {
      const previousFrame = frames[frames.length - 2];
      handleSpareFrames(previousFrame, currentFrame, totalsScore);
      handleRegularFramesAfterStrike(previousFrame, currentFrame, totalsScore);
    }

    const isRegularFrame = currentFrame.isDone() &&
      !currentFrame.isStrike() &&
      !currentFrame.isSpare() &&
      frames.length < MAX_NUMBER_COLUMNS + 1

    if (
      isRegularFrame
    ) {
      const sum = currentFrame.roll1! + currentFrame.roll2!;
      calculateAndPushSum(sum, totalsScore);
    }
  }

  let totalScoreLine = 'Total score |';

  for (let i = 0; i < totalsScore.length; i++) {
    totalsScore[i] > LARGEST_TWO_DIGIT_NUMBER
      ? (totalScoreLine += ` ${totalsScore[i]} |`)
      : (totalScoreLine += `  ${totalsScore[i]} |`);
  }

  return totalScoreLine;
}

/**
 * Cette fonction retourne la première du tableau en gérant spécifiquement le cas avec des nombres à 2 chiffres
 * @returns retourne la première du tableau qui numérote les frames
 */
export function getFrameLine(): string {
  let frameLine: string = 'Frame       |';

  for (let i = 0; i < MAX_NUMBER_COLUMNS; i++) {
    //Il s'agit ou non d'un nombre à 2 chiffres
    frameLine += i < MAX_NUMBER_COLUMNS - 1 ? `  ${i + 1}  |` : `  ${i + 1} |`;
  }

  return frameLine;
}

/**
 * La fonction permet de vérifier que le nombre de quilles abattues est valide
 * @param pins le nombre de quilles abattues
 * @param frames la liste des frames actuel 
 * @returns le nombre de quittes abattues
 */
export function isPinsNumberValid(pins: number, frames: Frame[]): boolean {
  //Récupérer le roll1 s'il existe
  const roll1CurrentFrame =
    frames.length > 0 && !frames[frames.length - 1].isDone()
      ? frames[frames.length - 1].roll1
      : null;

  //Check si l'addition du roll1 et du roll2 ne dépassent pas 10
  if (roll1CurrentFrame) {
    return roll1CurrentFrame + pins <= MAX_NUMBER_COLUMNS;
  }

  //retourne le nombre si les conditions sont validés et pins n'est pas NaN suite au parseInt
  return !Number.isNaN(pins) && pins >= 0 && pins <= MAX_NUMBER_COLUMNS;
}

/**
 * Permet de déterminer si la fin est atteinte et de quelle fin s'agit-il
 * @param frames la liste des frames actuel 
 * @returns retourne un boolean qui indique l'enregistrement des scores est terminé
 */
export function isRecordingOver(frames: Frame[]) {
  //Si la fin est atteinte
  if (frames.length > 9) {
    const currentFrame = frames[frames.length - 1];
    const previousFrame = frames[frames.length - 2];
    //Fin régulière
    const isRegularEnd =
      frames.length > MAX_NUMBER_COLUMNS - 1 &&
      currentFrame.roll1 !== undefined &&
      currentFrame.roll2 !== undefined &&
      !currentFrame.isSpare() &&
      !currentFrame.isStrike();
    //Fin en Spare
    const isSpareEnd =
      frames.length > MAX_NUMBER_COLUMNS && previousFrame.isSpare();
    //Fin en Strike
    const isStrikeEnd =
      frames.length > MAX_NUMBER_COLUMNS &&
      previousFrame.isStrike() &&
      currentFrame.roll2 !== undefined;

    return isRegularEnd || isSpareEnd || isStrikeEnd;
  }

  return false;
}

/**
 * Permet de gérer le cas d'un enregistrement de score lors d'un triple strike
 * @param previousPreviousFrame l'avant avant dernière frame de la liste frames
 * @param previousFrame L'avant dernière frame de la liste frames
 * @param currentFrame La dernière frame de la liste frames
 * @param totalsScore la liste des totaux de score 
 */
export function handleTripleStrikeFrames(
  previousPreviousFrame: Frame,
  previousFrame: Frame,
  currentFrame: Frame,
  totalsScore: number[]
) {
  if (
    previousPreviousFrame.isStrike() &&
    previousFrame.isStrike() &&
    currentFrame.roll1 !== undefined &&
    currentFrame.roll2 === undefined
  ) {
    const sum =
      previousPreviousFrame.roll1! + previousFrame.roll1! + currentFrame.roll1;
    calculateAndPushSum(sum, totalsScore);
  }
}

/**
 * Permet de gérer le cas d'un enregistrement de score lors d'un Spare
 * @param previousFrame L'avant dernière frame de la liste frames 
 * @param currentFrame La dernière frame de la liste frames 
 * @param totalsScore la liste des totaux de score 
 */
export function handleSpareFrames(
  previousFrame: Frame,
  currentFrame: Frame,
  totalsScore: number[]
) {
  if (previousFrame.isSpare() && currentFrame.roll2 === undefined) {
    const sum =
      previousFrame.roll1! + previousFrame.roll2! + currentFrame.roll1!;
    calculateAndPushSum(sum, totalsScore);
  }
}

/**
 * Permet de gérer le cas d'un enregistrement lors d'un Strike
 * @param previousFrame L'avant dernière frame de la liste frames 
 * @param currentFrame La dernière frame de la liste frames 
 * @param totalsScore la liste des totaux de score 
 */
export function handleRegularFramesAfterStrike(
  previousFrame: Frame,
  currentFrame: Frame,
  totalsScore: number[]
) {
  if (
    previousFrame.isStrike() &&
    currentFrame.roll1 !== undefined &&
    currentFrame.roll2 !== undefined
  ) {
    const sum = previousFrame.roll1! + currentFrame.roll1 + currentFrame.roll2;
    calculateAndPushSum(sum, totalsScore);
  }
}

/**
 * Permet d'ajouter le score au total des scores si la liste totalsScore existe, sinon, la crée
 * @param sum total 
 * @param totalsScore la liste des totaux de score 
 */
export function calculateAndPushSum(sum: number, totalsScore: number[]) {
  if (totalsScore.length > 0) {
    totalsScore.push(totalsScore[totalsScore.length - 1] + sum);
  } else {
    totalsScore.push(sum);
  }
}

/**
 * Permet de gérer l'affichage de la dernière Frame qui peut être composé de 3 rolls
 * Ex: |X+X+X|, |X+1+2|, |1+/+X|, ...
 * @param frames la liste des frames actuelScoreLine 
 * @param frames la liste des frames actuel 
 * @returns La dernière frame contenant les rolls réalisés
 */
export function getLastFrameScore(
  framesScoreLine: string,
  frames: Frame[]
): string {
  const currentFrame = frames[frames.length - 1];
  const previousFrame = frames[frames.length - 2];

  //Si il s'agit d'un Spare, retire l'existant pour remplacer par les 3 rolls
  if (previousFrame.isSpare()) {
    framesScoreLine = framesScoreLine.slice(0, NUMBER_TO_REMOVE_ON_A_FRAME);
    framesScoreLine += `${previousFrame.getDisplayedRoll1()}+${previousFrame.getDisplayedRoll2()}+${currentFrame.getDisplayedRoll1()}|`;
  }

  //Si il s'agit d'un Strike, retirer l'existant et affiche le premier roll supplémentaire, puis le deuxième
  //Ex : |  X  | => | X+1 | => |X+1+/|
  if (previousFrame.isStrike()) {
    framesScoreLine = framesScoreLine.slice(0, NUMBER_TO_REMOVE_ON_A_FRAME);
    framesScoreLine +=
      currentFrame.getDisplayedRoll2() === undefined
        ? `${previousFrame.getDisplayedRoll1()} + ${currentFrame.getDisplayedRoll1()}|`
        : `${previousFrame.getDisplayedRoll1()}+${currentFrame.getDisplayedRoll1()}+${currentFrame.getDisplayedRoll2()}|`;
  }

  return framesScoreLine;
}
