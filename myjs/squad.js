for (var i=0; i<11; i++) {
    const box = document.createElement("DIV");
    box.setAttribute("id", "box_" + i);
    box.setAttribute("style", "width: 14%; height: 165px; text-align: center; position: absolute; border: 1px dashed #D3D3D3; cursor: pointer;");
    box.setAttribute("onclick", "select_position(" + i + ")");
    box.setAttribute("draggable", "true");
    box.setAttribute("ondragstart", "drag(event)");
    box.setAttribute("ondragover", "allowDrop(event)");
    box.setAttribute("ondrop", "drop(event)");

    const close = document.createElement("DIV");
    close.innerHTML = "&times;";
    close.setAttribute("style", "color: grey; position: absolute; right: 5px; top: 0px;");
    close.setAttribute("onclick", "clear_position(event, " + i + ")")

    const rating = document.createElement("INPUT");
    rating.setAttribute("type", "number");
    rating.setAttribute("id", "rating_" + i);
    rating.setAttribute("style", "position: absolute; width: 80%; left: 0px;");
    rating.setAttribute("onclick", "event.stopPropagation();");
    rating.setAttribute("onchange", "changeNumber(" + i + ")");
    rating.setAttribute("draggable", "false");

    const card_box = document.createElement("DIV");
    card_box.setAttribute("id", "card_box_" + i);
    card_box.setAttribute("style", "width: 100%; display: none;");

    const card = document.createElement("IMG");
    card.setAttribute("id", "card_" + i);
    card.setAttribute("draggable", "false");
    card.setAttribute("ondrop", "event.preventDefault()");
    card.src = "images/rarities/empty.webp";
    card.setAttribute("style", "width: 100%;");

    const card_photo = document.createElement("IMG");
    card_photo.setAttribute("id", "card_photo_" + i);
    card_photo.setAttribute("draggable", "false");
    card_photo.setAttribute("style", "position: absolute; top: 16px; left: 35px; width: 65px;");

    const card_name = document.createElement("DIV");
    card_name.setAttribute("id", "card_name_" + i);
    card_name.style = "position: absolute; top: 83px; width: 100%; text-align: center; font-size: 9pt;";

    const card_rating = document.createElement("DIV");
    card_rating.setAttribute("id", "card_rating_" + i);
    card_rating.style = "position: absolute; top: 16px; left: 0px; width: 55px; text-align: center; font-size: 10pt;";

    const card_position = document.createElement("DIV");
    card_position.setAttribute("id", "card_position_" + i);
    card_position.style = "position: absolute; top: 34px; left: 0px; width: 55px; text-align: center; font-size: 7pt;";

    const card_nation_img = document.createElement("img");
    card_nation_img.setAttribute("id", "card_nation_img_" + i);
    card_nation_img.setAttribute("draggable", "false");
    card_nation_img.style = "position: absolute; top: 53px; left: 20px; height: 10px;";

    const card_club_img = document.createElement("img");
    card_club_img.setAttribute("id", "card_club_img_" + i);
    card_club_img.setAttribute("draggable", "false");
    card_club_img.style = "position: absolute; top: 68px; left: 20px; height: 17px;";

    for (var j=0; j<6; j++) {
        const card_attr = document.createElement("DIV");
        card_attr.setAttribute("id", "card_attr" + j + "_" + i);
        top_value = 105 + (j % 3) * 10;
        left_value = 10 + Math.floor(j / 3) * 45;
        card_attr.style = "position: absolute; top: " + top_value + "px; left: " + left_value + "px; width: 55px; text-align: center; font-size: 6pt;";
        card_box.appendChild(card_attr);
    }

    box.appendChild(close);
    card_box.appendChild(card);
    card_box.appendChild(card_photo);
    card_box.appendChild(card_name);
    card_box.appendChild(card_rating);
    card_box.appendChild(card_position);
    card_box.appendChild(card_nation_img);
    card_box.appendChild(card_club_img);
    box.appendChild(rating);
    box.appendChild(card_box);
    document.getElementById("squad").appendChild(box);
}

squad_positions = {
    "3142": [[23, 0], [63, 0], [0, 180], [23, 180], [63, 180], [86, 180], [43, 200], [12, 380], [43, 380], [74, 380], [43, 560]],
    "3412": [[23, 0], [63, 0], [43, 150], [0, 320], [27, 320], [59, 320], [86, 320], [12, 500], [43, 500], [74, 500], [43, 680]],
    "3421": [[43, 0], [20, 50], [66, 50], [0, 230], [30, 230], [56, 230], [86, 230], [12, 410], [43, 410], [74, 410], [43, 590]],
    "343": [[20, 30], [43, 0], [66, 30], [0, 210], [30, 210], [56, 210], [86, 210], [12, 390], [43, 390], [74, 390], [43, 570]],
    "352": [[23, 0], [63, 0], [43, 120], [0, 260], [86, 260], [27, 290], [59, 290], [12, 470], [43, 470], [74, 470], [43, 650]],
    "41212": [[23, 0], [63, 0], [43, 120], [18, 230], [68, 230], [43, 330], [0, 510], [30, 510], [56, 510], [86, 510], [43, 690]],
    "41212(2)": [[23, 0], [63, 0], [43, 120], [20, 230], [66, 230], [43, 330], [0, 510], [30, 510], [56, 510], [86, 510], [43, 690]],
    "4132": [[23, 0], [63, 0], [15, 180], [43, 180], [71, 180], [43, 360], [0, 510], [23, 510], [63, 510], [86, 510], [43, 690]],
    "4141": [[43, 0], [0, 180], [25, 180], [61, 180], [86, 180], [43, 340], [0, 510], [25, 510], [61, 510], [86, 510], [43, 690]],
    "4222": [[30, 0], [56, 0], [2, 180], [84, 180], [30, 200], [56, 200], [0, 380], [30, 380], [56, 380], [86, 380], [43, 560]],
    "4231": [[43, 0], [23, 150], [43, 180], [63, 150], [20, 330], [66, 330], [0, 510], [30, 510], [56, 510], [86, 510], [43, 690]],
    "4231(2)": [[43, 0], [43, 180], [0, 180], [86, 180], [20, 330], [66, 330], [0, 510], [30, 510], [56, 510], [86, 510], [43, 690]],
    "424": [[0, 150], [30, 0], [56, 0], [86, 150], [30, 240], [56, 240], [0, 420], [30, 420], [56, 420], [86, 420], [43, 600]],
    "4312": [[23, 0], [63, 0], [43, 120], [18, 300], [43, 300], [68, 300], [0, 480], [30, 480], [56, 480], [86, 480], [43, 660]],
    "4321": [[43, 0], [23, 50], [63, 50], [17, 230], [43, 230], [69, 230], [0, 410], [30, 410], [56, 410], [86, 410], [43, 590]],
    "433": [[14, 0], [43, 0], [72, 0], [14, 180], [43, 180], [72, 180], [0, 360], [30, 360], [56, 360], [86, 360], [43, 540]],
    "433(2)": [[14, 0], [43, 0], [72, 0], [14, 180], [72, 180], [43, 220], [0, 400], [30, 400], [56, 400], [86, 400], [43, 580]],
    "433(3)": [[14, 0], [43, 0], [72, 0], [43, 180], [14, 220], [72, 220], [0, 400], [30, 400], [56, 400], [86, 400], [43, 580]],
    "433(4)": [[14, 0], [43, 0], [72, 0], [43, 180], [16, 220], [70, 220], [0, 400], [30, 400], [56, 400], [86, 400], [43, 580]],
    "433(5)": [[14, 0], [72, 0], [43, 40], [14, 220], [72, 220], [43, 260], [0, 440], [30, 440], [56, 440], [86, 440], [43, 620]],
    "4411": [[43, 0], [43, 180], [0, 330], [26, 330], [60, 330], [86, 330], [0, 510], [26, 510], [60, 510], [86, 510], [43, 690]],
    "4411(2)": [[43, 0], [43, 180], [0, 330], [26, 330], [60, 330], [86, 330], [0, 510], [26, 510], [60, 510], [86, 510], [43, 690]],
    "442": [[30, 0], [56, 0], [0, 180], [30, 180], [56, 180], [86, 180], [0, 360], [30, 360], [56, 360], [86, 360], [43, 540]],
    "442(2)": [[30, 0], [56, 0], [0, 180], [86, 180], [30, 230], [56, 230], [0, 410], [30, 410], [56, 410], [86, 410], [43, 590]],
    "451": [[43, 0], [23, 150], [63, 150], [0, 300], [43, 300], [86, 300], [0, 480], [30, 480], [56, 480], [86, 480], [43, 660]],
    "451(2)": [[43, 0], [0, 180], [22, 180], [43, 180], [64, 180], [86, 180], [0, 360], [30, 360], [56, 360], [86, 360], [43, 540]],
    "5212": [[22, 0], [64, 0], [43, 120], [22, 230], [64, 230], [0, 410], [22, 410], [43, 410], [64, 410], [86, 410], [43, 590]],
    "5221": [[43, 0], [23, 50], [63, 50], [23, 230], [63, 230], [0, 410], [22, 410], [43, 410], [64, 410], [86, 410], [43, 590]],
    "5122": [[22, 0], [64, 0], [15, 180], [43, 230], [71, 180], [0, 410], [22, 410], [43, 410], [64, 410], [86, 410], [43, 590]],
    "541": [[43, 0], [4, 180], [30, 180], [56, 180], [82, 180], [0, 360], [22, 360], [43, 360], [64, 360], [86, 360], [43, 540]]
};
formation("442");

function formation(formation) {
    positions = squad_positions[formation];
    for (var i=0; i<11; i++) {
        position = positions[i];
        document.getElementById("box_" + i).style.left = position[0] + "%";
        document.getElementById("box_" + i).style.top = position[1] + "px";
    }
}

function changeFormation(event) {
    formation(event.target.value);
}

var selected_position = -1;

function select_position(index) {
    if (index == selected_position) {
        for (var i=0; i<11; i++) {
            document.getElementById("box_" + i).style.border = "1px dashed #D3D3D3";
        }
        selected_position = -1;
        document.getElementById("player").style.visibility = "hidden";
    }
    else {
        for (var i=0; i<11; i++) {
            if (i == index) document.getElementById("box_" + i).style.border = "1px dashed blue";
            else document.getElementById("box_" + i).style.border = "1px dashed #D3D3D3";
        }
        selected_position = index;
        document.getElementById("player").style.visibility = "visible";
        document.getElementById("player_search_input").value = "";
        document.getElementById("player_search_input").focus();
        document.getElementById("player_search_results").innerHTML = "";
        document.getElementById("pages").innerHTML = "";
    }
}

function clear_position(event, p) {
    document.getElementById("rating_" + p).style.display = "block";
    document.getElementById("rating_" + p).value = "";
    document.getElementById("card_box_" + p).style.display = "none";
    event.stopPropagation();
    display();
}

function clear_all_positions() {
    for (var p=0; p<11; p++) {
        document.getElementById("rating_" + p).style.display = "block";
        document.getElementById("rating_" + p).value = "";
        document.getElementById("card_box_" + p).style.display = "none";
    }

    display();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("text").split("_");
    var source = id[id.length - 1];
    id = ev.target.id.split("_");
    var target = id[id.length - 1];
    console.log(source, target);

    [document.getElementById("rating_" + source).value, document.getElementById("rating_" + target).value] = [document.getElementById("rating_" + target).value, document.getElementById("rating_" + source).value];
    [document.getElementById("rating_" + source).style.display, document.getElementById("rating_" + target).style.display] = [document.getElementById("rating_" + target).style.display, document.getElementById("rating_" + source).style.display];
    [document.getElementById("card_box_" + source).style.color, document.getElementById("card_box_" + target).style.color] = [document.getElementById("card_box_" + target).style.color, document.getElementById("card_box_" + source).style.color];
    [document.getElementById("card_box_" + source).style.display, document.getElementById("card_box_" + target).style.display] = [document.getElementById("card_box_" + target).style.display, document.getElementById("card_box_" + source).style.display];
    [document.getElementById("card_" + source).src, document.getElementById("card_" + target).src] = [document.getElementById("card_" + target).src, document.getElementById("card_" + source).src];
    [document.getElementById("card_photo_" + source).src, document.getElementById("card_photo_" + target).src] = [document.getElementById("card_photo_" + target).src, document.getElementById("card_photo_" + source).src];
    [document.getElementById("card_name_" + source).innerHTML, document.getElementById("card_name_" + target).innerHTML] = [document.getElementById("card_name_" + target).innerHTML, document.getElementById("card_name_" + source).innerHTML];
    [document.getElementById("card_rating_" + source).innerHTML, document.getElementById("card_rating_" + target).innerHTML] = [document.getElementById("card_rating_" + target).innerHTML, document.getElementById("card_rating_" + source).innerHTML];
    [document.getElementById("card_position_" + source).innerHTML, document.getElementById("card_position_" + target).innerHTML] = [document.getElementById("card_position_" + target).innerHTML, document.getElementById("card_position_" + source).innerHTML];
    [document.getElementById("card_nation_img_" + source).src, document.getElementById("card_nation_img_" + target).src] = [document.getElementById("card_nation_img_" + target).src, document.getElementById("card_nation_img_" + source).src];
    [document.getElementById("card_club_img_" + source).src, document.getElementById("card_club_img_" + target).src] = [document.getElementById("card_club_img_" + target).src, document.getElementById("card_club_img_" + source).src];
    for (var j=0; j<6; j++) {
        [document.getElementById("card_attr" + j + "_" + source).innerHTML, document.getElementById("card_attr" + j + "_" + target).innerHTML] = [document.getElementById("card_attr" + j + "_" + target).innerHTML, document.getElementById("card_attr" + j + "_" + source).innerHTML];
    }
    display();
}