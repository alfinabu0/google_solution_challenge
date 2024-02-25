const idea = JSON.parse(sessionStorage.getItem('currentIdea'));
document.getElementById('title').innerText = idea.title;
document.getElementById('description').innerText = idea.description;
document.getElementById('rating').innerText = idea.rating;
sessionStorage.removeItem('currentIdea');