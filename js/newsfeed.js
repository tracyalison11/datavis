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
                + "<td class=dataNum colspan='2'><strong>" + newsFeedData['date'] + "</strong></td>"
                + "<td><i class='fa fa-star fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['totalDailyScore'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-twitter fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['twitterNum'] + "</td>"
                + "<td><i class='fa fa-reddit fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['redditNum'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-stack-overflow fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['stackNum'] +  "</td>"
                + "<td><i class='fa fa-comment-o fa-flip-horizontal fa-2x'></i>" +"</td><td class=dataNum>" + newsFeedData['quoraNum'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-github-alt fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['githubNum'] + "</td>"
                + "<td><i class='fa fa-pencil-square fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['blogNum'] + "</td>"
                + "</tr> <tr>"
                + "<td><i class='fa fa-linkedin fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['linkedInNum'] + "</td>"
                + "<td><i class='fa fa-check-square-o fa-2x'></i>" + "</td><td class=dataNum>" +newsFeedData['dailyTicketNum'] + "</td>"
                + "</tr> </table>"
        );	

		}); //END OF CURRENT USERS CALLBACK

		
		//ALL USERS GRAPH STUFF-------------------------------------------------------------------------
		//create selectable filter buttons for graph
			$('.statistics').append('<div class="filter-icons"><li><i class="fa fa-star fa-2x" data-filter="totalDailyScore"></i></li>' 
				+ '<li><i class="fa fa-twitter fa-2x" data-filter="twitterNum"></i></li>' 
				+ '<li><i class="fa fa-reddit fa-2x" data-filter="redditNum"></i></li>' 
				+ '<li><i class="fa fa-stack-overflow fa-2x" data-filter="stackNum"></i></li>'
				+ '<li><i class="fa fa-comment-o fa-flip-horizontal fa-2x" data-filter="quoraNum"></i></li>' 
				+ '<li><i class="fa fa-github-alt fa-2x" data-filter="githubNum"></i></li>'
				+ '<li><i class="fa fa-pencil-square fa-2x" data-filter="blogNum"></i></li>' 
				+ '<li><i class="fa fa-linkedin fa-2x" data-filter="linkedInNum"></i></li>'
				+ '<li><i class="fa fa-check-square-o fa-2x" data-filter="dailyTicketNum"></i></li></div>');


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

		var filterVar = "totalDailyScore";
		$('.filter-icons').on('click', 'i', function(){
			filterVar = $(this).data('filter');
			console.log(filterVar);
			$('.legend').html("");
			drawChart();
		});

		var drawChart = function(){
		//allUsersCALLBACK
		allUsersRef.on('value',function(snapshot){
			var allUsersData = snapshot.val();
			
			var index = 0;
			//create arr to hold numbers from users
			var arr = [];
			//create nameArr to hold names of users to associate numbers with
			var nameArr = [];
			//for each user, get wanted data
			snapshot.forEach(function(childSnapshot){
				var childData = childSnapshot.val();
				console.log(childData);
				if(childSnapshot.hasChild('stats')){	
					

					if(childSnapshot.hasChild('stats/'+ date3) == true && childSnapshot.hasChild('stats/'+ date2) == true && childSnapshot.hasChild('stats/'+ date1) == true){		
						if(childData.stats[date3].totalDailyScore == "undefined"){
							childData.stats[date3].totalDailyScore = 0;
						}
						if(childData.stats[date2].totalDailyScore == "undefined"){
							childData.stats[date2].totalDailyScore = 0;
						}
						if(childData.stats[date1].totalDailyScore == "undefined"){
							childData.stats[date1].totalDailyScore = 0;
						}
					index++;	
					arr.push([childData.stats[date3][filterVar], childData.stats[date2][filterVar], childData.stats[date1][filterVar]]);
					nameArr.push(childData['info']['firstName']);
					console.log(arr);
					}	
				
				}
			}); //end of forEach loop
			//create chartArray to hold colors, and data necessary for chart object
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
			//Get context with jQuery - using jQuery's .get() method.
			var ctx = $("#first-chart").get(0).getContext("2d");
			//This will get the first returned node in the jQuery collection.
			var myNewChart = new Chart(ctx);
			
			var data = {
				labels : [date3,date2,date1],
				datasets : chartArray

			}
			//check to see if all values of data are equal, if yes, FLAG for options
			var optionsFlag = false;
			var optionsCount = 0;
			for (var z = 0; z<arr.length; z++){
				var CONST = arr[0][0];
				if (CONST == arr[z][0] && CONST == arr[z][1] && CONST == arr[z][2]){
					optionsCount++;
				}
			}
			
			if(optionsCount == arr.length){
				optionsFlag = true;
			}else{
				optionsFlag = false;
			}
			
			if (optionsFlag){
				if(filterVar == "githubNum"){
					var options = {
						scaleOverride: true,
						//** Required if scaleOverride is true **
						//Number - The number of steps in a hard coded scale
						scaleSteps : 10,
						//Number - The value jump in the hard coded scale
						scaleStepWidth : 0.5,
						//Number - The scale starting value
						scaleStartValue : 0,
						}
					}
					else if(filterVar == "blogNum"){
						var options = {
						scaleOverlay: true,
						scaleOverride: true,
						//** Required if scaleOverride is true **
						//Number - The number of steps in a hard coded scale
						scaleSteps : 10,
						//Number - The value jump in the hard coded scale
						scaleStepWidth : 1,
						//Number - The scale starting value
						scaleStartValue : 0,
						}
					}
					else if(filterVar == "dailyTicketNum"){
						var options = {
						scaleOverlay: true,
						scaleOverride: true,
						//** Required if scaleOverride is true **
						//Number - The number of steps in a hard coded scale
						scaleSteps : 8,
						//Number - The value jump in the hard coded scale
						scaleStepWidth : 0.25,
						//Number - The scale starting value
						scaleStartValue : 0,
						}
					}
				new Chart(ctx).Bar(data,options);
			}else{
				new Chart(ctx).Bar(data);
			}

			//add a legend with colors to indicate user
			var colorIndex = 0;
			for (var k=0; k<nameArr.length; k++){
				$('<li></li>',{
					text: nameArr[k]
				}).appendTo(".legend").css("color", "rgba("+colorsArray[colorIndex++]+"," +colorsArray[colorIndex++]+ "," +colorsArray[colorIndex++]+ ",1)")
				.css("font-size", "1.5em");

			}
			

		}); //End of ALL USERS CALLBACK
	}

	  } else {
	  	//User is not logged in
	    window.open('index.html', '_self');
	  }
	}); //end of auth callback
});
