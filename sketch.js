var rocket, rocketImage;
var comet, cometImage;
var space, spaceImage;
var star, starImage;

function preload(){
    rocketImage = loadImage("rocket.png");
    cometImage = loadImage("comet.png");
    spaceImage = loadImage("space.png");
    starImage = loadImage("star.png");
}

function setup() {
    createCanvus(600,600);
    space = createSprite(300,300);
    space.addImage("space",spaceImage);
    space.velocity = 1;

    cometGroup = new Group();
    starGroup = new Group();
    invisibleBlockGroup = new Group();

    rocket = createSprite(200,200,50,50);
    rocket.addImage("rocket",rocketImage);
    rocket.scale = 0.3; 
}

function draw() {
    background(0);
    if (gameState === "play") {
        if(keyDown("left_arrow")){
            rocket.x = rocket.x - 3;
        }
        
        if(keyDown("right_arrow")){
            rocket.x = rocket.x + 3;
        }
        
        if(keyDown("space")){
            rocket.velocityY = -10;
        }
        
        rocket.velocityY = rocket.velocityY + 0.8
        
        if(space.y > 400){
            space.y = 300
        }
        spawncomet();
    
        if(cometGroup.isTouching(ghost)){
            ghost.velocityY = 0;
        }
        if(invisibleBlockGroup.isTouching(rocket) || rocket.y > 600){
            rocket.destroy();
            gameState = "end"
        }
        
        drawSprites();
      }
      if (gameState === "end"){
            stroke("yellow");
            fill("yellow");
            textSize(30);
            text("Game Over", 230,250)
      }
}

function spawncomet() {

    if (frameCount % 240 === 0) {
      var comet = createSprite(200, -50);
      var star = createSprite(200,10); 
      var invisibleBlock = createSprite(200,15);
      invisibleBlock.width = star.width;
      invisibleBlock.height = 2;
      
      comet.x = Math.round(random(120,400));
      star.x = comet.x;
      invisibleBlock.x = comet.x;
      
      comet.addImage(cometImage);
      star.addImage(starImage);
      
      comet.velocityY = 1;
      star.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      rocket.depth = comet.depth;
      rocket.depth +=1;
     
      comet.lifetime = 800;
      star.lifetime = 800;
      invisibleBlock.lifetime = 800;
  
      cometGroup.add(comet);
      invisibleBlock.debug = true;
      starGroup.add(star);
      invisibleBlockGroup.add(invisibleBlock);
    }
  }