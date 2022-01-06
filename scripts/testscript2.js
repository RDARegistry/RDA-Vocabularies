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
  code: "es", label: "Spanish", rtl: false
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
}, {
  code: "zh", label: "Chinese", rtl: false
}];
//
// Global variables
//
var curiePrefix = "";
var detailList = "";
var domSetting = "";
var languageIsUsed = false;
var localIDToSearch = "";
var languageCodeToCheck = "";
var theCurrentLanguageCode = "";
var theDefaultLanguageCode = "en";
var theLocalisationObject = "";
var theVocData = "";
var theVocDomain = "";
var theVocKind = "";
var theVocMetadata = "";
var theVocPublishedEntries;
var theVocTitle = "";
var theVocURI = "";
var vocLanguagesSelector = "";
var localisationData = "";
//
// Initialize the current language code from the page URL
//
getLanguageCodeFromURL();
/*
function setDTStrings() {
//
// Get DataTables localisation object from json file
//
$.getJSON("localisation.json", function (data) {
window.localisationData = data;
});
if (typeof window.localisationData[window.theCurrentLanguageCode] != "undefined") {
window.theLocalisationObject = window.localisationData[window.theCurrentLanguageCode].dtStrings;
}
return;
} */
function setDTObject() {
  if (typeof window.localisationData[window.theCurrentLanguageCode] != "undefined") {
    window.theLocalisationObject = window.localisationData[window.theCurrentLanguageCode].dtStrings;
  }
}

function getLocalisation(myCallback) {
  //  let req = new XMLHttpRequest();
  //  req.open('GET', "localisation.json");
  //  req.onload = function () {
  //    var data = this.response;
  //    window.localisationData = data;
  //    myCallback;
  //  }
  //  req.send();
  $.getJSON("localisation.json", function (data) {
    window.localisationData = data;
  });
  myCallback;
  return;
}

getLocalisation(setDTObject);
//
// Set the initial search filter to page URL anchor and set DT DOM
//
window.localIDToSearch = getAnchor();
setDTDom();
//
// Set change of URL anchor to reset filter and redraw
//
window.onhashchange = function () {
  var table = $("table#pindex").DataTable();
  window.localIDToSearch = getAnchor();
  setDTDom();
  table.search('').column('Curie:name').search(window.localIDToSearch).draw();
};
//
// Get the language code from the page URL
//
function getLanguageCodeFromURL() {
  //
  // Sets the current language code from the page URL
  // 2-letter code is specified by appending "language=aa" to the vocabulary/entry URL
  // Default code is for English
  //
  var theURL = window.location.href;
  var theIndex = theURL.indexOf("language=");
  if (theIndex > 0) {
    window.theCurrentLanguageCode = theURL.substr(theIndex + 9, 2);
  } else {
    window.theCurrentLanguageCode = window.theDefaultLanguageCode;
  }
  return;
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
// Set DataTables DOM settings with Bootstrap 5
//
function setDTDom() {
  if (window.localIDToSearch.length > 0) {
    //
    // Set the DOM to display only the processing indicator (not really used) and table
    //
    window.domSetting = "<'row'<'col-sm-12'tr>>";
  } else {
    //
    // Set the DOM to display all utilities
    //
    window.domSetting = "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
  }
}
//
// Basic string formatting
//
//
// Set string orientation
//
function directify(theString) {
  //
  // Returns a string wrapped in a div with right-to-left attribute for current language code
  //
  var isRtl = false;
  isRtl = getRtl();
  if (isRtl) {
    theString = '<div dir="rtl">' + theString + '</div>';
  } else {
    theString = "<div>" + theString + "</div>";
  }
  return theString;
}
//
function divify(theString, className) {
  //
  // Returns a string wrapped in a div with optional class name
  //
  var theClassName = "";
  if (typeof className != "undefined") {
    theString = '<div class="' + className + '">' + theString + '</div>';
  } else {
    theString = '<div>' + theString + '</div>';
  }
  return theString;
}
//
function listify(theString) {
  //
  // Returns a string marked as a list item
  //
  return '<li>' + theString + '</li>';
}
//
function quotify(theString) {
  //
  // Returns a string delimited with quotes
  //
  return '"' + theString + '"';
}
//
function strongify(theString) {
  //
  // Returns a string marked as strong
  //
  return '<strong>' + theString + '</strong>';
}
//
// Format links
//
function linkify(label, url, isLinkOut) {
  //
  // Returns link based on label and URL
  // Internal link uses same browser window; external link uses new browser window
  //
  var theLabel = "";
  var theLink = "";
  var theLinkIsExternal = false;
  var theURL = "";
  if (typeof label != "undefined") {
    theLabel = label;
  }
  if (typeof url != "undefined") {
    theURL = url;
  }
  if (typeof isLinkOut != "undefined") {
    theLinkIsExternal = isLinkOut;
  }
  if (theLinkIsExternal) {
    theLink = '<a href="' + theURL + '" target="_blank">' + theLabel + '</a>';
  } else {
    theLink = '<a href="' + theURL + '">' + theLabel + '</a>';
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
  // Check and set curie prefix for datatype and object children
  //
  if (theURI.indexOf("datatype") > 0) {
    thePrefix += "d";
  }
  if (theURI.indexOf("object") > 0) {
    thePrefix += "o";
  }
  //
  // Replace URI up to last sub-folder slash with prefix and colon
  //
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
// Get the vocabulary domain
//
function getDomain() {
  //
  // Sets the vocabulary domain extracted from the vocabulary title
  //
  switch (window.theVocKind) {
    case "canonical":
    window.theVocDomain = window.theVocTitle.replace("properties", "").trim();
    break;
    case "datatype":
    window.theVocDomain = window.theVocTitle.replace("datatype properties", "").trim();
    break;
    case "object":
    window.theVocDomain = window.theVocTitle.replace("object properties", "").trim();
    break;
    case "class":
    window.theVocDomain = "Classes";
    break;
    case "value":
    window.theVocDomain = "Concepts";
    break;
    case "rof":
    window.theVocDomain = "";
    break;
    default:
    window.theVocDomain = "Properties";
  }
  return;
}
//
// Get language data for the code to be checked from Registry languages array
//
function getLanguageFromLanguages(languageObject) {
  return languageObject[ "code"] == window.languageCodeToCheck;
}
//
// Check for use of specified language
//
function getLanguageIsUsed(languageObject) {
  //
  // Checks that the code of a specified language object from the Registry languages is in use
  //
  var theLanguageLabel = "";
  var thePageURL = window.location.href;
  var theURL = "";
  var theLanguageIndex = 0;
  var theHashIndex = 0;
  //
  // Get the language code to check from the language object
  //
  window.languageCodeToCheck = languageObject[ "code"];
  //
  // Check the language is used for the Toolkit label in any of the published elements of the vocabulary
  //
  window.languageIsUsed = false;
  window.theVocPublishedEntries.forEach(getLanguageIsPublished);
  //
  // Add the language to the selector list if it is used
  //
  if (window.languageIsUsed) {
    theLanguageLabel = languageObject[ "label"];
    theHashIndex = thePageURL.indexOf("#");
    theLanguageIndex = thePageURL.indexOf("?language=");
    //
    // Add language filter to language selector link, depending on existing filter and anchor
    //
    if (theLanguageIndex > -1) {
      //
      // Replace existing filter
      //
      theURL = thePageURL.slice(0, theLanguageIndex) + "?language=" + window.languageCodeToCheck + thePageURL.slice(theLanguageIndex + 12)
    } else if (theHashIndex > -1) {
      //
      // Insert filter before anchor
      //
      theURL = thePageURL.replace("#", "?language=" + window.languageCodeToCheck + "#")
    } else {
      //
      // Add filter
      //
      theURL = thePageURL + "?language=" + window.languageCodeToCheck;
    }
    window.vocLanguagesSelector += '<li><a href="' + theURL + '" id="lang_' + window.languageCodeToCheck + '">' + theLanguageLabel + '</a></li>';
  }
  return;
}
//
// Check that there is a published Toolkit label, and language code is used
//
function getLanguageIsPublished(entryObject) {
  if (typeof entryObject[ "ToolkitLabel"] != "undefined") {
    if (typeof entryObject[ "ToolkitLabel"][window.languageCodeToCheck] != "undefined") {
      window.languageIsUsed = true;
    }
  }
  return;
}
//
// Get rtl for language code from the Registry languages
//
function getRtl() {
  //
  // Returns a right-to-left flag for the current language code
  //
  var theLanguageArray = "";
  window.languageCodeToCheck = window.theCurrentLanguageCode;
  theLanguageArray = window.regLanguages.filter(getLanguageFromLanguages);
  //
  // Return the rtl value for the only entry in the array
  //
  return theLanguageArray[0][ "rtl"];
}
//
// Get entry data from jsonld
//
function getDefinition(entryObject) {
  //
  // Returns a definition from a jsonld entry
  //
  var theDefinition = "";
  switch (window.theVocKind) {
    case "datatype":
    case "object":
    theDefinition = "The definition is attached to the parent canonical property.";
    break;
    default:
    if (typeof entryObject[ "definition"] != "undefined") {
      theDefinition = getValueByLanguage(entryObject[ "definition"])
    }
  }
  return theDefinition;
}
//
// Get entry label
//
function getLabel(entryObject) {
  //
  // Returns a label from a jsonld entry
  //
  var theLabel = "";
  //
  // Value vocabularies use prefLabel property; element sets use label property
  //
  if (window.theVocKind == "value" && typeof entryObject[ "prefLabel"] != "undefined") {
    theLabel = entryObject[ "prefLabel"];
  } else {
    theLabel = entryObject[ "label"];
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
    theLabel = row[ "@id"];
  }
  return theLabel;
}
//
// Get hyperlink
//
function getLink(entryObject, isLinkOut, prefix) {
  //
  // Returns a hyperlink with label from a jsonld object
  // Link is external, label is curie prefix, if specified
  //
  var theLabel = "";
  var theLink = "";
  var theLinkIsExternal = false;
  var theURI = getURI(entryObject);
  if (typeof isLinkOut != "undefined") {
    theLinkIsExternal = isLinkOut;
  }
  if (typeof prefix != "undefined") {
    theLabel = makeCurieFromURI(theURI, prefix);
  } else {
    theLabel = getLabelOrURI(entryObject);
  }
  theLink = linkify(theLabel, theURI, theLinkIsExternal);
  return theLink;
}
//
// Get the status object
//
function getStatus(entryObject) {
  //
  // Returns the status row from a jsonld object
  //
  var theStatus = "";
  if (typeof entryObject.status != "undefined") {
    theStatus = entryObject.status;
  }
  return theStatus;
}
//
// Get the URI of a vocabulary entry
//
function getURI(entryObject) {
  //
  // Returns a URI from a jsonld entry
  //
  var theURI = "";
  if (typeof entryObject[ "@id"] != "undefined") {
    theURI = entryObject[ "@id"];
  }
  return theURI;
}
//
// Get the value string for the current language from a jsonld entry
//
function getValueByLanguage(entryObject) {
  //
  // Returns formatted string for jsonld value of language code in jsonld entry
  //
  var theString = "";
  //
  // Available in current language
  //
  if (typeof entryObject[window.theCurrentLanguageCode] != "undefined") {
    //
    // Add explicit quotes to show it is a string value and markup as div with display direction
    //
    theString = directify(quotify(entryObject[window.theCurrentLanguageCode]));
  }
  //
  // Not available in current language: use default (English) and add qualifier to indicate not available in current language
  // Add quotes to show it is a string value and markup as div
  //
  else {
    theString = divify(quotify(entryObject[window.theDefaultLanguageCode]) + " [@" + window.theDefaultLanguageCode + "; no @" + window.theCurrentLanguageCode + "]");
  }
  return theString;
}
//
// Get the kind of vocabulary
//
function getVocKind() {
  //
  // Sets the kind of vocabulary from the vocabulary URI
  // The kind is based on the URI pattern
  //
  if (typeof window.theVocURI != "undefined") {
    //
    // ROF element set uses "rof" in URI/filepath
    //
    if (window.theVocURI.indexOf("/rof/") > -1) {
      window.theVocKind = "rof";
    }
    //
    // Value vocabulary uses "termlist" in URI/filepath
    //
    else if (window.theVocURI.indexOf("/termList/") > -1) {
      window.theVocKind = "value";
    }
    //
    // Datatype element set uses "datatype" in URI/filepath
    //
    else if (window.theVocURI.indexOf("/datatype/") > -1) {
      window.theVocKind = "datatype";
    }
    //
    // Object element set uses "object" in URI/filepath
    //
    else if (window.theVocURI.indexOf("/object/") > -1) {
      window.theVocKind = "object";
    }
    //
    // Classes element set uses entity code "c" in URI/filepath
    //
    else if (window.theVocURI.indexOf("/c/") > -1) {
      window.theVocKind = "class";
    }
    //
    // Default: all other vocabularies are canonical element sets
    //
    else {
      window.theVocKind = "canonical";
    }
  }
  return;
}
//
// Get permalink URL from URI
//
function getPermalink(uri) {
  //
  // Transform URI to URL with regular expression
  //
  var thePermalink = "";
  if (typeof uri !== "undefined") {
    thePermalink = uri.replace(/^(http:\/\/)(.*)\/(.*)$/ig, "$1www.$2/#$3");
  }
  return thePermalink;
}
//
// Format row of table column
//
function makeColumnRow(content, className) {
  //
  // Returns column row content in a wrapper div with direction parameter
  //
  return divify(content, className);
}
//
// Create Registry URL from entry URI
//
function getLanguageURL(permalink) {
  //
  // Returns permalink URL with current language parameter
  //
  var theUrl = "";
  if (typeof permalink !== "undefined") {
    theUrl = permalink.replace("#", "?language=" + window.theCurrentLanguageCode + "#");
  }
  return theUrl;
}
//
// Details display
//
function formatDetail(d) {
  //
  // Format table for details
  // `d` is the original data object for the row
  // Includes note (scope note), domain, range, inverse, subproperties, Toolkit label, Toolkit definition, status
  //
  // Initialize detail table header row as two columns
  //
  var detailRow = formatDetailRow();
  //
  // Initialize detail table
  //
  var detailTable = '<table class="pindex_detail">';
  //
  // Assemble table rows for specified fields
  // Missing fields are ignored
  //
  if (typeof d != "undefined") {
    if (typeof d.note != "undefined") {
      detailRow = formatDetailRow(getValueByLanguage(d.note), "Scope notes");
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
      detailRow = formatDetailRow(formatMultivalueDetail(d.hasSubproperty), "Subproperties");
      detailTable += detailRow;
    }
    if (typeof d.subPropertyOf != "undefined") {
      detailRow = formatDetailRow(formatMultivalueDetail(d.subPropertyOf), "Superproperties");
      detailTable += detailRow;
    }
    if (typeof d.ToolkitLabel != "undefined") {
      detailRow = formatDetailRow(getValueByLanguage(d.ToolkitLabel), "Toolkit label");
      detailTable += detailRow;
    }
    if (typeof d.ToolkitDefinition != "undefined") {
      detailRow = formatDetailRow(getValueByLanguage(d.ToolkitDefinition), "Toolkit definition");
      detailTable += detailRow;
    }
    if (typeof d.altLabel != "undefined") {
      detailRow = formatDetailRow(getValueByLanguage(d.altLabel), "Alternate label");
      detailTable += detailRow;
    }
    if (typeof d.notation != "undefined") {
      detailRow = formatDetailRow(d.notation[window.theDefaultLanguageCode], "Notation");
      detailTable += detailRow;
    }
    if (typeof d.status != "undefined") {
      detailRow = formatDetailRow(getLink(d.status, true), "Status");
      detailTable += detailRow;
    }
  } else {
    detailTable += detailRow;
  }
  //
  // Finalize detail table
  //
  detailTable += '</table>';
  return detailTable;
}
//
// Format row for detail display
//
function formatDetailRow(rowValue, rowLabel) {
  //
  // Returns a two-column table row for the detail display
  //
  var theDetailRow = "";
  var theRowValue = "";
  var theRowLabel = "";
  if (typeof rowValue != "undefined") {
    theRowValue = rowValue;
  } else {
    //
    // Row value defaults to global detail list
    //
    theRowValue = window.detailList;
  }
  if (typeof rowLabel != "undefined") {
    theRowLabel = rowLabel + ":";
  }
  // two columns; both columns have div wrapper for styling
  
  if (theRowValue.length > 0) {
    theDetailRow = '<tr>' + '<td class="detailLabel">' + divify(theRowLabel) + '</td>' + '<td class="detailValue">' + divify(theRowValue) + '</td>' + '</tr>';
  } else {
    theDetailRow = '<tr>' + '<th class="detailLabel"></th>' + '<th class="detailValue"></th>' + '</tr>';
  }
  return theDetailRow;
}
//
// Format detail list from array
//
function formatMultivalueDetail(detailArray) {
  //
  // Sets a global variable to a list of entries in the array of detail objects
  //
  // Sort array by URI
  //
  detailArray.sort(function (a, b) {
    let x = a[ "@id"].toLowerCase();
    let y = b[ "@id"].toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  // Initialize list
  //
  window.detailList = '<ul>';
  //
  // Process each object in the array
  //
  detailArray.forEach(formatValueForMultivalueDetail);
  //
  // Finalize list
  //
  window.detailList += '</ul>';
  return;
}
//
// Add an item to the detail list
//
function formatValueForMultivalueDetail(detailObject) {
  //
  // Adds an item to a global variable for a list of detail entries
  // List item is formatted from jsonld detail object
  //
  var label = quotify(getLabel(detailObject));
  var uri = getURI(detailObject);
  var theUrl = getLanguageURL(getPermalink(uri));
  var detailItem = listify(linkify(uri, theUrl) + " [" + label + "@" + theDefaultLanguageCode + "]");
  //
  // Add item to the global detail list
  //
  window.detailList += detailItem;
  return;
}
//
// Get and set page and global variables
//
function setPageDetails(json) {
  var filenameLocal = "";
  var filepathPart = "";
  var theLanguagesBlock = "";
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
  //
  // Extract the jsonld graph of vocabulary entries, then the first entry (always metadata), then the published entries
  //
  theData = json[ "@graph"];
  window.theVocPublishedEntries = theData.filter(filterPublished);
  //
  // Get the global vocabulary title for the Header block
  //
  window.theVocTitle = window.theVocMetadata.title[ "en"];
  //
  // Get the global vocabulary domain
  //
  getDomain();
  //
  // Set the table title from the kind of vocabulary
  // Warning! This is dependent on consistent use of vocabulary URI/filepaths in jsonld metadata
  //
  switch (window.theVocKind) {
    case "class":
    theTableTitle = "Classes";
    break;
    case "value":
    theTableTitle = "Concepts";
    break;
    case "rof":
    theTableTitle = "Classes/Properties";
    break;
    default:
    theTableTitle = "Properties";
  }
  theTableTitle += " Index";
  //
  // Get the vocabulary active entries total, namespace URI, version link, Curie prefix, example Curie for the Reference block
  //
  theVocEntriesTotal = window.theVocPublishedEntries.length;
  theVersionLink = '<a target="_blank" href="https://github.com/RDARegistry/RDA-Vocabularies/releases/tag/' + window.theVocMetadata.versionInfo + '">' + window.theVocMetadata.versionInfo + '</a>';
  //
  // Example curie is first published element in data and may not be the lowest in curie order
  //
  theCurieExURI = getURI(window.theVocPublishedEntries[0]);
  theVocCurieEx = linkify(makeCurieFromURI(theCurieExURI, window.curiePrefix), theCurieExURI);
  //
  // Element sets and value vocabularies have different filepath constructors
  //
  switch (window.theVocKind) {
    case "value":
    theVocMenuLink = '<a href="/termList/">RDA value vocabularies</a>';
    filepathPart = "termList";
    //
    // Get local part of hash URI: everything after last slash
    //
    filenameLocal = window.theVocURI.substr(1 + theVocURI.lastIndexOf("/"));
    break;
    case "rof":
    theVocMenuLink = '<a href="/Elements/">RDA element sets</a>';
    filepathPart = "Elements";
    filenameLocal = "rof";
    break;
    default:
    theVocMenuLink = '<a href="/Elements/">RDA element sets</a>';
    filepathPart = "Elements";
    switch (window.theVocDomain) {
      case "Agent":
      filenameLocal = "a";
      break;
      case "Expression":
      filenameLocal = "e";
      break;
      case "Item":
      filenameLocal = "i";
      break;
      case "Manifestation":
      filenameLocal = "m";
      break;
      case "Nomen":
      filenameLocal = "n";
      break;
      case "Place":
      filenameLocal = "p";
      break;
      case "RDA Entity":
      filenameLocal = "x";
      break;
      case "Timespan":
      filenameLocal = "t";
      break;
      case "Work":
      filenameLocal = "w";
      break;
    }
  }
  //
  // Set the file links for the Downloads block
  //
  theLinkCSV = baseDomain + 'csv/' + filepathPart + '/' + window.curiePrefix + '.csv';
  theLinkJSONLD = baseDomain + 'jsonld/' + filepathPart + '/' + filenameLocal + ".jsonld";
  theLinkNT = baseDomain + 'nt/' + filepathPart + '/' + filenameLocal + '.nt';
  theLinkXML = baseDomain + 'xml/' + filepathPart + '/' + filenameLocal + '.xml';
  //
  // Get the content for the Languages block
  //
  theLanguagesBlock = formatLanguagesBlock();
  //
  // Get the content for the Semantics block
  //
  theSemanticsBlock = formatSemanticsBlock();
  //
  // Expand Agent semantics to its subtypes
  //
  if (window.theVocDomain == "Agent") {
    theSemanticsBlock = theSemanticsBlock.replace("Agent entity", "Agent entity or its subtypes");
  }
  //
  // Push values to the page
  //
  document.getElementById("rightsStatement").innerHTML = window.theVocMetadata.rights[ "en"];
  document.getElementById("indexTitle").innerHTML = theTableTitle;
  document.getElementById("vocMenuLink").innerHTML = theVocMenuLink;
  document.getElementById("vocTitle").innerHTML = linkify(window.theVocTitle, getPermalink(theVocURI));
  document.getElementById("vocDescription").innerHTML = window.theVocMetadata.description[ "en"];
  document.getElementById("vocEntriesTotal").innerHTML = theVocEntriesTotal;
  document.getElementById("vocURI").innerHTML = window.theVocURI;
  document.getElementById("vocPrefix").innerHTML = window.curiePrefix;
  document.getElementById("vocCurieEx").innerHTML = theVocCurieEx;
  document.getElementById("vocVersion").innerHTML = theVersionLink;
  document.getElementById("linkCSV").href = theLinkCSV;
  document.getElementById("linkJSONLD").href = theLinkJSONLD;
  document.getElementById("linkNT").href = theLinkNT;
  document.getElementById("linkXML").href = theLinkXML;
  if (theLanguagesBlock.length > 0) {
    document.getElementById("vocHasLanguages").innerHTML = theLanguagesBlock;
  }
  if (theSemanticsBlock.length > 0) {
    document.getElementById("vocHasSemantics").innerHTML = theSemanticsBlock;
  }
  return;
}
//
// Format Languages block
//
function formatLanguagesBlock() {
  //
  // Returns formatted content based on published languages for the Languages Block
  //
  var theLanguagesBlock = "";
  //
  // Set block header
  //
  theLanguagesBlock += '<h3>Languages</h3>';
  //
  // Block content depends on the kind of vocabulary
  //
  switch (window.theVocKind) {
    //
    // There are no translations for datatype and object element sets, or for ROF; English element label is only annotation
    //
    case "datatype":
    theLanguagesBlock += '<p>A datatype element set uses English labels only.</p>';
    break;
    case "object":
    theLanguagesBlock += '<p>An object element set uses English labels only.</p>';
    break;
    case "rof":
    theLanguagesBlock += '<p>The element set uses English labels only.</p>';
    break;
    //
    // Set languages selector list with item for each language used in published elements
    //
    default:
    theLanguagesBlock += '<ul class="m-0 p-0">';
    window.regLanguages.forEach(getLanguageIsUsed);
    theLanguagesBlock += window.vocLanguagesSelector;
    theLanguagesBlock += '</ul>';
  }
  return theLanguagesBlock;
}
//
// Format Semantics block
//
function formatSemanticsBlock() {
  //
  // Returns formatted content based on the vocabulary kind for the Semantics Block
  //
  var theSemanticsBlock = "";
  //
  // Set block header
  //
  theSemanticsBlock += '<h3>Semantics</h3>';
  switch (window.theVocKind) {
    //
    // Canonical element set references domain and datatype and object element sets
    //
    case "canonical":
    var theVocToDatatype = '<a href="' + window.theVocURI + 'datatype/' + '">' + window.theVocTitle.replace("properties", "datatype properties") + '</a>';
    var theVocToObject = '<a href="' + window.theVocURI + 'object/' + '">' + window.theVocTitle.replace("properties", "object properties") + '</a>';
    theSemanticsBlock += '<p>Each property in the canonical element set:</p>';
    theSemanticsBlock += '<ul class="list-unstyled ms-3 my-0 ps-3">';
    theSemanticsBlock += '<li>has a domain of the class that represents the ' + window.theVocDomain + ' entity.</li>';
    theSemanticsBlock += '<li>is linked from its child <strong>datatype</strong> property in ' + theVocToDatatype + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '<li>is linked from its child <strong>object</strong> property in ' + theVocToObject + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '</ul>';
    break;
    //
    // Datatype element set references domain and canonical element set, and literal range
    //
    case "datatype":
    var theVocToParent = '<a href="' + window.theVocURI.replace("/datatype", "") + '">' + window.theVocTitle.replace("datatype properties", "properties") + '</a>';
    theSemanticsBlock += '<p>Each property in the datatype element set:</p>';
    theSemanticsBlock += '<ul class="list-unstyled ms-3 my-0 ps-2">';
    theSemanticsBlock += '<li>has a domain of the class that represents the ' + window.theVocDomain + ' entity.</li>';
    theSemanticsBlock += '<li>has a range of <em>rdfs:Literal</em>.</li>';
    theSemanticsBlock += '<li>is linked to its parent <strong>canonical</strong> property in ' + theVocToParent + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '</ul>';
    break;
    //
    // Object element set references domain and canonical element set, and entity range
    //
    case "object":
    var theVocToParent = '<a href="' + window.theVocURI.replace("/object", "") + '">' + window.theVocTitle.replace("object properties", "properties") + '</a>';
    theSemanticsBlock += '<p>Each property in the object element set:</p>';
    theSemanticsBlock += '<ul class="list-unstyled ms-3 my-0 ps-1">';
    theSemanticsBlock += '<li>has a domain of the class that represents the ' + window.theVocDomain + ' entity.</li>';
    theSemanticsBlock += '<li>has a range of the class that represents the related entity.</li>';
    theSemanticsBlock += '<li>has an inverse property.</li>';
    theSemanticsBlock += '<li>is linked to its parent <strong>canonical</strong> property in ' + theVocToParent + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '</ul>';
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
          // Get vocabulary data; filter out first row of graph
          //
          json.data = json[ "@graph"].filter(filterData);
          window.theVocData = json.data;
          //
          // Initialize global variables required for rendering
          //
          // Get vocabulary curie prefix
          //
          getCuriePrefix();
          //
          // Get the global vocabulary URI
          //
          window.theVocURI = window.theVocMetadata[ "@id"];
          //
          // Get the global kind of vocabulary
          //
          getVocKind();
          return json.data;
        }
      },
      "columns":[ {
        "class": 'permalink',
        "name": 'Permalink',
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumnRow(linkify("#", getPermalink(getURI(row))), "dataDisplay");
        }
      }, {
        "class": 'detailsControl',
        "data": null,
        "defaultContent": '<button class="btnExpand" type="button"><i class="bi bi-arrows-expand"> </i></button>',
        "name": 'Detail',
        "orderable": false
      }, {
        "class": "curie",
        "name": 'Curie',
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumnRow(getLink(row, false, window.curiePrefix), "dataDisplay");
        }
      }, {
        "class": "prefLabel",
        "name": 'Label',
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumnRow(strongify(getValueByLanguage(getLabel(row))));
        }
      }, {
        "class": "definition",
        "name": 'Definition',
        "orderable": false,
        "render": function (data, type, row) {
          return makeColumnRow(getDefinition(row));
        }
      }, {
        "class": "status",
        "name": 'Status',
        "orderable": true,
        "render": function (data, type, row) {
          return makeColumnRow((getLink(getStatus(row), true)), "dataDisplay");
        }
      }],
      "initComplete": function (settings, json) {
        //
        // Set page detail values from jsonld
        //
        setPageDetails(json);
        //
        // Set language indicator style; border colour indicates on/selected
        //
        $("#lang_" + window.theCurrentLanguageCode).css({
          "padding": "0.2rem", "border": "3px solid #446e9b", "border-radius": "0.5rem"
        });
      },
      "order":[[2, 'asc']],
      "lengthMenu":[[25, 50, 100, -1],[25, 50, 100, "All"]],
      "pagingType": 'simple_numbers',
      "dom": window.domSetting,
      "language": window.theLocalisationObject,
      //      "responsive": true,
      "deferRender": true
    });
    //
    // Add event listener for expanding and collapsing details
    //
    pageTable.children("tbody").on('click', 'td.detailsControl', function () {
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
    //
    // Search Curie if local ID to search
    //
    if (window.localIDToSearch.length > 0) {
      var pageInfo = "";
      var row = "";
      table.column('Curie:name').search(window.localIDToSearch);
      pageInfo = table.page.info();
      row = table.row(pageInfo.start);
      row.child(formatDetail(row.data())).show();
    }
    //
    // Set tooltip defaults
    //
    $.protip({
      defaults: {
        delayIn: 500,
        gravity: true,
        position: 'top-left-corner'
      }
    })
  });
}