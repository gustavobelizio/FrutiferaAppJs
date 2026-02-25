// Executa o código somente após o HTML estar totalmente carregado
document.addEventListener("DOMContentLoaded", function () {

    const botaoSalvar = document.querySelector("#formFruteira button[type='submit']");
    const lista = document.getElementById("listaFruteiras");

    // Verifica se os elementos principais existem antes de continuar
    if (!botaoSalvar || !lista) {
        console.error("Botão ou lista não encontrados.");
        return;
    }

    // Recupera dados salvos no navegador ou inicia array vazio
    let fruteiras = JSON.parse(localStorage.getItem("fruteiras")) || [];

    // Calcula idade da fruteira em meses a partir da data de plantio
    function calcularIdadeEmMeses(dataPlantio) {
        const hoje = new Date();
        const plantio = new Date(dataPlantio);

        let anos = hoje.getFullYear() - plantio.getFullYear();
        let meses = hoje.getMonth() - plantio.getMonth();

        return (anos * 12) + meses;
    }

    // Salva o array atualizado no localStorage
    function salvarLocalStorage() {
        localStorage.setItem("fruteiras", JSON.stringify(fruteiras));
    }

    // Cria visualmente um card para cada fruteira
    function criarCard(fruteira) {

        const idadeMeses = calcularIdadeEmMeses(fruteira.dataPlantio);

        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";

        col.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">${fruteira.nomePopular}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                        ${fruteira.nomeCientifico}
                    </h6>
                    <p class="card-text">
                        <strong>ID:</strong> ${fruteira.id}<br>
                        <strong>Produção:</strong> ${fruteira.producao} Kg<br>
                        <strong>Plantio:</strong> ${fruteira.dataPlantio}<br>
                        <strong>Idade:</strong> ${idadeMeses} meses
                    </p>
                </div>
            </div>
        `;

        lista.appendChild(col);
    }

    // Atualiza a tela com todas as fruteiras salvas
    function carregarFruteiras() {
        lista.innerHTML = "";
        fruteiras.forEach(criarCard);
    }

    // Evento de clique do botão salvar
    botaoSalvar.addEventListener("click", function (e) {

        e.preventDefault(); // Impede recarregar a página

        const nomePopular = document.getElementById("nomePopular").value;
        const nomeCientifico = document.getElementById("nomeCientifico").value;
        const producao = document.getElementById("producao").value;
        const dataPlantio = document.getElementById("dataPlantio").value;

        // Validação básica dos campos
        if (!nomePopular || !nomeCientifico || !producao || !dataPlantio) {
            alert("Preencha todos os campos.");
            return;
        }

        // Cria objeto representando a nova fruteira
        const novaFruteira = {
            id: Date.now(), // Gera ID único
            nomePopular,
            nomeCientifico,
            producao,
            dataPlantio
        };

        fruteiras.push(novaFruteira); // Adiciona ao array
        salvarLocalStorage();         // Salva no navegador
        carregarFruteiras();          // Atualiza a tela

        document.getElementById("formFruteira").reset();
    });

    // Carrega as fruteiras salvas ao abrir a página
    carregarFruteiras();

});

    carregarFruteiras();

});
