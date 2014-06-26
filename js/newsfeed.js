//Display News Feed
	var newsfeedRef = new Firebase('https://codehscore.firebaseio.com/users/simplelogin:28/stats');
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