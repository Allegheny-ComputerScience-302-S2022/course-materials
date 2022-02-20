// CONSTANTS

const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return "mobile";
  } else if (window.screen.availWidth < 1024) {
    // Look, I just want to test this thing
    return "mobile";
  }
  return "desktop";
};

// BINDINGS

// Make modals draggable
$(".syllabus-gui-window").draggable({
  cursor: "move",
  handle: ".syllabus-gui-window-title"
});

$("#course-trash").draggable({
  cursor: "move",
  handle: ".syllabus-icon-grid-entry"
});

$("#course-tos-bug").draggable({
  cursor: "move",
  handle: ".syllabus-icon-grid-entry"
});

// Activate window closure
$(".syllabus-gui-window-title-controls").on('click',function(){
  $(this).parent().parent().attr('hidden', true);
});

// Single click should visually select an item
$(".syllabus-icon-grid-entry").on('click',function(){
  var elem = $(this).find('.syllabus-icon-grid-entry-text');
  $(elem).addClass('syllabus-icon-grid-entry-selected');
  $('.syllabus-icon-grid-entry-text').not(elem).removeClass('syllabus-icon-grid-entry-selected');
});

// Double click should launch item actions
// Single click for mobile devices
var delay = 0;
$(".syllabus-icon-grid-entry").on('click',function(){
  var action = $(this).parent().attr('data-action-item');
  if (delay == 0 && deviceType() != "mobile") {
    // Integrate with other first click option?
    delay = new Date().getTime();
  } else {
    if(((new Date().getTime()) - delay) < 500 || deviceType() == "mobile"){
      // Is double click
      if (action == "github") {
        window.open("https://github.com/Allegheny-ComputerScience-302-S2022",'_blank');
      } else if (action == "revise") {
        window.open("https://github.com/Allegheny-ComputerScience-302-S2022/course-materials",'_blank');
      } else {
        var elem = "#syllabus-"+action+"-window";
        $(elem).attr('hidden', false);
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

// Change z-index of selected windows
$(".syllabus-gui-window").on("click",function(){
  var elem = $(this);
  $(this).css("z-index","100");
  $(".syllabus-gui-window").not(elem).css("z-index","10");
});

// Change z-index of draggable icons
$(".syllabus-gui-free-range-icon").on("click",function(){
  var elem = $(this);
  $(this).css("z-index","9");
  $(".syllabus-gui-free-range-icon").not(elem).css("z-index","8");
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

$.ajax({
    url: "https://raw.githubusercontent.com/Allegheny-ComputerScience-302-S2022/course-materials/main/docs/text/schedule.md",
    success: function(data) {
      var elem = $('#syllabus-schedule-window').find('.syllabus-gui-window-content');
      $(elem).html(remark.render(data));
    }
});

$.ajax({
    url: "https://raw.githubusercontent.com/Allegheny-ComputerScience-302-S2022/course-materials/main/docs/text/office-hours.md",
    success: function(data) {
      var elem = $('#syllabus-office-hours-window').find('.syllabus-gui-window-content');
      $(elem).html(remark.render(data));
    }
});

$.ajax({
    url: "https://raw.githubusercontent.com/Allegheny-ComputerScience-302-S2022/course-materials/main/CODE_OF_CONDUCT.md",
    success: function(data) {
      var elem = $('#syllabus-contract-window').find('.syllabus-gui-window-content');
      $(elem).html(remark.render(data));
    }
});

var modified = document.lastModified;
var version = modified.replace(new RegExp("[\/: ]", "g"), ".");

$("footer").html("ProfOS " + version);


locs = {
  "CODE_OF_CONDUCT.md": function(){
    $("#syllabus-contract-window").css('display','block');
    $("#syllabus-contract-window").focus();
  },
  "#Grading": function(){
    $("#syllabus-contract-window").css('display','block');
    $("#syllabus-contract-window").focus();
  },
  "schedule.md": function(){
    $("#syllabus-schedule-window").css('display','block');
    $("#syllabus-schedule-window").focus();
  },
  "#office-hours": function(){
    $("#syllabus-office-hours-window").css('display', 'block');
    $("#syllabus-office-hours-window").focus();
  }
}

window.setTimeout(function(){

  var links = $(document).find('a');
  
  for(var i=0; i < links.length; i++){

    var href = links[i].href;
    var parts = href.split("/")
    var anchor = parts[parts.length - 1];
    
    console.log(anchor);
    
    if ( anchor.startsWith("#") || anchor.endsWith(".md") ){
      links[i].href = "#";
      $(links[i]).attr('target','_self');
      $(links[i]).on('click',locs[anchor]);
    }
 
  }
},100);