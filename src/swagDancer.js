var SwagDancer = function (top, left) {
  makeDancer.call(this, top, left, 0.1);;
};

SwagDancer.prototype = Object.create(makeDancer.prototype);
SwagDancer.prototype.constructor = SwagDancer;
var rand = Math.random() * 3;
SwagDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep = makeDancer.prototype.step.bind(this);
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  var screenHeight = $(window).height();
  var screenWidth = $(window).width();
  if (this.top < 0 || this.top > screenHeight) {
    this.ySpeed *= -1;
  }
  if (this.left < 0 || this.left > screenWidth) {
    this.xSpeed *= -1;
  }
  this.left += rand * this.xSpeed;
  this.top += rand * this.ySpeed;
  var styleSettings = {
    top: this.top,
    left: this.left
  };
  this.$node.css(styleSettings);
};
