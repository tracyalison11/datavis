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
                        + "<li><i class='fa fa-twitter fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['twitterNum'] + "</span>" + "</li>"
                        + "<li><i class='fa fa-reddit fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['redditNum'] + "</span>" + "</li>"
                        + "<li><i class='fa fa-stack-overflow fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['stackNum'] + "</span>" + "</li>"
                        + "<li><i class='fa fa-comment-o fa-flip-horizontal fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['quoraNum'] + "</span>" + "</li>"
                        + "<li><i class='fa fa-github-alt fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['githubNum'] + "</span>" + "</li>"
                        + "<li><i class='fa fa-pencil-square fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['blogNum'] + "</span>" + "</li>"
                        + "<li><i class='fa fa-linkedin fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['linkedInNum'] + "</span>" + "</li>"
                        + "<li><i class='fa fa-signal fa-2x'></i>" + "<span class='statScore'>" + newsFeedData['totalDailyScore'] + "</span>" + "</li>"
                        );

			//DRAW CHART FROM SNAPSHOT
			//Get context with jQuery - using jQuery's .get() method.
			var ctx = $("#first-chart").get(0).getContext("2d");
			//This will get the first returned node in the jQuery collection.
			var myNewChart = new Chart(ctx);
			console.log(myNewChart);
			var data = {
				labels : [newsFeedData['date'],newsFeedData['date'],newsFeedData['date']],
				datasets : [
					{
						fillColor : "rgba(220,220,220,0.5)",
						strokeColor : "rgba(220,220,220,1)",
						data : [65,59,90,81,56,55,40]
					},
					{
						fillColor : "rgba(151,187,205,0.5)",
						strokeColor : "rgba(151,187,205,1)",
						data : [28,48,40,19,96,27,100]
					}
				]
			}
			new Chart(ctx).Bar(data);
			


		});

	  } else {
	  	//User is not logged in
	    window.open('index.html', '_self');
	  }
	}); //end of auth callback
});
