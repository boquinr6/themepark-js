var ctx0 = document.getElementById('canvas0').getContext("2d");
var ctx1 = document.getElementById('canvas1').getContext("2d");
var ctx2 = document.getElementById('canvas2').getContext("2d");

var dir = 'static/img/assets/';
var signText = "";

var safety;

function setAllSafetyToFalse() {
    safety = {
        rideType: false,
        name: false,
        minRiderHeightInInches: false,
        numLoops: false,
        speedInMPH: false,
        color: false,
        material: false
    }
}

$(document).ready(function (){ 
    setAllSafetyToFalse();

    var backgroundCoaster = new Image();
    backgroundCoaster.onload = function() {
        ctx0.drawImage(backgroundCoaster, 0, 40, 3133/5, 1495/5);
    }
    backgroundCoaster.src = dir + "blue_coaster_no_riders.jpg";

    $("#directions1").modal();

    $("#run").click(function() {
        setAllSafetyToFalse();
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx1.clearRect(0, 0, canvas2.width, canvas2.height);

        var text = $('#text-area').val();
        console.log(text);
        eval(text);
    });
    
    $("#directions1-button").click(function() {
        $("#directions2").modal();
    });
});

function runSafetyCheck(coaster) {
    var card = new Image();
    card.onload = function() {
        ctx1.drawImage(card, 10, 30, card.width/2, card.height/2);
    }
    card.src = dir + "safety_card.png";
    if (coaster.rideType.length >= 1) {
        safety.rideType = true;
        var check = new Image();
        check.onload = function() {
            ctx2.drawImage(check, 240, 90, 30, 30);
        }
        check.src = dir + "green_check.png";
    } else {
        var x = new Image();
        x.onload = function() {
            ctx2.drawImage(x, 240-7, 90, 40, 40);
        }
        x.src = dir + "red_x.png";
    }
    if (coaster.name.length >= 1) {
        safety.name = true;
        var check = new Image();
        check.onload = function() {
            ctx2.drawImage(check, 240, 90+45, 30, 30);
        }
        check.src = dir + "green_check.png";
    } else {
        var x = new Image();
        x.onload = function() {
            ctx2.drawImage(x, 240-7, 90+45, 40, 40);
        }
        x.src = dir + "red_x.png";
    }
    if (coaster.minRiderHeightInInches >= 48) {
        safety.minRiderHeightInInches = true;
        var check = new Image();
        check.onload = function() {
            ctx2.drawImage(check, 240, 90+2*45, 30, 30);
        }
        check.src = dir + "green_check.png";    
    } else {
        var x = new Image();
        x.onload = function() {
            ctx2.drawImage(x, 240-7, 90+2*45, 40, 40);
        }
        x.src = dir + "red_x.png";
    }
    if (coaster.numLoops <= 5 && coaster.numLoops >= 0) {
        safety.numLoops = true;
        var check = new Image();
        check.onload = function() {
            ctx2.drawImage(check, 240, 90+3*45, 30, 30);
        }
        check.src = dir + "green_check.png";
    } else {
        var x = new Image();
        x.onload = function() {
            ctx2.drawImage(x, 240-7, 90+3*45, 40, 40);
        }
        x.src = dir + "red_x.png";
    }
    if (coaster.speedInMPH <= 115 && coaster.speedInMPH >= 50) {
        safety.speedInMPH = true;
        var check = new Image();
        check.onload = function() {
            ctx2.drawImage(check, 240, 90+4*45, 30, 30);
        }
        check.src = dir + "green_check.png";
    } else {
        var x = new Image();
        x.onload = function() {
            ctx2.drawImage(x, 240-7, 87+4*45, 40, 40);
        }
        x.src = dir + "red_x.png";
    }
    if (coaster.color.length >= 3) {
        safety.color = true;
        var check = new Image();
        check.onload = function() {
            ctx2.drawImage(check, 240, 90+5*45, 30, 30);
        }
        check.src = dir + "green_check.png";
    } else {
        var x = new Image();
        x.onload = function() {
            ctx2.drawImage(x, 240-7, 90+5*45, 40, 40);
        }
        x.src = dir + "red_x.png";
    }
    if (coaster.material == "wood" || coaster.material == "steel") {
        safety.material = true;
        var check = new Image();
        check.onload = function() {
            ctx2.drawImage(check, 240, 90+6*45, 30, 30);
        }
        check.src = dir + "green_check.png";
    } else {
        var x = new Image();
        x.onload = function() {
            ctx2.drawImage(x, 240-7, 90+6*45, 40, 40);
        }
        x.src = dir + "red_x.png";        
    }
}

function runHappinessCheck(coaster) {
    var score = 0;

    if (coaster.material == "steel") {
        score += 100;
    } else if (coaster.material == "wood") {
        score += 90;
    } else {
        score += 60;
    }
    var temp = 50 + coaster.numLoops * 10;
    if (temp > 100) {
        temp = 100;
    }
    score += temp;
    var temp = coaster.speedInMPH * 100.0 / 115;
    if (temp > 100) {
        temp = 100;
    }
    score += temp;
    var temp = 100 - (coaster.minRiderHeightInInches - 48);
    if (temp > 100) {
        temp = 100;
    }
    score += temp;
    
    score = Math.ceil(score/4);

    var happinessBox = new Image();
    happinessBox.onload = function() {
        ctx1.drawImage(happinessBox, 10+canvas2.width/2, canvas2.height/2-happinessBox.height/4, happinessBox.width/2, happinessBox.height/2);
    }
    happinessBox.src = dir + "happiness.png";

    ctx2.font = "50px Impact, Charcoal, sans-serif";
    ctx2.fillText(score, 410, 268);

    if (safety.rideType == true && safety.material == true && safety.minRiderHeightInInches == true && 
        safety.speedInMPH == true && safety.name == true && safety.color == true && safety.numLoops == true
        && score >= 95) {
        $("#success").modal();
    }
}