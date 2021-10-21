var bola;
var raqueteJogador;
var raqueteComputador;
var placarJogador;
var placarComputador;
var c3poFrente;
var r2d2Frente;
var c3poLado;
var r2d2Lado;
var c3poOuch;
var r2d2Triste;
var c3poPerdedor;
var r2d2Perdedor;
var somQuicar;



var edges;
var grupoQuicar;
//1: sacar
//2: jogando
//3: fim
var estado;

function preload() {
  c3poFrente = loadImage('c3po_parado.png');
  r2d2Frente = loadImage('r2d2_parado.png');
  
  c3poLado = loadImage('c3po_jogavel.png');
  r2d2Lado = loadImage('r2d2_jogavel.png');
  
  r2d2Perdedor = loadImage('r2d2_queimado.png');
  c3poPerdedor = loadImage('c3po_bravo.png');
  
  r2d2Triste = loadSound('r2d2-sad.wav');
  c3poOuch = loadSound('c3po-ouch.mp3');
  
  somQuicar = loadSound('hit.wav');
}

function setup() {
  createCanvas(400, 400);
  bola = createSprite(200, 200, 15, 15);
  
  
  raqueteComputador = createSprite(50, 200, 10, 70);
  raqueteComputador.addImage('c3po inicio', c3poFrente);
  raqueteComputador.addImage('c3po jogo', c3poLado);
  raqueteComputador.addImage('c3po loser', c3poPerdedor);
  
  raqueteJogador = createSprite(350, 200, 10, 70);
  raqueteJogador.addImage('r2d2 inicio', r2d2Frente);
  raqueteJogador.addImage('r2d2 jogo', r2d2Lado);
  raqueteJogador.addImage('r2d2 loser', r2d2Perdedor);
  
   placarJogador = 0;
   placarComputador = 0;
  
  estado = 'sacar';
  
  edges = createEdgeSprites();
  grupoQuicar = [edges[2], edges[3], raqueteJogador, raqueteComputador];
 
  
  
  
 
}

function criaLinha() {
    for(var y = 0; y < 400; y += 25) {
   line(200, y, 200, y + 15); 
  
  }
  }

function draw() {
  // limpa a tela
  background('black');
  
  stroke('white');
  
  criaLinha();
  
  fill('white');
  text(placarJogador, 230, 20);
  text(placarComputador, 170, 20);
  
  
  
  
  
  drawSprites();
  
  if(estado == 'sacar') {
    stroke('white');
    text('aperte espaço para sacar', 150, 180);
  }
  if(keyDown('space') && estado == 'sacar') {
    bola.velocityX = 4;
    bola.velocityY = 4;
    estado = 'jogando';
    
    
  }
  
  if(estado == 'jogando') {
    raqueteJogador.changeImage('r2d2 jogo');
    raqueteComputador.changeImage('c3po jogo');
  }
  
  //raqueteJogador.y = mouseY;
  //raqueteComputador.y = bola.y;
  
  if(keyDown('up')) {
    raqueteJogador.y = raqueteJogador.y  - 5;
  }
  
  if(keyDown('down')) {
    raqueteJogador.y = raqueteJogador.y + 5;
  }
  
  if(keyDown('w')) {
    raqueteComputador.y = raqueteComputador.y - 5;
  }
  
  if(keyDown('s')) {
    raqueteComputador.y = raqueteComputador.y + 5;
  }
  
  if(bola.isTouching(raqueteComputador) || bola.isTouching(raqueteJogador) || bola.isTouching(edges)) {
   somQuicar.play(); 
}
  
  bola.bounceOff(grupoQuicar);
  
  if(bola.x > 400 || bola.x < 0 ) {
    estado = 'sacar'; 
    if(bola.x > 400) {
      placarComputador = placarComputador + 1;
      r2d2Triste.play();
      raqueteJogador.changeImage('r2d2 loser');
      
       }
    if(bola.x < 0) {
      placarJogador = placarJogador + 1;
      c3poOuch.play();
      raqueteComputador.changeImage('c3po loser');
    }
    bola.x = 200;
    bola.y = 200;
    bola.velocityX = 0;
    bola.velocityY = 0;
    
    
    
  }
  
  if(placarJogador == 5 || placarComputador == 5) {
    estado = 'fim';
    stroke('white');
    text('game over! Aperte "r" para recomeçar', 100, 180);
    
  }
  
  if(keyDown('r') && estado == 'fim') {
    placarJogador = 0;
    placarComputador = 0;
    estado = 'sacar';
  }
  
  
  
   

}