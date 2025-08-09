const produtos = [
  {
    nome: "Pulseira Multicor inicial",
    preco: 3.00,
    imagem: "midias/WhatsApp Image 2025-08-09 at 14.48.19.jpeg "
  },
  {
    nome: "Chaveiro 2 Cores",
    preco: 9.00,
    imagem: "midias/WhatsApp Image 2025-08-09 at 14.48.20 (1).jpeg"
  },
  {
    nome: "Pulseira Dourada",
    preco: 2.50,
    imagem: "midias/WhatsApp Image 2025-08-09 at 17.02.22.jpeg"
  },
  {
    nome: "Kit dourado(colar,\npulseira,anel)",
    preco: 15.00,
    imagem: "midias/WhatsApp Image 2025-08-09 at 17.02.23.jpeg"
  }
];

const promocoes = [
  {
    nome: "Kit Anel Meninas Super-Poderosas",
    preco: 3.00,
    precoOriginal: 5.00,
    imagem: "midias/powerrangers.jpeg"
  },
  {
    nome: "Kit Anel e Pulseira Amarelo",
    preco: 4.00,
    precoOriginal: 6.00,
    imagem: "midias/WhatsApp Image 2025-08-09 at 14.48.21.jpeg"
  }
];

let carrinho = [];

function renderizarProdutos() {
  const container = document.getElementById("lista-produtos");
  produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>R$ ${produto.preco.toFixed(2)}</p>
      <button onclick="adicionarCarrinho(${index})">Adicionar</button>
    `;
    container.appendChild(card);
  });
}

function renderizarPromocoes() {
  const container = document.getElementById("lista-promocoes");
  promocoes.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "produto";
    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p><del>R$ ${produto.precoOriginal.toFixed(2)}</del><br><strong style="color: #e0559f;">R$ ${produto.preco.toFixed(2)}</strong></p>
      <button onclick="adicionarPromocao(${index})">Adicionar</button>
    `;
    container.appendChild(card);
  });
}

function adicionarCarrinho(index) {
  carrinho.push(produtos[index]);
  atualizarCarrinho();
}

function adicionarPromocao(index) {
  carrinho.push(promocoes[index]);
  atualizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const totalTexto = document.getElementById("total");
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;
    const li = document.createElement("li");
    li.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} 
      <button onclick="removerItem(${index})">🗑️</button>`;
    lista.appendChild(li);
  });

  totalTexto.innerText = `Total: R$ ${total.toFixed(2)}`;
}

function enviarWhatsApp() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = "Olá! Gostaria de fazer o pedido:\n\n";
  let total = 0;
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
    total += item.preco;
  });
  mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

  const numero = "553498628530";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

document.getElementById("form-personalizado").addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = document.getElementById("nomeCliente").value.trim();
  const casa = document.getElementById("casaCliente").value.trim();
  const mensagem = document.getElementById("mensagemPedido").value.trim();

  if (!nome || !mensagem) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  let texto = `Olá! Sou ${nome}`;
  if (casa) texto += ` da casa ${casa}`;
  texto += `.\nGostaria de fazer um pedido personalizado:\n\n"${mensagem}"`;

  const numero = "553498628530";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
});

renderizarProdutos();
renderizarPromocoes();


