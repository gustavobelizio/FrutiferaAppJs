
document.addEventListener("DOMContentLoaded", function () {

    const botaoSalvar = document.querySelector("#formFruteira button[type='submit']");
    const lista = document.getElementById("listaFruteiras");

    if (!botaoSalvar || !lista) {
        console.error("Botão ou lista não encontrados.");
        return;
    }

    let fruteiras = JSON.parse(localStorage.getItem("fruteiras")) || [];

    function calcularIdadeEmMeses(dataPlantio) {
        const hoje = new Date();
        const plantio = new Date(dataPlantio);

        let anos = hoje.getFullYear() - plantio.getFullYear();
        let meses = hoje.getMonth() - plantio.getMonth();

        return (anos * 12) + meses;
    }

    function salvarLocalStorage() {
        localStorage.setItem("fruteiras", JSON.stringify(fruteiras));
    }

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

    function carregarFruteiras() {
        lista.innerHTML = "";
        fruteiras.forEach(criarCard);
    }

    botaoSalvar.addEventListener("click", function (e) {

        e.preventDefault(); // impede reload

        const nomePopular = document.getElementById("nomePopular").value;
        const nomeCientifico = document.getElementById("nomeCientifico").value;
        const producao = document.getElementById("producao").value;
        const dataPlantio = document.getElementById("dataPlantio").value;

        if (!nomePopular || !nomeCientifico || !producao || !dataPlantio) {
            alert("Preencha todos os campos.");
            return;
        }

        const novaFruteira = {
            id: Date.now(),
            nomePopular,
            nomeCientifico,
            producao,
            dataPlantio
        };

        fruteiras.push(novaFruteira);

        salvarLocalStorage();

        carregarFruteiras();

        document.getElementById("formFruteira").reset();

        console.log("SALVOU:", fruteiras);
    });

    carregarFruteiras();

});
