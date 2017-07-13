$(document).ready(function() {
/// counter
  $('textarea').on('input',function(event) {
    var remain = 140 - $(this).val().length;
    if (remain >= 0) {
      $(this).parent().children('.counter').text(remain);
      $(this).parent().children('.counter').css("color", "");
    } else {
      $(this).parent().children('.counter').text(remain);
      $(this).parent().children('.counter').css("color", "red");
    };
  });




/////with validation
  $('form').on('submit', function(event){
    event.preventDefault();
    var msg = $(this).children('textarea').val().length;
    if (msg == 0) {
      var flashmsg = "Should not be zero.";
      $('.flashmsg').text(flashmsg);
      setTimeout(function(){ $('.flashmsg').empty(); }, 3000);
    }
    if (msg > 140){
      var flashmsg = "Should not be more than 140 words."
      $('.flashmsg').text(flashmsg);
      setTimeout(function(){
        $('.flashmsg').empty();
      }, 3000);
    } else {
      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $(this).serialize()
      }).then(localTweets).then( function() {
        $('.counter').text('140');
        $('textarea').val('').blur();
      })
    }
  })

  $(".compose").on('click', function(event){
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  })
});
