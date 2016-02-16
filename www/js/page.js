var selectedPicture;
var currentdate = new Date();
var dt = new DateTime();
var menuvar = false;
$(document).ready(function() {
  $("#menu-hexagon-panel").hide();
  $("#home-btn").addClass("current-page");
  $(".page").removeClass("fadeOutRight");
  $(".page").hide();
  $(".Panel").hide();
  $(".bar-btn").hide();
  $("#event-detail").hide();
  $(".bar-btn-picture").hide();
  $("#home-page").show();
  $(".bar-btn-home").show();
});

$('#menu-btn').on('touchstart', function() {
  if (!menuvar) {
    $("#menu-hexagon-panel").show(menuHexagonIn());
    menuvar = !menuvar;
  } else {
    menuHexagonOut();
    menuvar = !menuvar;
  }
});
$('#menu-hexagon-panel').on('touchmove', function() {
  if (menuvar == true) {
    menuHexagonOut();
    menuvar = !menuvar;
  }
});

$('.home-btn').on('touchend', function() {
  $("#event-detail").hide();
  setPageActive("#home-page", "Events", "#home-btn");
  $(".bar-btn").hide();
  $(".bar-btn-home").show();
  menuHexagonOut();
  getListEvent(querySuccess);
});
$('.new-btn').on('touchend', function() {
  $(".bar-btn").hide();
  $(".bar-btn-nom").show();
  setPageActive("#new-event-page", "New Event", "#new-btn");
  menuHexagonOut();
  clearText();
  setTimeout(function() {
    $('#txtName').focus();
  }, 500);
  getCurrentPosition();
});

$('.search-btn').on('touchend', function() {
  $(".bar-btn").hide();
  $(".bar-btn-home").show();
  setPageActive("#search-event-page", "Search", "#search-btn");
  menuHexagonOut();
});
$('.map-btn').on('touchend', function() {
  $(".bar-btn").hide();
  $(".bar-btn-map").show();
  menuHexagonOut();
  setPageActive("#map-page", "map", "#map-btn");
  getCurrentPosition();
});
$('#register-btn').on('touchend', function() {
  register();
});
$('#cancel-register').on('touchend', function() {
  $(".bar-btn").hide();
  $(".bar-btn-home").show();
  clearText();
  setPageActive("#home-page", "Home", "#home-btn");
});
$('#back-register').on('touchend', function() {
  $(".bar-btn").hide();
  selectedPicture = "";
  $(".bar-btn-nom").show();
  $(".title").text("New Event");
  $('#takePicturePanel').removeClass("slideInRight");
  $('#takePicturePanel').addClass("slideOutRight");
  $('#mapPanel').removeClass("slideInRight");
  $('#mapPanel').addClass("slideOutRight");
  setTimeout(function() {
    $('#takePicturePanel').hide();
    $('#mapPanel').hide();
  }, 1000);
});
$('#takePicture').on('click', function() {
  $('#takePicturePanel').removeClass("slideOutRight");
  $('#takePicturePanel').addClass("slideInRight");
  $('#takePicturePanel').show();
  $(".title").text("Picture");
  $(".bar-btn").hide();
  $('.btn2in1').attr("id", "done-picture");
  $(".bar-btn-picture").show();
});
$('#findLocation-Btn').on('click', function() {
  $('#mapPanel').removeClass("slideOutRight");
  $('#mapPanel').addClass("slideInRight");
  $('#mapPanel').show();
  $(".title").text("Location");
  $(".bar-btn").hide();
  $('.btn2in1').attr("id", "done-map");
  // $('#pac-input2').val($('#txtLocation').val());
  $(".bar-btn-picture").show();
  getCurrentPosition();
});
$('#done-map').on('click', function() {
  $(".bar-btn").hide();
  $(".bar-btn-nom").show();
  $('#txtLocation').val($('#pac-input2').val());
  $(".title").text("New Event");
  $('#takePicturePanel').removeClass("slideInRight");
  $('#takePicturePanel').addClass("slideOutRight");
  $('#mapPanel').removeClass("slideInRight");
  $('#mapPanel').addClass("slideOutRight");
  $("#selectedImageNe").attr("src", selectedPicture);
  console.log(selectedPositionMap);
  setTimeout(function() {
    $('#takePicturePanel').hide();
    $('#mapPanel').hide();
  }, 1000);
});
$('#done-picture').on('click', function() {
  $(".bar-btn").hide();
  $(".bar-btn-nom").show();
  $(".title").text("New Event");
  $('#takePicturePanel').removeClass("slideInRight");
  $('#takePicturePanel').addClass("slideOutRight");
  $('#mapPanel').removeClass("slideInRight");
  $('#mapPanel').addClass("slideOutRight");
  setTimeout(function() {
    $('#takePicturePanel').hide();
    $('#mapPanel').hide();
  }, 1000);
});
$('.event-delete-btn').on('touchend', function() {
});

$(".image-item-select").on("click", function() {
  selectedPicture = this.src;
  $("#imagePreview").attr("src", selectedPicture);
});
$(".addon-me").on("click", function() {
  $(".addon-me").removeClass("currentAddonMe");
  $("#" + this.id).addClass("currentAddonMe");
});

function editEvent(id) {
  $("#event-detail").show();
  $(".bar-btn").hide();
  $(".bar-btn-detail").show();
  selectAnEventQuery(id, querySelectAnEventSuccess);
}

function setPageActive(pagename, title, pagebtn) {
  $(".presentation-mobile").children().removeClass("current-page");
  $(pagebtn).addClass("current-page");
  $(".page").hide();
  // $(".page").addClass("fadeOutRight");
  // $(pagename).removeClass("fadeOutRight");
  // $(pagename).addClass("fadeInRight");
  $(pagename).show();
  $(".title").text(title);
  if (title === "map") {
    $(".title").text("Location");
  }
}

function menuHexagonOut() {
  $("#nav-home").removeClass("bounceInDown").addClass("bounceOutDown");
  $("#nav-new").removeClass("bounceInDown").addClass("bounceOutRight");
  $("#nav-search").removeClass("bounceInLeft").addClass("bounceOutLeft");
  $("#nav-location").removeClass("bounceInUp").addClass("bounceOutUp");
  setTimeout(function() {
    $('#menu-hexagon-panel').removeClass("fadeIn").addClass("fadeOut");
  }, 400);
  setTimeout(function() {
    $('#menu-hexagon-panel').hide();
  }, 800);
};

function menuHexagonIn() {
  $('#menu-hexagon-panel').removeClass("fadeOut").addClass("fadeIn");
  $("#nav-home").removeClass("bounceOutDown").addClass("bounceInDown");
  $("#nav-new").removeClass("bounceOutRight").addClass("bounceInDown");
  $("#nav-search").removeClass("bounceOutLeft").addClass("bounceInLeft");
  $("#nav-location").removeClass("bounceOutUp").addClass("bounceInUp");
};


$(document).ready(function() {
  $("#txtStartTime").AnyPicker({
    mode: "datetime",
    dateTimeFormat: "hh:mm aa",
    theme: "Android" // "Default", "iOS", "Android", "Windows"
  });
});

$("#txtDate").AnyPicker({
  mode: "datetime",
  dateTimeFormat: "MMM dd, yyyy",
  theme: "Android" // "Default", "iOS", "Android", "Windows"
});

$("#txtEnds").AnyPicker({
  mode: "datetime",
  dateTimeFormat: "MMM dd, yyyy",
  theme: "Android" // "Default", "iOS", "Android", "Windows"
});
connectDB();
getListEvent(querySuccess);

function querySuccess(listEvents) {
  var listEvent = document.getElementById("all-events");
  var numberOfEvent = listEvents.length;
  var listEventItem = "";
  if (numberOfEvent == 0) {
    listEventItem = "<div class='col-xs-12'><h1 style='text-align: center; color: #eee; margin-top: 50%;'>No Event</h1></div>";
  }
  for (var i = 0; i < numberOfEvent; i++) {
    var name = listEvents[i]["name"];
    var location = listEvents[i]["location"];
    var locationMappoint = listEvents[i]["mappoint"];
    var date = listEvents[i]["starts"].substring(0, 6);
    var starts = listEvents[i]["starts"].substring(15);
    var deleteID = "d" + listEvents[i]["id"];
    var id = listEvents[i]["id"];
    var locationID = "l" + listEvents[i]["id"];
    var reminderID = "r" + listEvents[i]["id"];
    var endID = "e" + listEvents[i]["id"];
    var editID = "i" + listEvents[i]["id"];
    var imageID = "g" + listEvents[i]["id"];
    var images = listEvents[i]["images"];
    console.log("tao o day co ma:"+locationMappoint);

    var divImage = "<div class='event-item'><div class='event-container' id='" + id + "'><div class='event-image'><a class='imageChange' id='" + imageID + "'><img src='" + images + "' alt=''></a></div>"
    var divTimeEvent = "<div class='event-content'><div class='row'><div class='col-xs-12'><span class='event-date'><span class='glyphicon glyphicon-time'></span>" + starts + "<span class='pull-right'><span class='glyphicon glyphicon-calendar'></span>" + date + "</span></span></div></div>"
    var divTitileEvent = "<div class='row'><div class='col-xs-12'><a class='event-title'  id='" + editID + "'>" + name + "</a></div></div>";
    var divLocationEvent = "<div class='row'><div class='col-xs-12'><a class='event-location'><span class='glyphicon glyphicon-map-marker'></span>" + location + "</a></div></div>"
    var divlink = "</div><div class='clearfix'></div></div>"
    var divIdBtnEvent = "<div class='event-delete' id='" + id + "'>"
    var divButtonEvent = "<button class='event-end-btn pull-left' id='" + endID + "'><span class='glyphicon glyphicon-ok behide-icon'></span></button><button class='event-delete-btn' id='" + deleteID + "'><span class='glyphicon glyphicon-trash'></span></button><button class='event-location-btn' id='" + locationID + "' value='" + locationMappoint + "'><span class='glyphicon glyphicon-map-marker'></span></button><button class='event-reminder-btn' id='" + reminderID + "'><span class='glyphicon glyphicon-bell'></span></button></div><div class='clearfix'></div></div>"
    var divEventItems = divImage + divTimeEvent + divTitileEvent + divLocationEvent + divlink + divIdBtnEvent + divButtonEvent;
    listEventItem += divEventItems;

  }
  $("#all-events").html(listEventItem);
  for (var i = 0; i < numberOfEvent; i++) {
    var id = listEvents[i]["id"];
    var deleteID = "d" + listEvents[i]["id"];
    var locationID = "l" + listEvents[i]["id"];
    var reminderID = "r" + listEvents[i]["id"];
    var imageID = "g" + listEvents[i]["id"];
    var endID = "e" + listEvents[i]["id"];
    var editID = "i" + listEvents[i]["id"];
    addDelete(id);
    document.getElementById(deleteID).addEventListener("click", function() {
      confirmDelete(this.id.substring(1));
    });
    document.getElementById(locationID).addEventListener("click", function() {
      showMapEvent(this.id);
    });
    document.getElementById(reminderID).addEventListener("click", function() {
      turnOffReminder(this.id.substring(1));
    });
    document.getElementById(editID).addEventListener("click", function() {
      editEvent(this.id.substring(1));
    });
    document.getElementById(imageID).addEventListener("click", function() {
      changeImageEvent(this.id.substring(1));
    });
    document.getElementById(endID).addEventListener("click", function() {
      endEvent(this.id.substring(1));
    });
  }
}

function querySelectAnEventSuccess(listEvents) {
  var numberOfEvent = listEvents.length;
  var listEventItem = "";
  for (var i = 0; i < numberOfEvent; i++) {
    var title = listEvents[i]["name"];
    var location = listEvents[i]["location"];
    var locationMappoint = listEvents[i]["mappoint"];
    var dates = listEvents[i]["starts"];
    var ends = listEvents[i]["ends"];
    var notes = listEvents[i]["notes"];
    var deleteID = "d" + listEvents[i]["id"];
    var id = listEvents[i]["id"];
    var image = listEvents[i]["images"];
    var reminders = "12:00 pm"
    var divHeader, imageCover, divTitle, divLocation, divDates, divReminder, divNotes;
    $("#edit-btn").val(id);
    imageCover = "<div class='row'><img src='" + image + "' class='' alt=''></div>";
    divTitle = "<div class='row'><a class='col-xs-12 event-detail-title' style='text-align: left'>" + title + "</a></div></div>";

    divHeader = "<div class='row event-detail-header' style='margin-bottom: 0px; border: none;'><div class='col-xs-12'>" + imageCover + divTitle + "</div>";
    divLocation = "<div class='event-detail-content'><div class='col-xs-12'><div class='event-detail-location'><span class='glyphicon glyphicon-map-marker'></span>" + location + "</div></div>"
    var divLink1 = "<div class='col-xs-12'><div class='event-detail-location event-detail-date'><div class='row'><div class='col-xs-12'><div class='col-xs-3'><div class='row'>Dates</div><div class='row'>Ends</div></div>"
    divDates = "<div class='col-xs-9'><div class='row  pull-right'>" + dates + "</div><div class='row pull-right'>" + ends + "</div></div>";
    var divLink2 = "</div></div></div></div><div class='col-xs-12'>";
    divReminder = "<div class='event-detail-location event-detail-reminder'><span class='glyphicon glyphicon-bell'></span> Reminder<div class='pull-right'>" + reminders + "</div></div></div>";
    divNotes = "<div class='col-xs-12'><div class='event-detail-location event-detail-notes'><span style='width: 100%; height: 43px; border-bottom: solid 1px #263f4c; display: block'><span class='glyphicon glyphicon-bookmark'></span>Notes</span><p class='event-detail-note-content'>" + notes + "</p></div></div><div class='clearfix'></div></div>";
    var divAll = divHeader + divLocation + divLink1 + divDates + divLink2 + divReminder + divNotes;
    listEventItem += divAll;
  }
  $("#event-detail-flex").html(listEventItem);
}

function showMapEvent(id) {
  var locationMappoint = document.getElementById(id).value;
  console.log(locationMappoint);
  console.log(id);
  console.log("day la tao: " +document.getElementById(id).value);
  if(locationMappoint == "null"){
    console.log("tao la null");
  }
  if (locationMappoint !== " null") {
    $('#mapPanel').removeClass("slideOutRight");
    $('#mapPanel').addClass("slideInRight");
    $('#mapPanel').show();
    $(".title").text("Location");
    $(".bar-btn").hide();
    $('.bar-btn-map').show();
    initMapLocationEvent(locationMappoint);
  }
}

function turnOffReminder(id) {}

function confirmDelete(id) {
  var rs = confirm("Are you sure to delete this event?");
  if (rs) {
    deleteEvent(id);
    var idd = "#" + id
    $(idd).hide();
  }
}
var txtName = document.getElementById("txtName");
var txtLocation = document.getElementById("txtLocation");
var txtDate = document.getElementById("txtDate");
var txtStartTime = document.getElementById("txtStartTime");
var txtEnds = document.getElementById("txtEnds");
var txtOrganizer = document.getElementById("txtOrganizer");
var txtReminder = document.getElementById("txtReminder");
var txtNote = document.getElementById("txtNote");

function register() {
  connectDB();
  var starts = txtDate.value + " at " + txtStartTime.value;
  var mappoint = selectedPositionMap;
  var images = selectedPicture;
  // if(takepicture.value != ""){
  //   images = takepicture.value;
  // }
  insertEvent(txtName.value, txtLocation.value, mappoint, starts, txtEnds.value, txtOrganizer.value, images, txtNote.value, function() {
    clearText();
    setPageActive("#home-page", "Events", "#home-btn");
    $(".bar-btn").hide();
    $(".bar-btn-home").show();
    getListEvent(querySuccess);
  });
}

function clearText() {
  var dcc = new Date();
  txtName.value = "";
  txtLocation.value = "";
  txtDate.value = dt.formats.constants.lucreck2;
  txtStartTime.value = "12:00 pm";
  txtEnds.value = dt.formats.constants.lucreck2;
  txtOrganizer.value = "";
  txtReminder.value = "0";
  txtNote.value = "";
  selectedPositionMap = "null";
  selectedPicture = "img/default.jpg";
}

$('.event-container').on('touchstart', function() {
  $('.event-container').css("-webkit-Transform", "translateX(0px)");
  addDelete(this.id);
});

function addDelete(id) {
  var box2 = document.getElementById(id),
    boxleft,
    startx,
    starty,
    tempdist = 0,
    tempdistY = 0,
    touchobj = null;

  box2.addEventListener('touchstart', function(e) {
    $('.event-container').css("-webkit-Transform", "translateX(0px)");
    tempdist = 0;
    tempdistY = 0;
    touchobj = e.changedTouches[0];
    boxleft = parseInt(box2.style.left);
    startx = parseInt(touchobj.clientX);
    starty = parseInt(touchobj.clientY);
  }, false)

  box2.addEventListener('touchmove', function(e) {
    touchobj = e.changedTouches[0];
    var dist = 0;
    var distY = 0;
    dist = parseInt(touchobj.clientX) - startx;
    distY = parseInt(touchobj.clientY) - starty;
    tempdist = dist;
    tempdistY = distY;
    if (distY < 20 && distY > -20) {
      if (0 < dist && dist < 70) {
        box2.style.webkitTransform = 'translateX(' + dist + 'px)';
      };
      if (0 > dist && dist > -200) {
        box2.style.webkitTransform = 'translateX(' + dist + 'px)';
      };
    } else {
      box2.style.webkitTransform = 'translateX(0px)';
    }
  }, false)
  box2.addEventListener('touchend', function(e) {
    touchobj = e.changedTouches[0];
    if (tempdistY < 30 && tempdistY > -30) {
      if (0 > tempdist && tempdist > -20) {
        box2.style.webkitTransform = 'translateX(' + 0 + 'px)'
      }
      if (0 > tempdist && tempdist < -20) {
        box2.style.webkitTransform = 'translateX(' + -225 + 'px)'
      }
      if (0 < tempdist && tempdist < 20) {
        box2.style.webkitTransform = 'translateX(' + 0 + 'px)'
      }
      if (0 < tempdist && tempdist > 20) {
        box2.style.webkitTransform = 'translateX(' + 70 + 'px)'
      }
    } else {
      box2.style.webkitTransform = 'translateX(' + 0 + 'px)'
    }
    // e.preventDefault();
  }, false)
};


function DateTime() {
  function getDaySuffix(a) {
    var b = "" + a,
      c = b.length,
      d = parseInt(b.substring(c - 2, c - 1)),
      e = parseInt(b.substring(c - 1));
    if (c == 2 && d == 1) return "th";
    switch (e) {
      case 1:
        return "st";
        break;
      case 2:
        return "nd";
        break;
      case 3:
        return "rd";
        break;
      default:
        return "th";
        break;
    };
  };

  this.getDoY = function(a) {
    var b = new Date(a.getFullYear(), 0, 1);
    return Math.ceil((a - b) / 86400000);
  }

  this.date = arguments.length == 0 ? new Date() : new Date(arguments);

  this.weekdays = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
  this.months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
  this.daySuf = new Array("st", "nd", "rd", "th");

  this.day = {
    index: {
      week: "0" + this.date.getDay(),
      month: (this.date.getDate() < 10) ? "0" + this.date.getDate() : this.date.getDate()
    },
    name: this.weekdays[this.date.getDay()],
    of: {
      week: ((this.date.getDay() < 10) ? "0" + this.date.getDay() : this.date.getDay()) + getDaySuffix(this.date.getDay()),
      month: ((this.date.getDate() < 10) ? "0" + this.date.getDate() : this.date.getDate()) + getDaySuffix(this.date.getDate())
    }
  }

  this.month = {
    index: (this.date.getMonth() + 1) < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1,
    name: this.months[this.date.getMonth()]
  };

  this.year = this.date.getFullYear();

  this.time = {
    hour: {
      meridiem: (this.date.getHours() > 12) ? (this.date.getHours() - 12) < 10 ? "0" + (this.date.getHours() - 12) : this.date.getHours() - 12 : (this.date.getHours() < 10) ? "0" + this.date.getHours() : this.date.getHours(),
      military: (this.date.getHours() < 10) ? "0" + this.date.getHours() : this.date.getHours(),
      noLeadZero: {
        meridiem: (this.date.getHours() > 12) ? this.date.getHours() - 12 : this.date.getHours(),
        military: this.date.getHours()
      }
    },
    minute: (this.date.getMinutes() < 10) ? "0" + this.date.getMinutes() : this.date.getMinutes(),
    seconds: (this.date.getSeconds() < 10) ? "0" + this.date.getSeconds() : this.date.getSeconds(),
    milliseconds: (this.date.getMilliseconds() < 100) ? (this.date.getMilliseconds() < 10) ? "00" + this.date.getMilliseconds() : "0" + this.date.getMilliseconds() : this.date.getMilliseconds(),
    meridiem: (this.date.getHours() > 12) ? "PM" : "AM"
  };

  this.sym = {
    d: {
      d: this.date.getDate(),
      dd: (this.date.getDate() < 10) ? "0" + this.date.getDate() : this.date.getDate(),
      ddd: this.weekdays[this.date.getDay()].substring(0, 3),
      dddd: this.weekdays[this.date.getDay()],
      ddddd: ((this.date.getDate() < 10) ? "0" + this.date.getDate() : this.date.getDate()) + getDaySuffix(this.date.getDate()),
      m: this.date.getMonth() + 1,
      mm: (this.date.getMonth() + 1) < 10 ? "0" + (this.date.getMonth() + 1) : this.date.getMonth() + 1,
      mmm: this.months[this.date.getMonth()].substring(0, 3),
      mmmm: this.months[this.date.getMonth()],
      yy: ("" + this.date.getFullYear()).substr(2, 2),
      yyyy: this.date.getFullYear()
    },
    t: {
      h: (this.date.getHours() > 12) ? this.date.getHours() - 12 : this.date.getHours(),
      hh: (this.date.getHours() > 12) ? (this.date.getHours() - 12) < 10 ? "0" + (this.date.getHours() - 12) : this.date.getHours() - 12 : (this.date.getHours() < 10) ? "0" + this.date.getHours() : this.date.getHours(),
      hhh: this.date.getHours(),
      m: this.date.getMinutes(),
      mm: (this.date.getMinutes() < 10) ? "0" + this.date.getMinutes() : this.date.getMinutes(),
      s: this.date.getSeconds(),
      ss: (this.date.getSeconds() < 10) ? "0" + this.date.getSeconds() : this.date.getSeconds(),
      ms: this.date.getMilliseconds(),
      mss: Math.round(this.date.getMilliseconds() / 10) < 10 ? "0" + Math.round(this.date.getMilliseconds() / 10) : Math.round(this.date.getMilliseconds() / 10),
      msss: (this.date.getMilliseconds() < 100) ? (this.date.getMilliseconds() < 10) ? "00" + this.date.getMilliseconds() : "0" + this.date.getMilliseconds() : this.date.getMilliseconds()
    }
  };

  this.formats = {
    constants: {
      lucreckTime: this.sym.t.hh + ":" + this.sym.t.mm + this.time.meridiem,
      lucreck2: this.sym.d.mmm + " " + this.sym.d.dd + ", " + this.sym.d.yyyy,
      rss: this.sym.d.ddd + ", " + this.sym.d.dd + " " + this.sym.d.mmm + " " + this.sym.d.yy + " " + this.sym.t.hhh + ":" + this.sym.t.mm + ":" + this.sym.t.ss,
      w3c: this.sym.d.yyyy + "-" + this.sym.d.mm + "-" + this.sym.d.dd + "T" + this.sym.t.hhh + ":" + this.sym.t.mm + ":" + this.sym.t.ss
    },
    pretty: {
      a: this.sym.t.hh + ":" + this.sym.t.mm + "." + this.sym.t.ss + this.time.meridiem + " " + this.sym.d.dddd + " " + this.sym.d.ddddd + " of " + this.sym.d.mmmm + ", " + this.sym.d.yyyy,
      b: this.sym.t.hh + ":" + this.sym.t.mm + " " + this.sym.d.dddd + " " + this.sym.d.ddddd + " of " + this.sym.d.mmmm + ", " + this.sym.d.yyyy
    }
  };
};
