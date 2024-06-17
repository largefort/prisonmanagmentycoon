let prisonFunds = 0;
let prisonerCount = 0;
let mentalWellbeing = 100;
let prisonName = "Not set";
const prisonerIncreaseRate = 0.1;
const cellCost = 50;
const guardCost = 100;
const wellbeingCost = 20;

document.addEventListener("DOMContentLoaded", function() {
    setInterval(increasePrisoners, 1000);
    setInterval(updateStats, 1000);
});

function setPrisonName() {
    const nameInput = document.getElementById("prison-name").value;
    if (nameInput) {
        prisonName = nameInput;
        document.getElementById("display-prison-name").innerText = prisonName;
    }
}

function constructCell() {
    if (prisonFunds >= cellCost) {
        prisonFunds -= cellCost;
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerText = "C";
        document.getElementById("prison-layout").appendChild(cell);
        prisonerCount++;
    } else {
        alert("Not enough funds to construct a cell!");
    }
}

function hireGuard() {
    if (prisonFunds >= guardCost) {
        prisonFunds -= guardCost;
        const guard = document.createElement("div");
        guard.className = "guard";
        guard.innerText = "G";
        document.getElementById("prison-layout").appendChild(guard);
    } else {
        alert("Not enough funds to hire a guard!");
    }
}

function increaseMentalWellbeing() {
    if (prisonFunds >= wellbeingCost && mentalWellbeing < 100) {
        prisonFunds -= wellbeingCost;
        mentalWellbeing += 10;
        if (mentalWellbeing > 100) {
            mentalWellbeing = 100;
        }
    } else if (mentalWellbeing >= 100) {
        alert("Mental well-being is already at maximum!");
    } else {
        alert("Not enough funds to improve well-being!");
    }
}

function increasePrisoners() {
    prisonerCount += prisonerIncreaseRate;
    prisonFunds += prisonerIncreaseRate * 10; // Earn funds based on prisoner count
}

function updateStats() {
    document.getElementById("prison-funds").innerText = Math.floor(prisonFunds);
    document.getElementById("prisoner-count").innerText = Math.floor(prisonerCount);
    document.getElementById("mental-wellbeing").innerText = mentalWellbeing;
}

function exportGameData() {
    const gameData = {
        prisonName,
        prisonFunds,
        prisonerCount,
        mentalWellbeing,
        prisonLayout: Array.from(document.getElementById("prison-layout").children).map(element => element.className)
    };
    
    const gameDataString = JSON.stringify(gameData);
    const base64String = btoa(gameDataString);
    
    document.getElementById("exported-data").value = base64String;
}

function loadGameData() {
    const base64String = document.getElementById("imported-data").value;
    try {
        const gameDataString = atob(base64String);
        const gameData = JSON.parse(gameDataString);

        // Update game state with loaded data
        prisonName = gameData.prisonName;
        prisonFunds = gameData.prisonFunds;
        prisonerCount = gameData.prisonerCount;
        mentalWellbeing = gameData.mentalWellbeing;

        // Update the prison layout
        const prisonLayout = document.getElementById("prison-layout");
        prisonLayout.innerHTML = ""; // Clear existing layout
        gameData.prisonLayout.forEach(className => {
            const element = document.createElement("div");
            element.className = className;
            element.innerText = className === "cell" ? "C" : "G";
            prisonLayout.appendChild(element);
        });

        // Update displayed stats
        document.getElementById("display-prison-name").innerText = prisonName;
        updateStats();
    } catch (error) {
        alert("Invalid game data.");
    }
}
