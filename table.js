(function($){

var currentPath = null;
var options = {
        "bProcessing": true,
        "bServerSide": false,
        "bPaginate": false,
        "bAutoWidth": false,
        "fnCreatedRow" :  function( nRow, aData, iDataIndex ) {
          if (!aData.IsDirectory) return;
          var path = aData.Path;
          $(nRow).bind("click", function(e){
             $.get('/files?path='+ path).then(function(data){
              table.fnClearTable();
              table.fnAddData(data);
              currentPath = path;
            });
            e.preventDefault();
          });
        }, 
        "aoColumns": [
          { "sTitle": "", "mData": null, "bSortable": false, "sClass": "head0", "sWidth": "55px",
            "render": function (data, type, row, meta) {
              if (data.IsDirectory) {
                return "<a href='#' target='_blank'>" + data.Name + "</a>";
              } else {
                return "<a href=" + data.Path + " target='_blank'>" + data.Name + "</a>";
              }
            }
          }
        ]
   };

  var table = $(".linksholder").dataTable(options);

  $.get('/files').then(function(data){
      table.fnClearTable();
      table.fnAddData(data);
  });

  $(".up").bind("click", function(e){
    if (!currentPath) return;
    var idx = currentPath.lastIndexOf("/");
    var path =currentPath.substr(0, idx);
    $.get('/files?path='+ path).then(function(data){
        table.fnClearTable();
        table.fnAddData(data);
        currentPath = path;
    });
  });
})(jQuery);
