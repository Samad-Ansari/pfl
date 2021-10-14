
class Display {
	constructor(canvas) {
		this.buffer = document.createElement("canvas").getContext("2d");
		this.context = canvas.getContext("2d");

		this.paddle = new Paddle();

		
	}
	
	drawMap(image, image_columns, map, map_columns, tile_size) {
		let dsize = 16;
		this.buffer.fillStyle = "#202832";
		this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
		for (let index = map.length - 1; index > -1; -- index) {

		  let value = map[index];
		  let source_x =           (value % image_columns) * tile_size;
		  let source_y = Math.floor(value / image_columns) * tile_size;
		  let destination_x =           (index % map_columns) * dsize;
		  let destination_y = Math.floor(index / map_columns) * dsize;
		
		  this.buffer.drawImage(image, source_x, source_y, tile_size, tile_size, destination_x, destination_y, dsize, dsize);

		}

	}
	
	  drawPlayer(image, x, y, width, height) {
	    this.buffer.drawImage(image, x, y, width, height);
	  };

	  resize(width, height, height_width_ratio) {
		if (height / width > height_width_ratio) {

		  this.context.canvas.height = width * height_width_ratio;
		  this.context.canvas.width = width;

		} else {

		  this.context.canvas.height = height;
		  this.context.canvas.width = height / height_width_ratio;

		}

		this.context.imageSmoothingEnabled = false;

	  };
	  
	render() {
		this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
	}
	
}

class Paddle {
	constructor() {
		this.image = new Image();
	}
}