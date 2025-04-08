document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");
    const tabela = document.getElementById("tabelaParticipantes").querySelector("tbody");
  
    function carregarParticipantes() {
      const participantes = JSON.parse(localStorage.getItem("participantes")) || [];
      tabela.innerHTML = "";
  
      participantes.forEach(part => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${part.nome}</td>
          <td>${part.modalidade}</td>
          <td>${p.confirmado}</td>
        `;
        tabela.appendChild(row);
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const novoParticipante = {
        nome: document.getElementById("nome").value,
        modalidade: document.getElementById("modalidade").value,
        confirmado: document.getElementById("confirmado").value
      };
  
      const participantes = JSON.parse(localStorage.getItem("participantes")) || [];
      participantes.push(novoParticipante);
      localStorage.setItem("participantes", JSON.stringify(participantes));
  
      form.reset();
      alert("✅ Inscrição realizada com sucesso!");
      carregarParticipantes();
    });
  
    carregarParticipantes();
  });
  