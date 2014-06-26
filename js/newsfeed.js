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

		//Display News Feed
		var newsfeedRef = new Firebase('https://codehscore.firebaseio.com/users/' +user.uid+ '/stats');
		var newsFeedRefQuery = newsfeedRef.limit(3);

		newsFeedRefQuery.on('child_added', function(snap) {
			var newsFeedData = snap.val();
				console.log(newsFeedData);
				$('.news-feed').prepend("<hr>" 
								+ "<strong>" + newsFeedData['date'] + "</strong>"
							+ "<li>Twitter Score: " + newsFeedData['twitterNum'] + "</li>"
							+ "<li>Reddit Score: " + newsFeedData['redditNum'] + "</li>"
							+ "<li>Stack Overflow Score: " + newsFeedData['stackNum'] + "</li>"
							+ "<li>Quora Score: " + newsFeedData['quoraNum'] + "</li>"
							+ "<li>Github Score: " + newsFeedData['githubNum'] + "</li>"
							+ "<li>Blog Score: " + newsFeedData['blogNum'] + "</li>"
							+"<li>LinkedIn Score: " + newsFeedData['linkedInNum'] + "</li>"
							+ "<li>Total Daily Score: " + newsFeedData['totalDailyScore'] + "</li>"
							);
		});

	  } else {
	  	//User is not logged in
	    window.open('index.html', '_self');
	  }
	}); //end of auth callback
});
