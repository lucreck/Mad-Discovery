var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    window.appRootDirName = "me.maddiscovery.aho";
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },

  onDeviceReady: function() {
    connectDB();
    createTable();
    StatusBar.styleLightContent();
    checkConnection();
    // navigator.splashscreen.show(); no ko chay cai nay
  //   setTimeout(function() {
  //      navigator.splashscreen.hide();
  //  }, 2000);
  }
};
var divmaplocation;
var btnmaplocation;
var onSuccess = function(position) {
  initAutocomplete(position.coords.latitude, position.coords.longitude);
  initAutocomplete2(position.coords.latitude, position.coords.longitude);
};

function onError(error) {
  var networkState = navigator.network.connection.type;
  var states = {};
  states[Connection.UNKNOWN] = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI] = 'WiFi connection';
  states[Connection.CELL_2G] = 'Cell 2G connection';
  states[Connection.CELL_3G] = 'Cell 3G connection';
  states[Connection.CELL_4G] = 'Cell 4G connection';
  states[Connection.NONE] = 'No network connection';

  if (error.code === 1) {
    navigator.notification.alert(error.message, null, "Alert", "Close");
  }
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

$("#takephoto").on("click", function() {
  capturePhoto();
});
$("#choosephoto").on("click", function() {
  getpicture();
});
// var captureSuccess = function(mediaFiles) {
//   var i, path, len;
//   for (i = 0, len = mediaFiles.length; i < len; i += 1) {
//     path = mediaFiles[i].fullPath;
//   }
// };
//
// var captureError = function(error) {
//   navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
// };
//
// function captureImage() {
//   navigator.device.capture.captureImage(captureSuccess, captureError, {
//     limit: 2
//   });
// }
function getpicture() {
  navigator.camera.getPicture(resolveOnSuccess,
    function(message) {
      alert('get picture failed');
    }, {
      quality: 50,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    }
  );
}


function capturePhoto() {
  sessionStorage.removeItem('imagepath');
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI
  });
}

function onPhotoDataSuccess(imageURI) {
  var imgProfile = document.getElementById('imagePreview');
  imgProfile.src = imageURI;
  if (sessionStorage.isprofileimage == 1) {
    getLocation();
  }
  movePic(imageURI);
}

function onFail(message) {
  alert('Failed because: ' + message);
}

function movePic(file) {
  window.resolveLocalFileSystemURL(file, resolveOnSuccess, resOnError);
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry) {
  var d = new Date();
  var n = d.getTime();
  var newFileName = n + ".jpg";
  var myFolderApp = "images";
  window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSys) {
      fileSys.root.getDirectory(window.appRootDirName, {
          create: true,
          exclusive: false
        },
        function(directory) {
          entry.moveTo(directory, newFileName, successMove, resOnError);
        },
        resOnError);
    },
    resOnError);
}

function successMove(entry) {
  sessionStorage.setItem('imagepath', entry.fullPath);
  selectedPicture=  entry.nativeURL;
}

function resOnError(error) {
  alert(error.code);
}


function checkConnection() {
  var networkState = navigator.network.connection.type;

  var states = {};
  states[Connection.UNKNOWN] = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI] = 'WiFi connection';
  states[Connection.CELL_2G] = 'Cell 2G connection';
  states[Connection.CELL_3G] = 'Cell 3G connection';
  states[Connection.CELL_4G] = 'Cell 4G connection';
  states[Connection.NONE] = 'No network connection';

  alert('Connection type: ' + states[networkState]);
}
