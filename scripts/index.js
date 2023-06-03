// imports
import GAMELABS_API_KEY from "./apikey.js";

// fetching information
const displayPage = document.querySelector('.displayPage');

const removeh2h4 = () => {
    document.querySelector('h2').remove();
    document.querySelector('h4').remove();
}

const clearChild = (parent) => {
    while(parent.hasChildNodes()) {
        parent.removeChild(displayPage.firstChild);
    }
}


const create = (tag) => {
    return document.createElement(tag);
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
		'X-RapidAPI-Key': GAMELABS_API_KEY,
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

const requestInfo =  (url) => {
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
            if(displayPage.hasChildNodes()) {
                clearChild(displayPage);
            }
            for(let i = 0; i < data.length; i++) {
                displayPage.appendChild(document.createElement('div'));
            }
            console.log(displayPage.childNodes.length)
            for(let i = 0; i < displayPage.childNodes.length; i++) {
                displayPage.childNodes[i].setAttribute('class', 'gameBox');
                displayPage.childNodes[i].appendChild(create('img'));
                displayPage.childNodes[i].querySelector('img').src = data[i].thumbnail;
                displayPage.childNodes[i].appendChild(create('div'));
                displayPage.childNodes[i].querySelector('div').setAttribute('class', 'textBox');
                displayPage.childNodes[i].querySelector('.textBox').appendChild(create('h3'));
                displayPage.childNodes[i].querySelector('.textBox').childNodes[0].textContent = `${data[i].title}`;
                displayPage.childNodes[i].querySelector('.textBox').appendChild(create('span'));
                displayPage.childNodes[i].querySelector('.textBox').childNodes[1].textContent = `Developer : ${data[i].developer}`;
                displayPage.childNodes[i].querySelector('.textBox').appendChild(create('span'));
                displayPage.childNodes[i].querySelector('.textBox').childNodes[2].textContent = `Platform : ${data[i].platform}`;
                displayPage.childNodes[i].querySelector('.textBox').appendChild(create('span'));
                displayPage.childNodes[i].querySelector('.textBox').childNodes[3].textContent = `Release Date : ${data[i].release_date}`;
                displayPage.childNodes[i].appendChild(create('a'));
                displayPage.childNodes[i].querySelector('a').setAttribute('class', `linkButton`);
                displayPage.childNodes[i].querySelector('a').setAttribute('href', `${data[i].game_url}`);
                displayPage.childNodes[i].querySelector('a').setAttribute('target', `_blank`);
                displayPage.childNodes[i].querySelector('a').textContent = `Link to Offical Site`;
            }
        }
    )
    
}
//variables

// adding event listners
document.querySelector(`#shooter`).addEventListener('click', () => {
    if(document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
        requestInfo(url('shooter'));
    } else {
        requestInfo(url('shooter'));
    }
});
document.querySelector(`#survival`).addEventListener('click', () => {
    if(document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
        requestInfo(url('survival'));
    } else {
        requestInfo(url('survival'));
    }
});
document.querySelector(`#mmorpg`).addEventListener('click', () => {
    if(document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
        requestInfo(url('mmorpg'));
    } else {
        requestInfo(url('mmorpg'));
    }
});
document.querySelector(`#open-world`).addEventListener('click', () => {
    if(document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
        requestInfo(url('open-world'));
    } else {
        requestInfo(url('open-world'));
    }
});
document.querySelector(`#strategy`).addEventListener('click', () => {
    if(document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
        requestInfo(url('strategy'));
    } else {
        requestInfo(url('strategy'));
    }
});
document.querySelector(`#seeAll`).addEventListener('click', () => {
    if(document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
        requestInfo(url(''));
    } else {
        requestInfo(url(''));
    }
});

