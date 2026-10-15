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
const modal = document.querySelector("#modal");
const form = document.querySelector("#form-filme");
const errosFormulario = document.querySelector("#erros-formulario");
const busca = document.querySelector('header input[type="search"]');
const avisoArmazenamento = document.querySelector("#aviso-armazenamento");
const estadoVazio = document.querySelector("#estado-vazio");
const fundo = [...document.body.children].filter((elemento) => elemento !== modal && elemento.tagName !== "SCRIPT");
const POSTER_PADRAO = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><rect width="200" height="300" fill="#202020"/><text x="100" y="150" text-anchor="middle" fill="#f5f5f5" font-family="sans-serif" font-size="16">Sem pôster</text></svg>');
const CHAVE = "cinetrack:filmes";
let filmes = carregar();
let termoAtual = "";
let statusAtual = "todos";
let editandoId = null;
let focoAnterior = null;
let rolagemAnterior = "";

function criarCard(filme) {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.id = filme.id;

    const poster = document.createElement("img");
    poster.src = filme.poster || POSTER_PADRAO;
    poster.alt = `Pôster do filme ${filme.titulo}`;
    poster.width = 100;
    poster.addEventListener("error", () => {
        poster.src = POSTER_PADRAO;
    }, { once: true });

    const titulo = document.createElement("h2");
    titulo.textContent = filme.titulo;
    const detalhes = document.createElement("p");
    detalhes.textContent = `${filme.ano} - ${filme.genero}`;
    const nota = document.createElement("p");
    nota.textContent = `Nota: ${estrelas(filme.nota)}`;
    const badge = document.createElement("span");
    badge.className = `badge ${filme.status}`;
    badge.textContent = rotuloStatus(filme.status);

    const acoes = document.createElement("div");
    acoes.className = "acoes";
    const editar = document.createElement("button");
    editar.className = "editar btn-editar";
    editar.type = "button";
    editar.textContent = "Editar";
    editar.setAttribute("aria-label", `Editar ${filme.titulo}`);
    const remover = document.createElement("button");
    remover.className = "remover btn-remover";
    remover.type = "button";
    remover.textContent = "Remover";
    remover.setAttribute("aria-label", `Remover ${filme.titulo}`);
    acoes.append(editar, remover);
    card.append(poster, titulo, detalhes, nota, badge, acoes);
    return card;
}

function renderizarCards(filmes) {
    const fragmento = document.createDocumentFragment();
    filmes.forEach((filme) => fragmento.appendChild(criarCard(filme)));
    lista.replaceChildren(fragmento);
}

function aplicarFiltros(lista, opcoes) {
    const termo = opcoes.termo.trim().toLowerCase();
    return lista.filter((filme) => filme.titulo.toLowerCase().includes(termo))
        .filter((filme) => opcoes.status === "todos" || filme.status === opcoes.status);
}

function atualizar() {
    termoAtual = busca.value;
    const visiveis = aplicarFiltros(filmes, { termo: termoAtual, status: statusAtual });
    renderizarCards(visiveis);
    estadoVazio.hidden = visiveis.length > 0;
    estadoVazio.textContent = filmes.length === 0
        ? "Sua lista está vazia. Adicione um filme para começar."
        : "Nenhum filme encontrado para esta busca e status.";
    const total = filmes.length;
    document.querySelector("footer small").textContent = `CineTrack © 2026 · ${total} ${total === 1 ? "filme cadastrado" : "filmes cadastrados"}`;
}

function debounce(fn, ms = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

const aoDigitar = () => atualizar();
busca.addEventListener("input", debounce(aoDigitar, 300));

function salvar() {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(filmes));
        avisoArmazenamento.hidden = true;
    } catch {
        avisoArmazenamento.textContent = "Não foi possível salvar no navegador. As alterações estão disponíveis apenas nesta sessão.";
        avisoArmazenamento.hidden = false;
    }
}

function carregar() {
    try {
        const texto = localStorage.getItem(CHAVE);
        if (texto === null) return [...filmesIniciais];
        const dados = JSON.parse(texto);
        if (!Array.isArray(dados) || !dados.every((filme) => filme
            && Number.isInteger(filme.id) && filme.id > 0
            && typeof filme.poster === "string" && typeof filme.comentario === "string"
            && validarFilme(filme).valido)
            || new Set(dados.map((filme) => filme.id)).size !== dados.length) {
            throw new Error("Lista inválida");
        }
        return dados;
    } catch {
        avisoArmazenamento.textContent = "Não foi possível carregar os dados salvos. Exibindo os filmes de exemplo.";
        avisoArmazenamento.hidden = false;
        return [...filmesIniciais];
    }
}

function validarFilme(filme) {
    const erros = [];
    if (typeof filme.titulo !== "string" || !filme.titulo.trim()) erros.push("Informe o título.");
    if (!Number.isInteger(filme.ano) || filme.ano < 1888 || filme.ano > 2030) erros.push("Informe um ano inteiro entre 1888 e 2030.");
    if (typeof filme.genero !== "string" || !filme.genero.trim()) erros.push("Informe o gênero.");
    if (!Number.isInteger(filme.nota) || filme.nota < 1 || filme.nota > 5) erros.push("Informe uma nota inteira entre 1 e 5.");
    if (!["assistido", "assistindo", "quero"].includes(filme.status)) erros.push("Selecione um status válido.");
    if (filme.poster) {
        try {
            const url = new URL(filme.poster);
            if (!["http:", "https:"].includes(url.protocol)) erros.push("Use uma URL HTTP ou HTTPS para o pôster.");
        } catch {
            erros.push("Informe uma URL válida para o pôster ou deixe o campo vazio.");
        }
    }
    return { valido: erros.length === 0, erros };
}

const gerarId = (lista) => Math.max(0, ...lista.map((filme) => filme.id)) + 1;

function abrir() {
    focoAnterior = document.activeElement;
    rolagemAnterior = document.body.style.overflow;
    errosFormulario.hidden = true;
    errosFormulario.textContent = "";
    document.querySelector("#modal-titulo").textContent = editandoId === null ? "Adicionar filme" : "Editar filme";
    modal.hidden = false;
    fundo.forEach((elemento) => elemento.inert = true);
    document.body.style.overflow = "hidden";
    form.elements.titulo.focus();
    modal.querySelector(".modal-conteudo").scrollTop = 0;
}

function fechar() {
    modal.hidden = true;
    fundo.forEach((elemento) => elemento.inert = false);
    document.body.style.overflow = rolagemAnterior;
    const alvo = focoAnterior?.isConnected ? focoAnterior : document.querySelector("header button");
    alvo.focus();
}

function adicionar() {
    editandoId = null;
    form.reset();
    abrir();
}

document.querySelector("header button").addEventListener("click", adicionar);
document.querySelector('footer a[href="adicionar.html"]').addEventListener("click", (evento) => {
    evento.preventDefault();
    adicionar();
});
form.querySelector('button[type="button"]').addEventListener("click", fechar);

document.addEventListener("keydown", (evento) => {
    if (modal.hidden) return;
    if (evento.key === "Escape") fechar();
    if (evento.key !== "Tab") return;
    const campos = [...form.querySelectorAll("input, select, textarea, button")];
    const primeiro = campos[0];
    const ultimo = campos[campos.length - 1];
    if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
    }
});

lista.addEventListener("click", (evento) => {
    const botao = evento.target.closest(".btn-remover, .btn-editar");
    if (!botao) return;
    const id = Number(botao.closest(".card").dataset.id);
    if (botao.classList.contains("btn-remover")) {
        if (!confirm("Remover este filme?")) return;
        filmes = filmes.filter((filme) => filme.id !== id);
        salvar();
        atualizar();
    } else {
        const filme = filmes.find((filme) => filme.id === id);
        editandoId = id;
        for (const campo of ["titulo", "ano", "genero", "poster", "status", "nota", "comentario"]) {
            form.elements[campo].value = filme[campo];
        }
        abrir();
    }
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const dados = Object.fromEntries(new FormData(form));
    for (const campo of ["titulo", "genero", "poster", "comentario"]) dados[campo] = dados[campo].trim();
    dados.ano = Number(dados.ano);
    dados.nota = Number(dados.nota);
    const { valido, erros } = validarFilme(dados);
    if (!valido) {
        errosFormulario.textContent = erros.join("\n");
        errosFormulario.hidden = false;
        errosFormulario.focus();
        return;
    }
    if (editandoId !== null) {
        filmes = filmes.map((filme) => filme.id === editandoId ? { ...filme, ...dados } : filme);
    } else {
        filmes = [...filmes, { id: gerarId(filmes), ...dados }];
    }
    salvar();
    atualizar();
    fechar();
});

nav.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button");
    if (!botao) return;
    nav.querySelectorAll("button").forEach((filtro) => {
        const ativo = filtro === botao;
        filtro.classList.toggle("ativo", ativo);
        filtro.setAttribute("aria-pressed", String(ativo));
    });
    statusAtual = botao.dataset.status;
    atualizar();
});

atualizar();
