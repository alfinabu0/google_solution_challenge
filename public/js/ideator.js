import { db } from "./firestore_init.js";
import { collection, getDocs , query , where} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

//fetch all the documents from ideas collection where the ideatorId is equal to the current user id

async function getIdeas(userId) {
    const ideas = [];
    const q = query(collection(db, "ideas"), where("ideatorId", "==", userId));
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            ideas.push({ id: doc.id, ...doc.data() });
        });
        console.log(ideas)
        return ideas;
    
}

export const renderIdeaBox = function (userId) {

    getIdeas(userId).then((ideas) => {
        for (let i = 0; i < ideas.length; i++) {
            
            const idea = ideas[i];
            const footer = document.querySelector('footer');
            console.log(idea);
            if (i % 3 === 0 || i === 0) {
                const boxContainer = document.createElement('div');
                boxContainer.classList.add('box-container');
                boxContainer.innerHTML = `
                <div class="box" id="${idea.id}">
                    <h2>${idea.title}</h2>
                    <p class="hashtags">${idea.hashtags}</p>
                    <p class="rating-text">Rating: ${idea.rating}</p>
                </div>
            `;
                footer.parentNode.insertBefore(boxContainer, footer);
            } else {
                const latestBoxContainer = document.getElementsByClassName('box-container')[document.getElementsByClassName('box-container').length - 1];
                console.log(latestBoxContainer);
                const box = document.createElement('div');
                box.classList.add('box');
                box.id = idea.id;
                box.innerHTML = `
                <h2>${idea.title}</h2>
                <p class="hashtags">${idea.hashtags}</p>
                <p class="rating-text">Rating: ${idea.rating}</p>
            `;
                latestBoxContainer.appendChild(box);

            }

            document.getElementById(idea.id).addEventListener('click', () => {
                sessionStorage.setItem('currentIdea', JSON.stringify(idea));
                window.location.href = 'idea_view_ideator.html';
            });
        }
        
    });

}
