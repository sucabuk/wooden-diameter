
const diameterMode = document.getElementById("diameterMode");
const boardsMode = document.getElementById("boardsMode");

const diameterSection = document.getElementById("diameterSection");
const boardsSection = document.getElementById("boardsSection");

const diameterResult = document.getElementById("diameterResult");
const boardsResult = document.getElementById("boardsResult");

// Přepínání režimů
function switchMode(mode) {
    const isDiameter = mode === "diameter";

    diameterSection.hidden = !isDiameter;
    boardsSection.hidden = isDiameter;

    diameterMode.classList.toggle("active", isDiameter);
    boardsMode.classList.toggle("active", !isDiameter);
}

diameterMode.addEventListener("click", () => {
    switchMode("diameter");
});

boardsMode.addEventListener("click", () => {
    switchMode("boards");
});

// Načtení čísla
function readNumber(id) {
    const value = document.getElementById(id).value.trim();

    if (value === "") {
        return NaN;
    }

    return Number(value.replace(",", "."));
}

// Formátování výsledku
function formatNumber(value) {
    return value.toLocaleString("cs-CZ", {
        maximumFractionDigits: 2
    });
}

// Výpočet průměru kulatiny
function calculateDiameter() {
    const a = readNumber("sideA");
    const b = readNumber("sideB");

    const reserveInput = document.getElementById("reserve");
    const reserve = reserveInput.value.trim() === ""
        ? 0
        : readNumber("reserve");

    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(reserve) ||
        a <= 0 ||
        b <= 0 ||
        reserve < 0
    ) {
        diameterResult.textContent = "Zadejte platné rozměry.";
        return;
    }

    const diameter = Math.hypot(a, b) + reserve;

    diameterResult.textContent =
        formatNumber(diameter) + " cm";
}

// Výpočet prken / fošen
function calculateBoards() {
    const thickness = readNumber("thickness");
    const count = readNumber("boardCount");
    const kerf = readNumber("kerf");

    if (
        !Number.isFinite(thickness) ||
        !Number.isFinite(count) ||
        !Number.isFinite(kerf) ||
        thickness <= 0 ||
        !Number.isInteger(count) ||
        count < 1 ||
        kerf < 0
    ) {
        boardsResult.textContent = "Zadejte platné hodnoty.";
        return;
    }

    // Výška = tloušťka × počet + prořez × (počet - 1)
    const height = thickness * count + kerf * (count - 1);

    boardsResult.textContent =
        formatNumber(height) + " mm";
}

// Tlačítka výpočtů
document.getElementById("calculateDiameter")
    .addEventListener("click", calculateDiameter);

document.getElementById("calculateBoards")
    .addEventListener("click", calculateBoards);

// Výchozí režim
switchMode("diameter");

// Předvyplnění prořezu
document.getElementById("kerf").value = "2.5";
