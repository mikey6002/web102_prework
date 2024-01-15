/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Log the total number of games before the loop
    const numberOfGames = games.length;
    console.log(`Total number of games: ${numberOfGames}`);

    // Loop over each item in the data
    for (let i = 0; i < numberOfGames; i++) {
        const game = games[i];

        // Create a new div element, which will become the game card
        const gameCard = document.createElement('div');

        // Add the class game-card to the list
        gameCard.classList.add('game-card');

        // Set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <h2> Title: ${game.name}</h2>
            <p>Genre: ${game.genre}</p>
            <img src="${game.img}" class="game-img"/
            <p> ${game.description}</p>
            <p>Backers: ${game.backers}</p>
            <p>Pledged: ${game.pledged.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        `;


        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}


// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");


// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);

const totalAmountRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `Total Contributions: ${totalContributions}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `Total Raised: $${totalAmountRaised.toLocaleString('en-US')}`;
// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `Total Games: ${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    const numberOfUnfundedGames = unfundedGames.length;
    console.log(`Total number of unfunded games: ${numberOfUnfundedGames}`);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}
filterUnfundedOnly();


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    const numberOffundedGames = fundedGames.length;
    console.log(`Total number of funded games: ${numberOffundedGames}`);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}
filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfundedGames = GAMES_JSON.filter((game) => {return game.goal > game.pledged;}).length;


// use filter or reduce to count the number of games
const numOfGames = GAMES_JSON.filter((game) => {return game.name;}).length;



// create a string that explains the number of unfunded games using the ternary operator
const dispalyInfo = `A total of $${totalAmountRaised} has been raised for ${numOfGames} games. Currently, ${numOfUnfundedGames} ${numOfUnfundedGames <= 1 ? "game" : "games"} remains unfunded. We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
const newParagraph = document.createElement('p');

newParagraph.innerHTML = dispalyInfo;

descriptionContainer.appendChild(newParagraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, secondGame] = sortedGames;
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGameName = document.createElement('p');
topGameName.textContent = topGame.name;
firstGameContainer.appendChild(topGameName);

// do the same for the runner up item
const secondGameName = document.createElement('p');
secondGameName.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameName);

//added searchbar functionality
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {
        // If the search term is empty, show all games
        deleteChildElements(gamesContainer);
        addGamesToPage(GAMES_JSON);
    } else {
        // If there is a game display the matching games
        const filteredGames = GAMES_JSON.filter(game => game.name.toLowerCase().includes(searchTerm));
        deleteChildElements(gamesContainer);
        addGamesToPage(filteredGames);
    }
});
