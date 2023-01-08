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
        fetch('http://localhost:3000/auth/login',{
            method: 'POST',
            body: JSON.stringify(usuario),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())
        .then(function (data){     
            if(data.code == 200) window.location.assign('dashboard.html');
            if(data.code == 500) alert('Erro ao acessar o login.');       
            if(data.code == 404) alert('Usuario não encontrado.');            
        });
      },
    });
    $("#login").validate({
      rules: {
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
          email: "Por favor insira um email valido.",
        },
        password: {
          required: "Por favor insira uma senha",
          minlength: "Insira um senha valida.",
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
  