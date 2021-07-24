const GENERATORS = [
    "Tech Names",
    "Fantasy Names F",
    "Fantasy Names M",
    "Fantasy Town Names",
]

window.onload = function() {
    loadScripts();
    addButtons();
    generate();
};

var genTabs = document.getElementById("genTabs");
var namesList = document.getElementById("namesList");
var genTitle = document.getElementById("genTitle");
var activeTab = "Fantasy Names F";

function loadScripts() {
    for(var i=0; i < GENERATORS.length; i++) {
        var scriptTag = document.createElement("script");
        var filename = GENERATORS[i].split(" ").join("");
        scriptTag.setAttribute("src", "data/" + filename + ".js")
        document.head.appendChild(scriptTag);
        console.log(scriptTag);
    }
}

function addButtons() {
    for(var i=0; i < GENERATORS.length; i++){
        var li = document.createElement('li');
        li.id = GENERATORS[i];
        li.className = 'nav-item';
        var btn = document.createElement('button');
        btn.id = GENERATORS[i] + '-btn';
        btn.className = 'nav-link';
        btn.innerText = GENERATORS[i];
        btn.addEventListener('click', function() {
            toggleTab(this);
        });
        li.appendChild(btn);
        genTabs.appendChild(li);
    }
}

function toggleTab(button) {
    genTitle.innerText = button.innerText;
    activeTab = button.innerText;
    generate();
}

function choice(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

function weightedChoice(weightedArray) {
    var items = [];
    var weights = [];
    for (i = 0; i < weightedArray.length; i++) {
        items.push(i[0]);
        weights.push(i[1]);
    }
    for (i = 0; i < weightedArray.length; i++) {
        weights[i] += weights[i - 1] || 0;
    }
    var random = Math.random() * weights[weights.length - 1];
    for (i = 0; i < weights.length; i++) {
        if (weights[i] > random) {
            break;
        }
        return items[i];
    }
}

function formName(isWeighted, prefixes, middlefixes, suffixes) {
    if (isWeighted == false) {
        var prefix = choice(prefixes);
        var middlefix = choice(middlefixes);
        var suffix = choice(suffixes);
        var name = prefix + middlefix + suffix;
    } 
    if (isWeighted == true) {
        var prefix = weightedChoice(prefixes);
        var middlefix = weightedChoice(middlefixes);
        var suffix = weightedChoice(suffixes);
        var name = prefix + middlefix + suffix;
    }
    return name;
}

function generateName(tabName) {
    const DATATABLE = {
        "Tech Names": TechNames,
        "Fantasy Names F": FantasyNamesF,
        "Fantasy Names M": "",
        "Fantasy Town Names": FantasyTownNames
    };
    var data = DATATABLE[tabName];
    var prefixes = [];
    var middlefixes = [];
    var suffixes = [];
    for(var x in data.prefix) prefixes.push(x);
    for(var y in data.middlefix) middlefixes.push(y);
    for(var z in data.suffix) suffixes.push(z);
    var name = formName(false, prefixes, middlefixes, suffixes);
    return name;
}

function generate() {
    remove();
    for (i = 0; i < 7; i++) {
        let div = document.createElement("div");
        var name = generateName(activeTab);
        div.innerHTML = name;
        div.id = "generatedName";
        div.className = "fs-4 text-light";
        div.style = "text-transform: capitalize";
        namesList.append(div);
    }
}

function remove() {
    for (i = 0; i < 7; i++) {
        let div = document.getElementById("generatedName");
        if (div == null) {
            return
        }       
        namesList.removeChild(div);
    }
}
