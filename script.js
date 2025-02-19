const categorias = {
    "Muy Interesado": [15, 30],
    "Interesado": [5, 14],
    "Poco Interesado": [-5, 4],
    "No Interesado": [-30, -6]
};

const questionsContainer = document.getElementById("questions-container");
const submitButton = document.getElementById("submit-button");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");

function createQuestionElements() {
    preguntas.forEach((pregunta, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");
        questionDiv.innerHTML = `<p>${pregunta.pregunta}</p>`;

        const optionsDiv = document.createElement("div");
        optionsDiv.classList.add("options");

        pregunta.opciones.forEach((opcion, opcionIndex) => {
            const label = document.createElement("label");
            label.innerHTML = `
                <input type="radio" name="question-${index}" value="${opcionIndex}">
                ${opcion}
            `;
            optionsDiv.appendChild(label);
        });

        questionDiv.appendChild(optionsDiv);
        questionsContainer.appendChild(questionDiv);
    });
}

function calcularResultado() {
    let puntajeTotal = 0;
    preguntas.forEach((pregunta, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption) {
            const opcionIndex = parseInt(selectedOption.value);
            puntajeTotal += pregunta.puntos[opcionIndex];
        }
    });

    let categoriaAsignada = null;
    for (const categoria in categorias) {
        const [minPuntaje, maxPuntaje] = categorias[categoria];
        if (puntajeTotal >= minPuntaje && puntajeTotal <= maxPuntaje) {
            categoriaAsignada = categoria;
            break;
        }
    }

    return { categoria: categoriaAsignada, puntaje: puntajeTotal };
}

createQuestionElements();

submitButton.addEventListener("click", () => {
    const resultado = calcularResultado();

    if (resultado.categoria) {
        resultText.textContent = `Eres: ${resultado.categoria} (Puntaje: ${resultado.puntaje})`;
    } else {
        resultText.textContent = "No se pudo determinar la categoría.";
    }

    resultContainer.classList.remove("hidden");
});