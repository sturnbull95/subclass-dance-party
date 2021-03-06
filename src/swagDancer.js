var SwagDancer = function (top, left) {
  makeDancer.call(this, top, left, 0.1);;
};

SwagDancer.prototype = Object.create(makeDancer.prototype);
SwagDancer.prototype.constructor = SwagDancer;
var rand = Math.random() * 5;
SwagDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep = makeDancer.prototype.step.bind(this);
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  var screenHeight = $(window).height();
  var screenWidth = $(window).width();
  let totalSpeed = Math.sqrt((this.xSpeed * this.xSpeed) + (this.ySpeed * this.ySpeed));
  console.log(totalSpeed);
  if (this.top < 0 || this.top > screenHeight) {
    this.ySpeed *= -1;
  }
  if (this.left < 0 || this.left > screenWidth) {
    this.xSpeed *= -1;
  }
  if($('.earth')[0].style.display === '') {
    let centerY = $(window).height() * 0.5;
    let centerX = $(window).width() * 0.5;
    let hDistance = this.left - centerX;
    let vDistance = this.top - centerY;
    let diagonal = Math.sqrt((vDistance * vDistance) + (hDistance * hDistance));
    this.xSpeed =  totalSpeed * (vDistance / diagonal);
    this.ySpeed = totalSpeed * (hDistance / diagonal);
    //XXXXXXXX
    if(this.top === centerY && this.xSpeed < 0 && this.ySpeed < 0){
      this.xSpeed *= -1;
    }
    if(this.top === centerY && this.xSpeed > 0 && this.ySpeed < 0){
      this.xSpeed *= -1;
    }
    if(this.top === centerY && this.xSpeed > 0 && this.ySpeed > 0){
      this.xSpeed *= -1;
    }
    if(this.top === centerY && this.xSpeed < 0 && this.ySpeed > 0){
      this.xSpeed *= -1;
    }
  
    //YYYYYYYY
    if(this.left === centerX && this.xSpeed > 0 && this.ySpeed > 0){
      this.ySpeed *= -1;
    }
    if(this.left === centerX && this.xSpeed > 0 && this.ySpeed < 0){
      this.ySpeed *= -1;
    }
    if(this.left === centerX && this.xSpeed < 0 && this.ySpeed > 0){
      this.ySpeed *= -1;
    }
    if(this.left === centerX && this.xSpeed < 0 && this.ySpeed < 0){
      this.ySpeed *= -1;
    }
  }
  //console.log(this.xSpeed, this.ySpeed);
  this.left += rand * this.xSpeed;
  this.top += rand * this.ySpeed;
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};
