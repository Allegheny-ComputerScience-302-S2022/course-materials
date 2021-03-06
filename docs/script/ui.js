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

$("#course-lolcats").draggable({
  cursor: "move",
  handle: ".syllabus-icon-grid-entry"
});

$("#course-chat").draggable({
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
      // TODO: Fix mobile single click
      if (action == "github") {
        window.open("https://github.com/Allegheny-ComputerScience-302-S2022",'_blank');
      } else if (action == "revise") {
        window.open("https://github.com/Allegheny-ComputerScience-302-S2022/course-materials",'_blank');
      } else if (action == "slides") {
        window.open("https://github.com/Allegheny-ComputerScience-302-S2022/course-materials/tree/main/slides","_blank");
      } else if (action == "chat") {
        window.open("https://chat.cmpsc302.chompe.rs","_blank");
      } else if (action == "cats") {
        var x = Math.floor(250 + Math.random() * 600);
        var y = Math.floor(250 + Math.random() * 600);
        var elem = "#syllabus-cats-window";
        var url = "http://placekitten.com/"+x+"/"+x;
        var content = $(elem).find('.syllabus-gui-window-content');
        $(elem).find('.syllabus-gui-window-content').html("<img src = \"" + url + "\">");
        $(elem).attr('hidden', false);
        $(elem).css('top', Math.random() * 50 + "%");
        $(elem).css('left', Math.random() * 50 + "%");
        $(elem).css('width', (x+10) + "px");
        $(elem).css('max-height', 'inherit');
        $(content).css('width', (x+10) + "px");
        $(content).css('overflow-x', 'hidden');
        $(content).css('overflow-y', 'hidden');
        $(content).css('width', "inherit");
        $(content).css('height', "inherit");
        $(elem).css('resize', 'none');
      } else {
        var elem = "#syllabus-"+action+"-window";
        $(elem).attr('hidden', false);
        $(elem).css('top', Math.random() * 50 + "%");
        $(elem).css('left', Math.random() * 50 + "%");
      }
    } else {
      // Is not yet double click
      delay = new Date().getTime();
    }
  }
});

$(document).on('keypress', function(evt) {
  if (evt.keyCode == 13){
    var target = $("#syllabus-icon-grid > div").find(".syllabus-icon-grid-entry-text:focus")[0];
    if (!target) {
      // Take care of draggables
      target = $(document).find('.syllabus-icon-grid-entry-text:focus')[0];
    }
    var grandparent = $(target).parent().parent();
    var action = grandparent.attr('data-action-item');
    console.log(target + " means " + action);
    // Is double click
    if (action == "github") {
      window.open("https://github.com/Allegheny-ComputerScience-302-S2022",'_blank');
    } else if (action == "revise") {
      window.open("https://github.com/Allegheny-ComputerScience-302-S2022/course-materials",'_blank');
    } else {
      var elem = "#syllabus-"+action+"-window";
      $(elem).attr('hidden', false);
      $(elem).css('top',Math.random() * 50 + "%");
      $(elem).css('left',Math.random() * 50 + "%");
    }
  }
});

$(document).on('keyup', function(evt){
  if (evt.keyCode == 27) {
    console.log("ESC");
    var target = $(document).find(".syllabus-gui-window");
    $(target).each(function(){
      $(this).attr('hidden', true);
    });
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

$("footer").html("ProfOS ." + version);


locs = {
  "CODE_OF_CONDUCT.md": function(){
    $("#syllabus-contract-window").attr('hidden', false);
    $("#syllabus-contract-window").focus();
  },
  "#Grading": function(){
    $("#syllabus-contract-window").attr('hidden', false);
    $("#syllabus-contract-window").focus();
  },
  "schedule.md": function(){
    $("#syllabus-schedule-window").attr('hidden', false);
    $("#syllabus-schedule-window").focus();
  },
  "office-hours.md": function(){
    $("#syllabus-office-hours-window").attr('hidden', false);
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

},500);
