class ring{
  constructor(){
    this.launch = 0;
    this.Tou=0;
    this.r=0;
    this.g=0;
    this.b=0;
    this.x=0;
    this.y=0;
    this.long=0;
    this.slong=0;
    this.ph=0;
    this.hi=0;
    this.speed = 0;
    this.d = 0;
  }
  
  born(launch,r,g,b,x,y,long,slong,ph){
    this.launch = launch;
    this.r=r;
    this.g=g;
    this.b=b;
    this.x=x;
    this.y=y;
    this.long=long;
    this.slong=slong;
    this.ph=ph;
    this.slong = this.long;
    


  }
  run(x,y){
    //製作光環，寬度等於半徑/10，最小值為2；若半徑為零，光環消失。
    this.x=x;
    this.y=y;
    if(this.launch == 1){
      extraCanvas.noFill();
      if(this.long > 20){
        extraCanvas.strokeWeight(this.long/10);
      }else if(this.long <= 20 && this.long > 0){
        extraCanvas.strokeWeight(2);
      }else{
        extraCanvas.noStroke();
        this.ph = 0;
      }
      extraCanvas.stroke(this.r, this.g, this.b, this.ph);
      // print("r = "+this.r+" ; g = "+this.g+" ; b = "+this.b);
      extraCanvas.ellipse(this.x, this.y, this.slong);
      
      if(this.slong > 0){
    
        if(this.slong < 10 * this.long){
          this.slong = this.slong + 10;
          this.speed = 10;
          this.r = this.r+1;
          this.g = this.g+1;
          this.b = this.b+1;
        
          if(this.slong > this.long * 3){
            this.ph = this.ph - 1;
            this.slong = this.slong + 3;
            this.speed = 13;
          }else if(this.slong > this.long * 6){
            this.slong = this.slong + 7;
            this.speed = 17;
            this.ph = this.ph - 3;
          }else if(this.slong > this.long * 8){
            this.speed = 25;
            this.slong = this.slong + 15;
            this.ph = this.ph - 5;
          }
//           for(let nom = 0; nom < monsters.length - 1 ; nom++){
//             for(let ot = 0; ot < monsters.length - 1 ; ot++){
//               if(nom !== ot){
                
//               }
//             }
//           }
        }else{
          if(this.long-5 < 0){
             this.slong = 0;
             }else{
              this.slong = this.long; 
             }
          this.ph = 0;
          this.launch = 0;
          this.d = 1;

        }
      }else{
        this.slong = 0;
        this.ph = 0;
        this.launch = 0;
        this.d = 1;

      }
    }
  }
  die(){
    if(this.ph == 0 || this.d == 1){
      return true;
    }else{
      return false;
    }
  }
}