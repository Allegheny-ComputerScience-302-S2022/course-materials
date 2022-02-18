// BINDINGS

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
var delay = 0;
$(".syllabus-icon-grid-entry").on('click',function(){
  var action = $(this).parent().attr('action-item');
  if (delay == 0) {
    // Integrate with other first click option?
    delay = new Date().getTime();
  } else {
    if(((new Date().getTime()) - delay) < 500){
      // Is double click
      if (action == "github") {
        window.open("https://github.com/Allegheny-ComputerScience-302-S2022",'_blank');
      } else {
        var elem = "#syllabus-"+action+"-window";
        $(elem).css('display','block');
      }
    } else {
      // Is not yet double click
      delay = new Date().getTime();
    }
  }
});

// Clicking anywhere not on an entry should release all entries
$(document).on('click',function(evt){
  if ($(evt.target).closest(".syllabus-icon-grid-entry").length == 0) {
    $('.syllabus-icon-grid-entry-text').removeClass('syllabus-icon-grid-entry-selected');
  }
});

// REQUESTS
var remark = new remarkable.Remarkable();

$.ajax({
    url: "https://raw.githubusercontent.com/Allegheny-ComputerScience-302-S2022/course-materials/main/README.md",
    success: function(data){
      var elem = $('#syllabus-document-window').find('.syllabus-gui-window-content');
      $(elem).html(remark.render(data));
    }
});
