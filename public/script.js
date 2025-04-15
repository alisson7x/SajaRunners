import { firebaseConfig } from './firebaseConfig.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cadastroForm");
  const tabela = document.querySelector("#tabelaParticipantes tbody");
  const totalSpan = document.getElementById("totalParticipantes");

  function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function formatarNome(nome) {
    return removerAcentos(
      nome
        .toLowerCase()
        .split(" ")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ")
    );
  }

  function carregarParticipantes() {
    db.ref("participantes").once("value", (snapshot) => {
      tabela.innerHTML = "";
      let contador = 1;
      let total = 0;

      snapshot.forEach((child) => {
        const p = child.val();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${contador}</td>
          <td>${p.nome}</td>
          <td>${p.confirmado}</td>
          <td>${p.modalidade}</td>
        `;
        tabela.appendChild(row);
        contador++;
        total++;
      });

      totalSpan.textContent = total;
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeInput = document.getElementById("nome").value.trim();
    const nomeFormatado = formatarNome(nomeInput);
    const modalidade = document.getElementById("modalidade").value;
    const confirmado = document.getElementById("confirmado").value;

    if (!nomeFormatado || !modalidade || !confirmado) {
      alert("Preencha todos os campos.");
      return;
    }

    // Verifica se o nome já existe (ignorando acentos e maiúsculas/minúsculas)
    db.ref("participantes")
      .once("value")
      .then((snapshot) => {
        let existe = false;

        snapshot.forEach((child) => {
          const nomeExistente = removerAcentos(child.val().nome.toLowerCase());
          const nomeNovo = removerAcentos(nomeFormatado.toLowerCase());

          if (nomeExistente === nomeNovo) {
            existe = true;
          }
        });

        if (existe) {
          alert("⚠️ Este nome já está cadastrado.");
        } else {
          const novoParticipante = {
            nome: nomeFormatado,
            modalidade,
            confirmado,
          };

          db.ref("participantes")
            .push(novoParticipante)
            .then(() => {
              alert("✅ Inscrição realizada com sucesso!");
              form.reset();
              carregarParticipantes();
            })
            .catch((error) => {
              alert("❌ Erro ao cadastrar: " + error.message);
            });
        }
      });
  });

  carregarParticipantes();
});
