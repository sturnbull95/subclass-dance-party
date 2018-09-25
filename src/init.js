$(document).ready(function() {
  document.querySelectorAll('.earth')[0].style.display = 'none';
  window.dancers = [];
  var randColor = () => Math.floor(Math.random()*255);
  var color = () => `rgb(${randColor()}, ${randColor()}, ${randColor()})`;
  setInterval(() => {
    $('body')[0].style.setProperty('background-color', color());
  }, 100000);
  $('.planet').on('click', function(event) {
    document.querySelectorAll('.earth')[0].style.display = '';
  });
  $('.lineUp').on('click', function(event) {
    var currentDancers = document.querySelectorAll('.dancer');
    for (var element of window.dancers) {
      element.top = Math.floor(Math.random() * ($(window).height() - 0 + 1));
      element.left = 50;
      element.stepStorage = element.step;
      element.step = () => {};
      var func = function() {
        this.step = this.stepStorage;
        this.step();}
      setTimeout(func.bind(element), 1000);
    }
  });
  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    var myFunction = function(){
      dancer.stepStorage = dancer.step;
      dancer.step = () => {};
    };
    var explode = function(){
      for(var i = 0; i < 4; i++){
        var newDancers = new dancerMakerFunction(dancer.top+i*10,dancer.left+i*10,Math.random()*1000);
        $(dancer.$node).remove();
        if(i === 0){
          newDancers.xSpeed = Math.random() * 3;
          newDancers.ySpeed = Math.random() * 3;
        }
        if(i === 1){
          newDancers.xSpeed = Math.random() * 3;
          newDancers.ySpeed = -Math.random() * 3;
        }
        if(i === 2){
          newDancers.xSpeed = -Math.random() * 3;
          newDancers.ySpeed = -Math.random() * 3;
        }
        if(i === 3){
          newDancers.xSpeed = -Math.random() * 3;
          newDancers.ySpeed = Math.random() * 3;
        }
        newDancers.$node[0].style.setProperty('border-color', color());
        newDancers.$node[0].addEventListener("mouseover", myFunction);
        newDancers.$node[0].addEventListener("mouseout", someOtherFunction);
        newDancers.$node[0].addEventListener("click", explode);
        $('body').append(newDancers.$node);
        console.log(newDancers)
        window.dancers.push(newDancers);
      }
    };
    var someOtherFunction = function(){
      dancer.step = dancer.stepStorage;
      dancer.step();
    };
    dancer.$node[0].addEventListener("mouseover", myFunction);
    dancer.$node[0].addEventListener("mouseout", someOtherFunction);
    dancer.$node[0].addEventListener("click", explode);
    dancer.$node[0].style.setProperty('border-color', color());
    var size = () => Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    dancer.$node[0].style.setProperty('border-width', (size() + 'px'));
    dancer.$node[0].style.setProperty('border-radius', (size() + 'px'));
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });
});
