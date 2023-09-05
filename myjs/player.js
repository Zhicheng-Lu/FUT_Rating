var players;
var results = [];
get_players();

async function get_players() {
    const response = await fetch('database/FIFA23_players.json');
    players = await response.json();
}

function search_player(event) {
    var text = event.target.value;
    if (text.length >= 3) {
        words = text.split(" ");
        results = [];

        for (player of players) {
            var flag = true;
            for (word of words) {
                if (!player["name"].normalize("NFD").replace(/\p{Diacritic}/gu, '').toLowerCase().includes(word.toLowerCase())) {
                    flag = false;
                }
            }

            if (flag) {
                results.push(player);
            }
        }

        display_player_search_results(1);
    }
    else {
        document.getElementById("player_search_results").innerHTML = "";
        document.getElementById("pages").innerHTML = "";
    }
}

function display_player_search_results(page) {
    var player_search_results = document.getElementById("player_search_results");
    player_search_results.innerHTML = "";
    page_start = 10 * (page - 1);
    page_end = 10 * (page - 1) + 10;
    for (var i=page_start; i<page_end; i++) {
        if (i >= results.length) break;

        player = results[i];

        var newRow = document.createElement("tr");
        newRow.setAttribute("style", "cursor: pointer;");
        newRow.setAttribute("onclick", "select_player(" + i + ")");

        var cell_player_name = document.createElement("td");
        cell_player_name.innerText = player["name"];
        newRow.appendChild(cell_player_name);

        var cell_rarity = document.createElement("td");
        cell_rarity.style.textAlign = "center";
        var rarity_img = document.createElement("img");
        var rarity = player["rarity"];
        if (rarity == 0 || rarity == 1 || rarity == 3 || rarity == 18) {
            if (player["rating"] < 65) type = "_bronze";
            else if (player["rating"] < 75) type = "_silver";
            else type = "_gold";
            rarity_img.src = "images/rarities/" + player["rarity"] + type +  ".webp";

        }
        else {
            rarity_img.src = "images/rarities/" + player["rarity"] + ".webp";
        }
        rarity_img.style.height = "25px";
        cell_rarity.appendChild(rarity_img);
        newRow.appendChild(cell_rarity);

        var cell_club = document.createElement("td");
        cell_club.style.textAlign = "center";
        var club_img = document.createElement("img");
        club_img.src = "images/clubs/" + player["club"] + ".png";
        club_img.style.height = "20px";
        cell_club.appendChild(club_img);
        newRow.appendChild(cell_club);

        var cell_rating = document.createElement("td");
        cell_rating.style.textAlign = "center";
        cell_rating.innerText = player["rating"];
        newRow.appendChild(cell_rating);

        var cell_position = document.createElement("td");
        cell_position.style.textAlign = "center";
        cell_position.innerText = player["position"];
        newRow.appendChild(cell_position);

        player_search_results.appendChild(newRow);
    }

    display_player_search_results_pages(page);
}

function display_player_search_results_pages(page) {
    var pages = document.getElementById("pages");
    pages.innerHTML = "";
    if (results.length <= 10) return;
    
    total_pages = Math.ceil(results.length / 10);
    if (page > total_pages) page = total_pages;
    if (page < 1) page = 1;

    if (page >= 4) {
        var obj_page = document.createElement("div");
        obj_page.style = "width: 30px; text-align: center; display: inline-block; cursor: pointer;";
        obj_page.innerHTML = 1;
        obj_page.setAttribute("onclick", "display_player_search_results(" + 1 + ")");
        pages.appendChild(obj_page);
        var obj_page = document.createElement("div");
        obj_page.style = "width: 30px; text-align: center; display: inline-block;";
        obj_page.innerHTML = "...";
        pages.appendChild(obj_page);
    }
    for (var i=page-2; i<=page+2; i++) {
        if (i < 1 || i > total_pages) continue;
        
        var obj_page = document.createElement("div");
        obj_page.style = "width: 30px; text-align: center; display: inline-block; cursor: pointer;";
        obj_page.innerHTML = i;

        if (i == page) {
            obj_page.style.backgroundColor = "#87CEFA";
            obj_page.style.color = "white";
        }
        else {
            obj_page.setAttribute("onclick", "display_player_search_results(" + i + ")");
        }

        pages.appendChild(obj_page);
    }
    if (page <= total_pages - 3) {
        var obj_page = document.createElement("div");
        obj_page.style = "width: 30px; text-align: center; display: inline-block;";
        obj_page.innerHTML = "...";
        pages.appendChild(obj_page);
        var obj_page = document.createElement("div");
        obj_page.style = "width: 30px; text-align: center; display: inline-block; cursor: pointer;";
        obj_page.innerHTML = total_pages;
        obj_page.setAttribute("onclick", "display_player_search_results(" + total_pages + ")");
        pages.appendChild(obj_page);
    }
}

function select_player(i) {
    player = results[i];
    var p = selected_position;

    document.getElementById("rating_" + p).style.display = "none";
    document.getElementById("rating_" + p).value = player["rating"];
    document.getElementById("card_box_" + p).style.display = "block";

    var rarity = player["rarity"];
    if (rarity == 0 || rarity == 1 || rarity == 3 || rarity == 18) {
        if (player["rating"] < 65) type = "bronze";
        else if (player["rating"] < 75) type = "silver";
        else type = "gold";
        document.getElementById("card_" + p).src = "images/rarities/" + player["rarity"] + "_" + type +  ".webp";
        color = colors[rarity][type];
    }
    else {
        document.getElementById("card_" + p).src = "images/rarities/" + player["rarity"] + ".webp";
        color = colors[rarity];
    }

    document.getElementById("card_box_" + p).style.color = color;

    document.getElementById("card_photo_" + p).src = "images/rarities/empty.webp";
    fetch_photo(i);

    document.getElementById("card_name_" + p).innerHTML = "<b>" + player["commonName"] + "</b>";
    document.getElementById("card_rating_" + p).innerHTML = "<b>" + player["rating"] + "</b>";
    document.getElementById("card_position_" + p).innerHTML = player["position"];
    document.getElementById("card_nation_img_" + p).src = "images/nations/" + player["nation"] + ".png";
    if (player["club"] == 114605) document.getElementById("card_club_img_" + p).src = "images/leagues/" + player["league"] + ".png";
    else document.getElementById("card_club_img_" + p).src = "images/clubs/" + player["club"] + ".png";

    var attributes = [];
    if (player["position"] != "GK") {
        attributes = [["pace", "PAC"], ["shooting", "SHO"], ["passing", "PAS"], ["dribbling", "DRI"], ["defending", "DEF"], ["physicality", "PHY"]];
    }
    else {
        attributes = [["diving", "DIV"], ["handling", "HAN"], ["kicking", "KIC"], ["reflexes", "REF"], ["speed", "SPE"], ["positioning", "POS"]];
    }

    for (var i=0; i<6; i++) {
        document.getElementById("card_attr" + i + "_" + p).innerHTML = '<div style="display: inline-block; width: 10px; text-align: center;"><b>' + player[attributes[i][0]] + '</b></div><div style="width: 25px; text-align: center; display: inline-block;"><b>' + attributes[i][1] + '</b></div>';
    }

    display();
}

async function fetch_photo(i) {
    player = results[i];
    var p = selected_position;

    const api_url1 = "https://futdb.app/api/players/" + player["id"] + "/image";
    const response1 = await fetch(api_url1, {
        headers: {
            'accept': 'application/json',
            'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
        }
    });

    //Parsing it to JSON format
    const blob = await response1.blob();
    const url = window.URL.createObjectURL(blob);

    document.getElementById("card_photo_" + p).src = url;
}


var colors = {
                0: {"bronze": "black", "silver": "black", "gold": "black"},
                1: {"bronze": "black", "silver": "black", "gold": "black"},
                3: {"bronze": "black", "silver": "white", "gold": "#FCE398"},
                3: {"bronze": "#FCE398", "silver": "white", "gold": "#FCE398"},
                5: "#FCE398", // gold
                8: "white",
                11: "#FCE398",
                12: "black",
                16: "#FCE398",
                21: "#C4F750", // light green
                22: "#95FBFF", // light blue
                25: "#00FFF6", // darker blue
                28: "#C4F750",
                30: "white",
                42: "white",
                43: "white",
                45: "white",
                46: "white",
                47: "white",
                50: "white",
                51: "white",
                52: "white",
                53: "white",
                57: "white",
                58: "white",
                64: "#FCE398",
                65: "#FCE398",
                71: "#FCFF00", // yellow
                72: "white",
                76: "white",
                79: "#C4F750",
                85: "white",
                86: "white",
                87: "#ADBEB7", // gray
                88: "#574B15", // brown
                90: "#FCFF00",
                91: "#FCFF00",
                97: "white",
                105: "white",
                115: "white",
                118: "#FCE398",
                120: "#FCE398",
                124: "white",
                125: "white",
                126: "white",
                128: "white",
                129: "#574B15",
                130: "white",
                131: "white",
                132: "white",
                133: "#FCE398",
                134: "#FDC8FF", // pink
                135: "#FCFF00",
                138: "white",
                139: "#00CFB7", // even darker blue
                145: "#574B15",
                146: "white",
                148: "white",
                150: "white",
                151: "white",
                152: "#574B15",
                153: "#574B15",
                154: "#FCE398",
                155: "#574B15",
                156: "black",
                159: "#FCE398",
                160: "white",
                161: "white",
                163: "white",
                164: "#FCE398",
                165: "white",
                166: "white",
                167: "white",
                170: "#574B15",
                171: "#644198" // purple
                };