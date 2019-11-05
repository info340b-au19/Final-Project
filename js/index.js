const STATE = {
    selectedColor: [], // currently selected palette
    filter: [] // filters for search result. if '#' is the first character, consider it as hex, otherwise it is username
};

var palettes;

d3.csv("./resources/palettes.csv")
.then(function(data) {
    console.log(data);
    palettes = data;
});

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// update the selected palette panel
function updateSelected() {
    if (STATE.selectedColor.length == 5) {
        $(".hex").each(function (index) {
            $(this).html(STATE.selectedColor[index]);
        })
        let colorId = "";
        for (let i = 0; i < 5; i++) {
            colorId = "#color" + (i + 1);
            $(colorId).css("background-color", STATE.selectedColor[i]);
        }
        if ($("#selectedpanel").css("display") == "none") {
            $("#selectedpanel").css("display", "block");
        }
    }
}

updateSelected();

STATE.selectedColor = ["#736b73", "#242a2b", "#75736c", "#eff0ef", "#5c8a94"];
console.log(STATE.selectedColor);

updateSelected();

function addFilter(filter) {
    let filterBubble = d
}