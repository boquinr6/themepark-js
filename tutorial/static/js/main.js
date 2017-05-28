var GAME_WIDTH = 600;
var GAME_HEIGHT = 450;

// getting up
var wrinkledShirt;

// eating breakfast
var toast;
var eggs;
var bacon;
var waffles;

var numToast = 0;
var numEggs = 0;
var numBacon = 0;
var numWaffles = 0;

// counting breakfast
var breakfastTotalText;

// drinking orange juice
var orangeJuice = 1;
var orangeJuiceGroup;

// Create a Phaser game instance
var game = new Phaser.Game(
    GAME_WIDTH,
    GAME_HEIGHT,
    Phaser.AUTO,
    'stage',
    { preload: preload, create: create}
);

// Preload assets
function preload() {
    var dir = 'static/img/assets/';

    // backgrounds
    game.load.image('wakingup', dir + 'wakingup.png');
    game.load.image('gettingready', dir + 'gettingready.png');
    game.load.image('table', dir + 'table.png');
    game.load.image('leaving', dir + 'leaving.png');

    // getting up
    game.load.image('wrinkledShirt', dir + 'wrinkledshirt.png');

    // eating breakfast
    game.load.image('toast', dir + 'toast.png');
    game.load.image('egg', dir + 'egg.png');
    game.load.image('bacon', dir + 'bacon.png');
    game.load.image('waffle', dir + 'waffle.png');

    // drinking orange juice
    game.load.image('orangeJuice', dir + 'orangejuice.png');
}

// Assets are available in create
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // backgrounds
    wakingUpBackground = game.add.sprite(0, 0, 'wakingup');

    gettingReadyBackground = game.add.sprite(0, 0, 'gettingready');
    gettingReadyBackground.visible = false;

    tableBackground = game.add.sprite(0, 0, 'table');
    tableBackground.visible = false;

    leavingBackground = game.add.sprite(0, 0, 'leaving');
    leavingBackground.visible = false;

    // getting ready
    wrinkledShirt = game.add.sprite(game.world.centerX-105, game.world.centerY-150, 'wrinkledShirt')
    wrinkledShirt.visible = false;

    // breakfast
    toast = game.add.group();
    eggs = game.add.group();
    bacon = game.add.group();
    waffles = game.add.group();

    // adding up breakfast
    breakfastTotalText = game.add.group();

    // drinking orange juice
    orangeJuiceGroup = game.add.group();
}

function hideIntroShowShirt() {
    // hide intro
    wakingUpBackground.visible = false;

    // show clothes
    gettingReadyBackground.visible = true;
    wrinkledShirt.visible = true;
}

function changeShirtColor() {
    $('#nextPage1Button').show()

    var shirtColorInput = $('#shirtColorInput')[0].value;

    var lastRedIndex = shirtColorInput.lastIndexOf("\"red\"");
    var lastBlueIndex = shirtColorInput.lastIndexOf("\"blue\"");
    var lastGreenIndex = shirtColorInput.lastIndexOf("\"green\"");
    var lastYellowIndex = shirtColorInput.lastIndexOf("\"yellow\"");

    var shirtColor;

    lastColorIndex = Math.max(lastRedIndex, lastBlueIndex, lastGreenIndex, lastYellowIndex);
    
    if (lastColorIndex == lastRedIndex) {
        shirtColor = "red";
    } else if (lastColorIndex == lastBlueIndex) {
        shirtColor = "blue";
    } else if (lastColorIndex == lastGreenIndex) {
        shirtColor = "green";
    } else {
        shirtColor = "yellow";
    }

    // need error handling for common errors:
    //   forgetting quotes
    //   bad variable name
    //   invalid color

    var error = "";
    if (shirtColorInput.indexOf("var ") != 0) {
        error += "Remember to declare your variable with the var keyword.\n";
    }
    if (shirtColorInput.indexOf("shirtColor") == -1) {
        error += "Did you include the name of the variable? Did you spell it right?\n";
    }
    if (shirtColorInput.indexOf("\"") == -1) {
        error += "Did you remember to put the color of the shirt in quotes?\n";
    }
    if (lastColorIndex == -1) {
        shirtColor = "white";
        error += "Is the color of your shirt one of the ones listed?\n";
    }

    if (shirtColorInput.indexOf("\/\/") == 0) {
        error = "";
    }

    if (error.length == 0) {
        recolorShirt(shirtColor);
    } else {
        console.error(error);
    }
}

function recolorShirt(color) {
    if (color == "red") {
        wrinkledShirt.tint = 0xff0000;
    } else if (color == "blue") {
        wrinkledShirt.tint = 0x0000ff;
    } else if (color == "green") {
        wrinkledShirt.tint = 0x00ff00;
    } else if (color == "yellow") {
        wrinkledShirt.tint = 0xffff00;
    } else if (color == "yellow") {
        wrinkledShirt.tint = 0x000000;
    }
}

function hideShirtShowBreakfast() {
    // hide clothes
    gettingReadyBackground.visible = false;
    wrinkledShirt.visible = false;

    // show breakfast stuff
    tableBackground.visible = true;
}

function addBreakfastItems() {
    var breakfastItemsInput = $('#breakfastItemsInput')[0].value;

    var breakfastItemsArray = breakfastItemsInput.split("\n");
    
    for (var i = 0; i < breakfastItemsArray.length; i++) {
        addBreakfastItem(breakfastItemsArray[i]);
    }

    $('#nextPage2Button').show()
}

function addBreakfastItem(breakfastItemLine) {
    toast.callAll('kill');
    eggs.callAll('kill');
    bacon.callAll('kill');
    waffles.callAll('kill');

    var error = "";
    if (breakfastItemLine.indexOf("var ") != 0) {
        error += "Remember to declare your variable with the var keyword.\n";
        resetBreakfastItems();
    }

    if (breakfastItemLine.indexOf("-") != -1) {
        error += "You can't eat negative items.\n";
        resetBreakfastItems();
    }

    if (breakfastItemLine.indexOf("\"") != -1) {
        error += "You don't need to put quotes around numbers.\n";
        resetBreakfastItems();
    }

    var toastIndex = breakfastItemLine.indexOf("toast");
    var eggsIndex = breakfastItemLine.indexOf("eggs");
    var baconIndex = breakfastItemLine.indexOf("bacon");
    var wafflesIndex = breakfastItemLine.indexOf("waffles");

    var digits = /\d+/;

    if (toastIndex != -1) {
        numToast = breakfastItemLine.match(digits)[0];
    }
    if (eggsIndex != -1) {
        numEggs = breakfastItemLine.match(digits)[0];
    }
    if (baconIndex != -1) {
        numBacon = breakfastItemLine.match(digits)[0];
    }
    if (wafflesIndex != -1) {
        numWaffles = breakfastItemLine.match(digits)[0];
    }

    if (numToast > 5 || numEggs > 5 || numBacon > 5 || numWaffles > 5) {
        error += "You can only eat up to 5 of each food.\n";
        resetBreakfastItems();
    }

    if (toastIndex + eggsIndex + baconIndex + wafflesIndex == -4) {
        error += "Did you include the names of the variables? Did you spell them right?\n";
        resetBreakfastItems();
    }

    if (breakfastItemLine.indexOf("\/\/") == 0) {
        error = "";
    }

    if (error.length == 0) {
        toast.createMultiple(numToast, 'toast');
        for (var i = 0; i < numToast; i++) {
            var toastSprite = toast.getFirstExists(false);
            toastSprite.reset(100*i, 0);
        }

        eggs.createMultiple(numEggs, 'egg');
        for (var i = 0; i < numEggs; i++) {
            var eggSprite = eggs.getFirstExists(false);
            eggSprite.reset(100*i, 100);
        }

        bacon.createMultiple(numBacon, 'bacon');
        for (var i = 0; i < numBacon; i++) {
            var baconSprite = bacon.getFirstExists(false);
            baconSprite.reset(100*i, 200);
        }

        waffles.createMultiple(numWaffles, 'waffle');
        for (var i = 0; i < numWaffles; i++) {
            var waffleSprite = waffles.getFirstExists(false);
            waffleSprite.reset(100*i, 300);
        }
    } else {
        console.error(error);
    }
}

function resetBreakfastItems() {
    numToast = 0;
    numEggs = 0;
    numBacon = 0;
    numWaffles = 0;
}

function countBreakfastItems() {
    // things to consider:
    //   throw error if they tried to add up a variable they didn't assign
    //   also throw error for invalid syntax - ex: ending line with a plus sign
    $('#nextPage3Button').show()

    breakfastTotalText.callAll('kill')

    var error = "";
    if (breakfastItemLine.indexOf("var ") != 0) {
        error += "Remember to declare your variable with the var keyword.\n";
    }

    var breakfastItemsInput = $('#totalBreakfastItemsInput')[0].value;

    var numToastMentions = countString(breakfastItemsInput, "toast");
    var numEggsMentions = countString(breakfastItemsInput, "eggs");
    var numBaconMentions = countString(breakfastItemsInput, "bacon");
    var numWafflesMentions = countString(breakfastItemsInput, "waffles");

    var total = 0;
    total += numToastMentions * numToast;
    total += numEggsMentions * numEggs;
    total += numBaconMentions * numBacon;
    total += numWafflesMentions * numWaffles;

    var items = "";
    if (numToastMentions > 0) {
        items += " toast,";
    }
    if (numEggsMentions > 0) {
        items += " eggs,";
    }
    if (numBaconMentions > 0) {
        items += " bacon,";
    }
    if (numWafflesMentions > 0) {
        items += " waffles,";
    }

    items = items.slice(0, -1);

    breakfastTotalText.add(game.make.text(1, 400, 'Total' + items + ' eaten: ' + total, { font: "32px Arial", fill: '#ffffff'} ));
}

function hideBreakfastShowOrangeJuice() {
    // hide breakfast
    toast.callAll('kill');
    eggs.callAll('kill');
    bacon.callAll('kill');
    waffles.callAll('kill');

    // hide total
    breakfastTotalText.callAll('kill');

    // show orange juice
}

function drinkOrangeJuice() {
    // need error handling
    // standard stuff, and enforcing between 1 and 5 glasses.

    $('#nextPage4Button').show()

    orangeJuiceGroup.callAll('kill');

    eval($('#drinkOrangeJuiceInput')[0].value);

    orangeJuiceGroup.createMultiple(orangeJuice, 'orangeJuice');
    for (var i = 0; i < orangeJuice; i++) {
        var orangeJuiceSprite = orangeJuiceGroup.getFirstExists(false);
        orangeJuiceSprite.reset(100*i, 100);
    }
}

function hideOrangeJuiceShowEnding() {
    // hide orange juice
    orangeJuiceGroup.callAll('kill');
    tableBackground.visible = false;

    // show ending
    leavingBackground.visible = true;
}

function countString(str, substr) {
    var next_index = str.indexOf(substr);
    if (next_index == -1) {
        return 0;
    }
    if (str == substr) {
        return 1;
    }
    
    return 1 + countString(str.slice(next_index+1),substr);
}

function kill(item) {
    item.kill();
}