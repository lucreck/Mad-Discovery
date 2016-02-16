var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    connectDB();
    createTable();
    // checkConnection();
    $(document).ready(function() {
      $('#new-btn').on('touchend');
    });
  }
};
