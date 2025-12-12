
// Analisa o <ul>
const item = document.getElementById("novo");
// Lonk do Servidor
fetch("https://crudcrud.com/api/f0e765bee3324a7ebfb31433fb0f29a3/user")
    // Verifica se existe algo la
    .then(resposta => resposta.json())
    // Se a resposta do servidor for positiva e conter infromações, ele cria um elemento <li> com as informações recebidas atravez do JSON
    .then((listaDeUsuarios) => {
        listaDeUsuarios.forEach(user => {
            const li = document.createElement("li");
            li.innerHTML = `Nome: ${user.usuario} <br> E-mail: ${user.email} <button class="remover" id="del" onclick="apagar('${user._id}', this)">X</>`;
            item.appendChild(li);
            });
    });

    //Adicionar a função de criar um novo usuario
    document.getElementById("btn").addEventListener("click", () => {

        const nome = document.getElementById("nome");
        const email = document.getElementById("email");

        fetch("https://crudcrud.com/api/f0e765bee3324a7ebfb31433fb0f29a3/user", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: nome.value,
                email: email.value
            })
        })        .then(resposta => resposta.json())
        .then((listaNova) => {
            const novoNome = document.createElement("li");
            novoNome.innerHTML = `Nome: ${listaNova.usuario} <br>E-mail: ${listaNova.email} <button class="remover" id="del" onclick="apagar('${listaNova._id}', this)">X</button>`;

            item.appendChild(novoNome);
            document.getElementById("nome").value = "";
            document.getElementById("email").value = "";
        })
        
    })
    
    function apagar(_id, botao) {

        //Requisição de DELETE ao servidor
        fetch(`https://crudcrud.com/api/f0e765bee3324a7ebfb31433fb0f29a3/user/${_id}`, {
            method: "DELETE"
        })
        .then(resposta => {
            // Se der algum erro na requisição
            if (!resposta.ok) {
                throw new Error("Erro ao excluir no servidor");
            }

            // Remove o <li>
             botao.parentElement.remove();
        })
         .catch(erro => console.error("Falha ao excluir:", erro));
    };


    


    