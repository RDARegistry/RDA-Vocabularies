function gup(name, url, theDefault) {
  if (! url) url = location.href;
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  return results == null ? theDefault: results[1];
}
// set language to display; default English
var docLang = gup('language', Location.href, 'en');
// set language indicator style; border colour indicates on/selected
$("#lang_" + docLang).css({
  "padding": "5px", "border": "3px solid #446e9b", "border-radius": "5px"
});

// initialize wide scope variable for prefix
var rdaPrefix = "rda";

if (typeof dataSource !== "undefined") {
  
  //noinspection ThisExpressionReferencesGlobalObjectJS
  (function () {
    $(function () {
      $('pre').addClass('prettyprint');
      return prettyPrint();
    });
  }).call(this);
  
  // set flag for VES
  function filterProperty(obj) {
    return obj[ "@type"] == "Property";
  }
  
  
  /* Formatting function for row details - modify as you need */
  function format(d) {
    // `d` is the original data object for the row
    // format note (scope note), domain, range, inverse, subproperties, Toolkit label, Toolkit definition, status
    var detailRow = makeDetailRow();
    var detailTable = '<table class="pindex_detail">';
    if (typeof d != "undefined") {
      if (typeof d.note != "undefined") {
        detailRow = makeDetailRow(getStringByLanguage(d.note, docLang), "Scope notes", docLang);
        detailTable += detailRow;
      }
      if (typeof d.domain != "undefined") {
        detailRow = makeDetailRow(getLinkIn(d.domain), "Domain");
        detailTable += detailRow;
      }
      if (typeof d.range != "undefined") {
        detailRow = makeDetailRow(getLinkIn(d.range), "Range");
        detailTable += detailRow;
      }
      if (typeof d.inverseOf != "undefined") {
        detailRow = makeDetailRow(getLinkIn(d.inverseOf), "Inverse");
        detailTable += detailRow;
      }
      if (typeof d.hasSubproperty != "undefined") {
        detailRow = makeDetailRow(getDetailFromArray(d.hasSubproperty, "h"), "Subproperties");
        detailTable += detailRow;
      }
      if (typeof d.ToolkitLabel != "undefined") {
        detailRow = makeDetailRow(getStringByLanguage(d.ToolkitLabel, docLang), "Toolkit label", docLang);
        detailTable += detailRow;
      }
      if (typeof d.ToolkitDefinition != "undefined") {
        detailRow = makeDetailRow(getStringByLanguage(d.ToolkitDefinition, docLang), "Toolkit definition", docLang);
        detailTable += detailRow;
      }
      if (typeof d.status != "undefined") {
        detailRow = makeDetailRow(getLinkOut(d.status), "Status");
        detailTable += detailRow;
      }
    } else {
      detailTable += detailRow;
    }
    detailTable += '</table>';
    return detailTable;
  }
  
  function directify(string, langCode) {
    // returns a string wrapped in a div with right-to-left attribute for specified languages
    rtlLangList = "ar, he";
    rtlIndex = -1;
    theLangCode = "";
    theString = "";
    if (typeof string != "undefined") {
      theString = string;
    }
    if (typeof langCode != "undefined") {
      theLangCode = langCode;
    }
    if (theLangCode.length > 0) {
      rtlIndex = rtlLangList.indexOf(theLangCode);
    }
    if (rtlIndex > -1) {
      theString = '<div dir="rtl">' + theString + '</div>';
    } else {
      theString = "<div>" + theString + "</div>";
    }
    return theString;
  }
  
  function divify(string, className) {
    // returns a string wrapped in a div
    var theClassName = "";
    var theString = "";
    if (typeof string != "undefined") {
      theString = string;
    }
    if (typeof className != "undefined") {
      theClassName = className;
      theString = '<div class="' + theClassName + '">' + theString + "</div>";
    } else {
      theString = "<div>" + theString + "</div>";
    }
    return theString;
  }
  
  function getLabel(row) {
    // returns a label from the jsonld
    var label = "";
    if (typeof row[ "label"] != "undefined") {
      label = row[ "label"];
    }
    return label;
  }
  
  function getLinkOutCurie(uri, prefix) {
    // returns external link with Curie label
    var label = "";
    var theUri = "";
    if (typeof uri != "undefined") {
      theUri = uri;
    }
    if (typeof prefix != "undefined") {
      label = makeCurieFromURI(theUri, prefix);
    } else {
      label = theUri;
    }
    return linkifyOut(label, theUri);
  }
  
  /*     function getLinkOutCurieFromArray(row) {
  var string = "";
  if (typeof row != "undefined") {
  if (row instanceof Array) {
  for (i = 0; i < row.length;++ i) {
  string += getLinkOutCurie(getURI(row[i]), window.rdaPrefix);
  }
  } else {
  string = divify(getLinkOutCurie(getURI(row), window.rdaPrefix));
  }
  }
  return string;
  } */
  
  function getDetailFromArray(row, vh) {
    var arrayDetail = "";
    var label = "";
    var labelLink = "";
    var uri = "";
    var uriLink = "";
    // indicator for vertical or horizontal uri/label list
    var theVh = "";
    if (typeof vh != "undefined") {
      theVh = vh;
    }
    if (row instanceof Array) {
      for (i = 0; i < row.length;++ i) {
        label = getLabel(row[i]);
        uri = getURI(row[i]);
        labelLink = quotify(getLinkInLabel(uri, label));
        uriLink = linkifyOut(uri, uri);
        switch (theVh) {
          case "h":
          arrayDetail += divify(uriLink + " [" + labelLink + " (en)]");
          break;
          case "v":
          arrayDetail += divify(uriLink) + divify(" [" + labelLink + " (en)]");
          break;
          default:
          arrayDetail += divify(uriLink + " [" + labelLink + " (en)]");
        }
      }
    }
    return arrayDetail;
  }
  
  function getHierarchy(row, vh) {
    var hierarchy = "";
    var label = "";
    var labelLink = "";
    var uri = "";
    var uriLink = "";
    // indicator for vertical or horizontal uri/label list
    var theVh = "";
    if (typeof vh != "undefined") {
      theVh = vh;
    }
    if (typeof row.subPropertyOf != "undefined") {
      if (row.subPropertOf instanceof Array) {
        for (i = 0; i < row.subPropertyOf.length;++ i) {
          label = getLabel(row.subPropertyOf[i]);
          uri = getURI(row.subPropertyOf[i]);
          labelLink = quotify(getLinkInLabel(uri, label));
          uriLink = linkifyOut(uri, uri);
          switch (theVh) {
            case "h":
            hierarchy += divify(uriLink + " [" + labelLink + " (en)]");
            break;
            case "v":
            hierarchy += divify(uriLink) + divify(" [" + labelLink + " (en)]");
            break;
            default:
            hierarchy += divify(uriLink + " [" + labelLink + " (en)]");
          }
        }
      }
    }
    return hierarchy;
  }
  function getLinkInLabel(uri, label, langCode) {
    // returns internal link for string label and Registry URL with parameter for selected language
    var theLabel = "";
    // language code is omitted to get permalink
    var theLangCode = "";
    var url = "";
    if (typeof label != "undefined") {
      theLabel = label;
    }
    if (typeof langCode != "undefined") {
      theLangCode = langCode;
    }
    if (typeof uri != "undefined") {
      url = makeURLFromURI(uri, theLangCode);
    }
    return linkifyIn(theLabel, url);
  }
  
  function getLinkIn(theData) {
    var label = "";
    var link = "";
    if (typeof theData[ "@id"] != "undefined") {
      link = makeURLFromURI(theData[ "@id"]);
    }
    if (typeof theData[ "label"] != "undefined") {
      label = theData[ "label"];
    }
    return linkifyIn(label, link);
  }
  
  function getLinkOut(theData) {
    var label = "";
    var link = "";
    if (typeof theData[ "@id"] != "undefined") {
      link = theData[ "@id"];
    }
    if (typeof theData[ "label"] != "undefined") {
      label = theData[ "label"];
    }
    return linkifyOut(label, link);
  }
  
  function getPrefix(theData) {
    // returns the vocabulary prefix
    var prefix = "[prefix]";
    if (typeof theData[0].prefix != "undefined") {
      prefix = theData[0].prefix;
    }
    return prefix;
  }
  
  function getStringByLanguage(theData, langCode, defaultLangCode) {
    // returns string corresponding to language, or defaults
    var langString = "";
    // default language is English
    var theLangCode = "en";
    // default default language can only be English
    // [not enabled until translation processes in place]
    var theDefaultLangCode = "";
    if (typeof defaultLangCode != "undefined") {
      theDefaultLangCode = defaultLangCode;
    }
    if (typeof langCode != "undefined") {
      theLangCode = langCode;
    }
    if (typeof theData != "undefined" && theData != null) {
      // available in selected language
      if (typeof theData[theLangCode] != "undefined") {
        langString = directify(quotify(theData[theLangCode]), theLangCode);
      }
      // available in default language; add qualifier to indicate not available in selected language
      else if (theDefaultLangCode.length > 0) {
        if (typeof theData[theDefaultLangCode] != "undefined") {
          langString = directify(quotify(theData[theDefaultLangCode]) + " ['" + theDefaultLangCode + "'; no '" + theLangCode + "']", theDefaultLangCode);
        }
      }
      // not available in selected or default language; output indicates the languages
      //            else if (theData instanceof Object) {
      //                langString = directify("[no '" + theLangCode + "' or '" + theDefaultLangCode + "']", theDefaultLangCode);
      //            }
    }
    return langString;
  }
  
  function getURI(row) {
    // returns a URI from the jsonld
    var uri = "";
    if (typeof row[ "@id"] != "undefined") {
      uri = row[ "@id"];
    }
    return uri;
  }
  
  function linkifyIn(string, uri) {
    // returns internal link
    return '<a href="' + uri + '">' + string + '</a>';
  }
  
  function linkifyOut(string, uri) {
    // returns external link
    return '<a href="' + uri + '" target="_blank">' + string + '</a>';
  }
  
  function makeColumn(content) {
    // returns column content in a wrapper div with direction parameter
    var col = "";
    var theContent = "";
    if (typeof content != "undefined") {
      theContent = content;
    }
    col = divify(theContent);
    return col;
  }
  
  function makeCurieFromURI(uri, prefix) {
    // returns a curie
    var curie = "";
    var thePrefix = "";
    if (typeof prefix != "undefined") {
      thePrefix = prefix;
    }
    if (uri !== null && typeof uri.replace === "function") {
      // replace everything up to last sub-folder slash with prefix and colon
      curie = thePrefix + ":" + uri.substr(1 + uri.lastIndexOf("/"));
    }
    return curie;
  }
  
  function makeDetailRow(rowValue, rowLabel, langCode) {
    // returns a two-column row for the detail display
    var detailRow = "";
    var theLangCode = "";
    var theRowValue = "";
    var theRowLabel = "";
    if (typeof rowValue != "undefined") {
      theRowValue = rowValue;
    }
    if (typeof rowLabel != "undefined") {
      theRowLabel = rowLabel;
    }
    if (typeof langCode != "undefined") {
      theLangCode = langCode;
    }
    // two columns; value column must have div wrapper
    if (theRowValue.length > 0) {
      detailRow = '<tr>' + '<td>' + theRowLabel + ':' + '</td>' + '<td>' + divify(theRowValue) + '</td>' + '</tr>';
    }
    return detailRow;
  }
  
  function makeURLFromURI(uri, langCode) {
    // returns Registry URL with language parameter
    var url = "";
    var theLangCode = "";
    if (typeof langCode != "undefined") {
      theLangCode = langCode;
    }
    if (typeof uri !== "undefined") {
      url = uri;
      if (uri !== null && typeof uri.replace === "function") {
        // Regular expression adds 'www' to domain and inserts hash to parameterize the local part
        url = uri.replace(/^(http:\/\/)(.*)\/(.*)$/ig, "$1www.$2/#$3");
        // no specified language gives the permalink (display default is English)
        //                if (theLangCode.length != 0) {
        // Insert language code parameter before hash
        //                    url = url.replace("#", "?language=" + theLangCode + "#");
        //                }
      }
    }
    return url;
  }
  
  function quotify(string) {
    // returns a string delimited with quotes
    return '"' + string + '"';
  }
  
  function strongify(string) {
    // returns a string marked as strong
    return '<strong>' + string + '</strong>';
  }
  
  function getLanguageCallout(data) {
    // not currently used: returns the xml language string
    if (typeof data != "undefined") {
      if (typeof data[docLang] != "undefined") {
        return "@" + docLang;
      }
      if (typeof data[ 'en'] != "undefined") {
        return "@en";
      }
    }
    return "@en *";
  }
  
  function setFilter() {
    
    var initFilter = null;
    if (window.location.hash.indexOf('#') > -1) {
      initFilter = window.location.hash.substr(1);
    }
    return initFilter;
  }
  
  function setSearch(filter) {
    var table = $("table#pindex").DataTable();
    table.search('').column(2).search(filter).draw();
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
        "dataSrc": function (json) {
          json.data = json[ "@graph"].filter(filterProperty);
          window.rdaPrefix = getPrefix(json[ "@graph"]);
          return json.data;
        }
      },
      "columns":[ {
        "class": 'permalink',
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumn(getLinkInLabel(getURI(row), "#"));
        }
      }, {
        "class": 'details-control',
        "data": null,
        "defaultContent": '',
        "orderable": false
      }, {
        "class": "curie",
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn(getLinkOutCurie(getURI(row), window.rdaPrefix));
        }
      }, {
        "class": "prefLabel",
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn(strongify(getStringByLanguage(getLabel(row), docLang, "en")));
        }
      }, {
        "class": "definition",
        "orderable": false,
        "render": function (data, type, row) {
          var definition = "";
          if (typeof row.definition !== "undefined") {
            definition = row.definition;
          } else {
            definition = row.ToolkitDefinition;
          }
          return makeColumn(getStringByLanguage(definition, docLang, "en"));
        }
      }, {
        "class": "hierarchy",
        "data": null,
        "defaultContent": "",
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumn(getHierarchy(row, "v"));
        }
      }],
      "order":[[2, 'asc']],
      "lengthMenu":[[25, 50, 100, -1],[25, 50, 100, "All"]],
      "deferRender": true
    });
    
    // Add event listener for truncate on draw
    dtable.on('draw.dt', function () {
      //$('.too-long').collapser({mode: 'lines', truncate: 2, showText: "more" });
      $('.too-long').trunk8({
        lines: t8lines
      });
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
        t8.trunk8({
          lines: 2
        });
      } else {
        // Open this row
        row.child(format(row.data())).show();
        tr.addClass('shown');
        t8.trunk8('revert');
      }
    });
    
    
    $('input[type=search]').on('click', function () {
      if (history.pushState) {
        history.pushState(null, null, document.location.pathname);
      } else {
        location.hash = '';
      }
      setSearch('');
    });
    
    if (initFilter) {
      table.column(2).search(initFilter);
      $("div#pindex_filter input").val(initFilter);
    }
  });
  
  $.fn.dataTableExt.oApi.clearSearch = function (oSettings) {
    var table = $("#pindex").DataTable();
    var clearSearch = $('<img class = "delete" title="Cancel Search" alt="" src="data:image/png;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII="  style="cursor:pointer;padding-left:.5em;" />');
    $(clearSearch).click(function () {
      setSearch('');
      table.search('');
      if (initFilter) {
        initFilter = null;
        var tr = $("#" + initFilter).closest('tr');
        var row = table.row(tr);
        if (typeof row.child(format(row.data())) != "undefined") {
          row.child(format(row.data())).hide();
          tr.removeClass('shown');
        }
        if (history.pushState) {
          history.pushState(null, '', document.location.pathname);
        } else {
          location.hash = '';
        }
      }
    });
    $(oSettings.nTableWrapper).find('div.dataTables_filter').append(clearSearch);
    $(oSettings.nTableWrapper).find('div.dataTables_filter label').css('margin-right', '-16px');
    //16px the image width
    $(oSettings.nTableWrapper).find('div.dataTables_filter input').css('padding-right', '16px');
  };
  
  //auto-execute, no code needs to be added
  $.fn.dataTable.models.oSettings[ 'aoInitComplete'].push({
    "fn": $.fn.dataTableExt.oApi.clearSearch,
    "sName": 'whatever'
  });
  
  $(document).ready(function () {
    $.protip({
      defaults: {
        position: 'top-left',
        gravity: true,
        delayIn: 500
      }
    })
  });
}