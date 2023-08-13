let preb;
let walks = [];
let sherry;
var wt = 0;

function preload(){
  for(let i=0;i<3;i++){
    // walks[i] = loadImage('bear/walk/walk${i}.png');
    walks[i] = loadImage('bear/walk/walk'+i+'.png');
  }
  // preb = loadImage('bear/walk/walk0.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  sherry = new pudingBear();
}

function draw() {
  background(250);
  sherry.body();
  wt++;
  if(wt == 5){
    sherry.move();
    wt = 0;
    }
  
}
class pudingBear{
  
  constructor(){
    this.x = windowWidth/2;
    this.y = windowHeight/2+100;
    this.wl = 0;
    this.g = 0;
    this.px =0;
    this.py =0;
    this.nx =0;
    this.ny =0;
    this.n = 0;
    this.ch =0;
  }
  body(){
    image (walks[this.wl], this.x-100, this.y-190,200,200);
    textAlign(CENTER, CENTER);
    // text('px = '+ this.px, this.x, this.y+100);
    // text('nx = '+ this.nx, this.x, this.y+120);
    // text(' x = '+ this.x, this.x, this.y+140);
  }
  
  go(){
    this.g=1;
    this.px = mouseX;
    this.py = mouseY;
    this.nx =this.x;
    this.ny =this.y;
  }
  
  move(){
    //let ch = 0;
    let sc = 0;
    let c = 0;
    if(this.g == 1 && this.x !== this.px){
      if(this.n == 0 && this.wl == 0){
        this.wl = 1;
        this.n = 1;
      }else if (this.n == 1 && this.wl == 0){
        this.wl = 2;
        this.n = 0;
      }else{
        this.wl = 0;
      }
      sc = dist(this.x, this.y, this.px, this.py);
      c = dist(this.nx, this.ny, this.px, this.py);
      // print(test);
      // ch = map(sc, 0, c, 10, 50);
      if(c* 2/3 <= sc){
        this.ch++;
        // text('speed = '+ this.ch, this.x, this.y+10);
        // text('longg = '+ sc, this.x, this.y+30);
      }else if(c/3 >= sc){
        this.ch--;
        // text('speed = '+ this.ch, this.x, this.y+10);
        // text('longg = '+ sc, this.x, this.y+30);
      }else{
        this.ch = this.ch;
        // text('speed = '+ this.ch, this.x, this.y+10);
        // text('longg = '+ sc, this.x, this.y+30);
      }
      this.speed(c,this.ch);
      //text('ch = '+ ch, this.x, this.y+10);
      if(abs(sc) < 10){
      
      this.x = this.px;
      this.y = this.py;
      this.g = 0;
      this.wl = 0;
      this.ch = 0;
    }
    }
  }
  speed(c, s){
    this.y = this.y + map(s, 0, c, 0, (this.py - this.ny));
    this.x = this.x + map(s, 0, c, 0, (this.px - this.nx));
  }
}

function mousePressed(){
  sherry.go();
}