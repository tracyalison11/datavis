	//create a date
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate()
	var year = currentTime.getFullYear()
	var date = month + "-" + day + "-" + year;
//check to see if stats for current date exist, if so, populate vars with db data
	var checkRef = new Firebase('https://codehscore.firebaseio.com/users/simplelogin:28/stats/');
	checkRef.on('value', function(snapshot) {
		var data = snapshot.val();
	   console.log(data);
	   if (snapshot.hasChild(date)){
	   	
	   	console.log('start from db values');
	   	alert("Inside IF: START FROM DB VALUES");
			twitterNum = data[date]['twitterNum'];
			// twitterNum = 77;
			redditNum = data[date]['redditNum'];
			stackNum = data[date]['stackNum'];
			quoraNum = data[date]['quoraNum'];	
			githubNum = data[date]['githubNum'];
			blogNum = data[date]['blogNum'];
			linkedInNum = data[date]['linkedInNum'];
			console.log("END OF DB SET VALUES");
			// date = data[date]['date'];
		}
		//if stats for current date do not exist, make all vars 0
		else{
			alert("inside else: reset data");
			console.log("resetting all vars to 0");
			twitterNum = 0;
			redditNum = 0;
			stackNum = 0;
			quoraNum = 0;	
			githubNum = 0;
			blogNum = 0;
			linkedInNum = 0;
			totalDailyScore = 0;
		}
	});

$('.submit').on('click', function() {
	var submission = $('.info').val();
	var twitterNum = 0;
	var redditNum = 0;
	var stackNum = 0;
	var quoraNum = 0;	
	var githubNum = 0;
	var blogNum = 0;
	var linkedInNum = 0;
	var totalDailyScore = 0;
	
	
	var statRef = new Firebase('https://codehscore.firebaseio.com/users/');

	//create a date
	var currentTime = new Date()
	var month = currentTime.getMonth() + 1
	var day = currentTime.getDate()
	var year = currentTime.getFullYear()
	var date = month + "-" + day + "-" + year;

	// var dateRef = new Firebase('https://codehscore.firebaseio.com/users/simplelogin:28/stats/');
	var checkRef = new Firebase('https://codehscore.firebaseio.com/users/simplelogin:28/stats/');
	
	// twitterNum = 7777;

	//check to see if stats for current date exist, if so, populate vars with db data
	checkRef.on('value', function(snapshot) {
		var data = snapshot.val();
	   console.log(data);
	   if (snapshot.hasChild(date)){
	   	
	   	console.log('start from db values');
	   	alert("Inside IF: START FROM DB VALUES");
			twitterNum = data[date]['twitterNum'];
			// twitterNum = 77;
			redditNum = data[date]['redditNum'];
			stackNum = data[date]['stackNum'];
			quoraNum = data[date]['quoraNum'];	
			githubNum = data[date]['githubNum'];
			blogNum = data[date]['blogNum'];
			linkedInNum = data[date]['linkedInNum'];
			console.log("END OF DB SET VALUES");
			// date = data[date]['date'];
		}
		//if stats for current date do not exist, make all vars 0
		else{
			alert("inside else: reset data");
			console.log("resetting all vars to 0");
			twitterNum = 0;
			redditNum = 0;
			stackNum = 0;
			quoraNum = 0;	
			githubNum = 0;
			blogNum = 0;
			linkedInNum = 0;
			totalDailyScore = 0;
		}
	});
	console.log("twitter1: " + twitterNum);
	//regular expressions to match words
	var twitterReg = /twitter/g;
	var redditReg = /reddit/g;
	var stackReg = /stackoverflow/g;
	var quoraReg = /quora/g;
	
	//test submission to match regular expressions, if so, multiply amount by points and overwrite database vals
	if(twitterReg.test(submission)){
		var twitterCount = parseInt(submission.match(twitterReg).length);
		twitterNum += twitterCount; //will multiply by pts
		console.log("twitter2: " + twitterNum);
	}
	if(redditReg.test(submission)){
		var redditCount = parseInt(submission.match(redditReg).length);
		redditNum += redditCount * 4; //will multiply by pts
		console.log("reddit: " + redditNum);
	}
	if(stackReg.test(submission)){
		var stackCount = parseInt(submission.match(stackReg).length);
		stackNum += stackCount * 6; //will multiply by pts
		console.log("stack: " + stackNum);
	}
	if(quoraReg.test(submission)){
		var quoraCount = parseInt(submission.match(quoraReg).length);
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
	var linkedInCount = parseInt($('.linkedIn').val());
	console.log(linkedInCount);
	if (linkedInCount){
		linkedInNum += linkedInCount;
	}

	// var onComplete = function(){
	// 	window.open('newsfeed.html', '_self');
	// }

	var callback = function(){
		console.log("opening new window");
		alert("inside callback");
		window.open('newsfeed.html', '_self');
		}

	alert("END OF CHECKING AND ADDING POINTS");
	totalDailyScore += twitterNum + redditNum + stackNum + quoraNum + githubNum + blogNum + linkedInNum;
	alert("TOTAL DAILY SCORE: " + totalDailyScore);
	checkRef.child(date).set({'twitterNum': twitterNum, 'redditNum': redditNum, 
							'stackNum': stackNum, 'quoraNum': quoraNum, 
							'githubNum': githubNum, 'blogNum': blogNum, 
							'linkedInNum': linkedInNum, 'totalDailyScore': totalDailyScore, 
							'date': date}, callback );
	

});



