var canvas0 = document.getElementById('canvas0');
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');

var ctx0 = canvas0.getContext("2d");
var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");

var dir = 'static/img/assets/';
var signText = "";

var success = false;
var count = 0;

$(document).ready(function (){

    var sign = new Image();
    sign.onload = function() {
        ctx1.drawImage(sign, 0, 100, 938/2.5, 830/2.5);
    }
    sign.src = dir + "blank_sign.png";   

    var backgroundCoaster = new Image();
    backgroundCoaster.onload = function() {
        ctx0.drawImage(backgroundCoaster, 155, 20, 3133/7, 1495/7);
    }
    backgroundCoaster.src = dir + "blue_coaster.jpg";

    var text = $('#text-area').val();
    eval(text);

    $("#next-level").click(function() {
        window.location.href = "index2.html";
    });

    $("#run").click(function() {
        count = 0;
        success = true;
        var text = $('#text-area').val();

        console.log(text);

        var textCopy = text;
        while (true) {
            if (textCopy.indexOf("bigDipper.") != -1) {
                console.log(textCopy);
                count++;
                textCopy = textCopy.substring(textCopy.indexOf("bigDipper.")+1, textCopy.length);
                console.log(count);
            } else {
                break;
            }
        }

        eval(text);
        //console.log(count);

        if (count >= 4) {
            success = true;
            $("#success").modal();
        }
    });

    $("#directions").modal();

    console.log(("hi").indexOf("hi"));
    
});

function addLineToSign(str) {
    if (signText == "") {
        signText = str;
    } else {
        signText += "\n" + str;
    }
}

function drawSign() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.font = "30px Impact, Charcoal, sans-serif";
    var lines = signText.split('\n');
    for (var i = 0; i<lines.length; i++) {
        console.log(i);
        ctx2.fillText(lines[i], 50, 170 + (i*45) );
    }
    signText = "";
    if (count >= 4) {
        $("#success").modal();
    }
}
