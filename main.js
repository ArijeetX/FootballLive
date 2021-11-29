var elapsedTime = document.querySelector('#elapsed');
var homeTeamLogo = document.querySelector('#homoLogo');
var homeTeamName = document.querySelector('#homeName');
var awayTeamLogo = document.querySelector('#awayLogo');
var awayTeamName = document.querySelector('#awayName');
var lastMatchGoals = document.querySelector('#goals');
var matchTable = document.querySelector('#matchTable');

// var mactchTable = document.querySelector('#matchTable');


function addMatchTile(data){
    var matchTile = document.createElement('div');
    matchTile.classList.add("match-tile");

    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");

    var homeTileLogo = document.createElement('img');
    var homeTileName = document.createElement('p');

    homeTileLogo.src = data['teams']['home']['logo'];
    homeTileName.innerHTML = data['teams']['home']['name'];

    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");

    var awayTileLogo = document.createElement('img');
    var awayTileName = document.createElement('p');

    awayTileLogo.src = data['teams']['away']['logo'];
    awayTileName.innerHTML = data['teams']['away']['name'];


    homeTeam.appendChild(homeTileLogo);
    homeTeam.appendChild(homeTileName);

    awayTeam.appendChild(awayTileLogo);
    awayTeam.appendChild(awayTileName);

    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " : "+ data['goals']['away'];


    matchTile.appendChild(homeTeam);
    matchTile.appendChild(score);
    matchTile.appendChild(awayTeam);

    matchTable.appendChild(matchTile);

}


function getData(){
    fetch("https://v3.football.api-sports.io/fixtures?live=all", {
        "method" : "GET",
        "headers" : {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": "8b15fa66a6465d6a0a93e383433ec68a"
        }
    });

    .then(response => response.json().then(data=>{
        console.log(response);
        var matchesList = data['response'];

        var fixture = matchesList[0]['fixture'];
        var goals = matchesList[0]['goals'];
        var teams = matchesList[0]['teams'];
        console.log(matchesList.length);
        

        elapsedTime.innerHTML = fixture['status']['elapsed']+"'";
        homeTeamLogo.src = teams['home']['logo'];
        homeTeamLogo.innerHTML = teams['home']['name'];
        awayTeamLogo.src = teams['away']['logo'];
        homeTeamLogo.innerHTML = teams['away']['name'];
        lastMatchGoals.innerHTML = goals['home'] + " : " + goals['away'];

        for(var i = 1;i<matchesList.length;i++){
            addMatchTile(matchesList[i]);
        }
    }))
    .catch(err =>{
        console.log(err);
    });
}

getData();