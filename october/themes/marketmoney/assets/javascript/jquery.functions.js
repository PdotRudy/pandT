jQuery(document).ready(function() {

  
	
	$(window).on('scroll', function() {
	    var y_scroll_pos = window.pageYOffset;
	    var scroll_pos_test = 100;             // set to whatever you want it to be
		
	    if(y_scroll_pos > scroll_pos_test) {
	       $('#secondary_navwrap').addClass('secondary_navwrap_scroll');
	       $('#secondary_nav').addClass('secondary_nav_scroll');
	    }
	    
	    if(y_scroll_pos < scroll_pos_test) {
	       $('#secondary_navwrap').removeClass('secondary_navwrap_scroll');
	       $('#secondary_nav').removeClass('secondary_nav_scroll');
	    }
	});
	
});