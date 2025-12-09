

$(document).ready(function() {

    $.ajax({
        type: "GET",
   	 	url: "lab8jsontemplate.json",
   	 	dataType: "json",
   	 	success: function(responseData, status){
		//	alert("test");
        var output = "<ul>";  
    	 	$.each(responseData.menuItem, function(i, item) {
				
       		output += '<li><a href="' + item.link + '">'; 
        	output += item.name;
        	output += '</a><a>' + item.description + '</a></li>';
      	});

      	output += "</ul>";
		
      	$('#listOutput').html(output);
    	}, error: function(msg) {
      				// there was a problem
      	alert("There was a problem: " + msg.status + " " + msg.statusText);
    	}
  	});
})