async function carregar() {
    const series = await api('/api/turmas/series')
    for (const serie of series) {
        document.getElementById("serie").add(new Option(serie.nome, serie.id)) /* adiciona um nvo option dentro do elemento com .add */
    }
    document.getElementById("ano").value = new Date().getFullYear()
    await listarTurmas()
}

async function listarTurmas() {
    const turmas = await api('/api/turmas')
    const linha = document.getElementById("lista")
    linha.replaceChildren() /* substitui tudo lá por esse elementos */

    for (const turma of turmas) {
        const item = document.createElement("li")
        item.textContent = `${turma.serie} ${turma.nome} - ${turma.ano}`;
        linha.appendChild(item)
    }
}

document.getElementById('formulario').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        await api('/api/turmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serie_id: document.getElementById("serie").value,
                turma: document.getElementById("turma").value,
                ano: document.getElementById("ano").value

            })
        });
        document.getElementById('turma').value = ''
        document.getElementById('mensagem').textContent = ''
        document.getElementById('mensagem').textContent = 'Turma cadastrada com sucesso'
        await listarTurmas();
    } catch (error) {
        mostrarErro(error);
    }
})

window.addEventListener("DOMContentLoaded", () => {
    carregar()
})