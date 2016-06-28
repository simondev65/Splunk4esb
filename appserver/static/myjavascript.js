
require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {
    var ImageRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            // Only use the cell renderer for the image_src field
            return cell.field === 'action';
           //console.log("found cell with value: "+cell.value);
        },
        render: function($td, cell) {
            var src = cell.value;

            $td.html(_.template('<button id="rejeu'+src + '">Rejeu</button>', {
		  src: cell.value
            }));
		console.log("tabarnak"+ $td.prev('td').text());
        }
    });
    mvc.Components.get('toto').getVisualization(function(tableView){
        // Register custom cell renderer, the table will re-render automatically
        tableView.addCellRenderer(new ImageRenderer());
    });
});


require([
    'jquery',
    'splunkjs/mvc/simplexml/ready!'
], function($){
	$(document).ready(function() {
    		console.log( "ready!" );

        	$("#toto").on('click', '[id*=rejeu]',function () {
	        	console.log("ID =  " +$(this).attr('id'));
			var data = $(this).parent().siblings("[data-cell-index=1]").html().replace(new RegExp('&lt;','g'),"<").replace(new RegExp('&gt;','g'),'>');			
			console.log(data);
			$.ajax({
                     		url: 'http://localhost:8040/services/resaproxy',
                      		type: 'POST',
                      		dataType: 'xml',
                      		beforeSend: function (request)
                      		{
                        		request.setRequestHeader("content-type", 'application/xml');
                        		request.setRequestHeader("Access-Control-Allow-Origin", '*');
                      		},
                      		data: data
                  	})
                  	.fail(function(data) {
                    		//alert(data);
                    		console.log(data);
                  	})
                  	.success(function(data) {
                    		//alert(data);
                    		console.log("SUCCESS " + data);
                  	});
        	});
	});
});

