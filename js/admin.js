$(document).ready(function(){
	
	var chatRef = new Firebase('https://codehscore.firebaseio.com');
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	   	alert(error);
	  } else if (user) {
	    // user authenticated with Firebase
	    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);

	    var dataRef = new Firebase('https://codehscore.firebaseio.com/users/'+user.uid+'/info/permissions');
		dataRef.on('value' , function(snapshot) {
			// alert("Permissions for user 28 are " + snapshot.val());
		},function(err) {
  			// Read fails
  			alert("User does not have permissions value set");
		});

	  } else {
	  	//User is not logged in
	    window.open('index.html', '_self');
	  }
	});

	$('#admin_form').validate({
		rules: {
			firstName_input: {
				required: true
			},
			lastName_input: {
				required: true
			},
			phone_input: {
				required: true
			},
			email_input: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 6

			},
			confirm_password: {
				required: true,
				equalTo: '#1password'
			}
		}
	});

});

var userEmail, userPassword;
var firebaseObj = new Firebase('https://codehscore.firebaseio.com');


$('.register').on('click', function(){
	var userEmail =  $('.email').val();
	var userPassword = $('.password').val();
	var phoneNum = $('.phone').val();
	var firstName = $('.firstName').val();
	var lastName = $('.lastName').val();
	var cohort = $('.cohort').val();
	var permissions = $('.permissions').val();
	
	var userRef = new Firebase('https://codehscore.firebaseio.com/users');

	var auth = new FirebaseSimpleLogin(firebaseObj, function(error, user) {
	console.log(error, user);
	});
	auth.createUser(userEmail, userPassword, function(error, user) {
	  if (!error) {
	    console.log('User Id: ' + user.uid + ', Email: ' + user.email);
	    alert(user.email + "has been added to the database with id: " + user.uid); 
	  }
	  userRef.child(user.uid + '/info').set({'cohort': cohort, 'firstName': firstName, 'lastName': lastName, 'phoneNum': phoneNum, 'permissions': permissions, 'email': userEmail});

	});
});