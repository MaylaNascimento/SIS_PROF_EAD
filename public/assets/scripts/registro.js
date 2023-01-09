$(document).ready(function () {
  
  $.validator.setDefaults({
    submitHandler: function (form) {
      let usuario = {};
      $(form).serializeArray().map(function (item) {
        if (usuario[item.name]) {
          if (typeof usuario[item.name] === "string") { usuario[item.name] = [usuario[item.name]]; }
          usuario[item.name].push(item.value);
        } else {
          usuario[item.name] = item.value;
        }
      }); 
        fetch('http://localhost:3000/usuario/cadastro',{
          method: 'POST',
          body: JSON.stringify(usuario),
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then(response => response.json())
        .then(function (data){
          if(data.code == 304) Swal.fire( 'Usuário já cadastrado', 'Por favor escolha outro email para cadastro', 'info' );         
          if(data.code == 501) Swal.fire( 'Erro ao cadastrar', 'Por favor aguarde alguns minutos e tente novamente', 'warning' );   
          if(data.code == 201) {
            Swal.fire({ icon: 'success', title:  'Cadastro realizado com sucesso!', showConfirmButton: false, timer: 1500 }).then((result) => {
              window.location.assign('login');
            });   
          }       
        });
    },
  });
  $("#registro").validate({
    rules: {
      nome: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      email: {
        required: "Por favor insira um email",
        email: "Por favor insira um email valido",
      },
      password: {
        required: "Por favor insira uma senha",
        minlength: "Sua senha deve ter no minimo 6 digitos",
      },
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
      error.addClass("invalid-feedback");
      element.closest(".form-group").append(error);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).removeClass("is-invalid");
    },
  });
});
