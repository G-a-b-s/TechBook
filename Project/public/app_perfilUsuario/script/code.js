document.addEventListener("DOMContentLoaded", function() {
    const alterarBtn = document.querySelector(".btn-alterar");
    const salvarBtn = document.querySelector(".btn-salvar");
    const inputFields = document.querySelectorAll("input[type='text']");
    const generoFavoritoSelect = document.getElementById("genero-favorito");

    function enableInputFields() {
        inputFields.forEach(input => {
            input.disabled = false;
        });
        generoFavoritoSelect.disabled = false;
    }

    function disableInputFields() {
        inputFields.forEach(input => {
            input.disabled = true;
        });
        generoFavoritoSelect.disabled = true;
    }

    function toggleEditMode() {
        enableInputFields();
        alterarBtn.style.display = "none";
        salvarBtn.style.display = "inline-block";
    }

    function saveChanges() {
        disableInputFields();
        alterarBtn.style.display = "inline-block";
        salvarBtn.style.display = "none";
    }

    function getCategories(processaDados) {
        const apiUrl = '/categorias'; 
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                processaDados(data);
            })
            .catch(error => {
                console.error('Erro ao ler Categorias via API JSONServer:', error); 
                displayMessage("Erro ao ler Categorias");
            });
    }

    function populateCategories(categorias) {
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.value = categoria.id;
            option.text = categoria.nome;
            generoFavoritoSelect.appendChild(option);
        });
    }

    getCategories(populateCategories);
    disableInputFields();

    alterarBtn.addEventListener("click", toggleEditMode);
    salvarBtn.addEventListener("click", saveChanges);
});
