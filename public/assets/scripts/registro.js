$(document).ready(function () {
  console.log("agora vai")
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
          if(data.code == 304) alert('Usuario já cadastrado.');          
          if(data.code == 201) window.location.assign('dashboard');
          if(data.code == 501) alert('Erro ao cadastrar, tente novamente.');          
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
