"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const frame_1 = require("../frame");
const bowling_service_1 = require("../service/bowling-service");
test('getFrameScoreLine retourne la ligne de score correcte', () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(10),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 5),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 3),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 4),
        new frame_1.Frame(6, 4),
        new frame_1.Frame(5)
    ];
    const expected = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6 + /|6+/+5|';
    expect((0, bowling_service_1.getFrameScoreLine)(frames)).toBe(expected);
});
test('getFrameScoreLine retourne la ligne de score correcte pour le dernier cadre', () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(10),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 5),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 3),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 4),
        new frame_1.Frame(2, 1)
    ];
    const expected = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6 + /|2 + 1|';
    expect((0, bowling_service_1.getFrameScoreLine)(frames)).toBe(expected);
});
test('getFrameScoreLine retourne la ligne de score correcte pour un jeu parfait', () => {
    const frames = [
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10, 10)
    ];
    const expected = 'Frame score |  X  |  X  |  X  |  X  |  X  |  X  |  X  |  X  |  X  |X + X|';
    expect((0, bowling_service_1.getFrameScoreLine)(frames)).toBe(expected);
});
test('getFrameScoreLine retourne la ligne de score correcte pour un jeu avec des lancers nuls', () => {
    const frames = [
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(0, 0)
    ];
    const expected = 'Frame score |0 + 0|0 + 0|0 + 0|0 + 0|0 + 0|0 + 0|0 + 0|0 + 0|0 + 0|0 + 0|';
    expect((0, bowling_service_1.getFrameScoreLine)(frames)).toBe(expected);
});
test('getFrameScoreLine retourne la ligne de score correcte pour un jeu avec des lancers invalides', () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(10),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 5),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 3),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 4)
    ];
    const expected = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6 + /|';
    expect((0, bowling_service_1.getFrameScoreLine)(frames)).toBe(expected);
});
test('getTotalScoreLine retourne la ligne de score total correcte pour un jeu avec des lancers réguliers', () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 3),
        new frame_1.Frame(8, 1)
    ];
    const totalsScore = [9, 18, 24, 31, 37, 37, 46, 49, 58, 67];
    const expected = 'Total score |  9 |  18 |  24 |  31 |  37 |  37 |  46 |  49 |  58 |  67 |  76 |';
    expect((0, bowling_service_1.getTotalScoreLine)(frames, totalsScore)).toBe(expected);
});
test('getTotalScoreLine retourne la ligne de score total correcte pour un jeu avec des lancers de strike', () => {
    const frames = [
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10, 10)
    ];
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
    const expected = 'Total score |  30 |  60 |  90 | 120 | 150 | 180 | 210 | 240 | 270 | 300 | 330 |';
    expect((0, bowling_service_1.getTotalScoreLine)(frames, totalsScore)).toBe(expected);
});
test('getTotalScoreLine retourne la ligne de score total correcte pour un jeu avec des lancers de spare', () => {
    const frames = [
        new frame_1.Frame(6, 4),
        new frame_1.Frame(7, 3),
        new frame_1.Frame(5, 5),
        new frame_1.Frame(8, 2),
        new frame_1.Frame(9, 1),
        new frame_1.Frame(0, 10),
        new frame_1.Frame(3, 7),
        new frame_1.Frame(2, 8),
        new frame_1.Frame(6, 4),
        new frame_1.Frame(9, 1)
    ];
    const totalsScore = [17, 32, 52, 72, 92, 102, 122, 142, 161, 176];
    const expected = 'Total score |  17 |  32 |  52 |  72 |  92 | 102 | 122 | 142 | 161 | 176 |';
    expect((0, bowling_service_1.getTotalScoreLine)(frames, totalsScore)).toBe(expected);
});
test('getTotalScoreLine retourne la ligne de score total correcte pour un jeu avec des lancers mixtes', () => {
    const frames = [
        new frame_1.Frame(10),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(8, 2),
        new frame_1.Frame(10),
        new frame_1.Frame(7, 3),
        new frame_1.Frame(6, 1),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10, 10)
    ];
    const totalsScore = [19, 37, 57, 77, 96, 103, 133, 163, 193, 223];
    const expected = 'Total score |  19 |  37 |  57 |  77 |  96 | 103 | 133 | 163 | 193 | 223 | 253 |';
    expect((0, bowling_service_1.getTotalScoreLine)(frames, totalsScore)).toBe(expected);
});
test('getFrameLine retourne la ligne de cadre correcte', () => {
    const expected = 'Frame       |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |  10 |';
    expect((0, bowling_service_1.getFrameLine)()).toBe(expected);
});
test('isPinsNumberValid retourne false si le nombre de quilles dépasse le nombre maximum dans un lancer dans un cadre incomplet', () => {
    const pins = 8;
    const frames = [new frame_1.Frame(6)];
    const expected = false;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne true si le nombre de quilles est valide pour un lancer dans un cadre vide', () => {
    const pins = 4;
    const frames = [];
    const expected = true;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne false si le nombre de quilles dépasse le nombre maximum dans un lancer dans un cadre vide', () => {
    const pins = 11;
    const frames = [];
    const expected = false;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne true si le nombre de quilles est valide pour un lancer après un strike', () => {
    const pins = 6;
    const frames = [new frame_1.Frame(10)];
    const expected = true;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne false si le nombre de quilles dépasse le nombre maximum dans un lancer après un strike', () => {
    const pins = 11;
    const frames = [new frame_1.Frame(10)];
    const expected = false;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne true si le nombre de quilles est valide pour un lancer après un spare', () => {
    const pins = 6;
    const frames = [new frame_1.Frame(7, 3)];
    const expected = true;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne false si le nombre de quilles dépasse le nombre maximum dans un lancer après un spare', () => {
    const pins = 11;
    const frames = [new frame_1.Frame(7, 3)];
    const expected = false;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne true si le nombre de quilles est valide pour un lancer après un cadre complet', () => {
    const pins = 6;
    const frames = [new frame_1.Frame(6, 3)];
    const expected = true;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne false si le nombre de quilles dépasse le nombre maximum dans un lancer après un cadre complet', () => {
    const pins = 11;
    const frames = [new frame_1.Frame(6, 3)];
    const expected = false;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne false si le nombre de quilles est NaN', () => {
    const pins = NaN;
    const frames = [];
    const expected = false;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test('isPinsNumberValid retourne false si le nombre de quilles est négatif', () => {
    const pins = -5;
    const frames = [];
    const expected = false;
    expect((0, bowling_service_1.isPinsNumberValid)(pins, frames)).toBe(expected);
});
test("isRecordingOver retourne true si l'enregistrement est terminé après un cadre complet sans spare ni strike", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 3),
        new frame_1.Frame(8, 1)
    ];
    const expected = true;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne true si l'enregistrement est terminé après un cadre complet avec un spare", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 1),
        new frame_1.Frame(5)
    ];
    const expected = true;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne true si l'enregistrement est terminé après un cadre complet avec un strike", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 3),
        new frame_1.Frame(10),
        new frame_1.Frame(6, 3)
    ];
    const expected = true;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne true si l'enregistrement n'est pas terminé après un cadre complet sans spare ni strike", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 3),
        new frame_1.Frame(8, 1),
        new frame_1.Frame(6, 3)
    ];
    const expected = true;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne true si l'enregistrement n'est pas terminé après un cadre complet avec un spare", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 1),
        new frame_1.Frame(4, 6),
        new frame_1.Frame(5)
    ];
    const expected = true;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne false si l'enregistrement n'est pas terminé après un cadre incomplet", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6)
    ];
    const expected = false;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne false si l'enregistrement n'est pas terminé après un cadre incomplet avec un spare", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6),
        new frame_1.Frame(9, 1)
    ];
    const expected = false;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne false si l'enregistrement n'est pas terminé après un cadre incomplet avec un strike", () => {
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6),
        new frame_1.Frame(10)
    ];
    const expected = false;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne false si l'enregistrement n'est pas terminé après un seul cadre", () => {
    const frames = [new frame_1.Frame(6, 3)];
    const expected = false;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test("isRecordingOver retourne false si l'enregistrement n'est pas terminé après aucun cadre", () => {
    const frames = [];
    const expected = false;
    expect((0, bowling_service_1.isRecordingOver)(frames)).toBe(expected);
});
test('handleTripleStrikeFrames calcule et pousse la somme correcte dans le tableau de scores totaux lorsque les trois cadres précédents sont des strikes et le cadre actuel a un seul lancer', () => {
    const previousPreviousFrame = new frame_1.Frame(10);
    const previousFrame = new frame_1.Frame(10);
    const currentFrame = new frame_1.Frame(6);
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    (0, bowling_service_1.handleTripleStrikeFrames)(previousPreviousFrame, previousFrame, currentFrame, totalsScore);
    const expected = [30, 60, 90, 120, 150, 180, 210, 240, 270, 296];
    expect(totalsScore).toEqual(expected);
});
test('handleTripleStrikeFrames ne fait rien si les trois cadres précédents ne sont pas des strikes', () => {
    const previousPreviousFrame = new frame_1.Frame(6, 3);
    const previousFrame = new frame_1.Frame(9, 0);
    const currentFrame = new frame_1.Frame(6);
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    (0, bowling_service_1.handleTripleStrikeFrames)(previousPreviousFrame, previousFrame, currentFrame, totalsScore);
    const expected = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    expect(totalsScore).toEqual(expected);
});
test('handleTripleStrikeFrames ne fait rien si le cadre actuel a deux lancers', () => {
    const previousPreviousFrame = new frame_1.Frame(10);
    const previousFrame = new frame_1.Frame(10);
    const currentFrame = new frame_1.Frame(6, 3);
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    (0, bowling_service_1.handleTripleStrikeFrames)(previousPreviousFrame, previousFrame, currentFrame, totalsScore);
    const expected = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    expect(totalsScore).toEqual(expected);
});
test('handleSpareFrames calcule et pousse la somme correcte dans le tableau de scores totaux lorsque le cadre précédent est un spare et le cadre actuel a un seul lancer', () => {
    const previousFrame = new frame_1.Frame(7, 3);
    const currentFrame = new frame_1.Frame(6);
    const totalsScore = [17, 32, 52, 72, 92, 102, 122, 142, 161];
    (0, bowling_service_1.handleSpareFrames)(previousFrame, currentFrame, totalsScore);
    const expected = [17, 32, 52, 72, 92, 102, 122, 142, 161, 177];
    expect(totalsScore).toEqual(expected);
});
test("handleSpareFrames ne fait rien si le cadre précédent n'est pas un spare", () => {
    const previousFrame = new frame_1.Frame(6, 3);
    const currentFrame = new frame_1.Frame(6);
    const totalsScore = [17, 32, 52, 72, 92, 102, 122, 142, 161];
    (0, bowling_service_1.handleSpareFrames)(previousFrame, currentFrame, totalsScore);
    const expected = [17, 32, 52, 72, 92, 102, 122, 142, 161];
    expect(totalsScore).toEqual(expected);
});
test('handleSpareFrames ne fait rien si le cadre actuel a deux lancers', () => {
    const previousFrame = new frame_1.Frame(7, 3);
    const currentFrame = new frame_1.Frame(6, 3);
    const totalsScore = [17, 32, 52, 72, 92, 102, 122, 142, 161];
    (0, bowling_service_1.handleSpareFrames)(previousFrame, currentFrame, totalsScore);
    const expected = [17, 32, 52, 72, 92, 102, 122, 142, 161];
    expect(totalsScore).toEqual(expected);
});
test('handleRegularFramesAfterStrike calcule et pousse la somme correcte dans le tableau de scores totaux lorsque le cadre précédent est un strike et le cadre actuel a deux lancers', () => {
    const previousFrame = new frame_1.Frame(10);
    const currentFrame = new frame_1.Frame(6, 3);
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    (0, bowling_service_1.handleRegularFramesAfterStrike)(previousFrame, currentFrame, totalsScore);
    const expected = [30, 60, 90, 120, 150, 180, 210, 240, 270, 289];
    expect(totalsScore).toEqual(expected);
});
test("handleRegularFramesAfterStrike ne fait rien si le cadre précédent n'est pas un strike", () => {
    const previousFrame = new frame_1.Frame(6, 3);
    const currentFrame = new frame_1.Frame(6, 3);
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    (0, bowling_service_1.handleRegularFramesAfterStrike)(previousFrame, currentFrame, totalsScore);
    const expected = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    expect(totalsScore).toEqual(expected);
});
test("handleRegularFramesAfterStrike ne fait rien si le cadre actuel n'a pas deux lancers", () => {
    const previousFrame = new frame_1.Frame(10);
    const currentFrame = new frame_1.Frame(6);
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    (0, bowling_service_1.handleRegularFramesAfterStrike)(previousFrame, currentFrame, totalsScore);
    const expected = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    expect(totalsScore).toEqual(expected);
});
test("calculateAndPushSum pousse la somme correcte dans le tableau de scores totaux lorsque le tableau n'est pas vide", () => {
    const sum = 10;
    const totalsScore = [30, 60, 90, 120, 150, 180, 210, 240, 270];
    (0, bowling_service_1.calculateAndPushSum)(sum, totalsScore);
    const expected = [30, 60, 90, 120, 150, 180, 210, 240, 270, 280];
    expect(totalsScore).toEqual(expected);
});
test('calculateAndPushSum pousse la somme correcte dans le tableau de scores totaux lorsque le tableau est vide', () => {
    const sum = 10;
    const totalsScore = [];
    (0, bowling_service_1.calculateAndPushSum)(sum, totalsScore);
    const expected = [10];
    expect(totalsScore).toEqual(expected);
});
test('getLastFrameScore retourne la ligne de score des cadres mise à jour lorsque le cadre précédent est un spare', () => {
    const framesScoreLine = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6 + /|';
    const frames = [
        new frame_1.Frame(6, 4),
        new frame_1.Frame(7, 3),
        new frame_1.Frame(5, 5),
        new frame_1.Frame(8, 2),
        new frame_1.Frame(9, 1),
        new frame_1.Frame(0, 10),
        new frame_1.Frame(3, 7),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 4),
        new frame_1.Frame(9, 1)
    ];
    const expected = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6+/+9|';
    expect((0, bowling_service_1.getLastFrameScore)(framesScoreLine, frames)).toBe(expected);
});
test('getLastFrameScore retourne la ligne de score des cadres mise à jour lorsque le cadre précédent est un strike et le cadre actuel a un seul lancer', () => {
    const framesScoreLine = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6 + /|';
    const frames = [
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10),
        new frame_1.Frame(10, 10)
    ];
    const expected = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|X+X+X|';
    expect((0, bowling_service_1.getLastFrameScore)(framesScoreLine, frames)).toBe(expected);
});
test("getLastFrameScore retourne la ligne de score des cadres inchangée lorsque le cadre précédent n'est pas un spare ou un strike", () => {
    const framesScoreLine = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6 + /|';
    const frames = [
        new frame_1.Frame(6, 3),
        new frame_1.Frame(9, 0),
        new frame_1.Frame(4, 2),
        new frame_1.Frame(3, 4),
        new frame_1.Frame(5, 1),
        new frame_1.Frame(0, 0),
        new frame_1.Frame(7, 2),
        new frame_1.Frame(2, 1),
        new frame_1.Frame(6, 3),
        new frame_1.Frame(8, 1)
    ];
    const expected = 'Frame score |6 + 3|9 + 0|  X  |3 + 4|5 + /|0 + 0|7 + /|2 + 1|6 + /|';
    expect((0, bowling_service_1.getLastFrameScore)(framesScoreLine, frames)).toBe(expected);
});
