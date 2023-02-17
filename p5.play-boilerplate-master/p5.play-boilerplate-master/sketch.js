var fundo, fundoImg;
var atirador, atiradorImg;
var edges;
var linha;
var ogro, ogroImg, ogros;
var bala, municoes;
var balas = 90;
var gameState = "duelo";

function preload(){

 fundoImg = loadImage("img/fundo2.png");
 atiradorImg = loadImage("img/personagem.png");
 ogroImg = loadImage("img/ogro.png");

}
function setup() {
  createCanvas(windowWidth,windowHeight);

  fundo = createSprite(displayWidth / 2 +160, displayHeight / 2 +35, 20,20);
  fundo.addImage(fundoImg);
  fundo.scale = 2.45;

  atirador = createSprite(displayWidth -1150, displayHeight -200, 10, 10);
  atirador.addImage(atiradorImg);
  atirador.scale = 0.5;
  atirador.setCollider("rectangle",0 ,90 ,250,350);

  edges = createEdgeSprites();
  linha = createSprite(displayWidth -1150, displayHeight -450, 10000, 30);
  linha.visible = false;

  ogros = new Group();
  municoes = new Group();
}

function draw() {
  if (gameState === "duelo"){

  if (keyDown(UP_ARROW) || touches.length > 0 ){
    atirador.y = atirador.y -7;
  }

  if (keyDown(DOWN_ARROW) || touches.length > 0){
    atirador.y = atirador.y +7;
  }

  if (keyWentDown("space") || touches.length > 0){


    bala = createSprite(displayWidth -1050, atirador.y +52, 20, 10 );
    bala.velocityX = 20;
    bala.lifetime = 100;
    municoes.add(bala);
    atirador.depth = bala.depth;
    atirador.depth += 2;

    balas -= 1;


  }

  atirador.collide(edges[3]);
  atirador.collide(edges[2]);
  atirador.collide(linha);

  if (ogros.isTouching(atirador)){

    for (var i = 0; i <ogros.length; i += 1){

      if(ogros[i].isTouching(atirador)){

         ogros[i].destroy();
      }
    }
  }

  if (ogros.isTouching(municoes)){

    for (var i = 0; i <ogros.length; i += 1){

      if(ogros[i].isTouching(municoes)){

         ogros[i].destroy();
         municoes.destroyEach();
      }
    }
  }

  ogrocriacao();
}
  drawSprites();

  if (gameState === "fim"){

    textSize(100);
    fill("red");
    text("Você Perdeu", 400, 400);
  
    atirador.destroy();
    ogros.destroyEach();
    
  }
  else if (gameState === "semMunicoes"){
  
    textSize(100);
    fill("red");
    text("Acabou a Munição", 400, 400);
  
    atirador.destroy();
    ogros.destroyEach();
    municoes.destroyEach();
  }
  else if (gameState === "vitoria"){
  
    textSize(100);
    fill("green");
    text("Vitoria", 400, 400);
  
    atirador.destroy();
    ogros.destroyEach();
  }
  
}

function ogrocriacao(){

  if (frameCount % 40 === 0){
    ogro = createSprite(displayWidth +350, random(1100, 700), 40, 40);
    ogro.addImage(ogroImg);
    ogro.scale = 0.7;
    ogro.velocityX = -8.5;
    ogro.setCollider("rectangle", 0, 0, 100, 200);
    ogro.lifetime = 480 ;
    ogros.add(ogro);
  }


}