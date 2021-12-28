//
// Javascrpt for RDA Registry
//
"use strict";
//
// Global constants
//
// RDA Registry base domain
//
var baseDomain = "http://www.rdaregistry.info/";
//
// Array of jsonld objects for the possible languages of the vocabulary
// Object includes language code, label in English, and indication of right-to-left display
//
var regLanguages =[ {
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
//
// Global variables
//
var curiePrefix = "";
var localIDToSearch = "";
var languageCodeToCheck = "";
var publishedElements;
var theCurrentLanguageCode = "";
var theVocData = "";
var theVocDomain = "";
var theVocKind = "";
var theVocMetadata = "";
var theVocTitle = "";
var theVocURI = "";
var vocLanguagesSelector = "";
//
// Set the current language code
//
theCurrentLanguageCode = getLanguageCodeFromURL();
//
// Set the initial search filter to page URL anchor, if any
//
localIDToSearch = getAnchor();
//
// Set change of URL anchor to reset filter and redraw
//
window.onhashchange = function () {
  window.localIDToSearch = getAnchor();
  searchLocalID(window.localIDToSearch);
};
//
// Get the language code from the page URL
//
function getLanguageCodeFromURL() {
  //
  // Returns the language code from the page URL
  // 2-letter code is specified by appending "language=aa" to the vocabulary/entry URL
  // Default code is for English
  //
  var theLanguageCode = "en";
  var theURL = window.location.href;
  var theIndex = theURL.indexOf("language=");
  if (theIndex > 0) {
    theLanguageCode = theURL.substr(theIndex + 9, 2);
  }
  return theLanguageCode;
}
//
// Get the anchor (# string) from the page URL
//
function getAnchor() {
  //
  // Returns the anchor from the page URL; defaults to empty string
  //
  var theURLAnchor = "";
  //
  // if the page URL has an anchor for the URI local part
  //
  if (window.location.hash.indexOf('#') > -1) {
    theURLAnchor = window.location.hash.substr(1);
  }
  return theURLAnchor;
}

//
// Basic string formatting
//
function directify(string, languageCode) {
  // Returns a string wrapped in a div with right-to-left attribute for specified language code
  
  var rtlLangList = "ar, he";
  var rtlIndex = -1;
  var isRtl = false;
  var theLanguageCode = window.theCurrentLanguageCode;
  var theString = "";
  if (typeof string != "undefined") {
    theString = string;
  }
  if (typeof languageCode != "undefined") {
    theLanguageCode = languageCode;
  }
/*   if (theLanguageCode.length > 0) {
    rtlIndex = rtlLangList.indexOf(theLanguageCode);
  }
  if (rtlIndex > -1) {
    theString = '<div dir="rtl">' + theString + '</div>';
  } else {
    theString = "<div>" + theString + "</div>";
  } */
  isRtl = getRtl(languageCode);
  if (isRtl) {
  theString = '<div dir="rtl">' + theString + '</div>';
  } else {
  theString = "<div>" + theString + "</div>";
  }
  return theString;
}
//
function divify(string, className) {
  //
  // Returns a string wrapped in a div with optional class name
  //
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
//
function quotify(string) {
  //
  // Returns a string delimited with quotes
  //
  var theString = "";
  if (typeof string != "undefined") {
    theString = string;
  }
  return '"' + string + '"';
}
//
function strongify(string) {
  //
  // Returns a string marked as strong
  //
  var theString = "";
  if (typeof string != "undefined") {
    theString = string;
  }
  return '<strong>' + string + '</strong>';
}
//
// Format links
//
function linkify(label, uri, isLinkOut) {
  //
  // Returns link based on label and URI
  // Internal link uses same browser window; external link uses new browser window
  //
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
//
function makeCurieFromURI(uri, prefix) {
  //
  // Returns a curie
  //
  var theCurie = "";
  var thePrefix = "";
  var theURI = "";
  if (typeof prefix != "undefined") {
    thePrefix = prefix;
  }
  if (typeof uri != "undefined") {
    theURI = uri;
  }
  //
  // check and set curie prefix for datatype and object children
  //
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
//
// Set variables from jsonld
//
function getCuriePrefix() {
  //
  // Sets the vocabulary prefix
  //
  if (typeof window.theVocMetadata.prefix != "undefined") {
    window.curiePrefix = window.theVocMetadata.prefix;
  }
  return;
}
//
function getDomain(vocTitle) {
  //
  // Sets the vocabulary domain
  //
  var theVocDomain = "";
  var theVocTitle = "";
  if (typeof vocTitle != "undefined") {
    theVocTitle = vocTitle;
  }
  switch (window.theVocKind) {
    case "canonical":
    theVocDomain = theVocTitle.replace("properties", "").trim();
    break;
    case "datatype":
    theVocDomain = theVocTitle.replace("datatype properties", "").trim();
    break;
    case "datatype":
    theVocDomain = theVocTitle.replace("object properties", "").trim();
    break;
    case "class":
    theVocDomain = "Classes";
    break;
    case "value":
    theVocDomain = "Concepts";
    break;
    default:
    theVocDomain = "Properties";
  }
  return theVocDomain;
}
//
function getLanguagesUsed(regLanguages) {
  regLanguages.forEach(checkUsed);
  return;
}
//

function checkUsed(languageObject) {
  var languageCodeUsed =[];
  var theLanguageLabel = "";
  window.languageCodeToCheck = languageObject["code"];
  //  languageCodeUsed = window.publishedElements.filter(filterLanguageCode);
  if (typeof window.publishedElements.ToolkitLabel[window.languageCodeToCheck] != "undefined") {
    //  if (languageCodeUsed.length > 0) {
    theLanguageLabel = languageRow.label;
    window.vocLanguagesSelector += '<li><a href="?language=' + window.languageCodeToCheck + '" id="lang_' + window.languageCodeToCheck + '">' + theLanguageLabel + '</a></li>';
  }
}

//
// Get rtl for language code from regLanguages
//
function getRtl(languageCode) {
  var theLanguage = "";
  var theLanguageCode = "en";
  if (typeof languageCode != "undefined") {
    theLanguageCode = languageCode;
  }
  window.languageCodeToCheck = languageCode;
  theLanguage = window.regLanguages.filter(getLanguageFromLanguages);
  return theLanguage[0]["rtl"];
}
function getLanguageFromLanguages(languageObject) {
  return languageObject["code"] == window.languageCodeToCheck;
}
//
// Get entry data from jsonld
//
function getDefinition(row) {
  //
  // Returns a definition from a jsonld entry row
  //
  var theDefinition = "";
  if (typeof row[ "definition"] != "undefined") {
    theDefinition = row[ "definition"];
  }
  return theDefinition;
}
//
function getLabel(row) {
  //
  // Returns a label from a jsonld entry row
  //
  var theLabel = "";
  //
  // Value vocabularies use prefLabel property; element sets use label property
  //
  if (window.theVocKind == "value" && typeof row[ "prefLabel"] != "undefined") {
    theLabel = row[ "prefLabel"];
  } else {
    theLabel = row[ "label"];
  }
  return theLabel;
}
//
function getLabelOrURI(row) {
  //
  // Returns a label, or URI if no label, from a jsonld row
  //
  var theLabel = "";
  if (typeof row[ "label"] != "undefined") {
    theLabel = row[ "label"];
  } else {
    theLabel = getURI(row);
  }
  return theLabel;
}
//
function getLink(row, isLinkOut, prefix) {
  //
  // Returns a hyperlink with label from jsonld row
  // Link is external, label is curie prefix, if specified
  //
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
//
function getStatus(row) {
  // Returns the status row from a jsonld element row
  
  var theStatus = "";
  if (typeof row.status != "undefined") {
    theStatus = row.status;
  }
  return theStatus;
}
//
function getTitle(vocMetadata) {
  // Returns the vocabulary title from metadata
  
  var theTitle = "";
  if (typeof vocMetadata.title != "undefined") {
    theTitle = vocMetadata.title;
  }
  return theTitle;
}
//
function getURI(row) {
  // Returns a URI from a jsonld row
  
  var theURI = "";
  var theRowID = row[ "@id"];
  if (typeof theRowID != "undefined") {
    theURI = theRowID;
  }
  return theURI;
}
//
function getValueByLanguage(row, languageCode, defaultLanguageCode) {
  // Returns jsonld value of language code in jsonld row
  
  var theString = "";
  
  // default language is EngliRh
  
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
//

function getVocKind(vocURI) {
  // Returns the kind of vocabulary from the vocabulary URI
  // The kind is based on the URI pattern
  
  var theVocKind = "";
  var theVocURI = "";
  if (typeof vocURI != "undefined") {
    theVocURI = vocURI;
    
    // value vocabulary uses "termlist" in URI/filepath
    
    if (theVocURI.indexOf("/termList/") > -1) {
      theVocKind = "value";
    }
    
    // datatype element set uses "datatype" in URI/filepath
    
    else if (theVocURI.indexOf("/datatype/") > -1) {
      theVocKind = "datatype";
    }
    
    // object element set uses "object" in URI/filepath
    
    else if (theVocURI.indexOf("/object/") > -1) {
      theVocKind = "object";
    }
    
    // classes element set uses entity code "c" in URI/filepath
    
    else if (theVocURI.indexOf("/c/") > -1) {
      theVocKind = "class";
    }
    
    // all other vocabularies are canonical element sets
    
    else {
      theVocKind = "canonical";
    }
  }
  return theVocKind;
}
//
function getLinkForDetailLabel(uri, label, languageCode) {
  // Returns internal link for Registry URL with label in selected language
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
//
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
//
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
//
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

function formatDetailRow(rowValue, rowLabel) {
  // returns a two-column table row for the detail display
  
  var theDetailRow = "";
  var theRowValue = "";
  var theRowLabel = "";
  if (typeof rowValue != "undefined") {
    theRowValue = rowValue;
  }
  if (typeof rowLabel != "undefined") {
    theRowLabel = rowLabel + ":";
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
//
//
//
function searchLocalID() {
  //
  // Draws the data table with the search
  //
  var table = $("table#pindex").DataTable();
  table.search('').column('Curie:name').search(window.localIDToSearch).draw();
  //
  // Put the filter in the search box
  //
  $('input[type=search]').val(window.localIDToSearch);
}
//
//
//
function setPageDetails(json) {
  var filenameLocal = "";
  var filepathPart = "";
  var theSemanticsBlock = "";
  var theData;
  var theCurieExURI = "";
  var theLinkCSV = "";
  var theLinkJSONLD = "";
  var theLinkNT = "";
  var theLinkXML = "";
  var theTableTitle = "";
  var theVersionLink = "";
  var theVocCurieEx = "";
  var theVocEntriesTotal = 0;
  var theVocMenuLink = "";
  var theVocToDatatype = "";
  var theVocToObject = "";
  
  // Extract the jsonld graph of vocabulary entries, then the first entry (always metadata), then the published entries
  
  theData = json[ "@graph"];
  window.publishedElements = theData.filter(filterPublished);
  
  // Get the vocabulary title for the Header block
  
  window.theVocTitle = window.theVocMetadata.title[ "en"];
  
  window.theVocURI = window.theVocMetadata[ "@id"];
  
  window.theVocKind = getVocKind(window.theVocURI);
  
  window.theVocDomain = getDomain(window.theVocTitle);
  
  // Set the table title from the kind of vocabulary
  // Warning! This is dependent on consistent use of vocabulary URI/filepaths in jsonld metadata
  
  var vocKind = window.theVocKind;
  
  switch (vocKind) {
    case "class":
    theTableTitle = "Classes";
    break;
    case "value":
    theTableTitle = "Concepts";
    break;
    default:
    theTableTitle = "Properties";
  }
  theTableTitle += " Index";
  
  // Get the vocabulary active entries total, namespace URI, version link, Curie prefix, example Curie for the Reference block
  
  theVocEntriesTotal = window.publishedElements.length;
  theVersionLink = '<a target="_blank" href="https://github.com/RDARegistry/RDA-Vocabularies/releases/tag/' + window.theVocMetadata.versionInfo + '">' + window.theVocMetadata.versionInfo + '</a>';
  
  // Example curie is first published element in data and may not be the lowest in curie order
  
  theCurieExURI = getURI(window.publishedElements[0]);
  theVocCurieEx = linkify(makeCurieFromURI(theCurieExURI, curiePrefix), theCurieExURI);
  
  // Element sets and value vocabularies have different filepath constructors
  
  switch (vocKind) {
    case "value":
    theVocMenuLink = '<a href="/termList/">RDA value vocabularies</a>';
    break;
    default:
    theVocMenuLink = '<a href="/Elements/">RDA element sets</a>';
  }
  
  // Set the file links for the Downloads block
  
  theLinkCSV = baseDomain + 'csv/' + filepathPart + '/' + curiePrefix + '.csv';
  theLinkJSONLD = baseDomain + 'jsonld/' + filepathPart + '/' + filenameLocal + ".jsonld";
  theLinkNT = baseDomain + 'nt/' + filepathPart + '/' + filenameLocal + '.nt';
  theLinkXML = baseDomain + 'xml/' + filepathPart + '/' + filenameLocal + '.xml';
  
  // Get the vocabulary languages display list
  
  //    getLanguagesUsed(regLanguages);
  
  // Push to block values to the page
  
  document.getElementById("vocMenuLink").innerHTML = theVocMenuLink;
  document.getElementById("vocTitle").innerHTML = window.theVocTitle;
  document.getElementById("vocDescription").innerHTML = window.theVocMetadata.description[ "en"];
  document.getElementById("vocEntriesTotal").innerHTML = theVocEntriesTotal;
  document.getElementById("vocURI").innerHTML = window.theVocURI;
  document.getElementById("vocPrefix").innerHTML = curiePrefix;
  document.getElementById("vocCurieEx").innerHTML = theVocCurieEx;
  document.getElementById("vocVersion").innerHTML = theVersionLink;
  document.getElementById("linkCSV").href = theLinkCSV;
  document.getElementById("linkJSONLD").href = theLinkJSONLD;
  document.getElementById("linkNT").href = theLinkNT;
  document.getElementById("linkXML").href = theLinkXML;
  //    document.getElementById("vocLanguages").innerHTML = window.vocLanguagesSelector;
  theLanguagesBlock = formatLanguagesBlock();
  if (theLanguagesBlock.length > 0) {
    document.getElementById("vocHasLanguages").innerHTML = theLanguagesBlock;
  }
  theSemanticsBlock = formatSemanticsBlock();
  if (theSemanticsBlock.length > 0) {
    document.getElementById("vocHasSemantics").innerHTML = theSemanticsBlock;
  }
  document.getElementById("rightsStatement").innerHTML = window.theVocMetadata.rights[ "en"];
  document.getElementById("indexTitle").innerHTML = theTableTitle;
}
//
// Format Languages block
//
function formatLanguagesBlock() {
  var theLanguagesBlock = "";
  var theLanguages = window.regLanguages;
  theLanguagesBlock += '<h3>Languages</h3>';
  switch (window.theVocKind) {
    case "datatype":
    theLanguagesBlock += '<p>A datatype element set uses English labels only.</p>';
    break;
    case "object":
    theLanguagesBlock += '<p>An object element set uses English labels only.</p>';
    break;
    default:
    theLanguagesBlock += '<ul>';
    theLanguages.forEach(checkUsed);
    theLanguagesBlock += window.vocLanguagesSelector;
    theLanguagesBlock += '</ul>';
  }
  return theLanguagesBlock;
}
//
// Format Semantics block
//
function formatSemanticsBlock() {
  
  var theSemanticsBlock = "";
  theSemanticsBlock += '<h3>Semantics</h3>';
  switch (window.theVocKind) {
    case "canonical":
    var theVocToDatatype = '<a href="' + window.theVocURI + 'datatype/' + '">' + window.theVocTitle.replace("properties", "datatype properties") + '</a>';
    var theVocToObject = '<a href="' + window.theVocURI + 'object/' + '">' + window.theVocTitle.replace("properties", "object properties") + '</a>';
    theSemanticsBlock += '<p>Each property in the canonical element set:</p>';
    theSemanticsBlock += '<ul class="ms-3 my-0 ps-1">';
    theSemanticsBlock += '<li>has a domain of the class that represents the ' + window.theVocDomain + ' entity.</li>';
    theSemanticsBlock += '<li>is linked from its child <strong>datatype</strong> property in ' + theVocToDatatype + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '<li>is linked from its child <strong>object</strong> property in ' + theVocToObject + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '</ul>';
    break;
    case "class":
    theSemanticsBlock = "";
    break;
    case "datatype":
    var theVocToParent = '<a href="' + window.theVocURI.replace("/datatype", "") + '">' + window.theVocTitle.replace("datatype properties", "properties") + '</a>';
    theSemanticsBlock += '<p>Each property in the datatype element set:</p>';
    theSemanticsBlock += '<ul class="ms-3 my-0 ps-1">';
    theSemanticsBlock += '<li>has a domain of the class that represents the ' + window.theVocDomain + ' entity.</li>';
    theSemanticsBlock += '<li>is linked to its parent <strong>canonical</strong> property in ' + theVocToParent + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '</ul>';
    break;
    case "object":
    var theVocToParent = '<a href="' + window.theVocURI.replace("/object", "") + '">' + window.theVocTitle.replace("object properties", "properties") + '</a>';
    theSemanticsBlock += '<p>Each property in the object element set:</p>';
    theSemanticsBlock += '<ul class="ms-3 my-0 ps-1">';
    theSemanticsBlock += '<li>has a domain of the class that represents the ' + window.theVocDomain + ' entity.</li>';
    theSemanticsBlock += '<li>is linked to its parent <strong>canonical</strong> property in ' + theVocToParent + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '</ul>';
    break;
    case "value":
    theSemanticsBlock = "";
    break;
    default:
    theSemanticsBlock = "";
  }
  return theSemanticsBlock;
}

//
// Filters
//
// Filter for vocabulary data
//
function filterData(obj, index) {
  //
  // Filter excludes vocabulary metadata that is always first item in jsonld graph
  //
  return index > 0;
}
//
// Filter for current language code used in published vocabulary entries
//
function filterLanguageCode(obj) {
  var isUsed = false;
  if (typeof obj.ToolkitLabel[window.languageCodeToCheck] != "undefined") {
    isUsed = true;
  }
  return isUsed;
}
//
// Filter for vocabulary entries with published status
//
function filterPublished(value, index, array) {
  var isPublished = false;
  if (index > 0) {
    if (value[ "status"][ "label"] == "Published") {
      isPublished = true;
    }
  }
  return isPublished;
}
//
// Process vocabulary data if defined.
//
if (typeof dataSource !== "undefined") {
  $(document).ready(
  function () {
    var pageTable = $("#pindex");
    var vocMetadata;
    var table;
    //
    // Set table to datatable instance
    //
    table = pageTable.DataTable({
      "ajax": {
        "url": dataSource,
        "dataType": 'json',
        "dataSrc": function (json) {
          //
          // Get vocabulary metadata; always first row of graph
          //
          window.theVocMetadata = json[ "@graph"][0];
          //
          // get vocabulary data; filter out first row of graph
          //
          json.data = json[ "@graph"].filter(filterData);
          theVocData = json.data;
          //
          // get vocabulary curie prefix
          //
          getCuriePrefix();
          return json.data;
        }
      },
      "columns":[ {
        "class": 'permalink',
        "name": 'Permalink',
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumn(getLinkForDetailLabel(getURI(row), "#"));
        }
      }, {
        "class": 'details-control',
        "data": null,
        "defaultContent": '<button class="btnExpand" type="button"><i class="bi bi-arrows-expand"> </i></button>',
        "name": 'Detail',
        "orderable": false
      }, {
        "class": "curie",
        "name": 'Curie',
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn(getLink(row, false, curiePrefix));
        }
      }, {
        "class": "prefLabel",
        "name": 'Label',
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn(strongify(getValueByLanguage(getLabel(row), theCurrentLanguageCode, "en")));
        }
      }, {
        "class": "definition",
        "name": 'Definition',
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumn(getValueByLanguage(getDefinition(row), theCurrentLanguageCode, "en"));
        }
      }, {
        "class": "status",
        "name": 'Status',
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumn((getLink(getStatus(row), true)));
        }
      }],
      "initComplete": function (settings, json) {
        //
        // Set page detail values from jsonld
        //
        setPageDetails(json);
        //
        // set language indicator style; border colour indicates on/selected
        //
        $("#lang_" + theCurrentLanguageCode).css({
          "padding": "0.2rem", "border": "3px solid #446e9b", "border-radius": "0.5rem"
        });
      },
      "order":[[2, 'asc']],
      "lengthMenu":[[25, 50, 100, -1],[25, 50, 100, "All"]],
      "pagingType": 'full_numbers',
      //      "responsive": true,
      "deferRender": true
    });
    //
    // Add event listener for expanding and collapsing details
    //
    pageTable.children("tbody").on('click', 'td.details-control', function () {
      //
      // Get row containing the cell
      //
      var tr = $(this).closest('tr');
      var row = table.row(tr);
      if (row.child.isShown()) {
        //
        // This row is already open - close it and reset expand details button
        //
        row.child.hide();
        $(this).html('<button class="btnExpand" type="button"><i class="bi bi-arrows-expand"> </i></button>');
      } else {
        //
        // Open this row and set collapse details button
        //
        row.child(formatDetail(row.data())).show();
        $(this).html('<button class="btnCollapse" type="button"><i class="bi bi-arrows-collapse"> </i></button>');
      }
    });
    
    /*     $('#pindex').on('draw.dt', function () {
    var tablePage = table.pageInfo();
    if (tablePage.length == 1) {
    
    $("#pindex").children("tbody").td.details - control.click();
    }
    }); */
    
    $('input[type=search]').on('click', function () {
      if (history.pushState) {
        history.pushState(null, null, document.location.pathname);
      } else {
        location.hash = '';
      }
      searchLocalID('');
    });
    
    if (window.localIDToSearch.length > 0) {
      table.column('Curie:name').search(window.localIDToSearch);
      $("div#pindex_filter input").val(window.localIDToSearch);
    }
    //
    // Set tooltip defaults
    //
    $.protip({
      defaults: {
        delayIn: 500,
        gravity: true,
        position: 'top',
        scheme: 'aqua'
      }
    })
  });
  $.fn.dataTableExt.oApi.clearSearch = function (oSettings) {
    var table = $("#pindex").DataTable();
    var clearSearch = $('<img class = "delete" title="Cancel Search" alt="" src="data:image/png;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD2SURBVHjaxFM7DoMwDH2pOESHHgDPcB223gKpAxK34EAMMIe1FCQOgFQxuflARVBSVepQS5Ht2PHn2RHMjF/ohB8p2gSZpprtyxEHX8dGTeMG0A5UlsD5rCSGvF55F4SpqpSm1GmCzPO3LXJy1LXllwvodoMsCpNVy2hbYBjCLRiaZ8u7Dng+QXlu9b4H7ncvBmKbwoYBWR4kaXv3YmAMyoEpjv2PdWUHcP1j1ECqFpyj777YA6Yss9KyuEeDaW0cCsCUJMDjYUE8kr5TNuOzC+JiMI5uz2rmJvNWvidwcJXXx8IAuwb6uMqrY2iVgzbx99/4EmAAarFu0IJle5oAAAAASUVORK5CYII="  style="cursor:pointer;padding-left:.5em;" />');
    $(clearSearch).click(function () {
      searchLocalID('');
      table.search('');
      if (window.localIDToSearch.length > 0) {
        window.localIDToSearch = "";
        var tr = $("#" + window.localIDToSearch).closest('tr');
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
}