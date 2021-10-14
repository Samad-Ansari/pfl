class Game {
	constructor(){
		this.world = new World();	
		this.updated = function(){
			this.world.update();
		}
	}
}

class World {
	constructor(friction = 0.9, gravity = 3){
		this.friction = friction;
		this.gravity = gravity;
		this.player = new Player();
		this.columns = 17;
		this.rows = 11;
		this.zone_id = "00";
		this.doors = [];
		this.door = undefined;
		this.tile_size = 16;
		this.tile_set = new TileSet(10,64);
		this.height = this.tile_size * this.rows;
		this.width = this.tile_size * this.columns;
		this.collider = new  Collider();
	}
	
	collideObject(object){
		
        var bottom, left, right, top, value;

		top    = Math.floor(object.getTop()    / this.tile_size);
		left   = Math.floor(object.getLeft()   / this.tile_size);
		value  = this.collision_map[top * this.columns + left];
		this.collider.collide(value, object, left * this.tile_size, top * this.tile_size, this.tile_size);

		top    = Math.floor(object.getTop()    / this.tile_size);
		right  = Math.floor(object.getRight()  / this.tile_size);
		value  = this.collision_map[top * this.columns + right];
		this.collider.collide(value, object, right * this.tile_size, top * this.tile_size, this.tile_size);

		bottom = Math.floor(object.getBottom() / this.tile_size);
		left   = Math.floor(object.getLeft()   / this.tile_size);
		value  = this.collision_map[bottom * this.columns + left];
		this.collider.collide(value, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);

		bottom = Math.floor(object.getBottom() / this.tile_size);
		right  = Math.floor(object.getRight()  / this.tile_size);
		value  = this.collision_map[bottom * this.columns + right];
		this.collider.collide(value, object, right * this.tile_size, bottom * this.tile_size, this.tile_size);
	}
	
	setup(zone){
		this.graphical_map = zone.graphical_map;
		this.collision_map = zone.collision_map;
		this.columns = zone.columns;
		this.rows = zone.rows;
		this.doors = new Array();
		this.zone_id = zone.id;
		this.box = zone.box;
		for (let index = zone.doors.length - 1; index > -1; -- index) {

		  let door = zone.doors[index];
		  this.doors[index] = new Door(door);
		}
		if (this.door) {

		  if (this.door.destination_x != -1) {

			this.player.setCenterX   (this.door.destination_x);
			this.player.setOldCenterX(this.door.destination_x);// It's important to reset the old position as well.

		  }
		  if (this.door.destination_y != -1) {
			  
			this.player.setCenterY   (this.door.destination_y);
			this.player.setOldCenterY(this.door.destination_y);

		  }

		  this.door = undefined;// Make sure to reset this.door so we don't trigger a zone load.

		}

	}
	
	
	update(){
		this.player.updatePosition(this.gravity, this.friction);
		
		this.collideObject(this.player);
		for(let index=0; index < this.box.length; index++){
			if(this.box[index][0] <= this.player.getCenterX() && this.box[index][1] >= this.player.getCenterX()
			   && this.player.getCenterY() === this.box[index][2]){
				modalAdd(this.box[index][3])
			}
			else {
				modalRemove(this.box[index][3])
			}
		}
		
		for(let index = this.doors.length - 1; index > -1; -- index) {

		  let door = this.doors[index];
		  if (door.collideObject(this.player)) {
			this.door = door;
		  };

		}
	}

}

class Collider {
	constructor(){
		this.collide = function(value, object, tile_x, tile_y, tile_size) {
		switch(value) {

		  case  1: this.collidePlatformTop      (object, tile_y            ); break;
		  case  2: this.collidePlatformRight    (object, tile_x + tile_size); break;
		  case  3: if (this.collidePlatformTop  (object, tile_y            )) return;// If there's a collision, we don't need to check for anything else.
				   this.collidePlatformRight    (object, tile_x + tile_size); break;
		  case  4: this.collidePlatformBottom   (object, tile_y + tile_size); break;
		  case  5: if (this.collidePlatformTop  (object, tile_y            )) return;
				   this.collidePlatformBottom   (object, tile_y + tile_size); break;
		  case  6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
				   this.collidePlatformBottom   (object, tile_y + tile_size); break;
		  case  7: if (this.collidePlatformTop  (object, tile_y            )) return;
				   if (this.collidePlatformRight(object, tile_x + tile_size)) return;
				   this.collidePlatformBottom   (object, tile_y + tile_size); break;
		  case  8: this.collidePlatformLeft     (object, tile_x            ); break;
		  case  9: if (this.collidePlatformTop  (object, tile_y            )) return;
				   this.collidePlatformLeft     (object, tile_x            ); break;
		  case 10: if (this.collidePlatformLeft (object, tile_x            )) return;
				   this.collidePlatformRight    (object, tile_x + tile_size); break;
		  case 11: if (this.collidePlatformTop  (object, tile_y            )) return;
				   if (this.collidePlatformLeft (object, tile_x            )) return;
				   this.collidePlatformRight    (object, tile_x + tile_size); break;
		  case 12: if (this.collidePlatformLeft (object, tile_x            )) return;
				   this.collidePlatformBottom   (object, tile_y + tile_size); break;
		  case 13: if (this.collidePlatformTop  (object, tile_y            )) return;
				   if (this.collidePlatformLeft (object, tile_x            )) return;
				   this.collidePlatformBottom   (object, tile_y + tile_size); break;
		  case 14: if (this.collidePlatformLeft (object, tile_x            )) return;
				   if (this.collidePlatformRight(object, tile_x + tile_size)) return; // Had to change this since part 4. I forgot to add tile_size
				   this.collidePlatformBottom   (object, tile_y + tile_size); break;
		  case 15: if (this.collidePlatformTop  (object, tile_y            )) return;
				   if (this.collidePlatformLeft (object, tile_x            )) return;
				   if (this.collidePlatformRight(object, tile_x + tile_size)) return;
				   this.collidePlatformBottom   (object, tile_y + tile_size); break;

		}

	  }

	}
	
	 collidePlatformBottom(object, tile_bottom) {

		if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {

		  object.setTop(tile_bottom);
		  object.velocity_y = 0;
		  return true;

		} return false;

	  }

	  collidePlatformLeft(object, tile_left) {
		if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

		  object.setRight(tile_left - 0.01);
		  object.velocity_x = 0;
		  return true;

		} return false;

	  }

	  collidePlatformRight(object, tile_right) {
		if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {

		  object.setLeft(tile_right);
		  object.velocity_x = 0;
		  return true;

		} return false;

	  }

	  collidePlatformTop(object, tile_top) {

		if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {

		  object.setBottom(tile_top - 0.01);
		  object.velocity_y = 0;
		  object.jumping    = false;
		  return true;

		} return false;

	  }
}


class Player {
	constructor(){		
		this.color1 = "#404040";
		this.color2 = "#f0f0f0";
		this.height = 15;
		this.jumping = true;
		this.velocity_x = 0;
		this.velocity_y = 0;
		this.width = 15;
		this.x = 144.99;
		this.y = 63.99;
		this.x_old = this.x;
		this.y_old = this.y;
		
	}
	
   getBottom() { return this.y     + this.height; }
   getLeft() { return this.x;                   }
   getRight() { return this.x     + this.width;  }
   getTop() { return this.y;                   }
   getOldBottom() { return this.y_old + this.height; }
   getOldLeft() { return this.x_old;               }
   getOldRight() { return this.x_old + this.width;  }
   getOldTop() { return this.y_old                }
   setBottom(y) { this.y     = y    - this.height; }
   setLeft(x) { this.x     = x;                  }
   setRight(x) { this.x     = x    - this.width;  }
   setTop(y) { this.y     = y;                  }
   setOldBottom(y) { this.y_old = y    - this.height; }
   setOldLeft(x) { this.x_old = x;                  }
   setOldRight(x) { this.x_old = x    - this.width;  }
   setOldTop(y) { this.y_old = y;                  }
   getCenterX() { return  this.x + this.width * 0.5;}
   getCenterY() { return this.y + this.height * 0.5;}
   setCenterX(x) { this.x = x - this.width * 0.5; }
   setCenterY(y) { this.y = y - this.height * 0.5;  }
   getOldCenterX()  { return this.x_old + this.width  * 0.5; }
   getOldCenterY()  { return this.y_old + this.height * 0.5; }
   setOldCenterX(x) { this.x_old = x    - this.width  * 0.5; }
   setOldCenterY(y) { this.y_old = y    - this.height * 0.5; }
 
	
	jump(){
		if(!this.jumping){
			this.jumping = true;
			this.velocity_y -= 20;
		}
	}
	
	moveLeft() {
		this.velocity_x -= 0.5;
	}
	
	moveRight() {
		this.velocity_x += 0.5;
	}
	
	updatePosition(gravity, friction) {
		this.x_old = this.x;
		this.y_old = this.y;
		this.velocity_y += gravity;
		this.x += this.velocity_x;
		this.y += this.velocity_y;
		
		this.velocity_x *= friction;
		this.velocity_y *= friction;
	}
}

class Door {
	constructor(door){
		this.destination_x = door.destination_x;
		this.destination_y = door.destination_y;
		this.destination_zone = door.destination_zone;
		this.left = door.x;
		this.right = door.x + door.width;
		this.top = door.y;
		this.bottom = door.y + door.height;
	}
   collideObject(object) {
   let center_x = object.getCenterX();
   let center_y = object.getCenterY();
   
   if (center_x < this.left || center_x > this.right ||
       center_y < this.top  || center_y > this.bottom) return false;

   return true;

 }
}

class TileSet {
	constructor(columns, tile_size){
		this.columns = columns;
		this.tile_size = tile_size;
	}
}
























