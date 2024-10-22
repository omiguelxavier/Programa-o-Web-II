// Seleciona os elementos necessários
const formTarefa = document.getElementById('formTarefa');
const inputTarefa = document.getElementById('inputTarefa');
const listaTarefas = document.getElementById('listaTarefas');
const listaConcluidas = document.getElementById('tarefasConcluidas');
const prioridadeTarefa = document.getElementById('prioridadeTarefa');
const dataTarefa = document.getElementById('dataTarefa');
const botaoSubmit = document.querySelector('button[type="submit"]');

let tarefas = []; // Armazena as tarefas
let tarefasConcluidas = []; // Armazena as tarefas concluídas
let indexEdicao = null; // Armazena o índice da tarefa que está sendo editada

// Função para formatar a data no formato DD/MM/AAAA
function formatarData(data) {
    const partesData = data.split('-');
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];
    return `${dia}/${mes}/${ano}`; 
}

// Função para renderizar as tarefas pendentes
function renderizarTarefas() {
    listaTarefas.innerHTML = ''; // Limpa a lista de tarefas pendentes

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.classList.add(tarefa.prioridade); // Adiciona a classe de prioridade

        li.innerHTML = `
            <span>${tarefa.titulo} - ${formatarData(tarefa.data)}</span>
            <div>
                <button class="concluir" onclick="concluirTarefa(${index})">Concluir</button>
                <button class="editar" onclick="prepararEdicao(${index})">Editar</button>
                <button class="excluir" onclick="excluirTarefa(${index})">Excluir</button>
            </div>
        `;

        listaTarefas.appendChild(li);
    });
}

// Função para preparar a edição da tarefa
function prepararEdicao(index) {
    const tarefa = tarefas[index];
    inputTarefa.value = tarefa.titulo; // Preenche o título
    prioridadeTarefa.value = tarefa.prioridade; // Preenche a prioridade
    dataTarefa.value = tarefa.data; // Preenche a data no formato padrão

    botaoSubmit.textContent = "Salvar Alterações"; // Altera o texto do botão
    indexEdicao = index; // Define o índice da tarefa que está sendo editada
}

// Função para adicionar ou salvar tarefa editada
formTarefa.addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    const tarefa = {
        titulo: inputTarefa.value.trim(),
        prioridade: prioridadeTarefa.value,
        data: dataTarefa.value
    };

    if (tarefa.titulo !== '' && tarefa.data !== '') {
        if (indexEdicao === null) {
            // Se não estamos editando, adiciona uma nova tarefa
            tarefas.push(tarefa);
        } else {
            // Se estamos editando, atualiza a tarefa existente
            tarefas[indexEdicao] = tarefa;
            indexEdicao = null;
            botaoSubmit.textContent = "Adicionar Tarefa"; // Volta o texto original do botão
        }

        // Limpa os campos
        inputTarefa.value = '';
        dataTarefa.value = '';
        
        renderizarTarefas(); // Renderiza as tarefas atualizadas
    }
});

// Função para excluir tarefa
function excluirTarefa(index) {
    tarefas.splice(index, 1); // Remove a tarefa do array
    renderizarTarefas(); // Re-renderiza a lista de tarefas
}

// Função para marcar tarefa como concluída
function concluirTarefa(index) {
    const tarefaConcluida = tarefas.splice(index, 1)[0]; // Remove a tarefa da lista pendente e a retorna
    tarefasConcluidas.push(tarefaConcluida); // Adiciona à lista de concluídas
    renderizarTarefas(); // Atualiza a lista de tarefas pendentes
    renderizarTarefasConcluidas(); // Atualiza a lista de concluídas
}

// Função para renderizar as tarefas concluídas
function renderizarTarefasConcluidas() {
    listaConcluidas.innerHTML = ''; // Limpa a lista de tarefas concluídas

    tarefasConcluidas.forEach((tarefa) => {
        const li = document.createElement('li');
        li.classList.add('concluida'); // Estilo de tarefa concluída
        li.innerHTML = `<span>${tarefa.titulo} - ${formatarData(tarefa.data)}</span>`;
        listaConcluidas.appendChild(li);
    });
}

// Renderiza as tarefas na inicialização
renderizarTarefas();
renderizarTarefasConcluidas();
