async function displayNewQuestion(question) {
    document.getElementById("container2").style.display = "none";

    question = await generateQuestion();
    populateTarot(question);

    await Promise.all([
        populateCards(question),
        Promise.all(Array.from(document.querySelectorAll(".playing-front")).map(waitForImage))
    ]);

    document.getElementById("container1").style.display = "flex";

    flipCard("cardAContainer");
    flipCard("cardBContainer");
    flipCard("cardCContainer");
}

function populateCards(question) {
    const a = document.getElementById("cardAContainer");
    const b = document.getElementById("cardBContainer");
    const c = document.getElementById("cardCContainer");

    a.src = `resources/images/cards/${question.cardA.id}.png`;
    b.src = `resources/images/cards/${question.cardB.id}.png`;
    c.src = `resources/images/cards/${question.cardC.id}.png`;

    return Promise.all([
        waitForImage(a),
        waitForImage(b),
        waitForImage(c)
    ]);
}
function populateTarot(question){
    tarotImage = "resources/images/tarot/";
    if (question.tarot.reversed) {
        tarotImage += question.tarot.id.slice(0, -2);
    } else {
        tarotImage += question.tarot.id;
    }
    tarotImage += ".png";
    document.getElementById("tarotImage").src = tarotImage;
    document.getElementById("tarotImageContainer").classList.toggle("reversed", question.tarot.reversed);

    document.getElementById("tarotName").innerText = question.tarot.name;

    let items = question.tarot.description.split(";").map(item => item.trim());
    if (items.length > 0) {
        items[0] = items[0].charAt(0).toLowerCase() + items[0].slice(1); // decapitalize first letter
    }

    let bulletList = '<ul>';
    items.forEach(item => {
        bulletList += `<li>${item}</li>`;
    });
    bulletList += '</ul>';

    document.getElementById("tarotDescription").innerHTML = bulletList;
}
function flipCard(containerName) {
    const el = document.getElementById(containerName); 
    const card = el.closest(".card"); 
    
    card.classList.remove("flip"); 
    requestAnimationFrame(() => { 
        requestAnimationFrame(() => { 
            card.classList.add("flip"); 
        }); 
    }); 
}
function waitForImage(img) {
    return new Promise(resolve => {
        if (img.complete) {
            resolve();
        } else {
            img.onload = resolve;
            img.onerror = resolve; 
        }
    });
}


// Hook up buttons
document.getElementById("showBtn").addEventListener("click", async () => {
    const questionContainer = document.getElementById("container1");
    const answerContainer = document.getElementById("container2");
    if (questionContainer.style.display == "flex") {
        questionContainer.style.display = "none";
        answerContainer.style.display = "flex";
        flipCard("tarotImageContainer");
    } else {
        questionContainer.style.display = "flex";
        answerContainer.style.display = "none";
        flipCard("cardAContainer");
        flipCard("cardBContainer");
        flipCard("cardCContainer");
    }
})

document.getElementById("againBtn").addEventListener("click", async () => {
    await displayNewQuestion();
});

document.getElementById("toggleCheat").addEventListener("click", async () => {
    const cheatSheet = document.getElementById("cheatsheet");
    if ((cheatSheet.style.display === "none")|| (cheatSheet.style.display === "")){
        cheatSheet.style.display = "flex";
    } else {
        cheatSheet.style.display = "none";
    }
});
