// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var ratings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var naive_sum = 0;
var correction_sum = 0;
display();

function changeNumber(i) {
    ratings[i] = parseInt(document.getElementById("rating_" + i).value);
    display();
}

function display() {
    for (var i=0; i<11; i++) {
        ratings[i] = (document.getElementById("rating_" + i).value==""? 0:parseInt(document.getElementById("rating_" + i).value));
    }
    display_naive_sum();
    display_naive_mean();
    display_correction();
    display_final();
}

function display_naive_sum() {
    var text = "";
    naive_sum = 0;
    for (var i = 0; i < 11; i++) {
        text += ratings[i];
        naive_sum += ratings[i];
        if (i != 10) text += " + ";
    }

    text += " = " + ratings.reduce(function (a, b) { return a + b; }, 0);

    document.getElementById("naive-sum").innerHTML = text;
}

function display_naive_mean() {
    var text = naive_sum + ' &divide 11 = ';

    if (naive_sum % 11 == 0) {
        text += Math.floor(naive_sum / 11);
    }
    else {
        text += Math.floor(naive_sum / 11) + "<sup>" + naive_sum % 11 + "</sup>&#8260;<sub>11</sub>";
    }

    document.getElementById("naive-mean").innerHTML = text;
}

function display_correction() {
    correction_sum = 0;
    var text = "";

    for (rating of ratings) {
        if (rating * 11 <= naive_sum) continue;

        correction = rating * 11 - naive_sum;
        correction_sum += correction;
        if (correction % 11 == 0) {
            if (text.length != 0) text += " + ";
            text += Math.floor(correction / 11);
        }
        else {
            if (text.length != 0) text += " + ";
            text += Math.floor(correction / 11) + "<sup>" + correction % 11 + "</sup>&#8260;<sub>11</sub>";
        }
    }

    text += " = " + Math.floor(correction_sum / 11) + (correction_sum % 11 == 0 ? "" : "<sup>" + correction_sum % 11 + "</sup>&#8260;<sub>11</sub>");
    if (correction_sum % 11 != 0) {
        text += " -> " + Math.round(correction_sum / 11);
    }
    correction_sum = Math.round(correction_sum / 11)

    document.getElementById("correction").innerHTML = text;
}

function display_final() {
    total_sum = naive_sum + correction_sum;
    var text = "(" + naive_sum + " + " + correction_sum + ") &divide 11 = " + Math.floor(total_sum / 11) + (total_sum % 11 == 0 ? "" : "<sup>" + total_sum % 11 + "</sup>&#8260;<sub>11</sub>");
    if (total_sum % 11 != 0) {
        text += " -> " + Math.floor(total_sum / 11);
    }

    document.getElementById("final").innerHTML = text;
}