$(document).ready(function() {
      // change color of navbar dynamically
      $(window).scroll(function() { // check if scroll event happened
        if ($(document).scrollTop() > 50) { // check if user scrolled more than specifc value from top of the browser window
          $(".navbar").css("background-color", "rgba(0, 0, 0, 0.8)"); // if yes, then change the color of class "navbar-fixed-top" to white (#f8f8f8)
        } else {
          $(".navbar").css("background-color", "rgba(0, 0, 0, 0.3)"); // if not, change it back to transparent
        }
      });
      // duplicate test for username
      $('#username-sign-up').on('focusout', function() {
        var username = $(this).val().trim();
        if (username != '') {
          $.ajax({
              type: 'POST',
              url: 'isDup',
              data: {
                username: username,
              }
            })
            .done(function(responseText) {
              // Triggered if response status code is 200 (OK)
              if (responseText == 'false') {
                var errorTip = $('#username-sign-up').val();
                $('.duplicateError').html('用户名(' + errorTip + ')已存在!');
                $('#username-sign-up').val('').focus();
              } else {
                $('.duplicateError').html('');
              }
            })
            .fail(function(jqXHR, status, error) {
              // Triggered if response status code is NOT 200 (OK)
              alert(jqXHR.responseText);
            });
        }
      });

      });
