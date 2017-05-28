var canvas0 = document.getElementById('canvas0');
var canvas1 = document.getElementById('canvas1');
var canvas2 = document.getElementById('canvas2');

var ctx0 = canvas0.getContext("2d");
var ctx1 = canvas1.getContext("2d");
var ctx2 = canvas2.getContext("2d");

var dir = 'static/img/assets/';
var signText = "";
var isSafeRollerCoasterFunction = "";
var count = 0;
var coaster2Drawn = false;
var coaster1Drawn = false;
var success = false;

$(document).ready(function (){ 

    $("#run").click(function() {
        coaster1Drawn = false;
        coaster2Drawn = false;
        success = false;
        ctx0.clearRect(0, 0, canvas0.width, canvas0.height);
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        count = 0;
        var text = $('#text-area').val();
        eval(text);
    });

    $("#directions").modal();

    $("#next-level").click(function() {
        window.location.href = "index3.html";
    });

});

function runSafetyCheck(coaster) {
    var offset = 0;
    if (!coaster1Drawn) {
        drawCoaster1();
        coaster1Drawn = true;
    }
    if (count == 1) {
        offset = 300;
        if (!coaster2Drawn) {
            drawCoaster2();
            coaster2Drawn = true;
        }
    }

    if (isSafeRollerCoaster(coaster)) {
        safetyLabelCheck(offset);
    } else {
        safetyLabelX(offset);
    }

    if (count == 1 && isSafeRollerCoaster(coaster)) {
        success = true;
        $("#success").modal();
    } else {
        if (count == 0) {
            count++;
        } else {
            count = 0;
        }
    }
}

function drawCoaster2() {
    rightLabel();
    var backgroundCoaster = new Image();
    backgroundCoaster.onload = function() {
        ctx0.drawImage(backgroundCoaster, canvas0.width/2+10, 140, canvas0.width/2.1, canvas0.height/2.9);
    }
    backgroundCoaster.src = dir + "blue_coaster_no_riders.jpg";
}

function drawCoaster1() {
    leftLabel();
    var backgroundCoaster = new Image();
    backgroundCoaster.onload = function() {
        ctx0.drawImage(backgroundCoaster, 5, 140, canvas0.width/2.1, canvas0.height/2.9);
    }
    backgroundCoaster.src = dir + "blue_coaster_no_riders.jpg";
}

function fullRide() {
    var train = new Image();
    var x = 240;
    train.onload = function() {
        ctx0.drawImage(train, -10, x, train.width*.2, train.height*.2);
    }
    for (var i=0; i<100; i++) {
        x-=2;
        ctx0.drawImage(train, -10, x, train.width*.2, train.height*.2);
    }
    train.src = dir + "train.png";
}

/* @param rollerCoaster is an object with the following properties: rideType,
        name, minRiderHeightInInches, numLoops, speedInMPH, color, and material
   @return true if the coaster is safe, otherwise return false */
function isSafeRollerCoaster(rollerCoaster) {
    if (rollerCoaster.minRiderHeightInInches < 52) {
        return false;
    } else if (rollerCoaster.numLoops > 3) {
        return false;
    } else {
        if (rollerCoaster.material == "wood" && rollerCoaster.speedInMPH > 100) {
            return false;
        } else if (rollerCoaster.material == "steel" && rollerCoaster.speedInMPH > 125) {
            return false;
        }
    }
    return true;
}

function leftLabel() {
    ctx2.font = "40px Impact, Charcoal, sans-serif";
    ctx2.fillText("Big Dipper", 50, 105);
}

function rightLabel() {
    ctx2.font = "40px Impact, Charcoal, sans-serif";
    ctx2.fillText("Big Dipper 2", 350, 105);
}

function safetyLabelCheck(offset) {
    ctx2.font = "30px Tahoma, Geneva, sans-serif";
    ctx2.fillText("Safety", 50+offset, 370);
    var check = new Image();
    check.onload = function() {
        ctx2.drawImage(check, 140+offset, 340, 40, 40);
    }
    check.src = dir + "green_check_box.png";
}

function safetyLabelX(offset) {
    ctx2.font = "30px Tahoma, Geneva, sans-serif";
    ctx2.fillText("Safety", 50+offset, 370);
    var x = new Image();
    x.onload = function() {
        ctx2.drawImage(x, 140+offset, 340, 40, 40);
    }
    x.src = dir + "red_x_box.png";
}