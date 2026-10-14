function rotuloStatus(status) {
    if (status === "assistido") return "Assistido";
    if (status === "assistindo") return "Assistindo";
    if (status === "quero") return "Quero assistir";
    return status;
}

const estrelas = (nota) => {
    let resultado = "";
    for (let i = 1; i <= 5; i++) {
        resultado += i <= nota ? "★" : "☆";
    }
    return resultado;
};

const filmesIniciais = [
    {
        id: 1,
        titulo: "A Origem",
        ano: 2010,
        genero: "Ficção científica",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Revejo sempre."
    },
    {
        id: 2,
        titulo: "Parasita",
        ano: 2019,
        genero: "Suspense",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg",
        nota: 4,
        status: "assistido",
        comentario: ""
    },
    {
        id: 3,
        titulo: "O Auto da Compadecida",
        ano: 2000,
        genero: "Comédia",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/imcOp1kJsCsAFCoOtY5OnPrFbAf.jpg",
        nota: 5,
        status: "assistido",
        comentario: "Classico nacional."
    },
    {
        id: 4,
        titulo: "Duna: Parte Dois",
        ano: 2024,
        genero: "Ficção científica",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/8LJJjLjAzAwXS40S5mx79PJ2jSs.jpg",
        nota: 4,
        status: "assistindo",
        comentario: ""
    },
    {
        id: 5,
        titulo: "Interestelar",
        ano: 2014,
        genero: "Ficção científica",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg",
        nota: 5,
        status: "quero",
        comentario: ""
    },
    {
        id: 6,
        titulo: "Cidade de Deus",
        ano: 2002,
        genero: "Drama",
        poster: "https://www.themoviedb.org/t/p/w600_and_h900_face/gfnXixcGC060QcG6JPxN6AMdVsq.jpg",
        nota: 4,
        status: "quero",
        comentario: ""
    }
];

const lista = document.querySelector("#lista");
const nav = document.querySelector('nav[aria-label="Filtros de status"]');
let filmes = [...filmesIniciais];

function renderizarCards(filmes) {
    lista.innerHTML = filmes.map((filme) => `
        <article class="card" data-id="${filme.id}">
            <img src="${filme.poster}" alt="Pôster do filme ${filme.titulo}" width="100">
            <h2>${filme.titulo}</h2>
            <p>${filme.ano} - ${filme.genero}</p>
            <p>Nota: ${estrelas(filme.nota)}</p>
            <span class="badge ${filme.status}">${rotuloStatus(filme.status)}</span>
            <div class="acoes">
                <button class="editar btn-editar" type="button">Editar</button>
                <button class="remover btn-remover" type="button">Remover</button>
            </div>
        </article>
    `).join("");
}

lista.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".btn-remover");
    if (!botao) return;
    if (!confirm("Remover este filme?")) return;
    const id = Number(botao.closest(".card").dataset.id);
    filmes = filmes.filter((filme) => filme.id !== id);
    const status = nav.querySelector(".ativo").dataset.status;
    renderizarCards(filmes.filter((filme) => status === "todos" || filme.status === status));
});

nav.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button");
    if (!botao) return;
    nav.querySelector(".ativo").classList.remove("ativo");
    botao.classList.add("ativo");
    const status = botao.dataset.status;
    renderizarCards(filmes.filter((filme) => status === "todos" || filme.status === status));
});

renderizarCards(filmes);

const TOTAL = 6;
document.querySelector("footer small").textContent = `CineTrack © 2026 · ${TOTAL} filmes cadastrados`;
