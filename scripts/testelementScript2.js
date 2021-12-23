function getLanguageCodeFromURL() {
  // get language code from the page URL
  // 2-letter code is specified by appending "language=aa" to the vocabulary/entry URL
  // default code is for English
  
  var theLanguageCode = "en";
  var theURL = window.location.href;
  var theIndex = theURL.indexOf("language=");
  if (theIndex > 0) {
    theLanguageCode = theURL.substr(theIndex + 9, 2);
  }
  return theLanguageCode;
}
// Initialize global variable for code for current language, and for languages selector display

var theCurrentLanguageCode = getLanguageCodeFromURL();
var vocLanguagesSelector = "";

// Initialize global variable for language code to check for selector

var languageCodeToCheck = "";

// Declare constant array of jsonld objects for the possible languages of the vocabulary
// Object includes language code, label in English, and indication of right-to-left display

const regLanguages =[ {
  code: "ar", label: "Arabic", rtl: true
}, {
  code: "ca", label: "Catalan", rtl: false
}, {
  code: "da", label: "Danish", rtl: false
}, {
  code: "de", label: "German", rtl: false
}, {
  code: "el", label: "Greek", rtl: false
}, {
  code: "en", label: "English", rtl: false
}, {
  code: "et", label: "Estonian", rtl: false
}, {
  code: "fi", label: "Finnish", rtl: false
}, {
  code: "fr", label: "French", rtl: false
}, {
  code: "hu", label: "Hungarian", rtl: false
}, {
  code: "it", label: "Italian", rtl: false
}, {
  code: "nl", label: "Dutch", rtl: false
}, {
  code: "no", label: "Norwegian", rtl: false
}, {
  code: "sv", label: "Swedish", rtl: false
}, {
  code: "vi", label: "Vietnamese", rtl: false
}];

// Initialize and set global variable for namespace domain constant

var baseDomain = "http://www.rdaregistry.info/";

// Initialize global variable for prefix

var curiePrefix = "rda";

// Initialize global variable for published elements array

var publishedElements;

// Initialize global variable for vocabulary metadata

var theVocMetadata = "";

// Initialize global variable for vocabulary type

var theVocType = "";

// Process vocabulary data if defined.

if (typeof dataSource !== "undefined") {
  
  // Basic string formatting
  
  function directify(string, languageCode) {
    // Returns a string wrapped in a div with right-to-left attribute for specified language code
    
    rtlLangList = "ar, he";
    rtlIndex = -1;
    isRtl = false;
    theLanguageCode = "en";
    theString = "";
    if (typeof string != "undefined") {
      theString = string;
    }
    if (typeof languageCode != "undefined") {
      theLanguageCode = languageCode;
    }
    if (theLanguageCode.length > 0) {
      rtlIndex = rtlLangList.indexOf(theLanguageCode);
    }
    if (rtlIndex > -1) {
      theString = '<div dir="rtl">' + theString + '</div>';
    } else {
      theString = "<div>" + theString + "</div>";
    }
    /*    isRtl = regLanguages[theLanguageCode][ "rtl"];
    if (isRtl) {
    theString = '<div dir="rtl">' + theString + '</div>';
    } else {
    theString = "<div>" + theString + "</div>";
    } */
    return theString;
  }
  
  function divify(string, className) {
    // Returns a string wrapped in a div with optional class name
    
    var theClassName = "";
    var theString = "";
    if (typeof string != "undefined") {
      theString = string;
    }
    if (typeof className != "undefined") {
      theString = '<div class="' + className + '">' + theString + '</div>';
    } else {
      theString = '<div>' + theString + '</div>';
    }
    return theString;
  }
  
  function quotify(string) {
    // Returns a string delimited with quotes
    
    var theString = "";
    if (typeof string != "undefined") {
      theString = string;
    }
    
    return '"' + string + '"';
  }
  
  function strongify(string) {
    // Returns a string marked as strong
    
    var theString = "";
    if (typeof string != "undefined") {
      theString = string;
    }
    
    return '<strong>' + string + '</strong>';
  }
  
  // Format links
  
  function linkify(label, uri, isLinkOut) {
    // Returns link based on label and URI
    // Internal link uses same browser window; external link uses new browser window
    
    var theLabel = "";
    var theLink = "";
    var theLinkIsExternal = false;
    var theURI = "";
    if (typeof label != "undefined") {
      theLabel = label;
    }
    if (typeof uri != "undefined") {
      theURI = uri;
    }
    if (typeof isLinkOut != "undefined") {
      theLinkIsExternal = isLinkOut;
    }
    if (theLinkIsExternal) {
      theLink = '<a href="' + theURI + '" target="_blank">' + theLabel + '</a>';
    } else {
      theLink = '<a href="' + theURI + '">' + theLabel + '</a>';
    }
    return theLink;
  }
  
  function makeCurieFromURI(uri, prefix) {
    // Returns a curie
    
    var theCurie = "";
    var thePrefix = "";
    var theURI = "";
    if (typeof prefix != "undefined") {
      thePrefix = prefix;
    }
    if (typeof uri != "undefined") {
      theURI = uri;
    }
    // check and set curie prefix for datatype and object children
    
    if (theURI.indexOf("datatype") > 0) {
      thePrefix += "d";
    }
    if (theURI.indexOf("object") > 0) {
      thePrefix += "o";
    }
    // replace URI up to last sub-folder slash with prefix and colon
    if (theURI !== null && typeof theURI.replace === "function") {
      theCurie = thePrefix + ":" + theURI.substr(1 + theURI.lastIndexOf("/"));
    }
    return theCurie;
  }
  
  // Get data from jsonld
  
  function getCuriePrefix() {
    // Sets the vocabulary prefix from vocabulary metadata
    
    if (typeof window.theVocMetadata.prefix != "undefined") {
      window.curiePrefix = window.theVocMetadata.prefix;
    }
    return;
  }
  
  function getDefinition(row) {
    // Returns a definition from a jsonld row
    
    var theDefinition = "";
    if (typeof row[ "definition"] != "undefined") {
      theDefinition = row[ "definition"];
    }
    return theDefinition;
  }
  
  function getLabel(row) {
    // Returns a label from a jsonld row
    
    var theLabel = "";
    /*    if (theVocType == "Ontology" && typeof row[ "label"] != "undefined") {
    theLabel = row[ "label"];
    } else if (theVocType == "ConceptScheme" && typeof row[ "prefLabel"] != "undefined") {
    theLabel = row[ "prefLabel"];
    } */
    theLabel = row[ "label"];
    return theLabel;
  }
  
  function getLabelOrURI(row) {
    // Returns a label, or URI if no label, from a jsonld row
    
    var theLabel = "";
    if (typeof row[ "label"] != "undefined") {
      theLabel = row[ "label"];
    } else {
      theLabel = getURI(row);
    }
    return theLabel;
  }
  
  function getLink(row, isLinkOut, prefix) {
    // Returns a hyperlink with label from jsonld row
    // Link is external, label is curie prefix, if specified
    
    var theLabel = "";
    var theLink = "";
    var theLinkIsExternal = false;
    var theURI = getURI(row);
    if (typeof isLinkOut != "undefined") {
      theLinkIsExternal = isLinkOut;
    }
    if (typeof prefix != "undefined") {
      theLabel = makeCurieFromURI(theURI, prefix);
    } else {
      theLabel = getLabelOrURI(row);
    }
    theLink = linkify(theLabel, theURI, theLinkIsExternal);
    return theLink;
  }
  
  function getLanguages(regLanguages) {
    regLanguages.forEach(checkUsed);
    return;
  }
  
  function checkUsed(languageRow) {
    var languageCodeUsed =[];
    var theLanguageLabel = "";
    window.languageCodeToCheck = languageRow.code;
    languageCodeUsed = window.publishedElements.filter(filterLanguageCode);
    if (languageCodeUsed.length > 0) {
      theLanguageLabel = languageRow.label;
      window.vocLanguagesSelector += '<li><a href="?language=' + window.languageCodeToCheck + '" id="lang_' + window.languageCodeToCheck + '">' + theLanguageLabel + '</a></li>';
    }
    return;
  }
  
  function getValueByLanguage(row, languageCode, defaultLanguageCode) {
    // returns jsonld value of language code in jsonld row
    
    var theString = "";
    
    // default language is English
    
    var theLanguageCode = "en";
    
    // default default language can only be English
    // [not enabled until translation processes in place]
    
    var theDefaultLanguageCode = "";
    if (typeof defaultLanguageCode != "undefined") {
      theDefaultLanguageCode = defaultLanguageCode;
    }
    if (typeof languageCode != "undefined") {
      theLanguageCode = languageCode;
    }
    if (typeof row != "undefined" && row != null) {
      
      // available in selected language
      
      if (typeof row[theLanguageCode] != "undefined") {
        theString = directify(quotify(row[theLanguageCode]), theLanguageCode);
      }
      
      // available in default language; add qualifier to indicate not available in selected language
      
      else if (theDefaultLanguageCode.length > 0) {
        if (typeof row[theDefaultLanguageCode] != "undefined") {
          theString = directify(quotify(row[theDefaultLanguageCode]) + " ['" + theDefaultLanguageCode + "'; no '" + theLanguageCode + "']", theDefaultLanguageCode);
        }
      }
      // not available in selected or default language; output indicates the languages
      //            else if (theData instanceof Object) {
      //                theString = directify("[no '" + theLanguageCode + "' or '" + theDefaultLanguageCode + "']", theDefaultLangCode);
      //            }
    }
    return theString;
  }
  
  function getStatus(row) {
    // returns the status row from a jsonld element row
    
    var theStatus = "";
    if (typeof row.status != "undefined") {
      theStatus = row.status;
    }
    return theStatus;
  }
  
  function getTitle(vocMetadata) {
    // returns the vocabulary title from metadata
    
    var theTitle = "";
    if (typeof vocMetadata.title != "undefined") {
      theTitle = vocMetadata.title;
    }
    return theTitle;
  }
  
  function getURI(row) {
    // returns a URI from a jsonld row
    
    var theURI = "";
    var theRowID = row[ "@id"];
    if (typeof theRowID != "undefined") {
      theURI = theRowID;
    }
    return theURI;
  }
  
  function getLinkForDetailLabel(uri, label, languageCode) {
    // returns internal link for Registry URL with label in selected language
    // language code is omitted to get permalink
    
    var theLabel = "";
    var theLanguageCode = "";
    var url = "";
    if (typeof label != "undefined") {
      theLabel = label;
    }
    if (typeof languageCode != "undefined") {
      theLanguageCode = languageCode;
    }
    if (typeof uri != "undefined") {
      url = makeURLFromURI(uri, theLanguageCode);
    }
    return linkify(theLabel, url);
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
  
  function makeURLFromURI(uri, languageCode) {
    // returns Registry URL with language parameter
    
    var url = "";
    var theLanguageCode = "";
    if (typeof languageCode != "undefined") {
      theLanguageCode = languageCode;
    }
    if (typeof uri !== "undefined") {
      url = uri;
      if (uri !== null && typeof uri.replace === "function") {
        // Regular expression adds 'www' to domain and inserts hash to parameterize the local part
        url = uri.replace(/^(http:\/\/)(.*)\/(.*)$/ig, "$1www.$2/#$3");
        // no specified language gives the permalink (display default is English)
        //                if (theLangCode.length != 0) {
        // Insert language code parameter before hash
        //                    url = url.replace("#", "?language=" + theLanguageCode + "#");
        //                }
      }
    }
    return url;
  }
  
  function getLanguageCallout(data) {
    // not currently used: returns the xml language string
    if (typeof data != "undefined") {
      if (typeof data[theCurrentLanguageCode] != "undefined") {
        return "@" + theCurrentLanguageCode;
      }
      if (typeof data[ 'en'] != "undefined") {
        return "@en";
      }
    }
    return "@en *";
  }
  
  // Details display
  
  function formatDetail(d) {
    // Format table for details
    // `d` is the original data object for the row
    // Includes note (scope note), domain, range, inverse, subproperties, Toolkit label, Toolkit definition, status
    
    // Initialize detail table header row as two columns
    
    var detailRow = formatDetailRow();
    
    // Initialize detail table
    
    var detailTable = '<table class="pindex_detail">';
    
    // Assemble rows for specified fields
    
    if (typeof d != "undefined") {
      if (typeof d.note != "undefined") {
        detailRow = formatDetailRow(getValueByLanguage(d.note, theCurrentLanguageCode), "Scope notes", theCurrentLanguageCode);
        detailTable += detailRow;
      }
      if (typeof d.domain != "undefined") {
        detailRow = formatDetailRow(getLink(d.domain, false), "Domain");
        detailTable += detailRow;
      }
      if (typeof d.range != "undefined") {
        detailRow = formatDetailRow(getLink(d.range, false), "Range");
        detailTable += detailRow;
      }
      if (typeof d.inverseOf != "undefined") {
        detailRow = formatDetailRow(getLink(d.inverseOf, false), "Inverse");
        detailTable += detailRow;
      }
      if (typeof d.hasSubproperty != "undefined") {
        detailRow = formatDetailRow(formatMultivalueDetail(d.hasSubproperty, "h"), "Subproperties");
        detailTable += detailRow;
      }
      if (typeof d.subPropertyOf != "undefined") {
        detailRow = formatDetailRow(formatMultivalueDetail(d.subPropertyOf, "h"), "Superproperties");
        detailTable += detailRow;
      }
      if (typeof d.altLabel != "undefined") {
        detailRow = formatDetailRow(getValueByLanguage(d.altLabel, theCurrentLanguageCode), "Alternate label", theCurrentLanguageCode);
        detailTable += detailRow;
      }
      if (typeof d.ToolkitLabel != "undefined") {
        detailRow = formatDetailRow(getValueByLanguage(d.ToolkitLabel, theCurrentLanguageCode), "Toolkit label", theCurrentLanguageCode);
        detailTable += detailRow;
      }
      if (typeof d.ToolkitDefinition != "undefined") {
        detailRow = formatDetailRow(getValueByLanguage(d.ToolkitDefinition, theCurrentLanguageCode), "Toolkit definition", theCurrentLanguageCode);
        detailTable += detailRow;
      }
      if (typeof d.status != "undefined") {
        detailRow = formatDetailRow(getLink(d.status, true), "Status");
        detailTable += detailRow;
      }
    } else {
      detailTable += detailRow;
    }
    
    // Finalize detail table
    
    detailTable += '</table>';
    return detailTable;
  }
  
  function formatDetailRow(rowValue, rowLabel, languageCode) {
    // returns a two-column table row for the detail display
    
    var theDetailRow = "";
    var theLanguageCode = "";
    var theRowValue = "";
    var theRowLabel = "";
    if (typeof rowValue != "undefined") {
      theRowValue = rowValue;
    }
    if (typeof rowLabel != "undefined") {
      theRowLabel = rowLabel + ":";
    }
    if (typeof languageCode != "undefined") {
      theLanguageCode = languageCode;
    }
    // two columns; both columns have div wrapper for styling
    
    if (theRowValue.length > 0) {
      theDetailRow = '<tr>' + '<td class="detailLabel">' + divify(theRowLabel) + '</td>' + '<td class="detailValue">' + divify(theRowValue) + '</td>' + '</tr>';
    }
    return theDetailRow;
  }
  
  function formatMultivalueDetail(arrayRow, vh) {
    // Returns a formatted multi-value list in current language for detail entry
    // The values are internal Curie links with English label
    
    var curieLink = "";
    var detailArray = "";
    var label = "";
    var uri = "";
    
    // indicator for vertical or horizontal uri/label list
    
    var theVh = "";
    if (typeof vh != "undefined") {
      theVh = vh;
    }
    if (arrayRow instanceof Array) {
      for (i = 0; i < arrayRow.length;++ i) {
        label = quotify(getLabel(arrayRow[i]));
        uri = getURI(arrayRow[i]);
        curieLink = linkify(makeCurieFromURI(uri, curiePrefix), uri);
        switch (theVh) {
          case "h":
          detailArray += divify(curieLink + " [" + label + " (en)]");
          break;
          case "v":
          detailArray += divify(curieLink) + divify(" [" + label + " (en)]");
          break;
          default:
          detailArray += divify(curieLink + " [" + label + " (en)]");
        }
      }
    }
    return detailArray;
  }
  
  function setPageDetails(json) {
    var filenameLocal = "";
    var filepathPart = "";
    var hasSemanticsBlock = false;
    var theData;
    var theCurieExURI = "";
    var theLinkCSV = "";
    var theLinkJSONLD = "";
    var theLinkNT = "";
    var theLinkXML = "";
    var theTableTitle = "";
    var theVersionLink = "";
    var theVocCurieEx = "";
    var theVocDomain = "";
    var theVocEntriesTotal = 0;
    var theVocTitle = "";
    var theVocTypeLink = "";
    var theVocToDatatype = "";
    var theVocToObject = "";
    var theVocURI = "";
    
    // Extract the jsonld graph of vocabulary entries, then the first entry (always metadata), then the published entries
    
    theData = json[ "@graph"];
    window.publishedElements = theData.filter(filterPublished);
    
    // Get the vocabulary type ("Ontology" or "ConceptScheme" for the Header block
    
    window.theVocType = window.theVocMetadata[ "@type"];
    
    // Get the vocabulary title for the Header block
    
    theVocTitle = window.theVocMetadata.title[ "en"];
    
    // Set the table title from the vocabulary title
    // Warning! This is dependent on consistent use of vocabulary titles in jsonld metadata
    
    if (theVocTitle.indexOf("Classes") > -1) {
      theTableTitle = "Classes";
    } else if (theVocTitle.indexOf("properties") > -1) {
      theTableTitle = "Properties";
    }
    theTableTitle += " Index";
    
    // Get the vocabulary active entries total, namespace URI, version link, Curie prefix, example Curie for the Reference block
    
    theVocEntriesTotal = window.publishedElements.length;
    theVocURI = window.theVocMetadata[ "@id"];
    theVersionLink = '<a target="_blank" href="https://github.com/RDARegistry/RDA-Vocabularies/releases/tag/' + window.theVocMetadata.versionInfo + '">' + window.theVocMetadata.versionInfo + '</a>';
    
    // Example curie is first published element in data and may not be the lowest in curie order
    
    theCurieExURI = getURI(window.publishedElements[0]);
    theVocCurieEx = linkify(makeCurieFromURI(theCurieExURI, curiePrefix), theCurieExURI);
    
    // Element sets and value vocabularies have different filepath constructors
    
    if (theVocType == "Ontology") {
      filenameLocal = curiePrefix.slice(-1);
      filepathPart = "Elements";
      theVocTypeLink = '<a href="/' + filepathPart + '/">RDA element sets</a>';
      
      // Get the vocabulary domain and links to datatype and object vocabularies for the Semantics block
      
      hasSemanticsBlock = true;
      theVocDomain = theVocTitle.replace(" properties", "");
      theVocToDatatype = '<a href="' + theVocURI + 'datatype/' + '">' + theVocTitle.replace("properties", "datatype properties") + '</a>';
      theVocToObject = '<a href="' + theVocURI + 'object/' + '">' + theVocTitle.replace("properties", "object properties") + '</a>';
    } else if (theVocType == "ConceptScheme") {
      var theSchemeURI = window.theVocMetadata.inScheme;
      filenameLocal = theSchemeURI.substr(1 + theSchemeURI.lastIndexOf("/"));
      filepathPart = "termList";
      theVocTypeLink = '<a href="/' + filepathPart + '/">RDA value vocabularies</a>';
      
      // There is no Semantics block for a value vocabulary
      
      hasSemanticsBlock = false;
    }
    
    // Set the file links for the Downloads block
    
    theLinkCSV = baseDomain + 'csv/' + filepathPart + '/' + curiePrefix + '.csv';
    theLinkJSONLD = baseDomain + 'jsonld' + filepathPart + '/' + filenameLocal + ".jsonld";
    theLinkNT = baseDomain + 'nt/' + filepathPart + '/' + filenameLocal + '.nt';
    theLinkXML = baseDomain + 'xml' + filepathPart + '/' + filenameLocal + '.xml';
    
    // Get the vocabulary languages display list
    
    getLanguages(regLanguages);
    
    // Push to block values to the page
    
    document.getElementById("vocTypeLink").innerHTML = theVocTypeLink;
    document.getElementById("vocTitle").innerHTML = theVocTitle;
    document.getElementById("vocDescription").innerHTML = window.theVocMetadata.description[ "en"];
    document.getElementById("vocEntriesTotal").innerHTML = theVocEntriesTotal;
    document.getElementById("vocURI").innerHTML = theVocURI;
    document.getElementById("vocPrefix").innerHTML = curiePrefix;
    document.getElementById("vocCurieEx").innerHTML = theVocCurieEx;
    document.getElementById("vocVersion").innerHTML = theVersionLink;
    document.getElementById("linkCSV").href = theLinkCSV;
    document.getElementById("linkJSONLD").href = theLinkJSONLD;
    document.getElementById("linkNT").href = theLinkNT;
    document.getElementById("linkXML").href = theLinkXML;
    document.getElementById("vocLanguages").innerHTML = window.vocLanguagesSelector;
    if (hasSemanticsBlock) {
      document.getElementById("vocDomain").innerHTML = theVocDomain;
      document.getElementById("vocToDatatype").innerHTML = theVocToDatatype;
      document.getElementById("vocToObject").innerHTML = theVocToObject;
    } else {
      document.getElementById("vocHasSemantics").innerHTML = "";
    }
    document.getElementById("rightsStatement").innerHTML = window.theVocMetadata.rights[ "en"];
    document.getElementById("indexTitle").innerHTML = theTableTitle;
  }
  
  // Filter for vocabulary data
  
  function filterData(obj, index) {
    // filter out vocabulary metata that is always first item in jsonld graph
    return index > 0;
  }
  
  // Filter for current language code used in published vocabulary entries
  
  function filterLanguageCode(obj) {
    var isUsed = false;
    if (typeof obj.ToolkitLabel[window.languageCodeToCheck] != "undefined") {
      isUsed = true;
    }
    return isUsed;
  }
  
  // filter for published status of vocabulary entries
  
  function filterPublished(value, index, array) {
    var isPublished = false;
    if (index > 0) {
      if (value[ "status"][ "label"] == "Published") {
        isPublished = true;
      }
    }
    return isPublished;
  }
  
  // filters
  var initFilter = setFilter();
  
  //reset filter and redraw when the URL anchor changes
  
  window.onhashchange = function () {
    var initFilter = setFilter();
    setSearch(initFilter);
  };
  
  function setFilter() {
    // returns URL anchor
    
    var initFilter = null;
    
    // if the page URL has an anchor for the URI local part
    
    if (window.location.hash.indexOf('#') > -1) {
      initFilter = window.location.hash.substr(1);
    }
    return initFilter;
  }
  
  function setSearch(filter) {
    // draws the data table with the filter
    
    var table = $("table#pindex").DataTable();
    table.search('').column(2).search(filter).draw();
    $('input[type=search]').val(filter);
  }
  
  $(document).ready(
  function () {
    var pageTable = $("#pindex");
    var vocMetadata;
    var table = pageTable.DataTable({
      "ajax": {
        url: dataSource,
        //        dataType: 'json',
        //        cache: true,
        //        crossDomain: true,
        "dataSrc": function (json) {
          json.data = json[ "@graph"].filter(filterData);
          window.theVocMetadata = json.datajson[ "@graph"][0];
          getCuriePrefix();
          return json.data;
        }
      },
      "columns":[ {
        "class": 'permalink',
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumn(getLinkForDetailLabel(getURI(row), "#"));
        }
      }, {
        "class": 'details-control',
        "data": null,
        "defaultContent": '<button class="btnExpand" type="button"><i class="bi bi-arrows-expand"> </i></button>',
        "orderable": false
      }, {
        "class": "curie",
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn(getLink(row, false, curiePrefix));
        }
      }, {
        "class": "prefLabel",
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn(strongify(getValueByLanguage(getLabel(row), theCurrentLanguageCode, "en")));
        }
      }, {
        "class": "definition",
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumn(getValueByLanguage(getDefinition(row), theCurrentLanguageCode, "en"));
        }
      }, {
        "class": "status",
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn((getLink(getStatus(row), true)));
        }
      }],
      "initComplete": function (settings, json) {
        setPageDetails(json);
        // set language indicator style; border colour indicates on/selected
        
        $("#lang_" + theCurrentLanguageCode).css({
          "padding": "0.2rem", "border": "3px solid #446e9b", "border-radius": "0.5rem"
        });
      },
      "order":[[2, 'asc']],
      "lengthMenu":[[25, 50, 100, -1],[25, 50, 100, "All"]],
      //      "responsive": true,
      "deferRender": true
    });
    
    // Add event listener for opening and closing details
    
    pageTable.children("tbody").on('click', 'td.details-control', function () {
      
      // Get row containing the cell
      var tr = $(this).closest('tr');
      var row = table.row(tr);
      var cell = table.cell(this).node;
      if (row.child.isShown()) {
        // This row is already open - close it
        row.child.hide();
        //        tr.removeClass('shown');
      } else {
        // Open this row
        row.child(formatDetail(row.data())).show();
        //        tr.addClass('shown');
        cell.html('<button class="btnCollapse" type="button"><i class="bi bi-arrows-collapse"> </i></button>');
        table.draw('page');
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
        if (typeof row.child(formatDetail(row.data())) != "undefined") {
          row.child(formatDetail(row.data())).hide();
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