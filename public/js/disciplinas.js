async function listarDisciplinas() {
    const disp = await api('/api/disciplinas');
    const lista = document.getElementById('lista')
    lista.replaceChildren();
    for (const disciplina of disp) {
        const item = document.createElement('li');
        item.textContent = `Nome: ${disciplina.nome.charAt(0).toUpperCase() + disciplina.nome.slice(1)}`
        document.getElementById("disciplinas").add(new Option(disciplina.nome, disciplina.id))
        lista.appendChild(item);
    }
}

async function listarAssociacao() {
    const dados = await api('/api/disciplinas/associar');
    const vinculos = document.getElementById('vinculos')
    vinculos.replaceChildren();
    for (const dado of dados) {
        const item = document.createElement('li');
        item.textContent = `${dado.serie} ${dado.turma} - ${dado.ano} - ${dado.disciplina}`;
        vinculos.appendChild(item);
    }
}

async function carregarTurmas() {
    const turmas = await api('/api/turmas')
    for (const turma of turmas) {
        document.getElementById("serie").add(new Option(`${turma.serie} ${turma.nome} - ${turma.ano}`, turma.id))
    }
}

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const disciplina = document.getElementById('disciplina').value.trim();
    try {
        await api('/api/disciplinas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ disciplina })
        });
        e.target.reset(); /* reseta o alvo clicado */
        document.getElementById('mensagem').textContent = 'Disciplina cadastrado com sucesso'
        await listarDisciplinas();
    } catch (error) {
        mostrarErro(error);
    }
})

document.getElementById('vincular').addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log("a")
    const turma_id = document.getElementById('serie').value
    const disciplina_id = document.getElementById('disciplinas').value

    try {
        await api('/api/disciplinas/associar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ turma_id, disciplina_id })
        });
        e.target.reset(); /* reseta o alvo clicado */
        document.getElementById('mensagem').textContent = 'Disciplina associada com sucesso'
         await listarAssociacao(); 
    } catch (error) {
        mostrarErro(error);
    }
})
window.addEventListener("DOMContentLoaded", () => {
    carregarTurmas()
    listarDisciplinas()
    listarAssociacao()
})