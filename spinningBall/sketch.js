let monsters = [];
let extraCanvas;
let extraCanvas2;
let g = 0;
let hi = 0;
let n = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  extraCanvas = createGraphics(windowWidth, windowHeight);
  extraCanvas2 = createGraphics(windowWidth, windowHeight);
  
}

function draw() {
  image(extraCanvas,0,0);
  extraCanvas.background(220);
  background(0, 0 , 0, 0);
  image(extraCanvas2,0,0);
  extraCanvas2.background(0, 0, 0, 0);
  
  for(let nom of monsters){
    nom.go();
    for(let ot of monsters){
      if(ot.cheked == 0 && nom !== ot){
        nom.hit(ot);
        } 
    }
    if(nom.die()){
     monsters.splice(monsters.indexOf(nom),1);
    }
  }
  for(let nom of monsters){
    nom.cheked = 0;
    nom.tx();
    
    if(nom.test(mouseX, mouseY, nom.xx, nom.yy,nom.rlong)){
      textAlign(CENTER, CENTER);
      fill(225-nom.r, 225-nom.g, 225-nom.b);
      noStroke();
      text(monsters.indexOf(nom), nom.xx, nom.yy+nom.rlong/2+10);
    } 
  }
  textAlign(LEFT, CENTER);
  stroke(220);
  strokeWeight(5);
  text(monsters.length, 10, 10);
  textAlign(RIGHT, CENTER);
  stroke(220);
  strokeWeight(5);
  text("Hit = "+hi,windowWidth-10,10);
}

function mousePressed() {
  
  for(let nom of monsters){
    nom.clike();
  }
  if(g==0){
    let mon = new monster();
    monsters.push(mon);
    monsters[monsters.length-1].start();
  }
  g = 0;
}
function keyPressed() {
  if (keyCode == 32) {
    for(let i = 0; i < 50 ;i++){
      let mon = new monster();
      monsters.push(mon);
      monsters[monsters.length-1].pstart();
    }
  }
}

function showCount(){
  text(nom.ph,10,10+monsters.indexOf(nom)*30);
  for(let ri of nom.rings){
    text(ri.slong, 10+monsters.indexOf(nom)*80, windowHeight/2+nom.rings.indexOf(ri)*30);
  }
}