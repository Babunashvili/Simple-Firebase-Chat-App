$(document).ready(function(){
  var rootRef = firebase.database().ref();
  var currentMessageRef = rootRef.child('currentMessage');
  var add = $('.add');
  var detele = $('.delete');

  function createNewComment(postId, username, text) {
    firebase.database().ref('messages').push({
      id:postId,
      text: text,
      author: username
    });
    $('.message').val('');
  }

  var starCountRef = firebase.database().ref('messages');

  firebase.database().ref('/messages').on('value',function(snap){
    $('#msg').html('');
    snap.forEach(function(noteSnapshot) {

          // $('#msg').append("<li>"+noteSnapshot.val().author+":"+noteSnapshot.val().text+"<small class='delete' data-key='"+noteSnapshot.key+"'>x</small></li>");
          $('#msg').append("<li><b>"+noteSnapshot.val().author+"</b>: "+noteSnapshot.val().text+"</li>");

        });

    $('.mess').animate({ scrollTop: $('#msg').height() }, 50);
  });
  add.on('click',function(){
    var d = new Date();
    var n = d.getMilliseconds();
    if ($('.name').val().length > 0 && $('.message').val().length > 0) {
     createNewComment(n, $('.name').val(),$('.message').val());
   }

 });



  $('body').delegate('.delete','click',function(){
   var key = $(this).attr('data-key');
   starCountRef.child(key).remove();
 });


  $(".message").keyup(function(event){

    if (event.keyCode == 13) {        
      if(event.shiftKey){
        event.stopPropagation();
      } else {
        event.preventDefault();
        var d = new Date();
        var n = d.getMilliseconds();

        if ($('.name').val().length > 0 && $('.message').val().length > 0) {
         createNewComment(n, $('.name').val(),$('.message').val());
       }
       
     }
   }
 });

});