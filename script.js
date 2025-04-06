let username = '';
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10; // 10 seconds for each question
let selectedGenre = '';

const questions = {
    math: [
        { question: "1. What is 5 + 3?", answers: ["6", "7", "8", "9"], correct: "8" },
        { question: "2. What is 10 - 4?", answers: ["5", "6", "7", "8"], correct: "6" },
        { question: "3. What is 3 × 2?", answers: ["4", "5", "6", "7"], correct: "6" },
        { question: "4. What is 12 ÷ 3?", answers: ["2", "3", "4", "5"], correct: "4" },
        { question: "5. What is the square of 5?", answers: ["20", "25", "30", "35"], correct: "25" },
        { question: "6. What is 15% of 200?", answers: ["25", "30", "35", "40"], correct: "30" },
        { question: "7. What is the value of x in the equation 2x + 3 = 11?", answers: ["2", "3", "4", "5"], correct: "4" },
        { question: "8. What is the area of a triangle with a base of 10 and a height of 5?", answers: ["25", "30", "35", "40"], correct: "25" },
        { question: "9. What is the square root of 144?", answers: ["10", "11", "12", "13"], correct: "12" },
        { question: "10. If the angles of a triangle are 30° and 60°, what is the third angle?", answers: ["60°", "90°", "120°", "150°"], correct: "90°" }
    ],
    science: [
        { question: "1. What is the boiling point of water?", answers: ["100°C", "90°C", "80°C", "70°C"], correct: "100°C" },
        { question: "2. What is the chemical symbol for oxygen?", answers: ["O", "O2", "Ox", "O3"], correct: "O" },
        { question: "3. What planet is known as the Red Planet?", answers: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Mars" },
        { question: "4. What gas do plants absorb from the atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: "Carbon Dioxide" },
        { question: "5. What is the most abundant gas in the Earth's atmosphere?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], correct: "Nitrogen" },
        { question: "6. What part of the cell contains genetic material?", answers: ["Cytoplasm", "Nucleus", "Membrane", "Ribosome"], correct: "Nucleus" },
        { question: "7. What is Newton's second law of motion?", answers: ["For every action, there is an equal and opposite reaction.", "Force equals mass times acceleration.", "Energy cannot be created or destroyed.", "Objects in motion stay in motion."], correct: "Force equals mass times acceleration." },
        { question: "8. What type of bond involves the sharing of electron pairs?", answers: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct: "Covalent" },
        { question: "9. What is the pH level of pure water?", answers: ["0", "7", "14", "10"], correct: "7" },
        { question: "10. What is the main function of red blood cells?", answers: ["To fight infections", "To carry oxygen", "To clot blood", "To transport nutrients"], correct: "To carry oxygen" }
    ],
    history: [
        { question: "1. Who was the first president of the USA?", answers: ["Lincoln", "Washington", "Jefferson"], correct: "Washington" },
        { question: "2. In which year did the Titanic sink?", answers: ["1910", "1912", "1914", "1916"], correct: "1912" },
        { question: "3. What ancient civilization built the pyramids?", answers: ["Romans", "Greeks", "Egyptians", "Mayans"], correct: "Egyptians" },
        { question: "4. Who wrote the Declaration of Independence?", answers: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"], correct: "Thomas Jefferson" },
        { question: "5. What war was fought between the North and South regions in the United States?", answers: ["World War I", "World War II", "Civil War", "Revolutionary War"], correct: "Civil War" },
        { question: "6. What was the main cause of World War I?", answers: ["Economic crisis", "Assassination of Archduke Ferdinand", "Colonial disputes", "Nazi expansion"], correct: "Assassination of Archduke Ferdinand" },
        { question: "7. Which empire was known for its road system and postal service?", answers: ["Roman Empire", "Ottoman Empire", "British Empire", "Mongol Empire"], correct: "Roman Empire" },
        { question: "8. What was the primary outcome of the Cold War?", answers: ["Nuclear disarmament", "Fall of the Berlin Wall", "Rise of communism", "Establishment of the EU"], correct: "Fall of the Berlin Wall" },
        { question: "9. Who was the first female Prime Minister of the United Kingdom?", answers: ["Theresa May", "Margaret Thatcher", "Angela Merkel", "Golda Meir"], correct: "Margaret Thatcher" },
        { question: "10. Which document ended the American Revolutionary War?", answers: ["The Constitution", "The Bill of Rights", "The Treaty of Paris", "The Declaration of Independence"], correct: "The Treaty of Paris" }
    ]
};

function startQuiz() {
    username = document.getElementById('username').value;
    if (username === '') {
        alert('Please enter your name');
        return;
    }
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('genre-selection').style.display = 'block';
}

function startGenre(genre) {
    selectedGenre = genre; // Store the selected genre
    document.getElementById('genre-selection').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    currentQuestionIndex = 0;
    score = 0;
    showQuestion(selectedGenre); // Use the stored genre
}

function showQuestion(genre) {
    if (currentQuestionIndex >= questions[genre].length) {
        endQuiz();
        return;
    }
    const questionData = questions[genre][currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = `
        <p>${questionData.question}</p>
        ${questionData.answers.map((answer) => `<div class="option"><button onclick="checkAnswer('${answer}', '${questionData.correct}')">${answer}</button></div>`).join('')}
    `;
    
    document.getElementById('result').innerHTML = '';
    startTimer();
}


function checkAnswer(answer, correct) {
    clearInterval(timer); // Stop the timer
    if (answer === correct) {
        score += 10;
        document.getElementById('result').innerHTML = 'Correct!';
    } else {
        document.getElementById('result').innerHTML = `Wrong! The correct answer is: ${correct}`;
    }
    currentQuestionIndex++;
    setTimeout(() => showQuestion(selectedGenre), 3000); // Use the stored genre
}

function startTimer() {
    timeLeft = 10; // Reset time left
    document.getElementById('timer').innerHTML = `Time left: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerHTML = `Time left: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer); // Stop the timer
            document.getElementById('result').innerHTML = 'Time is up!';
            currentQuestionIndex++;
            setTimeout(() => showQuestion(selectedGenre), 3000); // Use the stored genre
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('final').style.display = 'block';
    document.getElementById('final-username').innerText = username;
    document.getElementById('final-score').innerText = score;
}

function restartQuiz() {
    document.getElementById('final').style.display = 'none'; // Hide final page
    document.getElementById('welcome').style.display = 'block'; // Show welcome page
    currentQuestionIndex = 0; // Reset question index
    score = 0; // Reset score
}


function pauseQuiz() {
    clearInterval(timer); // Stop the timer
}


function resumeQuiz() {
    startTimer();
}
