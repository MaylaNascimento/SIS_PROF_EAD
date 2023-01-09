$(document).ready(function () {
  
  $("[data-widget=logout]").on("click", function (event) {
      event.preventDefault();
      
      fetch('http://localhost:3000/auth/logoff',{ method: 'POST' })
        .then(response => response.json())
        .then(function (data){     
            if(data.code == 200) window.location.assign('/auth/login');
            if(data.code == 500) Swal.fire( 'Erro ao acessar fazer logout.', 'Por favor aguarde alguns minutos e tente novamente', 'warning' );  
        });

  })
});
  