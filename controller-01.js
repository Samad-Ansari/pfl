class Controller {
	constructor() {		
	  this.left  = new ButtonInput();
	  this.right = new ButtonInput();
	  this.up    = new ButtonInput();
	
	  this.keyDownUp = function(type, key_code) {
		var down = (event.type == "keydown") ? true : false;

		switch(event.keyCode) {

		  case 37: this.left.getInput(down);  break;
		  case 38: this.up.getInput(down);    break;
		  case 39: this.right.getInput(down); break;

		}

	  };

	}
};

class ButtonInput {

  constructor(){
	this.active = this.down = false;
  }
  
  getInput(down) {

    if (this.down != down) this.active = down;
    this.down = down;

  }

};
