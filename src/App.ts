import { createInterface } from 'readline';
import { Frame } from './frame';
import {
  getFrameScoreLine,
  getFrameLine,
  getTotalScoreLine,
  isPinsNumberValid,
  isRecordingOver
} from './service/bowling-service';
import { MAX_NUMBER_COLUMNS } from './constants';

const frames: Frame[] = [];
const totalsScore: number[] = [];
//L'interface pour communiquer avec l'utilisateur dans la console
const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});
/**
 * Cette fonction permet d'enregistrer les rolls de manière récursive 
 * pour relancer les méthodes jusqu'au dernier enregistrement
 */
export function recordRolls() {

  //Gestion du dernier enregistrement
  if (isRecordingOver(frames)) {
    rl.question('Entrez "x" pour fermer : ', (answer: string) => {
      answer === 'x' ? rl.close() : recordRolls();
    });
  } else {
    //Sinon l'enregistrement recommence jusqu'à la fin
    rl.question('Combien de quilles tombées ? ', (answer: string) => {
      const pins: number = parseInt(answer);

      if (!isPinsNumberValid(pins, frames)) {
        console.log('Nombre de quilles invalides');
        recordRolls();

        return;
      }

      registerRoll(pins);
      displayScores();
      recordRolls();
    });
  }
}

/**
 * Permet de générer l'affichage du tableau
 */
export function displayScores() {
  console.clear();
  console.log('\b');
  console.log(getFrameLine());
  console.log(getFrameScoreLine(frames));
  console.log(getTotalScoreLine(frames, totalsScore));
}

/**
 * Enregistre le nombre de quilles tombées soit dans roll1 ou roll2 et 
 * gère la création d'un nouveau Frame au début du jeu et lors de la partie
 * @param pins Nombre de quilles tombées
 */
function registerRoll(pins: number) {
  if (
    frames.length < MAX_NUMBER_COLUMNS + 1 &&
    (frames.length === 0 || frames[frames.length - 1].isDone())
  ) {
    frames.push(new Frame(pins));

    return;
  }

  frames[frames.length - 1].roll2 = pins;
}

function startGame() {
  recordRolls();
}

startGame();
