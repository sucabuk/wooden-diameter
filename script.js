
const sideAInput = document.getElementById("sideA");
const sideBInput = document.getElementById("sideB");
const reserveInput = document.getElementById("reserve");
const calculateBtn = document.getElementById("calculateBtn");
const resultValue = document.getElementById("resultValue");

function parseNumber(value) {
    return Number(value.trim().replace(",", "."));
}

function calculateDiameter() {
    const aText = sideAInput.value;
    const bText = sideBInput.value;
    const reserveText = reserveInput.value;

    if (aText.trim() === "" || bText.trim() === "") {
        resultValue.textContent = "Vyplňte obě strany.";
        return;
    }

    const a = parseNumber(aText);
    const b = parseNumber(bText);
    const reserve = reserveText.trim() === ""
        ? 0
        : parseNumber(reserveText);

    if (
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(reserve) ||
        a <= 0 ||
        b <= 0 ||
        reserve < 0
    ) {
        resultValue.textContent = "Zadejte platné rozměry.";
        return;
    }

    const diameter = Math.hypot(a, b) + reserve;

    resultValue.textContent =
        diameter.toLocaleString("cs-CZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " cm";
}

calculateBtn.addEventListener("click", calculateDiameter);
