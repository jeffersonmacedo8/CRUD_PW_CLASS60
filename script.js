// Selecionando elementos
let btnCadastro = document.getElementById("btnCadastro");
let btnLista = document.getElementById("btnLista");
let btnSalvar = document.getElementById("btnSalvar");
let botaoBuscar = document.getElementById("btnBuscar");

let nomes = [];

// Eventos de navegação para tela cadastro
btnCadastro.addEventListener("click", function () {
    mostrarTela("cadastro");
});

// Evento de navegação para tela lista
btnLista.addEventListener("click", function () {
    mostrarTela("lista");
});

// Evento do botão salvar
btnSalvar.addEventListener("click", salvar);

// Evento do botão buscar por ID
botaoBuscar.addEventListener("click", buscar);

// Função de troca de tela
function mostrarTela(telaId) {

    // Seleciona todas as telas
    let telas = document.querySelectorAll(".tela");

    // Remove a classe ativa de todas
    telas.forEach(function (tela) {
        tela.classList.remove("ativa");
    });

    // Mostra a tela escolhida
    document.getElementById(telaId).classList.add("ativa");
}

function salvar() {
    let input = document.getElementById("nome");
    let nome = input.value;
    if (nome === "") {
        alert("Digite um nome!");
        return;
    }

    nomes.push(nome);
    localStorage.setItem("nomes", JSON.stringify(nomes));
    input.value = "";
    mostrarLista();
}

function mostrarLista() {
    let lista = document.getElementById("lista-nomes");
    lista.innerHTML = "";
    nomes.forEach(function (nome, index) {
        let li = document.createElement("li");

        li.innerText = `ID: ${index} - ${nome}`;

        let divBotoes = document.createElement("div");

        // BOTÃO EDITAR
        let botaoEditar = document.createElement("button");

        botaoEditar.innerText = "Editar";

        botaoEditar.addEventListener("click"

            , function () {

                editar(index);

            });

        // BOTÃO EXCLUIR
        let botaoExcluir = document.createElement("button");

        botaoExcluir.innerText = "Excluir";

        botaoExcluir.addEventListener("click"

            , function () {

                excluir(index);

            });

        divBotoes.appendChild(botaoEditar);

        divBotoes.appendChild(botaoExcluir);

        li.appendChild(divBotoes);

        lista.appendChild(li);

    });

}

function editar(index) {

    let novoNome = prompt("Digite o novo nome:");

    if (novoNome === "") {

        alert("Digite um nome válido!");
        return;
    }

    if (novoNome) {

        nomes[index] = novoNome;

        localStorage.setItem("nomes"

            , JSON.stringify(nomes));

        mostrarLista();
    }
}

function excluir(index) {

    let confirmar = confirm("Deseja excluir?");

    if (confirmar) {

        nomes.splice(index, 1);

        localStorage.setItem("nomes", JSON.stringify(nomes));

        mostrarLista();
    }
}

function buscar() {

    let id = document.getElementById("buscarId").value;

    let resultado = nomes[id];

    if (resultado) {

        alert(`ID: ${id} - Nome: ${resultado}`);

    } else {

        alert("Cadastro não encontrado!");
    }
}

function carregar() {
    let dados = localStorage.getItem("nomes");
    if (dados) {
        nomes = JSON.parse(dados);
    }
    mostrarLista();
}
carregar();