var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup;
// play, end
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 5;
  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleBlockGroup= new Group();
  
  ghost= createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;
}


function draw() {
  background(200);
  
  if (gameState == "play") {

    if(tower.y > 400){
      tower.y = 300
    }
  
    if(keyDown("space")){
      ghost.velocityY=-10;
    }
    // efeito gravidade
    ghost.velocityY += 0.8;
  
    if(keyDown("left_arrow")){
      ghost.x -= 4;
    }
  
    if(keyDown("right_arrow")){
      ghost.x += 4; 
    }
  
    // climbersGroup.collide(ghost);
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
  
    createDoors();

  } else if (gameState == "end") {
    // game over
    
  }


  drawSprites();
}

function createDoors(){
  if (frameCount%80===0) {
    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200, 15);

    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    door.x= Math.round(random(120,400));
    climber.x=door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);

    door.velocityY= 5;
    climber.velocityY= 5;
    invisibleBlock.velocityY = 5;

    // profundidade
    ghost.depth = door.depth;
    // traz o ghost pra frente da porta
    ghost.depth += 1;

    door.lifetime=800;
    climber.lifetime=800;
    invisibleBlock.lifetime=800;


    invisibleBlock.debug = true;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }

}
