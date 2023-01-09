$(()=>{
  let dtpbr = {
    sEmptyTable: "<i class='fa fa-exclamation-triangle' ></i> Nenhum registro encontrado",
    sInfo: "Mostrando de START até END de TOTAL registros ",
    sInfoEmpty: "Mostrando 0 até 0 de 0 registros ",
    sSelected: "TOTAL linhas selecionadas",
    select: {
        rows: {
            _: "| %d linhas selecionadas",
            0: "",
            1: "| 1 linha selecionada"
        }

    },
    sInfoFiltered: "(Filtrados de MAX registros )",
    sInfoPostFix: "",
    sInfoThousands: ".",
    sLengthMenu: "MENU Resultados por página",
    sLoadingRecords: "<div class='text-center'><i class='fa fa-spinner fa-pulse fa-fw'></i> Carregando...</div>",
    sProcessing: "Processando...",
    sZeroRecords: "<div class='text-center'><i class='fa fa-exclamation-triangle' ></i> Nenhum registro encontrado</div>",
    sSearch: "Pesquisar ",
    oPaginate: {
        sNext: "Próximo",
        sPrevious: "Anterior",
        sFirst: "Primeiro",
        sLast: "Último"
    },
    oAria: {
        sSortAscending: ": Ordenar colunas de forma ascendente",
        sSortDescending: ": Ordenar colunas de forma descendente"
    }
};

// Atualiza construtor dataTable
// com nova config default
$.extend(true, $.fn.dataTable.defaults, {
    oLanguage: dtpbr,
    lengthMenu: [
        [50, 100, 500, 1000],
        [50, 100, 500, 1000]
    ],
    responsive: true,
    // autoWidth: true,
});

$.fn.datatable = $("#main-datatable").DataTable({
    "ajax":  {
      "url": "http://localhost:3000/seletivo/all",
      dataSrc: "data",
      type: "GET"
    },
    "columns": [
      { title: "id", data: "id", visible: false },
        { title: "funcao", data: "funcao" },
        { title: "unidade",  data: "unidade"  },
        { title: "carga_horaria",  data: "carga_horaria",  width: '10px'  },
        { title: "req_minimo",  data: "req_minimo"  },
        { title: "vagas_total",  data: "vagas_total", width: '10px'   },
        { title: "periodo_inscricao",  data: null, render: function (data) {
          return `${data.inicio_inscricao} / ${data.final_inscricao}` 
        }},
        { title: "status",  data: "status", render: function (dat) { 
          let status;
          switch (dat) {
              case 0 :
                status = '<span class="badge bg-danger">inativo</span>'; 
              
              default:
                status ='<span class="badge bg-info">ativo</span>';    
            }

            return status;
        } },
        {title: '#', data: null, width: '80px', render: function (data) { return `<button type="button" data-widget="edit-seletivo" data-seletivo="${data.id}" style="margin-right: 4px" class="btn btn-primary p-0">  <small class="expandable-table-caret fas fa-pencil fa-fw"></small></button><button type="button" data-widget="list-seletivo"  data-seletivo="${data.id}" class="btn btn-warning p-0">  <small class="expandable-table-caret fas fa-eye fa-fw"></small></button> <button type="button" data-widget="delete-seletivo"  data-seletivo="${data.id}" class="btn btn-danger p-0">  <small class="expandable-table-caret fas fa-trash fa-fw"></small></button>`}}
      ],
    "order": [[0, 'asc']] // ordena pela coluna 0
})
  
  $("[data-widget=logout]").on("click", function (event) {
      event.preventDefault();
      
      fetch('http://localhost:3000/auth/logoff',{ method: 'POST' })
        .then(response => response.json())
        .then(function (data){     
            if(data.code == 200) window.location.assign('/auth/login');
            if(data.code == 500) Swal.fire( 'Erro ao acessar fazer logout.', 'Por favor aguarde alguns minutos e tente novamente', 'warning' );  
        });

  });

  $.fn.datatable.on("init", function (event, _api, json) {
    $("[data-widget='edit-seletivo']").on("click", function (event) {
        event.preventDefault();
        window.location.assign(`/admin/seletivo/${this.dataset.seletivo}/edit`);
    });

    $("[data-widget='list-seletivo']").on("click", function (event) {
        event.preventDefault();
        window.location.assign(`/admin/seletivo/${this.dataset.seletivo}`);
    });

    $("[data-widget='delete-seletivo']").on("click", function (event) {
      event.preventDefault();
      window.location.assign(`/admin/seletivo/${this.dataset.seletivo}`);
  });

  });


 

  
});
  