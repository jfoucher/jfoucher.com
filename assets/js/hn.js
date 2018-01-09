/*! HN comments v0.1 | (c) 2017 Jonathan FOUCHER | MIT LICENSE */

/*
USAGE
___
Create a element with id="hnComments" in your markup. 
It should have a data-hn-id attribute whose value is the id of 
the post you made on hn, e.g. 
https://news.ycombinator.com/item?id=15044479
                                     ^^^^^^^^
                                     THIS IS THE ID

The comments will be inserted after that element.

Example : 

<h4 id="hnComments" style="margin-top:4em" data-hn-id="15044479">
    Comments from <a href="https://news.ycombinator.com/item?id=15044479">HN</a>
    <a href="https://news.ycombinator.com/item?id=15044479">Discuss</a>
</h4>
<script src="assets/js/hn.js></script>
*/

function displayComments(comments) {
    var ul = document.createElement('ul');
    ul.className="comment-list hn";
    comments.forEach(function(comment) {
        var li = document.createElement('li');
        var d = new Date(comment.created_at);
        var m = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : '0'+ (d.getMonth() + 1)
        var day = d.getDay() > 9 ? d.getDay() : '0'+ (d.getDay())
        var date = d.getFullYear()+'-'+m+'-'+day;
        li.innerHTML = '<p class="hn comment-author">'+comment.author+' <span class="hn date">'+date+'</span></p>'+comment.text;
        li.className = 'comment hn';
        ul.appendChild(li);

        if (comment.children && comment.children.length) {
            var li = document.createElement('li');
            li.appendChild(displayComments(comment.children));
            ul.appendChild(li);
        }
    });
    return ul;
}

//Get element and hn post ID from markup
var elem = document.getElementById("hnComments");
var hnId = elem.getAttribute("data-hn-id");

//Use XMLHttpRequest for compatibilty with ie
xhr = new XMLHttpRequest();

xhr.addEventListener('load', function(res){
    console.log('XHR RESULT', res);
    var json = JSON.parse(res.target.responseText);
    if(json.children && json.children.length) {
        var ret = displayComments(json.children);
        ret.className += ' top';
        elem.insertAdjacentElement('afterend', ret);
    }
});
xhr.addEventListener('error', function(){
        var ret = document.createElement('p');
        ret.innerText = 'Could not load HN comments';
        ret.className += 'hn error';
        elem.insertAdjacentElement('afterend', ret);
});
xhr.open('GET', 'https://hn.algolia.com/api/v1/items/'+hnId);
xhr.send();
