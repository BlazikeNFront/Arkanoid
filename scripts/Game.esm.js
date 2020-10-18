import { Common, VISIBLE_SCREEN } from './Common.esm.js';
import { DATALOADED_EVENT_NAME } from './Loader.esm.js';
import { gameLevels } from './gameLevels.esm.js';
import { canvas } from './Canvas.esm.js';
import { media } from './Media.esm.js';
import { GameState } from './GameState.esm.js';

import { resultScreen } from './ResultScreen.esm.js';
import { userData } from './UserData.esm.js';
import { mainMenu } from './MainMenu.esm.js';


class Game extends Common {
	constructor() {
		super();
	}

	playLevel(level) {
		const { numberOfMovements , pointsToWin, board, } = gameLevels[level - 1];

		window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);
		// this.gameState = new GameState();
		this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
		this.changeVisibilityScreen(mainMenu.miniSettingsLayerElement, VISIBLE_SCREEN);
		media.isInLevel = true;
		media.playBackgroundMusic();
		this.animate();
	}

	animate() {

		
		this.checkEndOfGame();
	}





	checkEndOfGame() {
		if (!this.gameState.getLeftMovement() && !this.gameState.getIsMoving() && !this.gameState.getIsSwaping()) {
			media.isInLevel = false;
			media.stopBackgroundMusic();
			const isPlayerWinner = this.gameState.isPlayerWinner();
			const currentLevel = Number(this.gameState.level);

			if (isPlayerWinner && gameLevels[currentLevel]) {
				if (!userData.checkAvailabilityLevel(currentLevel + 1)) {
					userData.addNewLevel(currentLevel + 1);
				}
			}

			if (userData.getHighScores(currentLevel) < this.gameState.getPlayerPoints()) {
				userData.setHighScore(currentLevel, this.gameState.getPlayerPoints());
			}

			resultScreen.viewResultScreen(isPlayerWinner, this.gameState.getPlayerPoints(), currentLevel);
		} else {
			this.animationFrame = window.requestAnimationFrame(() => this.animate());
		}
	}

	swap(firstDiamond, secondDiamond) {
		[
			firstDiamond.kind,
			firstDiamond.alpha,
			firstDiamond.match,
			firstDiamond.x,
			firstDiamond.y,
			secondDiamond.kind,
			secondDiamond.alpha,
			secondDiamond.match,
			secondDiamond.x,
			secondDiamond.y,
		] = [
			secondDiamond.kind,
			secondDiamond.alpha,
			secondDiamond.match,
			secondDiamond.x,
			secondDiamond.y,
			firstDiamond.kind,
			firstDiamond.alpha,
			firstDiamond.match,
			firstDiamond.x,
			firstDiamond.y,
		];

		this.gameState.setIsMoving(true);
	}
}

export const game = new Game();