import React from 'react';
import Sketch from 'react-p5';
import p5 from 'p5';
class Processing extends React.Component{
    constructor(){
        super();
    }

}
let myNub;
let nsize;
function setup(){
  p5.createCanvas(1920,1080);
  myNub = new nubjuk(960, 100);
  nsize = new Nsize();
}
function draw(){
  p5.background(255,255,255);
  
  //myNub.display();
  p5.stroke(0,0,0);
  p5.strokeWeight(1);
  nsize.displayLine();
  var k = p5.random(0,1);
  var s = 1;
  if(k<0.6){
    s = -1;
    
  }
  // System.out.printf("%d,%f\n",s,k);
  myNub.velot = s * p5.pow(10,p5.random(-1,0.5));
  myNub.update();
  if(myNub.pos.y>=700+100){
    myNub.score=-1;
    myNub.reset();
  }
  p5.stroke(247,146,128);
  p5.textSize(30);
  p5.text("Score: ",250,300);
  p5.text(parseInt(myNub.score),350,300);
}
function keyPressed() {
  myNub.setScore();
}

class Nsize{
  
  constructor(){
    this.initwidth = 100;
    this.ratio = 0.25;
    this.inity = 100;
  }
  
  getposWidth(path,isRight){
    let st;
    if(isRight){
      st = p5.createVector(960+this.initwidth,this.inity);
     }
    else{
      st = p5.createVector(960-this.initwidth,this.inity);
    }
    let rat = isRight?this.ratio:-this.ratio;
    let d = p5.createVector(rat*path,path);
    let f = st.add(d);
    return f;
  }
   getwidth(path){
    return this.initwidth + this.ratio * path;
  }
  displayLine(){
  p5.fill(255,255,255);
  let sr = this.getposWidth(0,true);
  let sl = this.getposWidth(0,false);
  let fr = this.getposWidth(700,true);
  let fl = this.getposWidth(700,false);
  p5.line(sr.x,sr.y,fr.x,fr.y);
  p5.line(sl.x,sl.y,fl.x,fl.y);
  p5.line(300,fl.y,1620,fl.y);
}
}


class nubjuk {
  // this.c = color(0,0,255);
  
  constructor(initx,inity){
    this.pos = p5.createVector(initx,inity);
    this.initx = initx;
    this.inity = inity;
    this.up = p5.createVector(0,1);
    this.path = 0;
    this.ishit = false;
    this.fin = false;
    this.score = 0;
    this.sinratio = 0.2;
    this.sinratio2 = 0.1;
    this.velot = 1;
    this.velos = 2.5;
    this.velo = this.velot * this.velos;
    this.slip = 0.23;
  }
  setScore(){
    this.score = this.path/7;
    this.fin = true;
    //delay(1000);
    this.reset();
  }
  update(){
    if(this.path==0){
      this.fin = false;
    }
    if(this.path<750){
      this.path = this.path + this.velo;
    }
    this.pos.y = this.inity + this.path;
    //System.out.println(pos.y);
    let newrad = parseInt(nsize.getwidth(parseInt(this.path))/p5.cos(p5.PI*this.slip));
    this.display(newrad);
  }
  display(rad){
    p5.noStroke();
    let blue = p5.color(76,161,254);
    let white = p5.color(255,255,255);
    let black = p5.color(0,0,0);
    let pink = p5.color(247,146,128);
    let wratio = 0.1;
    let wwidthratio = 0.25;
    let bratio = 0.06;
    let mpratio = 0.15;
    let mratio = 0.04;
    let mslip = 0.23;
    let blushratio = 0.2;
    let blushpyratio = 0.12;
    let blushpxratio = 0.45;
    let swift = rad*this.sinratio*p5.sin(rad*this.sinratio2);
    p5.fill(blue);
    let pos = p5.createVector(this.pos.x,this.pos.y);
    pos.x = this.pos.x + swift;
    p5.stroke(blue);
    p5.strokeWeight(2);
    p5.line(pos.x - rad*p5.sin(p5.PI*this.slip),pos.y,pos.x+rad*p5.sin(p5.PI*this.slip),pos.y);
    p5.strokeWeight(1);
    p5.noStroke();
    p5.arc(pos.x,pos.y-rad*p5.sin(p5.PI*this.slip),2*rad,2*rad,p5.PI*this.slip,p5.PI*(1-this.slip),p5.OPEN);
    p5.arc(pos.x,pos.y+rad*p5.sin(p5.PI*this.slip),2*rad,2*rad,p5.PI*this.slip + p5.PI,p5.PI*(1-this.slip) + p5.PI,p5.OPEN);
    p5.fill(white);
    p5.circle(pos.x-rad*wwidthratio,pos.y,2*wratio*rad);
    p5.circle(pos.x+rad*wwidthratio,pos.y,2*wratio*rad);
    p5.fill(black);
    p5.circle(pos.x-rad*wwidthratio,pos.y,2*bratio*rad);
    p5.circle(pos.x+rad*wwidthratio,pos.y,2*bratio*rad);
    p5.noFill();
    p5.stroke(0,0,0);
    p5.arc(pos.x,pos.y+rad*mpratio,2*rad*mratio,2*rad*mratio,p5.PI*this.mslip,p5.PI*(1-this.mslip));
    p5.fill(pink);
    p5.noStroke();
    p5.circle(pos.x-rad*blushpxratio,pos.y+rad*blushpyratio,rad*blushratio);
    p5.circle(pos.x+rad*blushpxratio,pos.y+rad*blushpyratio,rad*blushratio);
    pos.x = pos.x - swift;
    
    //circle(pos.x,pos.y,10);
      
  }
  reset(){
    this.pos = p5.createVector(this.initx,this.inity);
    this.path = 0;
    //this.score = 0;
    this.fin = false;
    this.sinratio = p5.pow(10,p5.random(-1,0.5));
    this.sinratio2 = p5.pow(10, p5.random(-1,0.5));
    this.velos = p5.pow(10, p5.random(0,0.7));
  }
}

