$(".syllabus-gui-window").draggable({
  cursor: "move",
  handle: ".syllabus-gui-window-title"
});
$(".syllabus-gui-window-title-controls").on('click',function(){
  $(this).parent().parent().css('display','none');
});
$(".syllabus-icon-grid-entry").on('click',function(){
  var elem = $(this).find('.syllabus-icon-grid-entry-text');
  $(elem).css('background-color','#00a9e7');
  $(elem).css('border','dotted 2px #fff');
  $(".syllabus-icon-grid-entry-text").not(elem,function(){
    $(this).css('background-color', 'none');
  });
});
$(".syllabus-icon-grid-entry").dblclick(function(){
  var action = $(this).parent().attr('action-item');
});
