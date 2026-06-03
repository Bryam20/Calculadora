var operationDisplay = document.getElementById("operation");
var resultDisplay = document.getElementById("result");
var historyContainer = document.getElementById("history");
var countDisplay = document.getElementById("count");

var currentOperation = "";

/* Cargar historial al iniciar */
window.onload = function () {
    loadHistory();
};

function appendValue(value) {

    currentOperation += value;
    operationDisplay.innerHTML = currentOperation;
}

function clearDisplay() {

    currentOperation = "";
    operationDisplay.innerHTML = "0";
    resultDisplay.innerHTML = "0";
}

function deleteLast() {

    currentOperation = currentOperation.slice(0, -1);

    operationDisplay.innerHTML =
        currentOperation || "0";
}

function calculate() {

    if (currentOperation === "") {
        return;
    }

    try {

        if (currentOperation.indexOf("/0") !== -1) {
            resultDisplay.innerHTML =
                "No se puede dividir entre 0";
            return;
        }

        var result = eval(currentOperation);

        resultDisplay.innerHTML = result;

        saveHistory(currentOperation, result);

    } catch (error) {

        resultDisplay.innerHTML =
            "Operación inválida";
    }
}

function saveHistory(operation, result) {

    var history =
        JSON.parse(localStorage.getItem("history")) || [];

    var now = new Date();

    history.unshift({
        operation: operation,
        result: result,
        date: now.toLocaleString()
    });

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    loadHistory();
}

function loadHistory() {

    var history =
        JSON.parse(localStorage.getItem("history")) || [];

    historyContainer.innerHTML = "";

    countDisplay.innerHTML =
        history.length + " operaciones";

    for (var i = 0; i < history.length; i++) {

        var item = document.createElement("div");

        item.className = "history-item";

        item.innerHTML =
            "<p><strong>" +
            history[i].operation +
            "</strong></p>" +
            "<p>= " +
            history[i].result +
            "</p>" +
            "<p class='date'>" +
            history[i].date +
            "</p>";

        historyContainer.appendChild(item);
    }
}

function clearHistory() {

    var confirmDelete = confirm(
        "¿Deseas eliminar todo el historial?"
    );

    if (confirmDelete) {

        localStorage.removeItem("history");

        loadHistory();
    }
}