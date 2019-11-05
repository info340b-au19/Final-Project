//mock up data
const EXAMPLE_PALETTES = [{
        username: "SAMPLE",
        color1: "#eff0ef",
        color2: "#75736c",
        color3: "#5c8a94",
        color4: "#736b73",
        color5: "#242a2b"
    }, {
        username: "SAMPLE", 
        color1: "#f3f2ed", 
        color2: "#bb6f19", 
        color3: "#f4a928", 
        color4: "#6c666c", 
        color5: "#2c2d2b"
    }, {
        username: "SAMPLE", 
        color1: "#f2f7f7", 
        color2: "#f68e4a", 
        color3: "#675485", 
        color4: "#46b2ed", 
        color5: "#384451"}
];

// var palettes;

// d3.csv("./resources/palettes.csv")
// .then(function(data) {
//     console.log(data);
//     palettes = data;
// });

const STATE = {
    selectedColor: ["#f2f7f7", "#f68e4a", "#675485", "#46b2ed", "#384451"],
    filter: []
};

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

function toggleSelectedColor() {
    let selectedPanel = document.getElementById("selectedpanel");
    if (STATE.selectedColor.length < 5) { //if less than 5 colors are selected for some reason, do not show the panel
        selectedPanel.style.display = "none";
    } else {
        selectedPanel.style.display = "block";
    }
}

// update the selected palette panel
function updateSelected() {
    hexContainers = document.getElementsByClassName("hex");
    let colorId = "";
    for (let i = 0; i < 5; i++) {
        hexContainers[i].innerHTML = STATE.selectedColor[i];
        colorId = "color" + (i + 1);
        document.getElementById(colorId).style.backgroundColor = STATE.selectedColor[i];
    }
    toggleSelectedColor();
}

updateSelected();