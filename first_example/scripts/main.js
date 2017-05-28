$(document).ready($('#weather').hide())
$(document).ready($('#section2').hide())
$(document).ready($('#section3').hide())

var charName = ""
var clothing = ""

var weather = {
    isSunny: function() { return false; },
    isRainy: function() { return true; },
}

function getName() {
    charName = $('#enterCharName')[0].value
    $('#enterCharName').prop('readonly', true)
    $('.charName').html(charName)
    $('#section2').show()
}

function wearSunglasses() {
    clothing = "sunglasses"
}

function wearRainBoots() {
    clothing = "rain boots"
}

function setWeather() {
    if (weather.isSunny()) {
        eval($('#isSunny')[0].value)
    } else if (weather.isRainy()) {
        eval($('#isRainy')[0].value)
    }
    $('#section3').show()
}

function showWeather() {
    // function to randomize weather
    
    weatherToday = ""
    
    if (weather.isSunny()) {
        weatherToday = "sunny"
    } else if (weather.isRainy()) {
        weatherToday = "rainy"
    }
    $('#weatherText').html("It's " + weatherToday + " today! Looks like you're wearing " + clothing + ".")
}

$('#submitName').click(getName)
$('#submitWeatherConditional').click(setWeather)
$('#checkWeather').click(showWeather)