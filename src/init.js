$(document).ready(function() {
  window.dancers = [];

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
    var randColor = () => Math.floor(Math.random()*255);
    var color = () => `rgb(${randColor()}, ${randColor()}, ${randColor()})`;
    dancer.$node[0].style.setProperty('border-color', color());
    var size = () => Math.floor(Math.random() * (30 - 20 + 1)) + 20;
    dancer.$node[0].style.setProperty('border-width', (size() + 'px'));
    dancer.$node[0].style.setProperty('border-radius', (size() + 'px'));
    setInterval(() => {
      $('body')[0].style.setProperty('background-color', color());
    }, 1000);
    $('body').append(dancer.$node);
  });
});
