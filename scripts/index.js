// imports
import GAMELABS_API_KEY from "./apikey.js";

// fetching information
const displayPage = document.querySelector('.displayPage');
const allCategories = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']
const colorPalette = ['#ff124fdb', '#2d7bf0db', '#e455aedb', '#7a04ebdb', '#120458db', '#1ac5b0db', '#710000db', '#272932db'];
const h2ColorPalette = ['#fdf500', '#9370db', '#66fcf2'];
const removeh2h4 = () => {
    document.querySelector('h2').remove();
    document.querySelector('h4').remove();
}

const clearChild = (parent) => {
    while(parent.hasChildNodes()) {
        parent.removeChild(displayPage.firstChild);
    }
}

const h2ColorRandomizer = () => {
    document.querySelector('h2').style.color = `${h2ColorPalette[Math.floor(Math.random() * h2ColorPalette.length)]}`;
}
h2ColorRandomizer();

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
            console.log(`Displaying total of: ${displayPage.childNodes.length} games`)
            for(let i = 0; i < displayPage.childNodes.length; i++) {
                displayPage.childNodes[i].setAttribute('class', 'gameBox');
                displayPage.childNodes[i].appendChild(create('img'));
                displayPage.childNodes[i].querySelector('img').src = data[i].thumbnail;
                displayPage.childNodes[i].appendChild(create('div'));
                displayPage.childNodes[i].querySelector('div').setAttribute('class', 'textBox');
                displayPage.childNodes[i].querySelector('.textBox').appendChild(create('h3'));
                displayPage.childNodes[i].querySelector('.textBox').childNodes[0].textContent = `${data[i].title}`.toUpperCase();
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

const displayCategories = () => {
    if(displayPage.hasChildNodes()) {
        clearChild(displayPage);
    }
    for(let i = 0; i < allCategories.length; i++) {
        displayPage.appendChild(document.createElement('div'));
    }
    for(let i = 0; i < allCategories.length; i++) {
        displayPage.childNodes[i].setAttribute('class', 'categoryBox');
        displayPage.childNodes[i].appendChild(create('img'));
        displayPage.childNodes[i].querySelector('img').setAttribute('class', 'sampleImage');
        displayPage.childNodes[i].appendChild(create('a'));
        displayPage.childNodes[i].querySelector('a').setAttribute('class', `categoryButton`);
        displayPage.childNodes[i].querySelector('a').textContent = `${allCategories[i]}`.toUpperCase();
        displayPage.childNodes[i].querySelector('a').addEventListener('click', () => {
            requestInfo(url(`${allCategories[i]}`));
            console.log(`Displaying ${allCategories[i]} related games`)
        });
        fetch(url(`${allCategories[i]}`), options)
        .then(res => res.json())
        .then(data => {
            displayPage.childNodes[i].querySelector('img').src = data[0].thumbnail;
        })
    }
    for(let box of displayPage.childNodes) {
        console.log(Math.floor(Math.random() * colorPalette.length))
        box.style.backgroundColor = `${colorPalette[Math.floor(Math.random() * colorPalette.length)]}`;
    }
}

const createAlphaBox = () => {

}

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
        displayCategories();
    } else {
        displayCategories();
    }
});
document.querySelector(`#alphabetical`).addEventListener('click', () => {
    if(document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
        createAlphaBox();
    } else {
        createAlphaBox();
    }
});

