let
  quoteContent = document.querySelector(".quote-content p"),
  quoteAuthor = document.querySelector(".quote-content span"),
  quoteBtn = document.querySelector(".quote-btn"),
  readBtn = document.querySelector(".read"),
  twitterBtn = document.querySelector(".twitter"),
  copyBtn = document.querySelector(".copy");





function quoteG() {
  quoteBtn.classList.add("loading");
  quoteBtn.innerText = "تحميل...";
  var r = Math.floor(Math.random() * 100);
  fetch(`https://datasets-server.huggingface.co/rows?dataset=HeshamHaroon%2Farabic-quotes&config=default&split=train&offset=${r}&length=100`).then(res => res.json()).then(result => {
    quoteContent.innerText = result.rows[r].row.quote;
    quoteAuthor.innerText = `- ${result.rows[r].row.author}`;
    quoteBtn.classList.remove("loading");
    quoteBtn.innerText = "إقتباس جديد";
  })
}



readBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance();

  utterance.rate = .9;
  utterance.lang = 'ar';
  utterance.text = `${quoteContent.innerText}`;
  readBtn.innerHTML = `<i class="fa-solid fa-microphone-lines"></i>`;
  readBtn.style.background = "#828282";
  readBtn.style.color = "#eee";
  utterance.addEventListener("end", () => {
    readBtn.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
    readBtn.style.background = "#eee";
    readBtn.style.color = "#828282";
  });
  window.speechSynthesis.speak(utterance);
});


copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(quoteContent.innerText);
  copyBtn.innerHTML = `<i class="fa-solid fa-check"></i>`
  copyBtn.style.background = "#828282";
  copyBtn.style.color = "#eee";
  setTimeout(() => {
    copyBtn.style.background = "#eee";
    copyBtn.style.color = "#828282";
    copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`;
  }, 800);
});


twitterBtn.addEventListener("click", () => {
  let urlTwitter = `https://x.com/intent/tweet?url=${quoteContent.innerText} ${quoteAuthor.innerText}`;
  window.open(urlTwitter, "_blank");
});

quoteBtn.addEventListener("click", quoteG);
