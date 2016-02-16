



var divImage= "<div class='event-item'><div class='event-container' id='10'><div class='event-image'><a id='changePicture'><img src='"+ image +"' alt='' class='media-object'></a></div>"
var divTitileEvent = "<div class='event-content'><div class='row'><div class='col-xs-12'><a class='event-title'>"+ title + "</a></div></div>";
var divLocationEvent ="<div class='row'><div class='col-xs-12'><a class='event-location'>"+ location +"</a></div></div>"
var divTimeEvent = "<div class='row'><div class='col-xs-12'><span class='event-date'>"+ time +"</span></div></div>"
var divlink = "</div><div class='clearfix'></div></div>"
var divIdBtnEvent = "<div class='event-delete' id='"+id+"'>"
var divButtonEvent = "<button class='event-delete-btn' value="+ id +"><span class='glyphicon glyphicon-trash'></span></button><button class='event-location-btn' value="+ id +"><span class='glyphicon glyphicon-map-marker'></span></button><button class='event-reminder-btn' value="+ id +"><span class='glyphicon glyphicon-bell'></span></button></div><div class='clearfix'></div></div>"

var divEventItems = divImage + divTitileEvent + divLocationEvent + divTimeEvent + divlink + divIdBtnEvent + divButtonEvent;
