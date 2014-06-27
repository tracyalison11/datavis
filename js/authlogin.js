$(document).ready(function(){


	var chatRef = new Firebase('https://codehscore.firebaseio.com');
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	  if (error) { 
	    // an error occurred while attempting login
          alert("Either your email or password is not correct");
	    console.log(error);
	  } else if (user) {
	    // user authenticated with Firebase
	    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);

        window.open('newsfeed.html', '_self');
	  } else {
	    // user is logged out
	  }
	});

    $('.userPassword').keydown(function(event) {
        if (event.keyCode == 13) {
            $(".login").click();
        }
    });


	$('.login').on('click', function(){
		var userEmail = $('.userEmail').val();
		var userPassword = $('.userPassword').val();
		var rememberMe = false;
		if ($('#checkbox').is(":checked"))
		{	
 			rememberMe = true;
		}
		console.log(userEmail);
		
		auth.login('password', {
		email: userEmail,
		password: userPassword,
		rememberMe: rememberMe
		});
		
	});
});