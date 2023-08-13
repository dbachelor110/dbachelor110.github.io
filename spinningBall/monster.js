class monster{

  constructor(){
    this.rings = [];
    
    this.xx = 0;
    this.yy = 0;
    this.r = 50;
    this.g = 50;
    this.b = 50;
    this.rr = 0;
    this.gg = 0;
    this.bb = 0;
    this.big = 0;
    this.speed = 0;
    this.rlong = 0;
    this.t = 0;
    this.cd = 0;
    this.rrlong = 0;
    this.ph = 100;
    this.phh = 100;
    this.skill = 0;
    this.launch = 0;
    this.jj = 0;
    this.p = 0;
    this.a = 0;
    this.Tou = 0;
    this.o = 5;
    this.hi = 0;
    this.cheked = 0;
  }
  
  start(){
    this.show();
    this.coldown();
  }
  
  pstart(){
    this.press();
    this.coldown();
  }
  
  go(){
    this.born();
    this.poo();
    this.chose();
    this.move();
    this.change();
    this.color();
    this.attake();
    this.die();
    if(this.skill == 1){
      if(this.ph > 0 && this.rlong > 0){
        this.old();
      }else if(this.ph <= 0){
        this.ph = 0;
      }
      this.skill = 0;
     }
    
     
    
    
    
    
    
  }
  
  born(){
    //半徑等於jj*ph百分比
    this.rlong = this.jj  * this.ph / 100;
    this.ring();
    this.ball();
  }
  
  ring(){
    
    for(let nom of this.rings){
      nom.run(this.xx,this.yy);
    }
    
    for(let nom of this.rings){
      if(nom.die()){
        this.rings.splice(this.rings.indexOf(nom),1);
      }
    }
    
  }
  
  ball(){    
    noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.xx, this.yy, this.rlong);
  }
  
  tx(){
    if(this.hi>0){
      noStroke();
      textAlign(CENTER, CENTER);
      fill(225-this.r, 225-this.g, 225-this.b)
      text(this.hi, this.xx, this.yy);
    }
  }
  
  change(){

    this.t++;
    
    if(this.t == this.cd){
      this.skill = 1;
      this.t = 0;
    }
    if(this.skill == 1){
       this.launch = 1;
       }
  }
  
  color(){
    
    let c = 0;
    
    if(this.skill == 1){
      
      c = 1;
       
       }
    if(c == 1){
      
      this.r = this.r + random(10, 50);
      this.g = this.g + random(10, 50);
      this.b = this.b + random(10, 50);
      
      if(this.r > 225){
        this.r = this.r - 225;
      }
      
      if(this.g > 225){
        this.g = this.g - 225;
      }
      
      if(this.b > 225){
        this.b = this.b - 225;
      }
      
      c = 0;
       
    }
    
  }
  
  move(){
    this.speed = ceil(random(1, 2));
    this.xx = this.xx + random(-this.speed, this.speed);
    this.yy = this.yy + random(-this.speed, this.speed);
  }
  
  show(){
    this.preShow(mouseX, mouseY);
  }
  
  preShow(x, y){
    this.xx = x;
    this.yy = y;
    this.big = 10*ceil(random(3, 7));
    this.jj = this.big;
    this.rrlong = this.big - 20;
  }
  
  coldown(){
    
    this.cd = 5 * ceil(random(2, 10));
    
  }
  
  reborn(){
    this.r = 50;
    this.g = 50;
    this.b = 50;
    this.ph = this.ph + 50;
  }
  
  attake(){
    
    if(this.skill == 1 && this.ph > 0){
      let n = new ring();
      this.rings.push(n);
      this.rings[this.rings.length-1].born(this.launch,this.r,this.g,this.b,this.xx,this.yy,this.rlong,this.rrlong,this.phh);
      this.launch = 0;
    }
  }
  
  old(){
    this.ph = this.ph - this.o;    
  }
  
  die(){
    if(this.ph==0){
      return true;
    }else{
      return false;
    }
    
  }
  
  poo(){
    if(this.test(mouseX, mouseY, this.xx, this.yy,this.rlong)){
      if(this.p < this.rlong * 1/10){
        this.a = 1;
       }else if(this.p >= this.rlong * 2/5){
        this.a = -1;
       }
    }
    this.p = this.p + this.a;
  }
  
  chose(){
    
    let lin = this.rlong * 1/5;
    
    if(this.test(mouseX, mouseY, this.xx, this.yy,this.rlong)){

      noFill();
      if(this.rlong > 20){
        
        strokeWeight(this.rlong/20);
         
         }else{
           strokeWeight(1);
         }
      
      stroke(225 - this.r, 225 - this.g, 225 - this.b);
      ellipse(this.xx, this.yy, this.p);
      
      if(this.rlong > 20){
        
        strokeWeight(this.rlong/15);
         
         }else{
           strokeWeight(1);
         }
      
      ellipse(this.xx, this.yy, this.p + lin);
      
      if(this.rlong > 20){
        
        strokeWeight(this.rlong/12);
         
         }else{
           strokeWeight(1);
         }
      
      ellipse(this.xx, this.yy, this.p + 2 * lin);
    }
    else{
      this.p = 0;
      lin = 0;
    }
    
  }
  
  clike(){  
    if(this.test(mouseX, mouseY, this.xx, this.yy,this.rlong)){
      g = 1;
      this.reborn();
    } 
  }
  
  test(x, y, px, py,r){
    if(r/2 > dist(x, y, px, py)){
      return true;
    }else{
      return false;
    }
  }
  
  testTouch(x, y, px, py,r, ri){
    if(this.Tou == 0 && r/2 >= dist(x, y, px, py) && (r - ri.speed)/2 <= dist(x, y, px, py)){
      this.Tou=1;
      ri.Tou=1;
    }
  }
  
  hit(other){
    for(let ri of other.rings){
      this.testTouch(this.xx, this.yy, ri.x, ri.y,ri.slong + this.rlong, ri);
      if(this.Tou == 1 && ri.Tou == 0){
        ri.hi = ri.hi + 1;
        this.hi = this.hi+1;
        if(this.ph>0){
          this.ph = this.ph - this.o;
        }
        this.Tou = 0;
        ri.Tou = 0;
        hi = hi+1;
      }
    }
  }
  
  press(){
    this.preShow(random(windowWidth), random(windowHeight));
  }
  
}