$("login").submit(function (a){
    fetch("/cadastro/seletivo",{
        method: 'POST',
        body: JSON.stringify({
            seletivoID: '',
            login: '',
            senha: ''
        })
    })
    .then(response => response.json())
    .then(function (data) {
        if(data.code == 401) {
            alert('Usuario ou senhha incorretos');
            return;
        }
        document.cookie = `nome=`
        window.location.assign('painel.html')
    })
});