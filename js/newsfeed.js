$(document).ready(function(){

	var chatRef = new Firebase('https://codehscore.firebaseio.com');
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
	  if (error) {
	    // an error occurred while attempting login
	   	alert(error);
	  } else if (user) {
	    // user authenticated with Firebase
	    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);

       $('#signOut').on('click', function () {
            auth.logout();
       });

	    var dataRef = new Firebase('https://codehscore.firebaseio.com/users/'+user.uid+'/info/permissions');
		dataRef.on('value' , function(snapshot) {
			if(snapshot.val() == 1){
                $('#admin').append(
                    $('<a></a>').attr('href','admin.html').text("Admin")
                );

            }
		},function(err) {
  			// Read fails
  			alert("User does not have permissions value set");
		});

		//Display News Feed
		var newsfeedRef = new Firebase('https://codehscore.firebaseio.com/users/' +user.uid+ '/stats');
		var newsFeedRefQuery = newsfeedRef.limit(3);
		var chartData = [];
		newsFeedRefQuery.on('child_added', function(snap) {
			var newsFeedData = snap.val();
				// console.log(newsFeedData);
				//divide up news feed into a table
			$('.news-feed').prepend("<br>"
                + "<table class='table table-hover'> <tr>"
                + "<td colspan='2'><strong>" + newsFeedData['date'] + "</strong></td>"
                + "<td><i class='fa fa-star fa-2x'></i>" + "</td><td>" +newsFeedData['totalDailyScore'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-twitter fa-2x'></i>" + "</td><td>" +newsFeedData['twitterNum'] + "</td>"
                + "<td><i class='fa fa-reddit fa-2x'></i>" + "</td><td>" +newsFeedData['redditNum'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-stack-overflow fa-2x'></i>" + "</td><td>" +newsFeedData['stackNum'] +  "</td>"
                + "<td><i class='fa fa-comment-o fa-flip-horizontal fa-2x'></i>" +"</td><td>" + newsFeedData['quoraNum'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-github-alt fa-2x'></i>" + "</td><td>" +newsFeedData['githubNum'] + "</td>"
                + "<td><i class='fa fa-pencil-square fa-2x'></i>" + "</td><td>" +newsFeedData['blogNum'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-linkedin fa-2x'></i>" + "</td><td>" +newsFeedData['linkedInNum'] + "</td>"
                + "<td><i class='fa fa-check-square-o fa-2x'></i>" + "</td><td>" +newsFeedData['dailyTicketNum'] + "</td>"
                + "</tr> </table>"
        );

		// chartData.push(newsFeedData);
		// console.log(chartData);
		
		// 	//DRAW CHART FROM SNAPSHOT
		// 	//Get context with jQuery - using jQuery's .get() method.
		// 	var ctx = $("#first-chart").get(0).getContext("2d");
		// 	//This will get the first returned node in the jQuery collection.
		// 	var myNewChart = new Chart(ctx);
			
		// 	var data = {
		// 		labels : [chartData[0].date,chartData[1].date,chartData[2].date],
		// 		datasets : [
		// 			//twitter
		// 			{
		// 				fillColor : "rgba(220,220,220,0.5)",
		// 				strokeColor : "rgba(220,220,220,1)",
		// 				data : [chartData[0].linkedInNum,chartData[1].linkedInNum,chartData[2].linkedInNum]
		// 			},
		// 			//reddit
		// 			{
		// 				fillColor : "rgba(151,187,205,0.5)",
		// 				strokeColor : "rgba(151,187,205,1)",
		// 				data : [chartData[0].totalDailyScore,chartData[1].totalDailyScore,chartData[2].totalDailyScore]
		// 			},
		// 			//stackoverflow
		// 			{
		// 				fillColor : "rgba(100,100,205,0.5)",
		// 				strokeColor : "rgba(100,100,205,1)",
		// 				data : [chartData[0].twitterNum,chartData[1].twitterNum,chartData[2].twitterNum]
		// 			},
		// 			//quora
		// 			{
		// 				fillColor : "rgba(100,100,205,0.5)",
		// 				strokeColor : "rgba(100,100,205,1)",
		// 				data : [chartData[0].twitterNum,chartData[1].twitterNum,chartData[2].twitterNum]
		// 			},
		// 			//github
		// 			{
		// 				fillColor : "rgba(100,100,205,0.5)",
		// 				strokeColor : "rgba(100,100,205,1)",
		// 				data : [chartData[0].twitterNum,chartData[1].twitterNum,chartData[2].twitterNum]
		// 			},
		// 			//blog
		// 			{
		// 				fillColor : "rgba(100,100,205,0.5)",
		// 				strokeColor : "rgba(100,100,205,1)",
		// 				data : [chartData[0].twitterNum,chartData[1].twitterNum,chartData[2].twitterNum]
		// 			},
		// 			//linkedIn
		// 			{
		// 				fillColor : "rgba(100,100,205,0.5)",
		// 				strokeColor : "rgba(100,100,205,1)",
		// 				data : [chartData[0].twitterNum,chartData[1].twitterNum,chartData[2].twitterNum]
		// 			},
		// 			//totalDaily
		// 			{
		// 				fillColor : "rgba(100,100,205,0.5)",
		// 				strokeColor : "rgba(100,100,205,1)",
		// 				data : [chartData[0].twitterNum,chartData[1].twitterNum,chartData[2].twitterNum]
		// 			},
		// 		]
		// 	}
		// 	new Chart(ctx).Bar(data);
			

		}); //END OF CURRENT USERS CALLBACK

		
		//ALL USERS GRAPH STUFF-------------------------------------------------------------------------
		var allUsersChartData = [];
		var testArr = [];
		//get all users info
		var allUsersRef = new Firebase('https://codehscore.firebaseio.com/users/');
		
		var date3 = new Date();
		date3.setDate(date3.getDate()-2);

		var currentTime = new Date()
		var month = date3.getMonth() + 1
		var day = date3.getDate()
		var year = date3.getFullYear()
		var date3 = month + "-" + day + "-" + year;

		var date2 = new Date();
		date2.setDate(date2.getDate()-1);

		var currentTime = new Date()
		var month = date2.getMonth() + 1
		var day = date2.getDate()
		var year = date2.getFullYear()
		var date2 = month + "-" + day + "-" + year;

		var date1 = new Date();
		date1.setDate(date1.getDate());

		var currentTime = new Date()
		var month = date1.getMonth() + 1
		var day = date1.getDate()
		var year = date1.getFullYear()
		var date1 = month + "-" + day + "-" + year;


		var arr = [];
		var nameArr = [];
		allUsersRef.on('value',function(snapshot){
			var allUsersData = snapshot.val();
			console.log(allUsersData);
			var index = 0;
			
			snapshot.forEach(function(childSnapshot){
				index++;
				var childData = childSnapshot.val();
				console.log(childData);
				arr.push([childData.stats[date3].totalDailyScore, childData.stats[date2].totalDailyScore, childData.stats[date1].totalDailyScore]);
				console.log(arr);
				nameArr.push(childData['info']['firstName']);
				console.log(nameArr);
			});
			
			var chartArray = [];
			var colorsArray = [];
			for(var i=0; i<index; i++){
				var randColor = Math.floor(Math.random()*256);
				var randColor2 = Math.floor(Math.random()*256);
				var randColor3 = Math.floor(Math.random()*256);
				colorsArray.push(randColor,randColor2,randColor3);

				chartArray.push(
					{
						fillColor : "rgba("+randColor+"," +randColor2+ "," +randColor3+ ",0.5)",
						strokeColor : "rgba(" +randColor+ "," +randColor2+ "," +randColor3+ ",1)",
						data :  [arr[i][0],arr[i][1],arr[i][2]]
					}
					);
			}
			console.log(colorsArray);
			//Get context with jQuery - using jQuery's .get() method.
			var ctx = $("#first-chart").get(0).getContext("2d");
			//This will get the first returned node in the jQuery collection.
			var myNewChart = new Chart(ctx);
			
			var data = {
				labels : [date3,date2,date1],
				datasets : chartArray
			}
			new Chart(ctx).Bar(data);
			var colorIndex = 0;
			for (var k=0; k<nameArr.length; k++){
				$('<li></li>',{
					text: nameArr[k]
				}).appendTo(".legend").css("color", "rgba("+colorsArray[colorIndex++]+"," +colorsArray[colorIndex++]+ "," +colorsArray[colorIndex++]+ ",1)")
				.css("font-size", "1.5em");

			}
			

		}); //End of ALL USERS CALLBACK
		


	  } else {
	  	//User is not logged in
	    window.open('index.html', '_self');
	  }
	}); //end of auth callback
});
