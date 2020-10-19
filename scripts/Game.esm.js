import { Common, VISIBLE_SCREEN } from './Common.esm.js';
import { DATALOADED_EVENT_NAME } from './Loader.esm.js';
import { gameLevels } from './gameLevels.esm.js';
import { canvas } from './Canvas.esm.js';
import { media } from './Media.esm.js';
import { GameState } from './GameState.esm.js';
import { Sprite } from '/scripts/Sprite.esm.js';
import { resultScreen } from './ResultScreen.esm.js';
import { userData } from './UserData.esm.js';
import { mainMenu } from './MainMenu.esm.js';
import { Paddle } from '/scripts/paddle.js';
import { keyboardController, KEY_CODE_RIGHT,KEY_CODE_PAUSE,KEY_CODE_LEFT } from '/scripts/keyboardController.js';
import { Ball } from '/scripts/ball.js';

const PLAYER_SPEED = 10;

class Game extends Common {
	constructor() {
		super();
		
	}

	playLevel(level) {
		window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);



		this.background = new Sprite(0, 33, 800, 450, media.spriteImage, 0, 0);
		this.paddle = new Paddle()
		this.ball = new Ball();
		this.gameState = { isGamePaused :false};
		// this.gameState = new GameState();
		this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
		this.changeVisibilityScreen(mainMenu.miniSettingsLayerElement, VISIBLE_SCREEN);
		media.isInLevel = true;
		media.playBackgroundMusic();
		this.animate();
	}

	animate() {
		this.ball.moveAndCheckCollision();
		this.handleKeyboardClick();
		this.drawSprites();
		this.checkEndOfGame();
	}
	handleKeyboardClick(){
		const {clickedKey: key} = keyboardController;

		if(!key){
			return
		}
		if(key === KEY_CODE_PAUSE){
			this.gameState.isGamePaused = true;
			keyboardController.clickedKey = null;
			return
		}
		if(!this.gameState.isGamePaused && key === KEY_CODE_LEFT){
			for(let i = PLAYER_SPEED;this.paddle.movePlayerLeft() && i; i--)

			
			
			keyboardController.clickedKey = null;
			return
		}

		if(!this.gameState.isGamePaused && key === KEY_CODE_RIGHT){
			for(let i = PLAYER_SPEED;this.paddle.movePlayerRight() && i; i--)
			
			keyboardController.clickedKey = null;
			return
		}




	}

	drawSprites(){
		this.background.draw(0, 1.25);
		this.ball.draw();
		this.paddle.draw();
	}




	checkEndOfGame() {
		if (this.ball.hadHitOnBottomEdge()) {
			media.isInLevel = false;
			media.stopBackgroundMusic();

			resultScreen.viewResultScreen(true);
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