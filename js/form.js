// var userEmail, userPassword;
// var firebaseObj = new Firebase('https://codehscore.firebaseio.com');


// $('.register').on('click', function(){
// 	var userEmail =  $('.email').val();
// 	var userPassword = $('.password').val();
// 	var firstName = $('.firstName').val();
// 	var lastName = $('.lastName').val();
// 	var cohort = $('.cohort').val();
// 	var permissions = $('.permissions').val();
	
// 	var userRef = new Firebase('https://codehscore.firebaseio.com/cohort' + cohort);

// 	var auth = new FirebaseSimpleLogin(firebaseObj, function(error, user) {
// 	console.log(error, user);
// 	});
// 	auth.createUser(userEmail, userPassword, function(error, user) {
// 	  if (!error) {
// 	    console.log('User Id: ' + user.uid + ', Email: ' + user.email); 
// 	  }
// 	  userRef.child('users/'+firstName + '/info').set({'user': user.uid, 'firstName': firstName, 'lastName': lastName, 'permissions': permissions, 'email': userEmail});
// 	});
// });

var dataRef = new Firebase('https://codehscore.firebaseio.com/cohort1/users/Brendan' );
dataRef.on('child_added', function(snap) {
   console.log('parent record: ', snap.val());
});


$('.submit').on('click', function() {
	var submission = $('.info').val();
	console.log(submission);

	//will pull these from database
	var twitterNum = 0;
	var redditNum = 0;
	var stackNum = 0;
	var quoraNum = 0;	
	var githubNum = 0;
	var blogNum = 0;
	var linkedInNum = 0;
	var totalDailyScore = 0;

	//regular expressions to match words
	var twitterReg = /twitter/g;
	var redditReg = /reddit/g;
	var stackReg = /stackoverflow/g;
	var quoraReg = /quora/g;
	
	//test submission to match regular expressions, if so, multiply amount by points and overwrite database vals
	if(twitterReg.test(submission)){
		var twitterCount = submission.match(twitterReg).length;
		twitterNum += twitterCount; //will multiply by pts
		console.log("twitter: " + twitterNum);
	}
	if(redditReg.test(submission)){
		var redditCount = submission.match(redditReg).length;
		redditNum += redditCount * 4; //will multiply by pts
		console.log("reddit: " + redditNum);
	}
	if(stackReg.test(submission)){
		var stackCount = submission.match(stackReg).length;
		stackNum += stackCount * 6; //will multiply by pts
		console.log("stack: " + stackNum);
	}
	if(quoraReg.test(submission)){
		var quoraCount = submission.match(quoraReg).length;
		quoraNum += quoraCount * 5; //will multiply by pts
		console.log("quora: " + quoraNum);
	}
	var githubCheck = $('.github').is(':checked');
	console.log(githubCheck);
	if (githubCheck){
		githubNum += 1;
	}
	var blogCheck = $('.blog').is(':checked');
	console.log(blogCheck)
	if (blogCheck){
		blogNum += 10;
	}
	var linkedInCount = $('.linkedIn').val();
	console.log(linkedInCount);
	if (linkedInCount){
		linkedInNum += linkedInCount;
	}

	totalDailyScore += parseInt(twitterNum) + parseInt(redditNum) + parseInt(stackNum) + parseInt(quoraNum) + parseInt(githubNum) + parseInt(blogNum) + parseInt(linkedInNum);
	console.log(totalDailyScore);
	$('.news-feed').append("Total Daily Score: " + totalDailyScore);

});

