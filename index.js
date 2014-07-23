var emoji = require('retext-emoji'),
    Retext = require('retext'),
    inputElement = document.getElementsByTagName('textarea')[0],
    outputElement = document.getElementsByTagName('textarea')[1],
    convertElement = document.getElementsByName('convert')[0],
    retext;

function makeSmarter() {
    outputElement.value = retext.parse(inputElement.value).toString();
}

function onchange(event) {
    var value = event.target.selectedOptions[0];

    if (!value) {
        return;
    }

    value = value.value;

    retext = new Retext().use(emoji({'convert' : value}));
    makeSmarter();
}

convertElement.addEventListener('change', onchange);
inputElement.addEventListener('input', makeSmarter);

onchange({'target' : convertElement});
makeSmarter();
