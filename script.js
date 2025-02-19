const preguntas = [
    {
        pregunta: "¿Te gustaría salir conmigo a una cita?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [3, -3, 1]
    },
    {
        pregunta: "¿Crees en el amor a primera vista?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [1, -1, 0]
    },
    {
        pregunta: "¿Te gustaría conocerme mejor fuera de este contexto?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [3, -3, 1]
    },
    {
        pregunta: "¿Te atraen las personas que tienen una conexión emocional antes de lo físico?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [2, -1, 0]
    },
    {
        pregunta: "¿Estarías dispuesto/a a iniciar una relación si la persona es compatible contigo?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [3, -3, 1]
    },
    {
        pregunta: "¿Te gustan las citas más relajadas o las más formales?",
        opciones: ["Sí (relajadas)", "No (formales)", "Tal vez"],
        puntos: [1, -1, 0]
    },
    {
        pregunta: "¿Estarías interesado/a en vernos más a menudo si nos llevamos bien?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [2, -2, 1]
    },
    {
        pregunta: "¿Estás buscando algo serio ahora mismo?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [1, -2, 0]
    },
    {
        pregunta: "¿Te parece importante tener una buena conversación antes de una cita romántica?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [2, -1, 0]
    },
    {
        pregunta: "¿Crees que las relaciones a largo plazo pueden comenzar de manera casual?",
        opciones: ["Sí", "No", "Tal vez"],
        puntos: [0, -1, 1]
    }
];
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