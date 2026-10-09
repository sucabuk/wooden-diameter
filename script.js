
// HTML elementy
const shape = document.getElementById("shape");

const sideA = document.getElementById("sideA");
const sideB = document.getElementById("sideB");

const sideALabel = document.getElementById("sideALabel");
const sideBGroup = document.getElementById("sideBGroup");

const reserve = document.getElementById("reserve");

const calculateBtn = document.getElementById("calculateBtn");
const resultValue = document.getElementById("resultValue");


// Změna tvaru trámu

shape.addEventListener("change", function () {

    if (shape.value === "square") {

        // Čtverec má pouze jednu stranu
        sideBGroup.classList.add("hidden");

        sideALabel.textContent = "Délka strany (cm)";

    } else {

        // Obdélník má dvě různé strany
        sideBGroup.classList.remove("hidden");

        sideALabel.textContent = "Délka strany A (cm)";
    }

    // Reset výsledku
    resultValue.textContent = "-- cm";
});


// Výpočet průměru kmene

calculateBtn.addEventListener("click", function () {

    const a = Number(sideA.value);

    let b;

    if (shape.value === "square") {
        b = a;
    } else {
        b = Number(sideB.value);
    }

    const r = Number(reserve.value);

    // Kontrola vstupních hodnot

    if (
        sideA.value.trim() === "" ||
        (shape.value === "rectangle" && sideB.value.trim() === "") ||
        reserve.value.trim() === "" ||
        !Number.isFinite(a) ||
        !Number.isFinite(b) ||
        !Number.isFinite(r) ||
        a <= 0 ||
        b <= 0 ||
        r < 0
    ) {
        resultValue.textContent = "Neplatné hodnoty";
        return;
    }

    // Pythagorova věta:
    // průměr = odmocnina(a² + b²)

    const diameter = Math.hypot(a, b);

    // Přičtení rezervy

    const finalDiameter = diameter + r;

    // Zobrazení výsledku

    resultValue.textContent =
        finalDiameter.toLocaleString("cs-CZ", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " cm";
});


// Reset výsledku při změně vstupů

[sideA, sideB, reserve].forEach(function (input) {

    input.addEventListener("input", function () {
        resultValue.textContent = "-- cm";
    });

});
