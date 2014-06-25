var userEmail, userPassword;
var firebaseObj = new Firebase('https://codehscore.firebaseio.com');


$('.register').on('click', function(){
	var userEmail =  $('.email').val();
	var userPassword = $('.password').val();
	var firstName = $('.firstName').val();
	var lastName = $('.lastName').val();
	var cohort = $('.cohort').val();
	var permissions = $('.permissions').val();
	
	var userRef = new Firebase('https://codehscore.firebaseio.com/cohort' + cohort);

	var auth = new FirebaseSimpleLogin(firebaseObj, function(error, user) {
	console.log(error, user);
	});
	auth.createUser(userEmail, userPassword, function(error, user) {
	  if (!error) {
	    console.log('User Id: ' + user.uid + ', Email: ' + user.email); 
	  }
	  userRef.child('users/'+firstName + '/info').set({'user': user.uid, 'firstName': firstName, 'lastName': lastName, 'permissions': permissions, 'email': userEmail});
	});
	// auth.login('password', {
	//   email: userEmail,
	//   password: userPassword,
	//  // rememberMe: true
	// });
});

var dataRef = new Firebase('https://codehscore.firebaseio.com/');
dataRef.on('child_added', function(snap) {
   console.log('parent record: ', snap.val());
});