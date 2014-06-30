$(document).ready(function(){

	$('.send').on('click', function(){
		var phone = $('.phone').val();
		var sendTo = $('.customer').val();
		var msg = $('.msg').val();

		var link = "https://api.tropo.com/1.0/sessions?action=create&token=4624ac8721e2ae47982074963f30ba8b812923f5c560049edf09a5ce4c0e2d4a9ae9d4d85bd1ddc490140561";
		link += "&numberToDial=" + phone;
		link += "&customerName=" + sendTo;
		link += "&msg=" + msg;

		//AJAX
  		$.get(link,function(data,status){
    		alert("Data: " + data + "\nStatus: " + status);
		});
	});
});