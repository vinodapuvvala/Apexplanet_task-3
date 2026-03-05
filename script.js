// ================= CAROUSEL =================

const slides = [
    "https://picsum.photos/id/1005/800/400",
    "https://picsum.photos/id/1011/800/400",
    "https://picsum.photos/id/984/800/400"
];

let slideIndex = 0;

function showSlide() {
    document.getElementById("carouselImage").src = slides[slideIndex];
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide();
}

// ================= QUIZ =================

const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Machine Learning",
            "Home Tool Markup Language",
            "Hyperlinks and Text Machine"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Netscape", "Google", "IBM"],
        answer: "Netscape"
    },
    {
        question: "Which CSS property changes text color?",
        options: ["font-style", "color", "background", "text-align"],
        answer: "color"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const selectEl = document.getElementById("answerSelect");
const feedbackEl = document.getElementById("feedback");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;

    selectEl.innerHTML = '<option value="">-- Choose Answer --</option>';

    q.options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        selectEl.appendChild(opt);
    });

    feedbackEl.textContent = "";
}

function checkAnswer() {
    const selected = selectEl.value;

    if (selected === "") {
        feedbackEl.textContent = "Please select an answer!";
        feedbackEl.className = "wrong";
        return;
    }

    if (selected === quizData[currentQuestion].answer) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.className = "correct";
        score++;
    } else {
        feedbackEl.textContent = "Wrong!";
        feedbackEl.className = "wrong";
    }

    scoreEl.textContent = "Score: " + score;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        questionEl.textContent = "Quiz Finished!";
        selectEl.style.display = "none";
        feedbackEl.textContent = "";
    }
}

// ================= API =================

function getJoke() {
    fetch("https://official-joke-api.appspot.com/random_joke")
        .then(res => res.json())
        .then(data => {
            document.getElementById("joke").innerText =
                data.setup + " 😂 " + data.punchline;
        })
        .catch(() => {
            document.getElementById("joke").innerText =
                "Unable to fetch joke.";
        });
}

loadQuestion();