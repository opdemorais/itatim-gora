document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    alert("Mensagem enviada com sucesso! Obrigado por sua colaboração.");

    // Lógica para enviar a mensagem pode ser implementada aqui
    // Exemplo: Envio para um servidor ou API externa
  });
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const query = document.getElementById("search-input").value.toLowerCase();
    const newsItems = document.querySelectorAll(".news-item");

    newsItems.forEach((item) => {
      const title = item.querySelector("h3").textContent.toLowerCase();
      const content = item.querySelector("p").textContent.toLowerCase();
      if (title.includes(query) || content.includes(query)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
const express = require("express");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "itatim_agora",
});

app.get("/noticias", (req, res) => {
  const sql = "SELECT * FROM noticias";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
fetch("/noticias")
  .then((response) => response.json())
  .then((noticias) => {
    const newsContainer = document.querySelector(".news-container");
    newsContainer.innerHTML = "";

    noticias.forEach((noticia) => {
      const article = document.createElement("article");
      article.classList.add("news-item");
      article.innerHTML = `
                <img src="${noticia.imagem_url}" alt="${noticia.titulo}">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.conteudo.substring(0, 100)}...</p>
                <a href="#">Leia mais</a>
            `;
      newsContainer.appendChild(article);
    });
  });
document
  .getElementById("add-news-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const categoria = document.getElementById("categoria").value;
    const conteudo = document.getElementById("conteudo").value;
    const imagem_url = document.getElementById("imagem_url").value;

    const newArticle = {
      titulo,
      categoria,
      conteudo,
      imagem_url,
    };

    fetch("/add-noticia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArticle),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Notícia adicionada com sucesso!");
      });
  });
app.post("/add-noticia", (req, res) => {
  const noticia = req.body;
  const sql = "INSERT INTO noticias SET ?";
  db.query(sql, noticia, (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: "Notícia adicionada com sucesso!" });
  });
});
