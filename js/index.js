// current state of the web app
const STATE = {
    selectedColor: [], // hex codes for currently selected palette
    selectedColorNames: [], // color names for currently selected palette
    filter: [], // filters for search result. if '!' is the at the front, consider it as username, otherwise it is color name
    lockState: [false, false, false, false, false] // wheter or not the lock buttons are activated
};

// USE "ntc.name(hexcode)[1]"" TO CONVERT HEX CODE INTO CLOSEST READABLE NAME

// palettes - user generated sets of palettes
// fields: username, lightShade, lightAccent, main, darkAccent, darkAhade
var palettes;

d3.csv('./resources/palettes.csv')
.then(function(data) {
    palettes = data;
    displayPalettes(palettes);
})
.catch(function (err) {
    showError(err);
});

// colorNames - hex code and the name associated with it
// fields: hex, name
// sorted by name
var colorNames = {hex: [], name: []};

d3.csv('./resources/color_names.csv')
.then(function(data) {
    data.forEach(function(d) {
        colorNames.hex.push(d.hex);
        colorNames.name.push(d.color_name);
    });
})
.catch(function (err) {
    showError(err);
});

var mq = window.matchMedia( "(min-width: 600px)" );
if (mq.matches) {
    $('aside').hide();
}

// update the selected palette panel
function updateSelected() {
    $('.hex').each(function (index) {
        $(this).html(STATE.selectedColor[index]);
    });
    let colorId;
    for (let i = 0; i < 5; i++) {
        colorId = '#color' + (i + 1);
        $(colorId).css('background-color', STATE.selectedColor[i]);
        STATE.selectedColorNames[i] = ntc.name(STATE.selectedColor[i])[1].toLowerCase();
    }
    if ($('#selectedpanel').css('display') == 'none') {
        $('#selectedpanel').show();
    }
}

function hasDuplicateFilter(filter) {
    return (STATE.filter.indexOf(filter) > -1);
}

// checks if the given filter is user or a color
// returns back the given filter if it is color, adds '!' in front of filter if it is user
function userOrColor(filter) {
    if (!colorNames.name.includes(filter)) {
        return '!' + filter;
    }
    return filter;
}

function removeFilter(filter) {
    let i;
    i = STATE.filter.indexOf(filter);
    STATE.filter.splice(i, 1);

    applyFilter();
}

function addFilter(filter, lockId) {
    // filter must be a string
    // lockId is the integer id(1~5) of lock button that is related to this filter
    // if lockId is 0, the filter is not associated with a lock

    filter = filter.toLowerCase();

    let filterBubble = $('<div class="filter" aria-label="delete filter" role="button">');
    if (lockId != 0) {
        filterBubble.attr('id', 'filterForLock' + lockId);
    }

    let xIcon = $('<i class="fa fa-times" aria-hidden="true">');

    let filterText = $('<p>');
    filterText.html(filter);

    filter = userOrColor(filter);
    if (filter.charAt(0) == '!') {
        filterBubble.attr('data-type', 'user');
    } else {
        filterBubble.attr('data-type', 'color');
    }
    STATE.filter.push(filter);

    filterBubble.append(xIcon);
    filterBubble.append(filterText);

    filterBubble.click(function () {
        removeFilter(filter);
        if (lockId != 0) {
            $('#lock' + lockId).removeClass('locked');
            STATE.lockState[(lockId - 1)] = false;
        }
        this.remove();
    });
    $('#filterContainer').append(filterBubble);
    applyFilter();
}

function showError(err) {
    $('#error').html(err.message);
    $('#error').show();
    $('#error').fadeOut(4000);
}

// adds funtionality to lock buttons
for (let i = 0; i < 5; i++) {
    let lockId = '#lock' + (i + 1);
    $(lockId).click(function (event) {
        event.preventDefault();
        
        if (STATE.lockState[i]) {
            removeFilter(STATE.selectedColor[i]);
            STATE.lockState[i] = false;
            $('.filter:contains(' + STATE.selectedColorNames[i] + ')').remove();
            console.log(STATE.filter);
        } else {
            addFilter(STATE.selectedColorNames[i], i + 1);
            STATE.lockState[i] = true;
            console.log(STATE.filter);
        }
        $(this).toggleClass('locked');
    });
}

// adds functionality to search box
$('#searchbutton').click(function (event) {
    event.preventDefault();
    let inputText = $('#searchinput').val().toLowerCase();
    let id = 0;
    $('#searchinput').val('');

    if (/^#....../.test(inputText)) {
        inputText = ntc.name(inputText)[1];
    }

    if (!hasDuplicateFilter(inputText)) {
        if (STATE.selectedColorNames.includes(inputText)) {
            id = STATE.selectedColorNames.indexOf(inputText);
            STATE.lockState[id] = true;
            id++;
            
            $('#lock' + id).addClass('locked');
        }
        addFilter(inputText, id);
    } else {
        showError(new Error('Already filtered!'));
    }
});

//adds functionality to apply tab
//when clicked, overhauls the website's color with the selected palette
$('.apply').click(function (event) {
    event.preventDefault();

    if (STATE.selectedColor.length == 0) {
        showError(new Error('No palettes selected!'));
    } else {
        let colors = ['--lightShade', '--lightAccent', '--mainColor', '--darkAccent', '--darkShade'];
        
        if (STATE.selectedColor.length != 0) {
            let root = document.documentElement;
            for (let i = 0; i < 5; i++) {
                root.style.setProperty(colors[i], STATE.selectedColor[i]);
            }
        }
    }
});

$('#menu-unclicked').click(function (event) {
    event.preventDefault();
    $('aside').show();
})

$('#menu-clicked').click(function (event) {
    event.preventDefault();
    $('aside').hide();
})

function displayPalettes(filteredSet) {
    $('#cardcontainer').empty();

    if (!jQuery.isEmptyObject(filteredSet)) {
        let fields = ['light_shade', 'light_accent', 'main', 'dark_accent', 'dark_shade'];
        let currentColor;
        let card;

        filteredSet.forEach(function(d) {
            card = $('<div class="palette" aria-label="color palette">');
            
            let info = $('<div class="setinfo">');
            info.html('<p class="author">Created by ' + d.username + '</p>');
    
            let colorContainer = $('<div class="colorcontainer">');
            
            let colors = [];
            let names = [];
            for (let i = 0; i < 5; i++) {
                currentColor = $('<div class="color">');
                colors[i] = d[fields[i]];
                
                names[i] = ntc.name(colors[i])[1].toLowerCase();
                currentColor.css('background-color', colors[i]);
                colorContainer.append(currentColor);
            }
            

            card.append(info);
            card.append(colorContainer);

            card.click(function() {
                STATE.selectedColor = colors;
                STATE.selectedColorNames = names;
                updateSelected();
            });

            $('#cardcontainer').append(card);
        });
    }

    $('#nPalettes').html(filteredSet.length + ' results found');
}

function usernameFilter(originalSet, filter) {
	return originalSet.filter(function(d) {
        return d.username.toLowerCase() === filter;
    });
}

function colorFilter(originalSet, filter) {
    return originalSet.filter(function(d) {
        return (ntc.name(d.light_shade)[1].toLowerCase() === filter ||
            ntc.name(d.light_accent)[1].toLowerCase() === filter ||
            ntc.name(d.main)[1].toLowerCase() === filter ||
            ntc.name(d.dark_accent)[1].toLowerCase() === filter ||
            ntc.name(d.dark_shade)[1].toLowerCase() === filter);
    });
}

function applyFilter() {
    let colorSet = palettes;
    for (let i = 0; i < STATE.filter.length; i++) {
        console.log(STATE.filter[i].charAt(0) === '!');
        if (STATE.filter[i].charAt(0) === '!') {
            
            colorSet = usernameFilter(colorSet, STATE.filter[i].substring(1, STATE.filter[i].length));
        } else {
            colorSet = colorFilter(colorSet, STATE.filter[i]);
        }
    }
    displayPalettes(colorSet);
}
