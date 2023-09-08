"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayScores = exports.recordRolls = void 0;
const readline_1 = require("readline");
const frame_1 = require("./frame");
const bowling_service_1 = require("./service/bowling-service");
const constants_1 = require("./constants");
const frames = [];
const totalsScore = [];
//L'interface pour communiquer avec l'utilisateur dans la console
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
/**
 * Cette fonction permet d'enregistrer les rolls de manière récursive
 * pour relancer les méthodes jusqu'au dernier enregistrement
 */
function recordRolls() {
    //Gestion du dernier enregistrement
    if ((0, bowling_service_1.isRecordingOver)(frames)) {
        rl.question('Entrez "x" pour fermer : ', (answer) => {
            answer === 'x' ? rl.close() : recordRolls();
        });
    }
    else {
        //Sinon l'enregistrement recommence jusqu'à la fin
        rl.question('Combien de quilles tombées ? ', (answer) => {
            const pins = parseInt(answer);
            if (!(0, bowling_service_1.isPinsNumberValid)(pins, frames)) {
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
exports.recordRolls = recordRolls;
/**
 * Permet de générer l'affichage du tableau
 */
function displayScores() {
    console.clear();
    console.log('\b');
    console.log((0, bowling_service_1.getFrameLine)());
    console.log((0, bowling_service_1.getFrameScoreLine)(frames));
    console.log((0, bowling_service_1.getTotalScoreLine)(frames, totalsScore));
}
exports.displayScores = displayScores;
/**
 * Enregistre le nombre de quilles tombées soit dans roll1 ou roll2 et
 * gère la création d'un nouveau Frame au début du jeu et lors de la partie
 * @param pins Nombre de quilles tombées
 */
function registerRoll(pins) {
    if (frames.length < constants_1.MAX_NUMBER_COLUMNS + 1 &&
        (frames.length === 0 || frames[frames.length - 1].isDone())) {
        frames.push(new frame_1.Frame(pins));
        return;
    }
    frames[frames.length - 1].roll2 = pins;
}
function startGame() {
    recordRolls();
}
startGame();
