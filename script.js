const chefeNome = document.getElementById("chefe-nome");
const chefeImg = document.getElementById("chefe-img");
const fila = document.getElementById("fila");
const resultado = document.getElementById("resultado");
const btnAdd = document.getElementById("btnAdd");
const btnBatalhar = document.getElementById("btnBatalhar");
const btnUp = document.getElementById("scroll-up");
const btnDown = document.getElementById("scroll-down");

let chefe = null;
let desafiantes = [];

async function getRandomPokemon() {
  const maxId = 898; // Último Pokémon conhecido
  const id = Math.floor(Math.random() * maxId) + 1;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return {
    nome: data.name,
    imagem: data.sprites.front_default,
    poder: Math.floor(Math.random() * 100) + 50
  };
}

async function carregarChefe() {
  chefe = await getRandomPokemon();
  chefeNome.textContent = `Chefe: ${chefe.nome}`;
  chefeImg.src = chefe.imagem;
}

btnAdd.addEventListener("click", async () => {
  if (desafiantes.length > 0) {
    desafiantes.shift();
    if (fila.firstChild) fila.removeChild(fila.firstChild);
  }

  const personagem = await getRandomPokemon();
  desafiantes.push(personagem);

  const li = document.createElement("li");
  li.innerHTML = `<img src="${personagem.imagem}" alt="${personagem.nome}">${personagem.nome} (Poder: ${personagem.poder})`;
  fila.appendChild(li);
});

btnBatalhar.addEventListener("click", () => {
  if (desafiantes.length === 0) {
    resultado.textContent = "⚠️ Nenhum desafiante na fila!";
    return;
  }

  const desafiante = desafiantes.shift();
  if (fila.firstChild) fila.removeChild(fila.firstChild);

  let vencedor;
  if (desafiante.poder > chefe.poder) {
    vencedor = `${desafiante.nome} venceu o chefe ${chefe.nome}! 🏆`;
    resultado.style.color = "#4CAF50";
  } else if (desafiante.poder < chefe.poder) {
    vencedor = `${chefe.nome} derrotou ${desafiante.nome}! 💀`;
    resultado.style.color = "#ff4da6";
  } else {
    vencedor = `Empate entre ${chefe.nome} e ${desafiante.nome}! ⚡`;
    resultado.style.color = "#ffcc00";
  }

  resultado.textContent = vencedor;
});

btnUp.addEventListener("click", () => fila.scrollTop -= 50);
btnDown.addEventListener("click", () => fila.scrollTop += 50);

carregarChefe();
