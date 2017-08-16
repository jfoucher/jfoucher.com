$(document).ready(function(){

    $('a[href*=#]').click(function() {

        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            && location.hostname == this.hostname) {

            var $target = $(this.hash);

            $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

            if ($target.length) {

                var targetOffset = $target.offset().top;

                $('html,body').animate({scrollTop: targetOffset}, 1000);

                return false;

            }

        }

    });

    if (window.innerWidth > 1024){
        var excerpt=$('#notebook.archives li a span.excerpt');

        $('#notebook.archives li').hover(function(e){
            $(this).find('span.excerpt').stop(true,true).slideDown(function(){
                $(this).css({display:'block'});
            });
        },function(e){
            $(this).find('span.excerpt').stop(true,true).slideUp();
        });

        excerpt.hide();
        $('.highlight').hover(
            function(){

                var codeWidth=$(this).find('code').outerWidth();
                console.log(codeWidth);
                if ($(this).width()<codeWidth){
                    $(this).stop(true).animate({width:codeWidth});
                }
            },
            function(){
                $(this).stop(true).animate({width:'100%'});
            });
    }


});
