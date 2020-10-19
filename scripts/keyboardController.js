export const KEY_CODE_LEFT = 37;
export const KEY_CODE_PAUSE = 80;
export const KEY_CODE_RIGHT = 39;



class KeyboardController {
    constructor(){
        this.clickedKey = null;
        window.addEventListener('keydown', (e)=> this.clickedKey = e.keyCode)
    }
}

export const keyboardController = new KeyboardController();