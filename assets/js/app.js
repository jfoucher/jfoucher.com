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

    jQuery.ajax('http://twitter.com/statuses/user_timeline/jfoucher.json?count=4', {
        dataType:'jsonp',
        success:function(data){
            $.each(data,function(i,el){

                var date=new Date(Date.parse(el.created_at));
                var d=ISODateString(date);
                $('#tweets').append('<li>'+replaceURLWithHTMLLinks(el.text)+'<span class="timeago" title="'+d+'">'+date.toLocaleDateString()+'</span></li>');
            });
            $(".timeago").timeago();
        }
    });

});
