async function displayNewQuestion(question) {
    document.getElementById("container2").style.display = "none";
    question = await generateQuestion();
    populateCards(question);
    populateTarot(question);
    document.getElementById("container1").style.display = "flex";
    
    flipCard(document.getElementById("cardAContainer").closest(".card")); flipCard(document.getElementById("cardBContainer").closest(".card")); flipCard(document.getElementById("cardCContainer").closest(".card"));
}
function populateCards(question){
    document.getElementById("cardAContainer").src =
        `resources/images/cards/${question.cardA.id}.png`;

    document.getElementById("cardBContainer").src =
        `resources/images/cards/${question.cardB.id}.png`;

    document.getElementById("cardCContainer").src =
        `resources/images/cards/${question.cardC.id}.png`;
}
function populateTarot(question){
    tarotImage = "resources/images/tarot/";
    if (question.tarot.reversed) {
        tarotImage += question.tarot.id.slice(0, -2);
    } else {
        tarotImage += question.tarot.id;
    }
    tarotImage += ".png";
    document.getElementById("tarotImageContainer").innerHTML = `
    <img 
        src="${tarotImage}" 
        alt="Tarot Card"
        class="${question.tarot.reversed ? 'reversed' : ''}"
    >
    `;

    document.getElementById("tarotName").innerText = question.tarot.name;
    document.getElementById("tarotDescription").innerText = question.tarot.description;
}
function flipCard(card) {
  card.classList.remove("flip");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      card.classList.add("flip");
    });
  });
}


// Hook up buttons
document.getElementById("showBtn").addEventListener("click", async () => {
    const questionContainer = document.getElementById("container1");
    const answerContainer = document.getElementById("container2");
    if (questionContainer.style.display == "flex") {
        questionContainer.style.display = "none";
        answerContainer.style.display = "flex";
    } else {
        questionContainer.style.display = "flex";
        answerContainer.style.display = "none";
    }
})

document.getElementById("againBtn").addEventListener("click", async () => {
    await displayNewQuestion();
});
