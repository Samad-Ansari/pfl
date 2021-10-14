// Frank Poth 03/23/2017

window.addEventListener("load", function(event) {

  "use strict"
	
  const ZONE_PREFIX = "zone";
  const ZONE_SUFFIX = ".json"
  
  class AssetManager {
	  constructor(){  
		this.tile_set_image = undefined;
	  }
	  
	  requestJSON(url, callback) {
	  
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				
				var obj=this.responseText;
				callback(JSON.parse(obj))
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
      }
	  
	  requestImage(url, callback){
		  let image = new Image();
		  image.addEventListener("load", function(event){
			callback(image);
		  }, { once: true })
		  image.src = url;
	  }
  }

  function keyDownUp(event){
	controller.keyDownUp(event.type, event.keyCode);

  }

  function resize(event){

    display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
    display.render();

  };

  function render(){

    display.drawMap(assets_manager.tile_set_image, game.world.tile_set.columns, game.world.graphical_map, game.world.columns, game.world.tile_set.tile_size);
    display.drawPlayer(
		display.paddle.image, 
	 game.world.player.x,
    game.world.player.y, game.world.player.width, game.world.player.height);
    display.render();

  }

  function update(){
	if (controller.left.active)  { game.world.player.moveLeft();  }
    if (controller.right.active) { game.world.player.moveRight(); }
    if (controller.up.active)    { game.world.player.jump(); controller.up.active = false; }

    game.world.update();
	if(game.world.door){
		engine.stop();
		
		assets_manager.requestJSON(ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {
			game.world.setup(zone);
			engine.start();
		});
		return;
	}

  };

  var assets_manager = new AssetManager();
  var controller = new Controller();
  var display    = new Display(document.querySelector("canvas"));
  var game       = new Game();
  var engine     = new Engine(1000/30, render, update);
  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {
	  game.world.setup(zone);
	 
	  assets_manager.requestImage("tiles.png", (image) => {
		assets_manager.tile_set_image = image;
		resize();
		engine.start();
	  })
  })

  display.paddle.image.src = "dist/img/paddle.png"


  window.addEventListener("keydown", keyDownUp);
  window.addEventListener("keyup",   keyDownUp);
  window.addEventListener("resize",  resize);

});
