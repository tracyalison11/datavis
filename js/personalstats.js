$(document).ready(function(){

    var chatRef = new Firebase('https://codehscore.firebaseio.com');
    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
      if (error) { 
        // an error occurred while attempting login
          alert("Either your email or password is not correct");
        console.log(error);
      } else if (user) { var newsfeedRef = new Firebase('https://codehscore.firebaseio.com/users/' +user.uid+ '/stats');
        var newsFeedRefQuery = newsfeedRef.limit(3);
        var chartData = [];
        newsFeedRefQuery.on('child_added', function(snap) {
            var newsFeedData = snap.val();
            
                // console.log(newsFeedData);
                // divide up news feed into a table
            
        chartData.push(newsFeedData);
        console.log(chartData);
        
         //DRAW CHART FROM SNAPSHOT
         //Get context with jQuery - using jQuery's .get() method.
         var ctx = $("#first-chart").get(0).getContext("2d");
         //This will get the first returned node in the jQuery collection.
         var myNewChart = new Chart(ctx);
            
         var data = {
             labels : [chartData[0].date,chartData[1].date,chartData[2].date],
             datasets : [
                 //twitter
                 {
                     fillColor : "rgba(220,220,220,0.5)",
                     strokeColor : "rgba(220,220,220,1)",
                     data : [chartData[0].linkedInNum,chartData[1].linkedInNum,chartData[2].linkedInNum]
                 },
                 //reddit
                 {
                     fillColor : "rgba(151,187,205,0.5)",
                     strokeColor : "rgba(151,187,205,1)",
                     data : [chartData[0].totalDailyScore,chartData[1].totalDailyScore,chartData[2].totalDailyScore]
                 },
                 //stackoverflow
                 {
                     fillColor : "rgba(100,100,205,0.5)",
                     strokeColor : "rgba(100,100,205,1)",
                     data : [chartData[0].twitterNum,chartData[1].twitterNum,chartData[2].twitterNum]
                 },
                 //quora
                 {
                     fillColor : "rgba(100,100,205,0.5)",
                     strokeColor : "rgba(100,100,205,1)",
                     data : [chartData[0].redditNum,chartData[1].redditNum,chartData[2].redditNum]
                 },
                 //github
                 {
                     fillColor : "rgba(100,100,205,0.5)",
                     strokeColor : "rgba(100,100,205,1)",
                     data : [chartData[0].stackNum,chartData[1].stackNum,chartData[2].stackNum]
                 },
                 //blog
                 {
                     fillColor : "rgba(100,100,205,0.5)",
                     strokeColor : "rgba(100,100,205,1)",
                     data : [chartData[0].quoraNum,chartData[1].quoraNum,chartData[2].quoraNum]
                 },
                 //linkedIn
                 {
                     fillColor : "rgba(100,100,205,0.5)",
                     strokeColor : "rgba(100,100,205,1)",
                     data : [chartData[0].blogNum,chartData[1].blogNum,chartData[2].blogNum]
                 },
                 //totalDaily
                 {
                     fillColor : "rgba(100,100,205,0.5)",
                     strokeColor : "rgba(100,100,205,1)",
                     data : [chartData[0].dailyTicketNum,chartData[1].dailyTicketNum,chartData[2].dailyTicketNum]
                 },
             ]
         }
         new Chart(ctx).Bar(data);
            
// 
        });
        // user authenticated with Firebase
        console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);

        // window.open('newsfeed.html', '_self');
      } else {
        // user is logged out
      }
    });


        });