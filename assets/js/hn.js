
// var ul = document.getElementById("comments");
var fragment = document.createDocumentFragment();


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

if(window.fetch) {
    fetch('https://hn.algolia.com/api/v1/items/'+hnId).then(function (response) {
        if(response.ok) {
            return response.json();
          }
          throw new Error('Network response was not ok.');
    }).then(function(json) { 
        console.log('got blob', json);
        if(json.children && json.children.length) {
            var ret = displayComments(json.children);
            ret.className += ' top';
            document.getElementById("comments").insertAdjacentElement('afterend', ret);
        }
      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
      });
} else {
    console.error('NO FETCH');
}