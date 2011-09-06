$(document).ready(function(){


    function ISODateString(d){
     function pad(n){return n<10 ? '0'+n : n}
     return d.getUTCFullYear()+'-'
          + pad(d.getUTCMonth()+1)+'-'
          + pad(d.getUTCDate())+'T'
          + pad(d.getUTCHours())+':'
          + pad(d.getUTCMinutes())+':'
          + pad(d.getUTCSeconds())+'Z'}

    
    function replaceURLWithHTMLLinks(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      return text.replace(exp,"<a href='$1'>$1</a>");
    }
/*
    $('.highlight').each(function(i,el){
        var codeWidth=$(this).find('code').outerWidth();
        console.log(codeWidth);
        $(this).width(codeWidth);
    });
    */
    var origWidth=0;
    $('.highlight').hover(
    function(){
        origWidth=$(this).width();
        var codeWidth=$(this).find('code').outerWidth();
        console.log(codeWidth);
        if (origWidth<codeWidth){
            $(this).animate({width:codeWidth});
        }
    },
    function(){
        $(this).animate({width:origWidth});
    });

/*
    $.ajax('https://twitter.com/statuses/user_timeline/jfoucher.json?count=6', {
        dataType:'jsonp',
        success:function(data,status){
            alert(data);
            $.each(data,function(i,el){

                var date=new Date(Date.parse(el.created_at));
                var d=ISODateString(date);
                $('#tweets').append('<li>'+replaceURLWithHTMLLinks(el.text)+'<span class="timeago" title="'+d+'">'+date.toLocaleDateString()+'</span></li>');
            });
            $(".timeago").timeago();
        },
        error:function(xhr,status,error){
            alert(status);
        },
        complete:function(xhr,status){
            alert(status);
            
        }
    });
*/
    $.getJSON("http://twitter.com/statuses/user_timeline.json?screen_name=jfoucher&count=4&callback=?",
         
        function(data){

            $.each(data, function(i,el){
                var date=new Date(Date.parse(el.created_at));
                var d=ISODateString(date);
                $('#tweets').append('<li>'+replaceURLWithHTMLLinks(el.text)+'<span class="timeago" title="'+d+'">'+date.toLocaleDateString()+'</span></li>');

            });
            $(".timeago").timeago();

        });
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


});
