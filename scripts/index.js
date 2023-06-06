// imports
import GAMELABS_API_KEY from "./apikey.js";

// fetching information
const displayPage = document.querySelector('.displayPage');
const allCategories = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']
const colorPalette = ['#ff124fdb', '#2d7bf0db', '#e455aedb', '#7a04ebdb', '#120458db', '#1ac5b0db', '#710000db', '#272932db'];
const h2ColorPalette = ['#fdf500d9', '#9370dbd9', '#66fcf2d9', '#ed8554d9', '#1afe49d9'];
const alphabets = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
let alphabeticalData = {};
let gameData = {};

document.querySelector('.filterBox').querySelector('#dateFilter').addEventListener('click', () => {
    sortByReleaseDate();
 })
 document.querySelector('.filterBox').querySelector('#alphabeticalFilter').addEventListener('click', () => {
    sortByAlphabetical();
 })

const removeh2h4 = () => {
    document.querySelector('h2').style.display = 'none';
    document.querySelector('#h2animate').style.display = 'none';
    document.querySelector('h4').style.display = 'none';
}

const clearChild = (parent) => {
    while (parent.hasChildNodes()) {
        parent.removeChild(displayPage.firstChild);
    }
}

const removeAlphabetBox = () => {
    document.querySelector('.alphabetBox').remove();
}

const h2ColorRandomizer = () => {
    let num = Math.floor(Math.random() * h2ColorPalette.length);
    document.querySelector('h2').style.color = `${h2ColorPalette[num]}`;
    document.querySelector('.labsh1').style.color = `${h2ColorPalette[num]}`;

}

h2ColorRandomizer();

const create = (tag) => {
    return document.createElement(tag);
}

const spinner = (option) => {
    document.querySelector('.loadingio-spinner-spinner-c5cmjuf7ctq').style.display = option;
}

const url = (params) => {
    let search = `?category=${params}`
    if (params.length > 0) {
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

const genreRequest = (event) => {
    let genre = event.target.textContent.split(': ')[1].toLowerCase();
    console.log(genre);
    if(genre === 'action rpg') {return 'action-rpg';}
    if(genre === 'card game') {return 'card';}
    return genre;
}

const detailsPage = (evt, gameData) => {
    document.querySelector('.filterBox').style.display = 'none';
    for (let game of gameData) {
        if (evt.target.parentNode.id === `id_${game.id}`) {
            displayPage.appendChild(document.createElement('div'));
            displayPage.childNodes[0].setAttribute('class', 'detailsGameBox');
            displayPage.childNodes[0].appendChild(create('img'));
            displayPage.querySelector('img').setAttribute('class', 'detailsPageImage');
            displayPage.querySelector('img').src = game.thumbnail;
            displayPage.childNodes[0].appendChild(create('div'));
            displayPage.childNodes[0].querySelector('div').setAttribute('class', 'detailsTextBox');
            displayPage.childNodes[0].querySelector('.detailsTextBox').appendChild(create('h3'));
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[0].textContent = `${game.title}`.toUpperCase();
            displayPage.childNodes[0].querySelector('.detailsTextBox').appendChild(create('span'));
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[1].textContent = `Genre : ${game.genre}`;
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[1].setAttribute ('class', 'genreInfo');
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[1].addEventListener('click', (event) => {
                requestInfo(url(genreRequest(event)));
            });
            displayPage.childNodes[0].querySelector('.detailsTextBox').appendChild(create('span'));
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[2].textContent = `Developer : ${game.developer}`;
            displayPage.childNodes[0].querySelector('.detailsTextBox').appendChild(create('span'));
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[3].textContent = `Platform : ${game.platform}`;
            displayPage.childNodes[0].querySelector('.detailsTextBox').appendChild(create('span'));
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[4].textContent = `Release Date : ${game.release_date}`
            displayPage.childNodes[0].querySelector('.detailsTextBox').appendChild(create('span'));
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[5].setAttribute('class', 'detailsDescription');
            displayPage.childNodes[0].querySelector('.detailsTextBox').childNodes[5].textContent = `${game.short_description}`;
            displayPage.childNodes[0].appendChild(create('a'));
            displayPage.childNodes[0].querySelector('a').setAttribute('class', `detailsLinkButton`);
            displayPage.childNodes[0].querySelector('a').setAttribute('href', `${game.game_url}`);
            displayPage.childNodes[0].querySelector('a').setAttribute('target', `_blank`);
            displayPage.childNodes[0].querySelector('a').textContent = `Link to Offical Site`;
        }
    }
};

const sortByReleaseDate = () => {
    let firstNode = displayPage.childNodes[0].querySelector('.textBox').childNodes[3].textContent.split(': ')[1];
    let releaseDates = [];
    for(let eachNode of displayPage.childNodes) {
        releaseDates.push(eachNode.querySelector('.textBox').childNodes[3].textContent.split(': ')[1])
    }
    if (firstNode !== releaseDates.sort()[releaseDates.length-1]) {
        console.log('descending order');
        releaseDates = releaseDates.sort();
        for (let date of releaseDates) {
            for (let node of displayPage.childNodes) {
                if(node.querySelector('.textBox').childNodes[3].textContent.split(': ')[1] === date) {
                    displayPage.prepend(node);
                }
            }
        }
    } else {
        releaseDates = releaseDates.reverse();
        console.log('ascending order');
        for (let date of releaseDates) {
            for (let node of displayPage.childNodes) {
                if(node.querySelector('.textBox').childNodes[3].textContent.split(': ')[1] === date) {
                    displayPage.prepend(node);
                }
            }
        }
    }
}

const sortByAlphabetical = () => {
    let firstNode = displayPage.childNodes[0].querySelector('.textBox').childNodes[0].textContent;
    let alphabeticalOrder = [];
    for(let eachNode of displayPage.childNodes) {
        alphabeticalOrder.push(eachNode.querySelector('.textBox').childNodes[0].textContent)
    }
    console.log(firstNode, alphabeticalOrder.sort()[0])
    if (firstNode !== alphabeticalOrder.sort()[0]) {
        console.log('descending order');
        alphabeticalOrder = alphabeticalOrder.sort();
        for (let title of alphabeticalOrder) {
            for (let node of displayPage.childNodes) {
                if(node.querySelector('.textBox').childNodes[0].textContent === title) {
                    displayPage.append(node);
                }
            }
        }
    } else {
        alphabeticalOrder = alphabeticalOrder.sort();
        console.log('ascending order');
        for (let title of alphabeticalOrder) {
            for (let node of displayPage.childNodes) {
                if(node.querySelector('.textBox').childNodes[0].textContent === title) {
                    displayPage.prepend(node);
                }
            }
        }
    }
}

 
const requestInfo = (url) => {
    spinner('inline-block');
    // filter box
    document.querySelector('.filterBox').style.display = 'flex';
    fetch(url, options)
        .then(response => {
            if (response.status === 200) {
                spinner('none');
            }
            return response.json();
        })
        .then(data => {
            gameData = data;
            if (displayPage.hasChildNodes()) {
                clearChild(displayPage);
            }
            for (let i = 0; i < data.length; i++) {
                displayPage.appendChild(document.createElement('div'));
            }
            console.log(`Displaying total of: ${displayPage.childNodes.length} games`)
            for (let i = 0; i < displayPage.childNodes.length; i++) {
                displayPage.childNodes[i].setAttribute('class', 'gameBox');
                displayPage.childNodes[i].appendChild(create('a'));
                displayPage.childNodes[i].querySelector('a').setAttribute('id', `id_${data[i].id}`);
                displayPage.childNodes[i].querySelector('a').setAttribute('class', `thumbnail`);
                displayPage.childNodes[i].querySelector('a').setAttribute('href', `index.html#id_${data[i].id}`);
                displayPage.childNodes[i].querySelector('a').addEventListener('click', (evt) => {
                    clearChild(displayPage);
                    detailsPage(evt, gameData);
                });
                displayPage.childNodes[i].querySelector(`#id_${data[i].id}`).appendChild(create('img'));
                displayPage.childNodes[i].querySelector(`#id_${data[i].id}`).querySelector('img').src = data[i].thumbnail;
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
                displayPage.childNodes[i].childNodes[2].setAttribute('class', `linkButton`);
                displayPage.childNodes[i].childNodes[2].setAttribute('href', `${data[i].game_url}`);
                displayPage.childNodes[i].childNodes[2].setAttribute('target', `_blank`);
                displayPage.childNodes[i].childNodes[2].textContent = `Link to Offical Site`;
            }
        })

}

const displayCategories = () => {
    spinner('inline-block');
    document.querySelector('.filterBox').style.display = 'none';
    if (displayPage.hasChildNodes()) {
        clearChild(displayPage);
    }
    for (let i = 0; i < allCategories.length; i++) {
        displayPage.appendChild(create('div'));
    }
    for (let i = 0; i < allCategories.length; i++) {
        displayPage.childNodes[i].setAttribute('class', 'categoryBox');
        displayPage.childNodes[i].appendChild(create('img'));
        displayPage.childNodes[i].querySelector('img').setAttribute('class', 'sampleImage');
        displayPage.childNodes[i].appendChild(create('a'));
        displayPage.childNodes[i].querySelector('a').setAttribute('class', `categoryButton`);
        displayPage.childNodes[i].querySelector('a').textContent = `${allCategories[i]}`.toUpperCase();
        displayPage.childNodes[i].addEventListener('click', () => {
            requestInfo(url(`${allCategories[i]}`));
            console.log(`Displaying ${allCategories[i]} related games`)
        });
        fetch(url(`${allCategories[i]}`), options)
            .then(res => {
                if (res.status === 200) {
                    spinner('none');
                }
                return res.json();
            })
            .then(data => {
                displayPage.childNodes[i].querySelector('img').src = data[0].thumbnail;
            })
    }
    for (let box of displayPage.childNodes) {
        box.style.backgroundColor = `${colorPalette[Math.floor(Math.random() * colorPalette.length)]}`;
    }
}

// letterData parameter example: alphabeticalData[`#`]
const alphaDataDisplay = (letterData) => {
    document.querySelector('.filterBox').style.display = 'flex';
    if (letterData.length === 0) {
        displayPage.appendChild(document.createElement('img'));
        displayPage.querySelector('img').src = './images/6179016.png'
        displayPage.querySelector('img').setAttribute('id', 'errorImage');
        displayPage.appendChild(document.createElement('h2'));
        displayPage.querySelector('h2').textContent = 'Sorry! No results found :(';
        displayPage.querySelector('h2').setAttribute('id', 'errorh2');
    }
    for (let i = 0; i < letterData.length; i++) {
        displayPage.appendChild(document.createElement('div'));
        displayPage.childNodes[i].setAttribute('class', 'gameBox');
        displayPage.childNodes[i].appendChild(create('a'));
        displayPage.childNodes[i].querySelector('a').setAttribute('id', `id_${letterData[i].id}`);
        displayPage.childNodes[i].querySelector(`#id_${letterData[i].id}`).setAttribute('class', `thumbnail`);
        displayPage.childNodes[i].querySelector(`#id_${letterData[i].id}`).setAttribute('href', `#id_${letterData[i].id}`);
        displayPage.childNodes[i].querySelector(`#id_${letterData[i].id}`).addEventListener('click', (evt) => {
            clearChild(displayPage);
            detailsPage(evt, letterData);
        });
        displayPage.childNodes[i].querySelector(`#id_${letterData[i].id}`).appendChild(create('img'));
        displayPage.childNodes[i].querySelector(`#id_${letterData[i].id}`).querySelector('img').src = letterData[i].thumbnail;
        displayPage.childNodes[i].appendChild(create('div'));
        displayPage.childNodes[i].querySelector('div').setAttribute('class', 'textBox');
        displayPage.childNodes[i].querySelector('.textBox').appendChild(create('h3'));
        displayPage.childNodes[i].querySelector('.textBox').childNodes[0].textContent = `${letterData[i].title}`.toUpperCase();
        displayPage.childNodes[i].querySelector('.textBox').appendChild(create('span'));
        displayPage.childNodes[i].querySelector('.textBox').childNodes[1].textContent = `Developer : ${letterData[i].developer}`;
        displayPage.childNodes[i].querySelector('.textBox').appendChild(create('span'));
        displayPage.childNodes[i].querySelector('.textBox').childNodes[2].textContent = `Platform : ${letterData[i].platform}`;
        displayPage.childNodes[i].querySelector('.textBox').appendChild(create('span'));
        displayPage.childNodes[i].querySelector('.textBox').childNodes[3].textContent = `Release Date : ${letterData[i].release_date}`;
        displayPage.childNodes[i].querySelector('.textBox').appendChild(create('span'));
        displayPage.childNodes[i].querySelector('.textBox').childNodes[4].textContent = `Genre : ${letterData[i].genre}`;
        displayPage.childNodes[i].appendChild(create('a'));
        displayPage.childNodes[i].childNodes[2].setAttribute('class', `linkButton`);
        displayPage.childNodes[i].childNodes[2].setAttribute('href', `${letterData[i].game_url}`);
        displayPage.childNodes[i].childNodes[2].setAttribute('target', `_blank`);
        displayPage.childNodes[i].childNodes[2].textContent = `Link to Offical Site`;
    }
}

const createAlphaBox = () => {
    alphabeticalData = {};
    spinner('inline-block');
    if (displayPage.hasChildNodes()) {
        clearChild(displayPage);
    }
    // creates alphabetical links on top of the page
    document.querySelector('.navbar').after(document.createElement('div'));
    document.querySelector('body').childNodes[7].setAttribute('class', 'alphabetBox');
    let alphabetBox = document.querySelector('.alphabetBox');
    for (let i = 0; i < alphabets.length; i++) {
        alphabetBox.appendChild(document.createElement('a'));
        alphabetBox.childNodes[i].setAttribute('class', `alphabets`);
        alphabetBox.childNodes[i].setAttribute('id', `alphabetical/${alphabets[i]}`);
        alphabetBox.childNodes[i].setAttribute('href', `#alphabetical/${alphabets[i]}`);
        alphabetBox.childNodes[i].addEventListener('click', () => {
            if (displayPage.hasChildNodes()) {
                clearChild(displayPage);
            }
            alphaDataDisplay(alphabeticalData[`${alphabets[i]}`]);
        });
        alphabetBox.childNodes[i].textContent = `${alphabets[i]}`;
        Object.assign(alphabeticalData, { [alphabets[i]]: [] });
    }
    // fetch data & distribute them into the right categories && automatically display #s
    fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=alphabetical', options)
        .then(res => {
            if (res.status === 200) {
                spinner('none');
            }
            return res.json();
        })
        .then(data => {
            data.forEach(game => {
                if (!isNaN(game.title[0])) { alphabeticalData['#'].push(game) };
                for (let i = 1; i < alphabets.length; i++) {
                    if (game.title[0].toUpperCase() === alphabets[i]) {
                        alphabeticalData[`${alphabets[i]}`].push(game);
                    }
                }
            });
            alphaDataDisplay(alphabeticalData[`#`]);
            window.location.href = 'index.html#alphabetical/#';

        });
}

// adding event listners
document.querySelector(`#shooter`).addEventListener('click', () => {
    if (document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
    }
    if (document.querySelector('.alphabetBox')) {
        removeAlphabetBox();
    }
    requestInfo(url('shooter'));
});
document.querySelector(`#survival`).addEventListener('click', () => {
    if (document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
    }
    if (document.querySelector('.alphabetBox')) {
        removeAlphabetBox();
    }
    requestInfo(url('survival'));
});
document.querySelector(`#mmorpg`).addEventListener('click', () => {
    if (document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
    }
    if (document.querySelector('.alphabetBox')) {
        removeAlphabetBox();
    }
    requestInfo(url('mmorpg'));
});
document.querySelector(`#open-world`).addEventListener('click', () => {
    if (document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
    }
    if (document.querySelector('.alphabetBox')) {
        removeAlphabetBox();
    }
    requestInfo(url('open-world'));
});
document.querySelector(`#strategy`).addEventListener('click', () => {
    if (document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
    }
    if (document.querySelector('.alphabetBox')) {
        removeAlphabetBox();
    }
    requestInfo(url('strategy'));
});
document.querySelector(`#seeAll`).addEventListener('click', () => {
    if (document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
    }
    if (document.querySelector('.alphabetBox')) {
        removeAlphabetBox();
    }
    displayCategories();
});
document.querySelector(`#alphabetical`).addEventListener('click', () => {
    if (document.querySelector('h2') && document.querySelector('h4')) {
        removeh2h4();
    }
    if (document.querySelector('.alphabetBox')) {
        removeAlphabetBox();
    }
    createAlphaBox();
});