$(document).ready(function() {


var nodeAt = function(row, col) {
  return $("div[data-row="+row+"]").children("div[data-col="+col+"]");
}
var setupField = function(molePatch) {
  // Create game board
  for (var i = 0; i < molePatch.size; i++) {
    $("#grid").append("<div class='row' data-row='" + i +"'></div>");
  }
  for (var j = 0; j < molePatch.size; j++) {
    $(".row").append("<div class='cell' data-col='" + j +  "'></div>");
  }

    // Adjust cell size
  var sideLength = 448/molePatch.size;
  $(".cell").css("height", sideLength).css("width", sideLength)
  $(".row").css("height", sideLength)

  for (i = 0; i < molePatch.size; i++) {
    for (j = 0; j < molePatch.size; j++) {
      if (molePatch.field[i][j] == 1) {
        nodeAt(i, j).prepend("<img src='static/img/mole.jpg' />")
      }
    }
  }
}

var updateField = function(molePatch) {
  for (i = 0; i < molePatch.size; i++) {
    for (j = 0; j < molePatch.size; j++) {
      nodeAt(i,j).empty();
      if (molePatch.field[i][j] == 1) {
        nodeAt(i, j).prepend("<img src='static/img/mole.jpg' />")
      }
    }
  }
}

var printSuccess = function() {
  $("#successModal").show()
}

var MolePatch = function(size) {
  this.size = size;
  this.field = new Array(size)
  for (i = 0; i < size; i++) {
    this.field[i] = new Array(size)
    for (j = 0; j < size; j++) {
      this.field[i][j] = Math.round(Math.random());
    }
  }
}

MolePatch.prototype.empty = function() {
  for (i = 0; i < this.size; i++) {
    for (j = 0; j < this.size; j++) {
      if (this.field[i][j] == 1) return false
    }
  }
  return true
}

//// DO NOT MODIFY CODE ABOVE /////
MolePatch.prototype.killMoleAt = function(i, j) {
  this.field[i][j] = 0;
}

var currMolePatch = new MolePatch(5);
// currMolePatch.killMoleAt()

var code = `var MolePatch = function(size) {
  this.size = size;
  this.field = new Array(size)
  for (i = 0; i < size; i++) {
    this.field[i] = new Array(size)
    for (j = 0; j < size; j++) {
      this.field[i][j] = Math.round(Math.random());
    }
  }
}

MolePatch.prototype.empty = function() {
  for (i = 0; i < this.size; i++) {
    for (j = 0; j < this.size; j++) {
      if (this.field[i][j] == 1) return false
    }
  }
  return true
}

//// DO NOT MODIFY CODE ABOVE /////
MolePatch.prototype.killMoleAt = function(i, j) {
  this.field[i][j] = 0;
}

var currMolePatch = new MolePatch(5);`

$("#code-frame").val(code);
setupField(currMolePatch);

$("#run").click(function() {
  var text = $('#code-frame').val();
  eval(text);
  console.log(currMolePatch.field)
  updateField(currMolePatch);
  if (currMolePatch.empty()) {
    printSuccess();
  }
});

$("#reset").click(function() {
  $("#code-frame").val(code);
})


/* use instance function .killMoleAt(i, j) to get rid of all the moles) */
});