// Make modals draggable
$(".syllabus-gui-window").draggable({
  cursor: "move",
  handle: ".syllabus-gui-window-title"
});
// Activate window closure
$(".syllabus-gui-window-title-controls").on('click',function(){
  $(this).parent().parent().css('display','none');
});
// Single click should visually select an item
$(".syllabus-icon-grid-entry").on('click',function(){
  var elem = $(this).find('.syllabus-icon-grid-entry-text');
  $(elem).addClass('syllabus-icon-grid-entry-selected');
  $('.syllabus-icon-grid-entry-text').not(elem).removeClass('syllabus-icon-grid-entry-selected');
});
// Double click should launch item actions
$(".syllabus-icon-grid-entry").dblclick(function(){
  var action = $(this).parent().attr('action-item');
  if (action == "github") {
    window.open("https://github.com/Allegheny-ComputerScience-302-S2022",'_blank');
  } else {
    var elem = "#syllabus-"+action+"-window";
    $(elem).css('display','block');
  }
});
// Clicking anywhere not on an entry should release all entries
$(document).on('click',function(evt){
  console.log($(evt.target).closest(".syllabus-icon-grid-entry"));
  if ($(evt.target).closest(".syllabus-icon-grid-entry").length == 0) {
    $('.syllabus-icon-grid-entry-text').removeClass('syllabus-icon-grid-entry-selected');
  }
});
