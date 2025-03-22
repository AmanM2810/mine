const noLabel = document.getElementById("noLabel");
const noCheckbox = document.getElementById("no");
const yesCheckbox = document.getElementById("yes");
const questionsContainer = document.getElementById("questions-container");
const initialCheckboxes = document.getElementById("initial-checkboxes");
const mainHeading = document.getElementById("main-heading");

let score = 0;
const totalQuestions = 5;

function moveNoButton() {
    noLabel.style.transition = "transform 0.1s ease";
    noLabel.style.transform = `translateX(${Math.random() * 200 + 50}px) translateY(${Math.random() * 100 + 50}px)`;
}

noCheckbox.addEventListener("click", function (event) {
    event.preventDefault();
    moveNoButton();
});

noCheckbox.addEventListener("mouseover", function () {
    moveNoButton();
});

yesCheckbox.addEventListener("change", function () {
    if (yesCheckbox.checked) {
        mainHeading.textContent = "Great! Let's start the questions.";
        initialCheckboxes.style.display = "none";
        questionsContainer.style.display = "block";
        showNextQuestion(1);
    }
});

function showNextQuestion(questionNumber) {
    for (let i = 1; i <= totalQuestions; i++) {
        const currentQuestion = document.getElementById(`question${i}`);
        if (currentQuestion) {
            currentQuestion.style.display = "none";
        }
    }
    const current = document.getElementById(`question${questionNumber}`);
    if (current) {
        current.style.display = "block";
    }
}

function checkAnswer(questionName, correctAnswer, questionNumber) {
    const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
    const feedback = document.getElementById(`feedback-${questionName}`);

    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === correctAnswer) {
            score++;
            feedback.innerHTML = '<span class="green">Correct!</span>';
            showPopup(true);
        } else {
            feedback.innerHTML = '<span class="red">Incorrect!</span>';
            showPopup(false);
        }

        const radios = document.querySelectorAll(`input[name="${questionName}"]`);
        radios.forEach(radio => radio.disabled = true);

        setTimeout(() => {
            if (questionNumber < totalQuestions) {
                showNextQuestion(questionNumber + 1);
            } else {
                showFinalScore();
            }
        }, 1000);
    }
}

function showPopup(isCorrect) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <div class="message">
            ${isCorrect ? "Chlo kuch to pata hai tumhe (huihui)" : "Ab tum pitogi !!!"}
        </div>
        <button onclick="closeAllPopups()">Close</button>
    `;
    document.body.appendChild(popup);
    popup.style.display = "block";
}

function showFinalScore() {
    if (score === totalQuestions) {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="message">🎉 Oho aapko to sb kuch pata hai !! Ye raha aapka liye kuch 🎁</div>
            <button onclick="openPresent()">Open Present</button>
        `;
        document.body.appendChild(popup);
        popup.style.display = "block";
    } else {
        const finalMessage = `You scored ${score} out of ${totalQuestions}. Ab to tum pakka pitogi`;
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="message">${finalMessage}</div>
            <button onclick="closeAllPopups()">Close</button>
        `;
        document.body.appendChild(popup);
        popup.style.display = "block";
    }
}

function openPresent() {
    document.querySelectorAll(".popup").forEach(popup => popup.remove());

    const videoPopup = document.createElement("div");
    videoPopup.classList.add("popup", "video-popup");
    videoPopup.innerHTML = `
        <video width="800" height="450" controls autoplay>
            <source src="VN20250322_151234.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <button onclick="closeVideoPopup()">Close</button>
    `;
    document.body.appendChild(videoPopup);
    videoPopup.style.display = "block";
}

function closeVideoPopup() {
    document.querySelector(".video-popup").remove();
    showMagicAnimation();
}

function showMagicAnimation() {
    const magic = document.createElement("div");
    magic.classList.add("magic-animation");
    magic.innerHTML = `
        <div class="sparkles">✨✨✨</div>
        <h2>Since you love me so much, there’s a special love letter for you! 💌</h2>
        <button onclick="showLoveLetter()">Open Love Letter</button>
    `;
    document.body.appendChild(magic);
    setTimeout(() => {
        magic.style.opacity = "1";
    }, 100);
}


function showLoveLetter() {
    document.querySelector(".magic-animation").remove();

    const loveLetter = document.createElement("div");
    loveLetter.classList.add("love-letter");
    loveLetter.innerHTML = `
        <div class="closed-letter" onclick="openLetter()">
            💌 Tap to Open 💌
        </div>
        <div class="letter-content">
            <p>My dearest Anya(pohi),</p>
            <p>You are the most special person in my life, and I can't imagine a day without you now.</p>
            <p>Every moment with you is magic, and I promise to cherish you forever. 💖</p>
            <p>Yours always,</p>
            <p><b>Your puchu</b></p>
            <button onclick="closeAllPopups()">Close</button>
        </div>
    `;
    document.body.appendChild(loveLetter);
}

function openLetter() {
    document.querySelector(".closed-letter").style.display = "none"; // Hide the closed letter
    document.querySelector(".letter-content").style.display = "block"; // Show the love letter
}


function openLetter() {
    document.querySelector(".closed-letter").style.display = "none";
    document.querySelector(".letter-content").style.display = "block";
}

function closeLoveLetter() {
    document.querySelector(".love-letter").remove();

    // Create a full-screen black overlay
    const blackScreen = document.createElement("div");
    blackScreen.style.position = "fixed";
    blackScreen.style.top = "0";
    blackScreen.style.left = "0";
    blackScreen.style.width = "100%";
    blackScreen.style.height = "100%";
    blackScreen.style.backgroundColor = "black";
    blackScreen.style.zIndex = "1000";
    document.body.appendChild(blackScreen);

    // Show animated "puchi puchi puchi 😚" text
    const puchiText = document.createElement("div");
    puchiText.style.position = "absolute";
    puchiText.style.top = "50%";
    puchiText.style.left = "50%";
    puchiText.style.transform = "translate(-50%, -50%)";
    puchiText.style.fontSize = "50px";
    puchiText.style.color = "white";
    puchiText.style.fontWeight = "bold";
    puchiText.style.opacity = "0";
    puchiText.style.transition = "opacity 1s ease-in-out";
    puchiText.innerHTML = "puchi puchi puchi 😚";
    blackScreen.appendChild(puchiText);

    setTimeout(() => {
        puchiText.style.opacity = "1";
    }, 500);

    setTimeout(() => {
        puchiText.style.opacity = "0";
    }, 2500);

    setTimeout(() => {
        playFinalVideo(blackScreen);
    }, 3500);
}

function playFinalVideo(blackScreen) {
    blackScreen.innerHTML = `
        <video width="100%" height="100%" controls autoplay>
            <source src="Snapchat-687175969.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
}

// Modify the existing closeAllPopups function to trigger closeLoveLetter()
function closeAllPopups() {
    if (document.querySelector(".love-letter")) {
        closeLoveLetter(); // Only trigger after closing the love letter
    } else {
        document.querySelectorAll(".popup, .magic-animation").forEach(el => el.remove());
    }
}
