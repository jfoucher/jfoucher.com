// A $( document ).ready() block.
$( document ).ready(function() {

	// DropCap.js
	var dropcaps = document.querySelectorAll(".dropcap");
	window.Dropcap.layout(dropcaps, 2);

	// Responsive-Nav
	var nav = responsiveNav(".nav-collapse");

	// Round Reading Time
	$(".time").text(function (index, value) {
		return Math.round(parseFloat(value));
	});

	var form = $('#contactForm')
	form.on('submit', function(e) {
		e.preventDefault();
		$.ajax({
			url: form.attr('action'),
			method: "POST",
			data: {
				name: $('#name').val(),
				email: $('#email').val(),
				message: $('#message').val(),
			},
			dataType: "json",
			success: function() {
				form.html("<h3>Thanks ! I'll get back to you as soon as possible</h3>")
			}
	}); 
	})

});


