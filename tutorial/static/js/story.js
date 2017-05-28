$(document).ready($('#varExplanation').hide());
$(document).ready($('#getReady').hide());
$(document).ready($('#eatBreakfast').hide());
$(document).ready($('#totalBreakfast').hide());
$(document).ready($('#drinkOrangeJuice').hide());
$(document).ready($('#ending').hide());
$(document).ready($('#nextPage0Button').hide());
$(document).ready($('#nextPage1Button').hide());
$(document).ready($('#nextPage2Button').hide());
$(document).ready($('#nextPage3Button').hide());
$(document).ready($('#nextPage4Button').hide());

var charName = "";

function getName() {
    charName = $('#charNameInput')[0].value;
    $('#charName').html(charName);
    $('#varExplanation').show();
    $('#nextPage0Button').show();
}

function nextPage0to1() {
    $('#intro').hide();
    $('#varExplanation').hide();
    $('#nextPage0Button').hide();

    $('#getReady').show();
    hideIntroShowShirt();
}

function nextPage1to2() {
    $('#getReady').hide();
    $('#nextPage1Button').hide();

    $('#eatBreakfast').show();
    hideShirtShowBreakfast();
}

function nextPage2to3() {
    $('#eatBreakfast').hide();
    $('#nextPage2Button').hide();

    $('#totalBreakfast').show();
}

function nextPage3to4() {
    $('#totalBreakfast').hide();
    $('#nextPage3Button').hide();

    $('#drinkOrangeJuice').show();
    hideBreakfastShowOrangeJuice();
}

function nextPage4to5() {
    $('#drinkOrangeJuice').hide();
    $('#nextPage4Button').hide();

    $('#ending').show();
    hideOrangeJuiceShowEnding();
}

$('#submitNameButton').click(getName);
$('#nextPage0Button').click(nextPage0to1);
$('#changeShirtColorButton').click(changeShirtColor);
$('#nextPage1Button').click(nextPage1to2);
$('#eatBreakfastButton').click(addBreakfastItems);
$('#totalBreakfastButton').click(countBreakfastItems);
$('#nextPage2Button').click(nextPage2to3);
$('#drinkOrangeJuiceButton').click(drinkOrangeJuice);
$('#nextPage3Button').click(nextPage3to4);
$('#nextPage4Button').click(nextPage4to5);