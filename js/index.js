const STATE = {
    selectedColor: [], // currently selected palette
    filter: [], // filters for search result. if '!' is the at the front, consider it as username, otherwise it is color name
    lockState: [false, false, false, false, false] // wheter or not the lock buttons are activated
};

var palettes;
function aLaLa() {
d3.csv('../resources/palettes.csv')
.then(function(data) {
    console.log(data);
    palettes = data;
})
};

aLaLa();

function hexToRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// update the selected palette panel
function updateSelected() {
    $('.hex').each(function (index) {
        $(this).html(STATE.selectedColor[index]);
    })
    let colorId;
    let lockId;
    for (let i = 0; i < 5; i++) {
        colorId = '#color' + (i + 1);
        lockId = '#lock' + (i + 1);
        $(colorId).css('background-color', STATE.selectedColor[i]);
    }
    if ($('#selectedpanel').css('display') == 'none') {
        $('#selectedpanel').css('display', 'block');
    }
}

function checkDuplicateFilter(filter) {
    return (STATE.filter.indexOf(filter) == -1);
}

function removeFilter(filter) {
    let i;
    i = STATE.filter.indexOf(filter);
    STATE.filter.splice(i, 1);
}

function addFilter(filter, lockId) {
    // filter must be a string
    // lockId is the integer id(1~5) of lock button that is related to this filter
    // if lockId is 0, the filter is not associated with a lock

    let filterBubble = $('<div>');
    filterBubble.addClass('filter');
    if (lockId != 0) {
        filterBubble.attr('id', 'filterForLock' + lockId);
    }

    let xIcon = $('<i>');
    xIcon.addClass('fa fa-times');
    let filterText = $('<p>');

    //change hex code input to color name
    if (filter.charAt(0) == '#') {
        filter = ntc.name(filter)[1];
    }

    STATE.filter.push(filter);
    filterText.html(filter);
    filterBubble.append(xIcon);
    filterBubble.append(filterText);

    filterBubble.click(function () {
        removeFilter(filter);
        if (lockId != 0) {
            $('#lock' + lockId).removeClass('locked');
            STATE.lockState[(lockId - 1)] = false;
        }
        console.log(STATE.filter);
        this.remove();
    });

    $('#filterContainer').append(filterBubble);
    console.log(STATE.filter);
}

for (let i = 0; i < 5; i++) {
    let lockId = '#lock' + (i + 1);
    $(lockId).click(function (event) {
        event.preventDefault();
        
        if (STATE.lockState[i]) {
            removeFilter(STATE.selectedColor[i]);
            STATE.lockState[i] = false;
            $('.filter:contains(' + ntc.name(STATE.selectedColor[i])[1] + ')').remove();
            console.log(STATE.filter);
        } else {
            addFilter(ntc.name(STATE.selectedColor[i])[1], i + 1);
            STATE.lockState[i] = true;
            console.log(STATE.filter);
        }
        $(this).toggleClass('locked');
    });
}

STATE.selectedColor = ['#eff0ef', '#75736c', '#5c8a94', '#736b73', '#242a2b'];

updateSelected();