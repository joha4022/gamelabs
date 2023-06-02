// imports

// fetching information
const displayPage = document.querySelector('.displayPage');
const createDiv = document.createElement('div');

removeAllChild = (parent) => {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


const url = (params) => {
    let search = `?category=${params}`
    if(params.length > 0) {
        return `https://free-to-play-games-database.p.rapidapi.com/api/games${search}`
    } else {
        return `https://free-to-play-games-database.p.rapidapi.com/api/games`
    }
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2bdbaa3e15mshae67d99e308b3e0p1d49e6jsnc9ac639487ac',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

const requestInfo =  (url) => {
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
            removeAllChild(displayPage);
            for(let i = 0; i < data.length; i++) {
                displayPage.appendChild(document.createElement('div'));
            }
            console.log(displayPage.childNodes.length)
            for(let i = 0; i < displayPage.childNodes.length; i++) {
                displayPage.childNodes[i].innerHTML = data[i].title;
            }
        }
    )
    
}
//variables

// adding event listners
document.querySelector(`#shooter`).addEventListener('click', async function (){
    requestInfo(url('shooter'));
});
document.querySelector(`#mmorpg`).addEventListener('click', () => {
    requestInfo(url('mmorpg'))
});
document.querySelector(`#open-world`).addEventListener('click', () => requestInfo(url('open-world')));
document.querySelector(`#strategy`).addEventListener('click', () => requestInfo(url('strategy')));
document.querySelector(`#seeAll`).addEventListener('click', () => requestInfo(url('')));

