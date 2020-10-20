import { gameLevels } from "/scripts/gameLevels.esm.js";
import { Block } from '/scripts/block.js';

export class GameState {
	constructor(level) {
	
		let _gameBoard = gameLevels[level-1].board.map(({x, y, kind}) => new Block(x, y, kind));
		this._isGamePaused = false;
		this._level = level
		this.getGameBoard = () => _gameBoard;

	}
	get level(){
		return this._level
	} 
	set isGamePaused(value){
		this._isGamePaused = value
	}

	get isGamePaused(){
		return this._isGamePaused;
	}

	get level () {
		return this._level;
	}

	

	
}