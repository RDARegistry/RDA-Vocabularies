(function () {
  $(function () {
    $('pre').addClass('prettyprint');
    return prettyPrint();
  });

}).call(this);

/* Formatting function for row details - modify as you need */
function format (d) {
  // `d` is the original data object for the row
  if (typeof d != "undefined"){
  var i;
  return '<table class="pindex_detail">' +
      '<tr>' +
      '<td>Lexical Alias:</td>' +
      '<td>' + makeLink(d.lexicalAlias) + '</td>' +
      '</tr>' +
  '<tr>' +
    '<td>Domain:</td>' +
    '<td>' + formatRef(d.domain, "vdomain") + '</td>' +
  '</tr>' +
  '<tr>' +
    '<td>Range:</td>' +
    '<td>' + formatRef(d.range, "vrange") + '</td>' +
  '</tr>' +
      '<tr>' +
      '<td>inverseOf:</td>' +
      '<td>' + formatRefArray(d.inverseOf, "vinverseOf") + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>SubProperties:</td>' +
      '<td>' + formatRefArray(d.hasSubproperty, "vhasSubproperty") + '</td>' +
      '</tr>' +
  '<tr>' +
    '<td>Scope Notes:</td>' +
    '<td>' + formatRefArray(d.note, "vnote") + '</td>' +
  '</tr>' +
      '<tr>' +
      '<td>URL:</td>' +
      '<td>' + makeLink(d.url) + '</td>' +
      '</tr>' +
      '<tr>' +
      '<td>Status:</td>' +
      '<td>' + formatRef(d.status, "vstatus") + '</td>' +
      '</tr>' +
  '</table>';
  }
}

function formatRef (data, classname) {
  if (typeof data != "undefined") {
    if (typeof data.lexicalAlias != "undefined") {
      var url = makeUrl(data["@id"]);
      return  '<div class="' + classname + '" title="Lexical Alias: ' + makeCurie(data.lexicalAlias) + '">' +
                '<div class="vcanon">' +
                  '<a href="' + url + '">' + makeCurie(data["@id"]) + '</a>' +
                '</div>' +
                '<div class="vurllabel">' +
                  '<a href="' + url + '">"' + data.label + '"</a>' +
                '</div>' +
              '</div>';
    }
    else {
      return '<div class="' + classname + '">' + data + '</div>';
    }
  }
}

function formatRefArray (data, classname) {
  var value = "";
  if (typeof data != "undefined") {
    if (data instanceof Array) {
      for (i = 0; i < data.length; ++i) {
        value += formatRef(data[i], classname)
      }
    }
    else {
      value = formatRef(data, classname)
    }
  } else {
    value = "undefined"
  }
  return value;
}

function makeCurie (uri) {
  if (typeof uri.replace === "function"){
    return uri.replace(/^(http:\/\/rdaregistry\.info\/Elements\/)(.*)\/(.*)$/ig, "rda$2:$3");
  }
}

function makeUrl (uri) {
  if (typeof uri.replace === "function"){
    return uri.replace(/^(http:\/\/)(.*)\/(.*)$/ig, "$1www.$2/#$3");
  }
}

function makeLink (uri) {
  if (typeof uri.replace === "function"){
    return '<a href="' + uri + '">' + uri + '</a>';
  }
}

function setFilter() {

    var initFilter = null;
    if (window.location.hash.indexOf('#') > -1) {
        initFilter = window.location.hash.substr(1);
    }
    return initFilter;
}

function setSearch(filter){
    var table = $("table#pindex").DataTable();
    table
        .search('')
        .column(2).search(filter)
        .draw();
    $('input[type=search]').val(filter);

}

var initFilter = setFilter();

//make sure we initiate a search when the hash changes
window.onhashchange = function () {
    var initFilter = setFilter();
    setSearch(initFilter);
};

$(document).ready(
    function () {
      var t8lines = 2;
      var dtable = $("#pindex");
      var table = dtable.DataTable({
        "createdRow": function (row, data, index) {
          //$('td', row).eq(3).addClass('too-long');
          //row.id = data["@id"].replace(/^.*\/(.*)$/ig, "$1");
        },
        "ajax": {
          url: dataSource,
          dataType: 'json',
          cache: true,
          crossDomain: true,
          dataSrc: "@graph"
        },
        "columns": [
          {
            "orderable": false,
            "class": 'permalink',
            "render": function (data, type, row) {
              if (typeof row["@id"] != "undefined") {
                var url = makeUrl(row["@id"]);
                var id = row["@id"].replace(/^.*\/(.*)$/ig, "$1")
                return '<a id="' + id + '" href="' + url + '" title="permalink: ' + url + '">#</a>';
              }
            }
          },
          {
            "class": 'details-control',
            "orderable": false,
            "data": null,
            "defaultContent": ''
          },
          {
            "render": function (data, type, row) {
              return formatRef(row, "vcuries");
            }
          },
          {
            "render": function (data, type, row) {
              return formatRefArray(row["description"], "description");
            }
          },
          {
            "defaultContent": "",
            "data": "subPropertyOf",
            "render": function (data, type, row) {
              return formatRefArray(data, "vsubPropertyOf");
            }
          },
          {
            "defaultContent": "",
            "data": "hasUnconstrained",
            "render": function (data, type, row) {
              return formatRefArray(data, "vhasunconstrained");
            }
          }
        ],
        "order": [
          [1, 'asc']
        ],
        "lengthMenu": [
          [25, 50, 100, -1],
          [25, 50, 100, "All"]
        ],
        "deferRender": true
      });

// Add event listener for truncate on draw
      dtable.on('draw.dt', function () {
        //$('.too-long').collapser({mode: 'lines', truncate: 2, showText: "more" });
        $('.too-long').trunk8({lines: t8lines});
        if (initFilter) {
          var tr = $("#" + initFilter).closest('tr');
          var row = table.row(tr);
          if (typeof row.child(format(row.data())) != "undefined") {
            row.child(format(row.data())).show();
            tr.addClass('shown');
          }
          $("div#pindex_filter input").val(initFilter);
        }
      });

// Add event listener for opening and closing details
      dtable.children("tbody").on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var t8 = tr.children("td.too-long");
        var row = table.row(tr);

        if (row.child.isShown()) {
          // This row is already open - close it
          row.child.hide();
          tr.removeClass('shown');
          t8.trunk8({lines: 2});
        }
        else {
          // Open this row
          row.child(format(row.data())).show();
          tr.addClass('shown');
          t8.trunk8('revert');
        }
      });

        $('input[type=search]').on('keyup click', function () {
            var searchbox = this;
            $("table#pindex").DataTable().search(
                searchbox.val(),
                '',
                '')
                .draw();
        });

        if (initFilter) {
        table.column(2).search(initFilter);
        $("div#pindex_filter input").val(initFilter);
      }

    });

$.fn.dataTableExt.oApi.clearSearch = function (oSettings) {
    var table = this;
    var clearSearch = $('<img title="Delete" alt="" src="data:image/png;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII=" style="vertical-align:text-bottom;cursor:pointer;" />');
    $(clearSearch).click(function () {
        setSearch('');
        if (initFilter) {
            var tr = $("#" + initFilter).closest('tr');
            var row = table.row(tr);
            if (typeof row.child(format(row.data())) != "undefined") {
                row.child(format(row.data())).hide();
                tr.removeClass('shown');
            }
            if (history.pushState) {
                history.pushState(null, null, document.location.pathname);
            }
            else {
                location.hash = '';
            }
        }
    });
    $(oSettings.nTableWrapper).find('div.dataTables_filter').append(clearSearch);
    $(oSettings.nTableWrapper).find('div.dataTables_filter label').css('margin-right', '-16px');//16px the image width
    $(oSettings.nTableWrapper).find('div.dataTables_filter input').css('padding-right', '16px');
}

//auto-execute, no code needs to be added
$.fn.dataTable.models.oSettings['aoInitComplete'].push( {
    "fn": $.fn.dataTableExt.oApi.clearSearch,
    "sName": 'whatever'
} );
