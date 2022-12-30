$(document).ready(function () {
    $(".form").validate({
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