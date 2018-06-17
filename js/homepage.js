$(document).ready(function() {
    $(window).scroll(function() { // check if scroll event happened
      if ($(document).scrollTop() > 50) { // check if user scrolled more than specifc value from top of the browser window
        $(".navbar").css("background-color", "rgba(0, 0, 0, 0.8)"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
      } else {
          $(".navbar").css("background-color", "rgba(0, 0, 0, 0.3)"); // if not, change it back to transparent
      }
    });
});
