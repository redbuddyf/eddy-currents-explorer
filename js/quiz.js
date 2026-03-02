/**
 * Science Unpacked - Quiz Application
 */

'use strict';

// ===== QUIZ DATA =====
const quizData = [
    {
        question: "What causes eddy currents to form in a conductor?",
        options: [
            "Static magnetic fields",
            "Changing magnetic fields",
            "High temperatures only",
            "Direct current electricity"
        ],
        correct: 1,
        explanation: "Eddy currents are induced by changing magnetic fields, according to Faraday's Law of Electromagnetic Induction."
    },
    {
        question: "According to Lenz's Law, the direction of induced eddy currents will:",
        options: [
            "Reinforce the change that caused them",
            "Oppose the change that caused them",
            "Flow in random directions",
            "Always flow clockwise"
        ],
        correct: 1,
        explanation: "Lenz's Law states that the induced current flows in a direction that opposes the change that produced it - a consequence of conservation of energy."
    },
    {
        question: "What happens to the kinetic energy of a magnet falling through a copper tube due to eddy currents?",
        options: [
            "It is completely lost",
            "It is converted to electrical energy",
            "It is converted to heat",
            "It remains unchanged"
        ],
        correct: 2,
        explanation: "The kinetic energy is converted to thermal energy (heat) due to the electrical resistance of the conductor as eddy currents flow through it."
    },
    {
        question: "Which application uses eddy currents for braking without friction?",
        options: [
            "Disc brakes in cars",
            "Magnetic brakes on roller coasters",
            "Air brakes on trucks",
            "Drum brakes on bicycles"
        ],
        correct: 1,
        explanation: "Magnetic brakes on roller coasters use powerful magnets and conductive tracks. Eddy currents create an opposing magnetic field that slows the train smoothly without physical contact."
    },
    {
        question: "How do maglev trains use eddy currents?",
        options: [
            "Only for propulsion",
            "Only for levitation",
            "For both levitation and propulsion",
            "For air conditioning"
        ],
        correct: 2,
        explanation: "Maglev trains use eddy currents for both levitation (floating above the track) and propulsion (moving forward), eliminating friction entirely."
    },
    {
        question: "What material property affects the strength of eddy currents?",
        options: [
            "Color",
            "Electrical conductivity",
            "Density",
            "Transparency"
        ],
        correct: 1,
        explanation: "Electrical conductivity determines how easily eddy currents can flow. Higher conductivity means stronger eddy currents and more significant effects."
    },
    {
        question: "How can unwanted eddy currents be reduced in transformer cores?",
        options: [
            "By using solid iron cores",
            "By using laminated (layered) cores",
            "By increasing the temperature",
            "By using plastic cores"
        ],
        correct: 1,
        explanation: "Laminated cores are made of thin sheets insulated from each other. This breaks up the large eddy current loops into smaller, less efficient ones, reducing energy loss."
    },
    {
        question: "In induction heating, what determines the depth of heating in the material?",
        options: [
            "The color of the metal",
            "The frequency of the alternating current",
            "The room temperature",
            "The shape of the coil only"
        ],
        correct: 1,
        explanation: "Higher frequency alternating currents produce eddy currents that concentrate near the surface (skin effect), while lower frequencies penetrate deeper into the material."
    },
    {
        question: "What happens when a strong magnet is dropped through a vertical copper pipe?",
        options: [
            "It falls at normal speed",
            "It falls faster than normal",
            "It falls much slower than normal",
            "It gets stuck completely"
        ],
        correct: 2,
        explanation: "The eddy currents induced in the copper pipe create an opposing magnetic field that significantly slows the magnet's fall, often making it appear to 'float' down."
    },
    {
        question: "Which physical law explains why eddy currents create an opposing magnetic field?",
        options: [
            "Newton's First Law",
            "Ohm's Law",
            "Faraday's Law and Lenz's Law",
            "Archimedes' Principle"
        ],
        correct: 2,
        explanation: "Faraday's Law explains that changing magnetic fields induce currents, while Lenz's Law explains that these currents flow in a direction to oppose the change - together they explain the opposing magnetic field."
    }
];

// ===== QUIZ STATE =====
let currentQuestion = 0;
let score = 0;
let answers = [];
let hasAnswered = false;

// ===== DOM ELEMENTS =====
const startScreen = document.getElementById('startScreen');
const quizHeader = document.getElementById('quizHeader');
const quizBody = document.getElementById('quizBody');
const quizFooter = document.getElementById('quizFooter');
const resultsScreen = document.getElementById('resultsScreen');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const correctCount = document.getElementById('correctCount');
const incorrectCount = document.getElementById('incorrectCount');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// ===== QUIZ FUNCTIONS =====
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = new Array(quizData.length).fill(null);
    
    startScreen.style.display = 'none';
    resultsScreen.classList.remove('show');
    quizHeader.style.display = 'block';
    quizBody.style.display = 'block';
    quizFooter.style.display = 'flex';
    
    renderQuestions();
    updateQuestion(0);
    updateProgress();
}

function renderQuestions() {
    quizBody.innerHTML = quizData.map((q, index) => `
        <div class="question-container" id="question-${index}">
            <div class="question-number">Question ${index + 1} of ${quizData.length}</div>
            <div class="question-text">${q.question}</div>
            <div class="options-list">
                ${q.options.map((option, optIndex) => `
                    <div class="option" data-index="${optIndex}" onclick="selectOption(${index}, ${optIndex})">
                        <div class="option-letter">${String.fromCharCode(65 + optIndex)}</div>
                        <div class="option-text">${option}</div>
                        <div class="option-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="explanation" id="explanation-${index}">
                <h4><i class="fas fa-lightbulb"></i> Explanation</h4>
                <p>${q.explanation}</p>
            </div>
        </div>
    `).join('');
}

function updateQuestion(index) {
    // Hide all questions
    document.querySelectorAll('.question-container').forEach(q => {
        q.classList.remove('active');
    });
    
    // Show current question
    const currentQ = document.getElementById(`question-${index}`);
    if (currentQ) {
        currentQ.classList.add('active');
    }
    
    // Update buttons
    prevBtn.disabled = index === 0;
    
    if (answers[index] !== null) {
        nextBtn.disabled = false;
        nextBtn.innerHTML = index === quizData.length - 1 
            ? 'Finish <i class="fas fa-check"></i>' 
            : 'Next <i class="fas fa-arrow-right"></i>';
    } else {
        nextBtn.disabled = true;
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
    }
    
    // Restore previous answer if exists
    if (answers[index] !== null) {
        showAnswer(index, answers[index]);
    }
}

function selectOption(questionIndex, optionIndex) {
    if (answers[questionIndex] !== null) return; // Already answered
    
    answers[questionIndex] = optionIndex;
    showAnswer(questionIndex, optionIndex);
    
    // Update score
    if (optionIndex === quizData[questionIndex].correct) {
        score++;
    }
    
    updateProgress();
    nextBtn.disabled = false;
}

function showAnswer(questionIndex, selectedIndex) {
    const question = quizData[questionIndex];
    const options = document.querySelectorAll(`#question-${questionIndex} .option`);
    const explanation = document.getElementById(`explanation-${questionIndex}`);
    
    options.forEach((option, index) => {
        option.style.pointerEvents = 'none'; // Disable clicking
        
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            option.classList.add('incorrect');
        }
        
        if (index === selectedIndex) {
            option.classList.add('selected');
        }
    });
    
    explanation.classList.add('show');
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestion + 1}/${quizData.length}`;
    
    // Count correct and incorrect
    let correct = 0;
    let incorrect = 0;
    
    answers.forEach((answer, index) => {
        if (answer !== null) {
            if (answer === quizData[index].correct) {
                correct++;
            } else {
                incorrect++;
            }
        }
    });
    
    correctCount.textContent = `${correct} Correct`;
    incorrectCount.textContent = `${incorrect} Incorrect`;
}

function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        updateQuestion(currentQuestion);
        updateProgress();
    } else {
        showResults();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion(currentQuestion);
        updateProgress();
    }
}

function showResults() {
    quizHeader.style.display = 'none';
    quizBody.style.display = 'none';
    quizFooter.style.display = 'none';
    resultsScreen.classList.add('show');
    
    // Calculate final score
    let finalCorrect = 0;
    answers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            finalCorrect++;
        }
    });
    
    const finalIncorrect = quizData.length - finalCorrect;
    const percentage = (finalCorrect / quizData.length) * 100;
    
    // Update results display
    document.getElementById('finalScore').textContent = `${finalCorrect}/${quizData.length}`;
    document.getElementById('finalCorrect').textContent = finalCorrect;
    document.getElementById('finalIncorrect').textContent = finalIncorrect;
    
    // Set message based on score
    const messageEl = document.getElementById('resultMessage');
    if (percentage >= 90) {
        messageEl.textContent = "Outstanding! You're an eddy currents expert! 🎉";
    } else if (percentage >= 70) {
        messageEl.textContent = "Great job! You have a solid understanding! 👏";
    } else if (percentage >= 50) {
        messageEl.textContent = "Good effort! Review the notes to improve! 📚";
    } else {
        messageEl.textContent = "Keep learning! Check out the interactive lab! 💪";
    }
}

function retakeQuiz() {
    currentQuestion = 0;
    score = 0;
    answers = [];
    
    resultsScreen.classList.remove('show');
    startScreen.style.display = 'block';
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (!quizBody || quizBody.style.display === 'none') return;
    
    if (e.key === 'ArrowRight' && !nextBtn.disabled) {
        nextQuestion();
    } else if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
        prevQuestion();
    }
});
