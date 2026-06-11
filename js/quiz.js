/**
 * Science Unpacked - Multi-Topic Quiz Application
 */

'use strict';

// ===== QUIZ STATE =====
let currentTopic = null;
let quizData = [];
let currentQuestion = 0;
let score = 0;
let answers = [];

// ===== DOM ELEMENTS =====
const topicScreen = document.getElementById('topicScreen');
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

// ===== TOPIC SELECTION =====
function selectTopic(topicKey) {
    const topic = getQuizTopic(topicKey);
    if (!topic) return;
    
    currentTopic = topicKey;
    quizData = topic.questions;
    
    // Populate start screen with topic info
    document.getElementById('startIcon').innerHTML = `<i class="fas ${topic.icon}"></i>`;
    document.getElementById('startIcon').style.color = topic.color;
    document.getElementById('startTitle').textContent = topic.title + ' Quiz';
    document.getElementById('startSubtitle').textContent = topic.subtitle;
    document.getElementById('startQuestionCount').textContent = topic.questionCount + ' Questions';
    document.getElementById('startTime').textContent = topic.timeEstimate;
    
    topicScreen.style.display = 'none';
    startScreen.style.display = 'block';
}

function backToTopics() {
    currentTopic = null;
    quizData = [];
    startScreen.style.display = 'none';
    quizHeader.style.display = 'none';
    quizBody.style.display = 'none';
    quizFooter.style.display = 'none';
    resultsScreen.classList.remove('show');
    topicScreen.style.display = 'block';
}

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
    document.querySelectorAll('.question-container').forEach(q => {
        q.classList.remove('active');
    });
    
    const currentQ = document.getElementById(`question-${index}`);
    if (currentQ) {
        currentQ.classList.add('active');
    }
    
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
    
    if (answers[index] !== null) {
        showAnswer(index, answers[index]);
    }
}

function selectOption(questionIndex, optionIndex) {
    if (answers[questionIndex] !== null) return;
    
    answers[questionIndex] = optionIndex;
    showAnswer(questionIndex, optionIndex);
    
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
        option.style.pointerEvents = 'none';
        
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
    
    let finalCorrect = 0;
    answers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            finalCorrect++;
        }
    });
    
    const finalIncorrect = quizData.length - finalCorrect;
    const percentage = (finalCorrect / quizData.length) * 100;
    const topic = getQuizTopic(currentTopic);
    
    document.getElementById('finalScore').textContent = `${finalCorrect}/${quizData.length}`;
    document.getElementById('finalCorrect').textContent = finalCorrect;
    document.getElementById('finalIncorrect').textContent = finalIncorrect;
    
    const messageEl = document.getElementById('resultMessage');
    if (percentage >= 90) {
        messageEl.textContent = `Outstanding! You're a ${topic.title} expert! 🎉`;
    } else if (percentage >= 70) {
        messageEl.textContent = `Great job! You have a solid understanding! 👏`;
    } else if (percentage >= 50) {
        messageEl.textContent = `Good effort! Review the notes to improve! 📚`;
    } else {
        messageEl.textContent = `Keep learning! Check out the interactive content! 💪`;
    }
    
    // Update review notes link
    const reviewBtn = document.getElementById('reviewNotesBtn');
    if (reviewBtn) {
        reviewBtn.href = `notes.html?topic=${currentTopic}`;
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

// ===== URL PARAM SUPPORT =====
(function checkUrlParam() {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');
    if (topic && QUIZ_TOPICS[topic]) {
        selectTopic(topic);
        // Auto-start if requested
        if (params.get('start') === '1') {
            setTimeout(startQuiz, 100);
        }
    }
})();
