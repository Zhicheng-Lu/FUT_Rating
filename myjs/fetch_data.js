async function find_all_players() {
    var all_players = [];
    var page = 1;
    while (true) {
        const api_url = "https://futdb.app/api/players?page=" + page;
        const response = await fetch(api_url, {
            headers: {
                'accept': 'application/json',
                'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
            }
        });

        //Parsing it to JSON format
        const data = await response.json();
        if (data["items"].length == 0) break;

        for (player of data["items"]) {
            if (player["position"] != "GK") {
                all_players.push({
                    "id": player["id"], "name": player["name"], "commonName": player["commonName"], "league": player["league"], "nation": player["nation"], "club": player["club"], "rarity": player["rarity"],
                    "position": player["position"], "rating": player["rating"], "pace": player["pace"], "shooting": player["shooting"], "passing": player["passing"], "dribbling": player["dribbling"],
                    "defending": player["defending"], "physicality": player["physicality"]
                });
            }
            else {
                all_players.push({
                    "id": player["id"], "name": player["name"], "commonName": player["commonName"], "league": player["league"], "nation": player["nation"], "club": player["club"], "rarity": player["rarity"],
                    "position": player["position"], "rating": player["rating"], "diving": player["goalkeeperAttributes"]["diving"], "handling": player["goalkeeperAttributes"]["handling"], "kicking": player["goalkeeperAttributes"]["kicking"], "positioning": player["goalkeeperAttributes"]["positioning"],
                    "reflexes": player["goalkeeperAttributes"]["reflexes"], "speed": player["goalkeeperAttributes"]["speed"]
                });
            }
        }

        page += 1;
        console.log(page);
    }

    console.log(all_players);
}

async function find_all_nations() {
    var page = 1;
    while (true) {
        const api_url = "https://futdb.app/api/nations?page=" + page;
        const response = await fetch(api_url, {
            headers: {
                'accept': 'application/json',
                'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
            }
        });

        //Parsing it to JSON format
        const data = await response.json();
        if (data["items"].length == 0) break;

        for (nation of data["items"]) {
            const api_url1 = "https://futdb.app/api/nations/" + nation["id"] + "/image";
            const response1 = await fetch(api_url1, {
                headers: {
                    'accept': 'application/json',
                    'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
                }
            });

            //Parsing it to JSON format
            const blob = await response1.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = nation["id"] + ".png";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }

        page += 1;
    }
}

async function find_all_leagues() {
    var page = 1;
    while (true) {
        const api_url = "https://futdb.app/api/leagues?page=" + page;
        const response = await fetch(api_url, {
            headers: {
                'accept': 'application/json',
                'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
            }
        });

        //Parsing it to JSON format
        const data = await response.json();
        if (data["items"].length == 0) break;

        for (league of data["items"]) {
            const api_url1 = "https://futdb.app/api/leagues/" + league["id"] + "/image";
            const response1 = await fetch(api_url1, {
                headers: {
                    'accept': 'application/json',
                    'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
                }
            });

            //Parsing it to JSON format
            const blob = await response1.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = league["id"] + ".png";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }

        page += 1;
    }
}

async function find_all_clubs() {
    var page = 1;
    while (true) {
        const api_url = "https://futdb.app/api/clubs?page=" + page;
        const response = await fetch(api_url, {
            headers: {
                'accept': 'application/json',
                'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
            }
        });

        //Parsing it to JSON format
        const data = await response.json();
        if (data["items"].length == 0) break;

        for (club of data["items"]) {
            const api_url1 = "https://futdb.app/api/clubs/" + club["id"] + "/image";
            const response1 = await fetch(api_url1, {
                headers: {
                    'accept': 'application/json',
                    'X-AUTH-TOKEN': 'a44a553f-5616-4a23-9231-9adc99f5f960'
                }
            });

            //Parsing it to JSON format
            const blob = await response1.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            // the filename you want
            a.download = club["id"] + ".png";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        }

        page += 1;
    }
}