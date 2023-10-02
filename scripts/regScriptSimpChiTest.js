//
// Javascript for RDA Registry
//
"use strict";
var baseDomain = "http://www.rdaregistry.info/";
var definitionRedirect = "The definition is attached to the parent canonical property.";
var detailList = "";
var domSetting = "";
var languageIsUsed = false;
var localIDToSearch = "";
var languageCodeToCheck = "";
var regLanguages = "";
var theCurrentLanguageCode = "";
var theDefaultLanguageCode = "en";
var theDTStrings = "";
var theVocData = "";
var theVocDomain = "";
var theVocKind = "";
var theVocMetadata = "";
var theVocPrefix = "";
var theVocPublishedEntries;
var theVocTitle = "";
var theVocURI = "";
var vocLanguagesSelector = "";
setLanguagesData();
function setLanguagesData() {
  window.regLanguages =[ {
    code: "ar", label: "Arabic", rtl: true,
    dtStrings: {
      "decimal": "",
      "emptyTable": "No data available in table",
      "info": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
      "infoEmpty": "لا يوجد بيانات متاحة في الجدول",
      "infoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
      "thousands": ",",
      "lengthMenu": "أظهر _MENU_ مدخلات",
      "loadingRecords": "جارٍ التحميل...",
      "processing": "جارٍ المعالجة...",
      "search": "ابحث:",
      "zeroRecords": "لم يعثر على أية سجلات",
      "paginate": {
        "first": "الأول",
        "last": "الأخير",
        "next": "التالي",
        "previous": "السابق"
      },
      "aria": {
        "sortAscending": ": تفعيل لترتيب العمود تصاعدياً",
        "sortDescending": ": تفعيل لترتيب العمود تنازلياً"
      }
    }
  }, {
    code: "ca", label: "Catalan", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "No hi ha registres disponible en aquesta taula",
      "info": "Mostrant del _START_ al _END_ d'un total de _TOTAL_ registres",
      "infoEmpty": "No hi ha registres disponibles",
      "infoFiltered": "(filtrat de _MAX_ registres)",
      "thousands": ".",
      "lengthMenu": "Mostra _MENU_ registres",
      "loadingRecords": "Carregant...",
      "processing": "Processant...",
      "search": "Cerca:",
      "zeroRecords": "No s'han trobat registres",
      "paginate": {
        "first": "Primer",
        "last": "Últim",
        "next": "Següent",
        "previous": "Anterior"
      },
      "aria": {
        "sortAscending": ": Activa per ordenar la columna de manera ascendent",
        "sortDescending": ": Activa per ordenar la columna de manera descendent"
      }
    }
  }, {
    code: "da", label: "Danish", rtl: false,
    dtStrings: {
      "decimal": ".",
      "emptyTable": "Ingen data tilgængelige i tabellen",
      "info": "Viser _START_ til _END_ af _TOTAL_ linjer",
      "infoEmpty": "Viser 0 til 0 af 0 linjer",
      "infoFiltered": "(filtreret fra _MAX_ linjer)",
      "thousands": ".",
      "lengthMenu": "Vis _MENU_ linjer",
      "loadingRecords": "Henter...",
      "processing": "Henter...",
      "search": "Søg:",
      "zeroRecords": "Ingen linjer matcher s&oslash;gningen",
      "paginate": {
        "first": "Første",
        "last": "Sidste",
        "next": "Næste",
        "previous": "Forrige"
      },
      "aria": {
        "sortAscending": "Stigende sortering",
        "sortDescending": "Faldende sortering"
      }
    }
  }, {
    code: "de", label: "German", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Keine Daten in der Tabelle vorhanden",
      "info": "_START_ bis _END_ von _TOTAL_ Einträgen",
      "infoEmpty": "Keine Daten vorhanden",
      "infoFiltered": "(gefiltert von _MAX_ Einträgen)",
      "thousands": ".",
      "lengthMenu": "_MENU_ Zeilen anzeigen",
      "loadingRecords": "Wird geladen ..",
      "processing": "Bitte warten ..",
      "search": "Suche:",
      "zeroRecords": "Keine passenden Einträge gefunden",
      "paginate": {
        "first": "Erste",
        "last": "Letzte",
        "next": "Nächste",
        "previous": "Zurück"
      },
      "aria": {
        "sortAscending": ": aktivieren, um Spalte aufsteigend zu sortieren",
        "sortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
      }
    }
  }, {
    code: "el", label: "Greek", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Δεν υπάρχουν δεδομένα στον πίνακα",
      "info": "Εμφανίζονται _START_ έως _END_ από _TOTAL_ εγγραφές",
      "infoEmpty": "Εμφανίζονται 0 έως 0 από 0 εγγραφές",
      "infoFiltered": "(φιλτραρισμένες από _MAX_ συνολικά εγγραφές)",
      "thousands": ".",
      "lengthMenu": "Δείξε _MENU_ εγγραφές",
      "loadingRecords": "Φόρτωση...",
      "processing": "Επεξεργασία...",
      "search": "Αναζήτηση:",
      "zeroRecords": "Δεν βρέθηκαν εγγραφές που να ταιριάζουν",
      "paginate": {
        "first": "Πρώτη",
        "last": "Τελευταία",
        "next": "Επόμενη",
        "previous": "Προηγούμενη"
      },
      "aria": {
        "sortAscending": ": ενεργοποιήστε για αύξουσα ταξινόμηση της στήλης",
        "sortDescending": ": ενεργοποιήστε για φθίνουσα ταξινόμηση της στήλης"
      }
    }
  }, {
    code: "en", label: "English", rtl: false,
    dtStrings: {
      "decimal": "",
      "emptyTable": "No data available in table",
      "info": "Showing _START_ to _END_ of _TOTAL_ entries",
      "infoEmpty": "Showing 0 to 0 of 0 entries",
      "infoFiltered": "(filtered from _MAX_ total entries)",
      "thousands": ",",
      "lengthMenu": "Show _MENU_ entries",
      "loadingRecords": "Loading...",
      "processing": "Processing...",
      "search": "Search:",
      "zeroRecords": "No matching records found",
      "paginate": {
        "first": "First",
        "last": "Last",
        "next": "Next",
        "previous": "Previous"
      },
      "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
      }
    }
  }, {
    code: "es", label: "Spanish", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Ningún dato disponible en esta tabla",
      "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
      "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
      "infoFiltered": "(filtrado de un total de _MAX_ registros)",
      "thousands": ".",
      "lengthMenu": "Mostrar _MENU_ registros",
      "loadingRecords": "Cargando...",
      "processing": "Procesando...",
      "search": "Buscar:",
      "zeroRecords": "No se encontraron resultados",
      "paginate": {
        "first": "Primero",
        "last": "Último",
        "previous": "Anterior",
        "next": "Siguiente"
      },
      "aria": {
        "sortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sortDescending": ": Activar para ordenar la columna de manera descendente"
      }
    }
  }, {
    code: "et", label: "Estonian", rtl: false,
    dtStrings: {
      "decimal": ".",
      "emptyTable": "Andmed puuduvad",
      "info": "Kuvatud: _TOTAL_ kirjet (_START_-_END_)",
      "infoEmpty": "Otsinguvasteid ei leitud",
      "infoFiltered": "(filteeritud _MAX_ kirje seast)",
      "thousands": ",",
      "lengthMenu": "N&auml;ita kirjeid _MENU_ kaupa",
      "loadingRecords": "Laen...",
      "processing": "Palun oodake, koostan kuvamiseks nimekirja!",
      "search": "Otsi k&otilde;ikide tulemuste seast:",
      "zeroRecords": "Otsitavat vastet ei leitud",
      "paginate": {
        "first": "Algus",
        "last": "Viimane",
        "previous": "Eelmine",
        "next": "J&auml;rgmine"
      },
      "aria": {
        "sortAscending": ": sorteeri kasvavalt",
        "sortDescending": ": sorteeri kahanevalt"
      }
    }
  }, {
    code: "fi", label: "Finnish", rtl: false,
    dtStrings: {
      "decimal": ".",
      "emptyTable": "Ei näytettäviä tuloksia",
      "info": "Näytetään rivit _START_ - _END_ (yhteensä _TOTAL_)",
      "infoEmpty": "Näytetään 0 - 0 (yhteensä 0)",
      "infoFiltered": "(suodatettu _MAX_ tuloksen joukosta)",
      "thousands": ",",
      "lengthMenu": "Näytä kerralla _MENU_ riviä",
      "loadingRecords": "Ladataan...",
      "processing": "Hetkinen...",
      "search": "Etsi:",
      "zeroRecords": "Tietoja ei löytynyt",
      "paginate": {
        "first": "Ensimmäinen",
        "last": "Viimeinen",
        "previous": "Edellinen",
        "next": "Seuraava"
      },
      "aria": {
        "sortAscending": ": lajittele sarake nousevasti",
        "sortDescending": ": lajittele sarake laskevasti"
      }
    }
  }, {
    code: "fr", label: "French", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Aucune donnée disponible dans le tableau",
      "info": "Affichage de _START_ à _END_ sur _TOTAL_ éléments",
      "infoEmpty": "Affichage de 0 à 0 sur 0 éléments",
      "infoFiltered": "(filtrés depuis un total de _MAX_ éléments)",
      "thousands": ".",
      "lengthMenu": "Afficher _MENU_ éléments",
      "loadingRecords": "Chargement...",
      "processing": "Traitement...",
      "search": "Rechercher:",
      "zeroRecords": "Aucun élément correspondant trouvé",
      "paginate": {
        "first": "Premier",
        "last": "Dernier",
        "previous": "Précédent",
        "next": "Suivant"
      },
      "aria": {
        "sortAscending": ": activer pour trier la colonne par ordre croissant",
        "sortDescending": ": activer pour trier la colonne par ordre décroissant"
      }
    }
  }, {
    code: "he", label: "Hebrew", rtl: true,
    dtStrings: {
      "decimal": "עשרוני",
      "emptyTable": "לא נמצאו רשומות מתאימות",
      "info": "_START_ עד _END_ מתוך _TOTAL_ רשומות",
      "infoEmpty": "0 עד 0 מתוך 0 רשומות",
      "infoFiltered": "(מסונן מסך _MAX_  רשומות)",
      "thousands": ",",
      "lengthMenu": "הצג _MENU_ פריטים",
      "loadingRecords": "טוען...",
      "processing": "מעבד...",
      "search": "חפש:",
      "zeroRecords": "לא נמצאו רשומות מתאימות",
      "paginate": {
        "first": "ראשון",
        "last": "אחרון",
        "next": "הבא",
        "previous": "קודם"
      },
      "aria": {
        "sortAscending": "מיון בסדר עולה",
        "sortDescending": "מיון בסדר יורד"
      }
    }
  }, {
    code: "hu", label: "Hungarian", rtl: false,
    dtStrings: {
      "decimal": "",
      "emptyTable": "Nincs rendelkezésre álló adat",
      "info": "Találatok: _START_ - _END_ Összesen: _TOTAL_",
      "infoEmpty": "Nulla találat",
      "infoFiltered": "(_MAX_ összes rekord közül szűrve)",
      "thousands": " ",
      "lengthMenu": "_MENU_ találat oldalanként",
      "loadingRecords": "Betöltés...",
      "processing": "Feldolgozás...",
      "search": "Keresés:",
      "zeroRecords": "Nincs a keresésnek megfelelő találat",
      "paginate": {
        "first": "Első",
        "last": "Utolsó",
        "previous": "Előző",
        "next": "Következő"
      },
      "aria": {
        "sortAscending": ": aktiválja a növekvő rendezéshez",
        "sortDescending": ": aktiválja a csökkenő rendezéshez"
      }
    }
  }, {
    code: "it", label: "Italian", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Nessun dato disponibile nella tabella",
      "info": "Risultati da _START_ a _END_ di _TOTAL_ elementi",
      "infoEmpty": "Risultati da 0 a 0 di 0 elementi",
      "infoFiltered": "(filtrati da _MAX_ elementi totali)",
      "thousands": ".",
      "lengthMenu": "Mostra _MENU_ elementi",
      "loadingRecords": "Caricamento...",
      "processing": "Elaborazione...",
      "search": "Cerca:",
      "zeroRecords": "Nessun elemento corrispondente trovato",
      "paginate": {
        "first": "Inizio",
        "last": "Fine",
        "previous": "Precedente",
        "next": "Successivo"
      },
      "aria": {
        "sortAscending": ": attiva per ordinare la colonna in ordine crescente",
        "sortDescending": ": attiva per ordinare la colonna in ordine decrescente"
      }
    }
  }, {
    code: "lv", label: "Latvian", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Nav datu",
      "info": "Tiek rādīts _START_ līdz _END_ ieraksts no _TOTAL_ ",
      "infoEmpty": "Tiek rādīts 0. līdz 0. ieraksts no 0",
      "infoFiltered": "atlase (kopējais ierakstu skaits _MAX_ )",
      "thousands": ",",
      "lengthMenu": "Rādīt _MENU_ ierakstus",
      "loadingRecords": "Ielāde...",
      "processing": "Apstrāde...",
      "search": "Meklēt:",
      "zeroRecords": "Atbilstoši ieraksti nav atrasti",
      "paginate": {
        "first": "Sākums",
        "last": "Beigas",
        "next": "Nākamie",
        "previous": "Iepriekšējie"
      },
      "aria": {
        "sortAscending": ": activate to sort column ascending",
        "sortDescending": ": activate to sort column descending"
      }
    }
  },{
    code: "nl", label: "Dutch", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Geen resultaten aanwezig in de tabel",
      "info": "_START_ tot _END_ van _TOTAL_ resultaten",
      "infoEmpty": "Geen resultaten om weer te geven",
      "infoFiltered": "(gefilterd uit _MAX_ resultaten)",
      "thousands": ".",
      "lengthMenu": "_MENU_ resultaten weergeven",
      "loadingRecords": "Een moment geduld aub - bezig met laden...",
      "processing": "Verwerken...",
      "search": "Zoeken:",
      "zeroRecords": "Geen resultaten gevonden",
      "paginate": {
        "first": "Eerste",
        "last": "Laatste",
        "previous": "Vorige",
        "next": "Volgende"
      },
      "aria": {
        "sortAscending": ": activeer om kolom oplopend te sorteren",
        "sortDescending": ": activeer om kolom aflopend te sorteren"
      }
    }
  }, {
    code: "no", label: "Norwegian", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Ingen data tilgjengelig i tabellen",
      "info": "Viser _START_ til _END_ av _TOTAL_ oppf&oslash;ringer",
      "infoEmpty": "Viser 0 til 0 av 0 oppf&oslash;ringer",
      "infoFiltered": "(filtrert fra totalt _MAX_ oppf&oslash;ringer)",
      "thousands": " ",
      "lengthMenu": "Vis _MENU_ oppf&oslash;ringer",
      "loadingRecords": "Laster...",
      "processing": "Laster...",
      "search": "S&oslash;k:",
      "zeroRecords": "Ingen rader samsvarer med s&oslash;ket",
      "paginate": {
        "first": "F&oslash;rste",
        "last": "Siste",
        "previous": "Forrige",
        "next": "Neste"
      },
      "aria": {
        "sortAscending": "aktiver for &aring; sortere kolonnen stigende",
        "sortDescending": "aktiver for &aring; sortere kolonnen synkende"
      }
    }
  }, {
    code: "sv", label: "Swedish", rtl: false,
    dtStrings: {
      "decimal": ",",
      "emptyTable": "Tabellen innehåller ingen data",
      "info": "Visar _START_ till _END_ av totalt _TOTAL_ rader",
      "infoEmpty": "Visar 0 till 0 av totalt 0 rader",
      "infoFiltered": "(filtrerade från totalt _MAX_ rader)",
      "thousands": " ",
      "lengthMenu": "Visa _MENU_ rader",
      "loadingRecords": "Laddar \u2026",
      "processing": "Bearbetar \u2026",
      "search": "Sök:",
      "zeroRecords": "Hittade inga matchande resultat",
      "paginate": {
        "first": "Första",
        "last": "Sista",
        "previous": "Föregående",
        "next": "Nästa"
      },
      "aria": {
        "sortAscending": ": aktivera för att sortera kolumnen i stigande ordning",
        "sortDescending": ": aktivera för att sortera kolumnen i fallande ordning"
      }
    }
  }, {
    code: "vi", label: "Vietnamese", rtl: false,
    dtStrings: {
      "decimal": "",
      "emptyTable": "Không có dữ liệu",
      "info": "Hiển thị _START_ tới _END_ của _TOTAL_ dữ liệu",
      "infoEmpty": "Hiển thị 0 tới 0 của 0 dữ liệu",
      "infoFiltered": "(được lọc từ _MAX_ mục)",
      "thousands": "`",
      "lengthMenu": "Hiển thị _MENU_ dữ liệu",
      "loadingRecords": "Đang tải...",
      "processing": "Đang xử lý...",
      "search": "Tìm kiếm:",
      "zeroRecords": "Không tìm thấy kết quả",
      "paginate": {
        "first": "Đầu tiên",
        "last": "Cuối cùng",
        "previous": "Trước",
        "next": "Sau"
      },
      "aria": {
        "sortAscending": ": Sắp xếp thứ tự tăng dần",
        "sortDescending": ": Sắp xếp thứ tự giảm dần"
      }
    }
  }, {
    code: "zh-Hans-CN", label: "Chinese (Simplified)", rtl: false,
    dtStrings: {
      "decimal": "",
      "emptyTable": "表中数据为空",
      "info": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
      "infoEmpty": "显示第 0 至 0 项结果，共 0 项",
      "infoFiltered": "(由 _MAX_ 项结果过滤)",
      "thousands": ",",
      "lengthMenu": "显示 _MENU_ 项结果",
      "loadingRecords": "Đang tải...",
      "processing": "处理中...",
      "search": "搜索:",
      "zeroRecords": "没有匹配结果",
      "paginate": {
        "first": "首页",
        "last": "末页",
        "previous": "上页",
        "next": "下页"
      },
      "aria": {
        "sortAscending": ": 以升序排列此列",
        "sortDescending": ": 以降序排列此列"
      }
    }
  }];
  window.regLanguages.sort(function (a, b) {
    let x = a.label.toLowerCase();
    let y = b.label.toLowerCase();
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  });
  return;
}
getLanguageCodeFromURL();
window.theDTStrings = getDTStrings();
function getDTStrings() {
  var theLanguageObject = "";
  window.languageCodeToCheck = window.theCurrentLanguageCode;
  theLanguageObject = window.regLanguages.filter(getLanguageFromLanguages);
  return theLanguageObject[0][ "dtStrings"];
}
window.localIDToSearch = getAnchor();
setDTDom();
window.onhashchange = function () {
  var table = $("table#pindex").DataTable();
  window.localIDToSearch = getAnchor();
  setDTDom();
  table.search('').column('Curie:name').search(window.localIDToSearch).draw();
};
function getLanguageCodeFromURL() {
  var theURL = window.location.href;
  var theIndex = theURL.indexOf("language=");
  if (theIndex > 0) {
    window.theCurrentLanguageCode = theURL.substr(theIndex + 9, 10);
  } else {
    window.theCurrentLanguageCode = window.theDefaultLanguageCode;
  }
  return;
}
function getAnchor() {
  var theURLAnchor = "";
  if (window.location.hash.indexOf('#') > -1) {
    theURLAnchor = window.location.hash.substr(1);
  }
  return theURLAnchor;
}
function setDTDom() {
  if (window.localIDToSearch.length > 0) {
    window.domSetting = "<'row'<'col-sm-12'tr>>";
  } else {
    window.domSetting = "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
  }
}
function directify(theString) {
  var isRtl = false;
  isRtl = getRtl();
  if (isRtl) {
    theString = '<div dir="rtl">' + theString + '</div>';
  } else {
    theString = "<div>" + theString + "</div>";
  }
  return theString;
}
function divify(theString, className) {
  var theClassName = "";
  if (typeof className != "undefined") {
    theString = '<div class="' + className + '">' + theString + '</div>';
  } else {
    theString = '<div>' + theString + '</div>';
  }
  return theString;
}
function listify(theString) {
  return '<li>' + theString + '</li>';
}
function quotify(theString) {
  return '"' + theString + '"';
}
function strongify(theString) {
  return '<strong>' + theString + '</strong>';
}
function linkify(label, url, isLinkOut) {
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
function makeCurieFromURI(uri, prefix) {
  var theCurie = "";
  var thePrefix = "";
  var theURI = "";
  if (typeof prefix != "undefined") {
    thePrefix = prefix;
  }
  if (typeof uri != "undefined") {
    theURI = uri;
  }
  if (theURI !== null && typeof theURI.replace === "function") {
    theCurie = thePrefix + ":" + theURI.substr(1 + theURI.lastIndexOf("/"));
  }
  return theCurie;
}
function getVocPrefix() {
  if (typeof window.theVocMetadata.prefix != "undefined") {
    window.theVocPrefix = window.theVocMetadata.prefix;
  }
  return;
}
function getVocDomain() {
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
function getLanguageFromLanguages(languageObject) {
  return languageObject[ "code"] == window.languageCodeToCheck;
}
function getLanguageIsUsed(languageObject) {
  var theLanguageLabel = "";
  var thePageURL = window.location.href;
  var theURL = "";
  var theLanguageIndex = 0;
  var theHashIndex = 0;
  window.languageCodeToCheck = languageObject[ "code"];
  window.languageIsUsed = false;
  window.theVocPublishedEntries.forEach(getLanguageIsPublished);
  if (window.languageIsUsed) {
    theLanguageLabel = languageObject[ "label"];
    theHashIndex = thePageURL.indexOf("#");
    theLanguageIndex = thePageURL.indexOf("?language=");
    if (theLanguageIndex > -1) {
      theURL = thePageURL.slice(0, theLanguageIndex) + "?language=" + window.languageCodeToCheck + thePageURL.slice(theLanguageIndex + 12)
    } else if (theHashIndex > -1) {
      theURL = thePageURL.replace("#", "?language=" + window.languageCodeToCheck + "#")
    } else {
      theURL = thePageURL + "?language=" + window.languageCodeToCheck;
    }
    window.vocLanguagesSelector += '<li><a href="' + theURL + '" id="lang_' + window.languageCodeToCheck + '">' + theLanguageLabel + '</a></li>';
  }
  return;
}
function getLanguageIsPublished(entryObject) {
  if (typeof entryObject[ "ToolkitLabel"] != "undefined") {
    if (typeof entryObject[ "ToolkitLabel"][window.languageCodeToCheck] != "undefined") {
      window.languageIsUsed = true;
    }
  }
  return;
}
function getRtl() {
  var theLanguageArray = "";
  window.languageCodeToCheck = window.theCurrentLanguageCode;
  theLanguageArray = window.regLanguages.filter(getLanguageFromLanguages);
  return theLanguageArray[0][ "rtl"];
}
function getDefinition(entryObject) {
  var theDefinition = "";
  switch (window.theVocKind) {
    case "datatype":
    case "object":
    theDefinition = window.definitionRedirect;
    break;
    default:
    if (typeof entryObject[ "definition"] != "undefined") {
      theDefinition = getValueByLanguage(entryObject[ "definition"])
    }
  }
  return theDefinition;
}
function getLabel(entryObject) {
  var theLabel = "";
  if (window.theVocKind == "value" && typeof entryObject[ "prefLabel"] != "undefined") {
    theLabel = entryObject[ "prefLabel"];
  } else {
    theLabel = entryObject[ "label"];
  }
  return theLabel;
}
function getLabelOrURI(row) {
  var theLabel = "";
  if (typeof row[ "label"] != "undefined") {
    theLabel = row[ "label"];
  } else {
    theLabel = row[ "@id"];
  }
  return theLabel;
}
function getLink(entryObject, isLinkOut, prefix) {
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
function getStatus(entryObject) {
  var theStatus = "";
  if (typeof entryObject.status != "undefined") {
    theStatus = entryObject.status;
  }
  return theStatus;
}
function getURI(entryObject) {
  var theURI = "";
  if (typeof entryObject[ "@id"] != "undefined") {
    theURI = entryObject[ "@id"];
  }
  return theURI;
}
function getValueByLanguage(entryObject) {
  var theString = "";
  if (typeof entryObject[window.theCurrentLanguageCode] != "undefined") {
    theString = directify(quotify(entryObject[window.theCurrentLanguageCode]));
  } else {
    theString = divify(quotify(entryObject[window.theDefaultLanguageCode]) + " [@" + window.theDefaultLanguageCode + "; no @" + window.theCurrentLanguageCode + "]");
  }
  return theString;
}
function getVocKind() {
  if (typeof window.theVocURI != "undefined") {
    if (window.theVocURI.indexOf("/rof/") > -1) {
      window.theVocKind = "rof";
    } else if (window.theVocURI.indexOf("/termList/") > -1) {
      window.theVocKind = "value";
    } else if (window.theVocURI.indexOf("/datatype/") > -1) {
      window.theVocKind = "datatype";
    } else if (window.theVocURI.indexOf("/object/") > -1) {
      window.theVocKind = "object";
    } else if (window.theVocURI.indexOf("/c/") > -1) {
      window.theVocKind = "class";
	} else if (window.theVocURI.indexOf("/u/") > -1) {
      window.theVocKind = "unconstrained";
    } else {
      window.theVocKind = "canonical";
    }
  }
  return;
}
function getPermalink(uri) {
  var thePermalink = "";
  if (typeof uri !== "undefined") {
    thePermalink = uri.replace(/^(http:\/\/)(.*)\/(.*)$/ig, "$1www.$2/#$3");
  }
  return thePermalink;
}
function makeColumnRow(content, className) {
  return divify(content, className);
}
function getLanguageURL(permalink) {
  var theUrl = "";
  if (typeof permalink !== "undefined") {
    theUrl = permalink.replace("#", "?language=" + window.theCurrentLanguageCode + "#");
  }
  return theUrl;
}
function formatDetail(d) {
  var detailRow = formatDetailRow();
  var detailTable = '<table class="pindex_detail">';
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
      if (detailRow.indexOf("undefined") < 0) {
        detailTable += detailRow;
      }
    }
    if (typeof d.notation != "undefined") {
      detailRow = formatDetailRow(d.notation[window.theDefaultLanguageCode], "Notation");
      detailTable += detailRow;
    }
  } else {
    detailTable += detailRow;
  }
  detailTable += '</table>';
  return detailTable;
}
function formatDetailRow(rowValue, rowLabel) {
  var theDetailRow = "";
  var theRowValue = "";
  var theRowLabel = "";
  if (typeof rowValue != "undefined") {
    theRowValue = rowValue;
  } else {
    theRowValue = window.detailList;
  }
  if (typeof rowLabel != "undefined") {
    theRowLabel = rowLabel + ":";
  }
  if (theRowValue.length > 0) {
    theDetailRow = '<tr>' + '<td class="detailLabel">' + divify(theRowLabel) + '</td>' + '<td class="detailValue">' + divify(theRowValue) + '</td>' + '</tr>';
  } else {
    theDetailRow = '<tr>' + '<th class="detailLabel"></th>' + '<th class="detailValue"></th>' + '</tr>';
  }
  return theDetailRow;
}
function formatMultivalueDetail(detailArray) {
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
  window.detailList = '<ul>';
  detailArray.forEach(formatValueForMultivalueDetail);
  window.detailList += '</ul>';
  return;
}
function formatValueForMultivalueDetail(detailObject) {
  var label = quotify(getLabel(detailObject));
  var uri = getURI(detailObject);
  var theUrl = getLanguageURL(getPermalink(uri));
  var detailItem = listify(linkify(uri, theUrl) + " [" + label + "@" + theDefaultLanguageCode + "]");
  window.detailList += detailItem;
  return;
}
function setVocDetails(json) {
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
  theData = json[ "@graph"];
  window.theVocPublishedEntries = theData.filter(filterPublished);
  window.theVocTitle = window.theVocMetadata.title[ "en"];
  getVocDomain();
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
  theVocEntriesTotal = window.theVocPublishedEntries.length;
  theVersionLink = '<a target="_blank" href="https://github.com/RDARegistry/RDA-Vocabularies/releases/tag/' + window.theVocMetadata.versionInfo + '">' + window.theVocMetadata.versionInfo + '</a>';
  theCurieExURI = getURI(window.theVocPublishedEntries[0]);
  theVocCurieEx = linkify(makeCurieFromURI(theCurieExURI, window.theVocPrefix), theCurieExURI);
  switch (window.theVocKind) {
    case "class":
    theVocMenuLink = '<a href="/Elements/">RDA element sets</a>';
    filepathPart = "Elements";
    filenameLocal = "c";
    break;
    case "value":
    theVocMenuLink = '<a href="/termList/">RDA value vocabularies</a>';
    filepathPart = "termList";
    filenameLocal = window.theVocURI.substr(1 + theVocURI.lastIndexOf("/"));
    break;
    case "rof":
    theVocMenuLink = '<a href="/Elements/">RDA element sets</a>';
    filepathPart = "Elements";
    filenameLocal = "rof";
    break;
	case "unconstrained":
    theVocMenuLink = '<a href="/Elements/">RDA element sets</a>';
    filepathPart = "Elements";
    filenameLocal = "u";
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
    switch (window.theVocKind) {
      case "datatype":
      filenameLocal += "/datatype";
      break;
      case "object":
      filenameLocal += "/object";
      break;
    }
  }
  theLinkCSV = baseDomain + 'csv/' + filepathPart + '/' + window.theVocPrefix + '.csv';
  theLinkJSONLD = baseDomain + 'jsonld/' + filepathPart + '/' + filenameLocal + ".jsonld";
  theLinkNT = baseDomain + 'nt/' + filepathPart + '/' + filenameLocal + '.nt';
  theLinkXML = baseDomain + 'xml/' + filepathPart + '/' + filenameLocal + '.xml';
  theLanguagesBlock = formatLanguagesBlock();
  theSemanticsBlock = formatSemanticsBlock();
  if (window.theVocDomain == "Agent") {
    theSemanticsBlock = theSemanticsBlock.replace("Agent entity", "Agent entity or its subtypes");
  }
  document.getElementById("rightsStatement").innerHTML = window.theVocMetadata.rights[ "en"];
  document.getElementById("indexTitle").innerHTML = theTableTitle;
  document.getElementById("vocMenuLink").innerHTML = theVocMenuLink;
  document.getElementById("vocTitle").innerHTML = linkify(window.theVocTitle, getPermalink(theVocURI));
  document.getElementById("vocDescription").innerHTML = window.theVocMetadata.description[ "en"];
  document.getElementById("vocEntriesTotal").innerHTML = theVocEntriesTotal;
  document.getElementById("vocURI").innerHTML = window.theVocURI;
  document.getElementById("vocPrefix").innerHTML = window.theVocPrefix;
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
function formatLanguagesBlock() {
  var theLanguagesBlock = "";
  theLanguagesBlock += '<h3>Languages</h3>';
  switch (window.theVocKind) {
    case "datatype":
    theLanguagesBlock += '<p>A datatype element set uses English labels only.</p>';
    break;
    case "object":
    theLanguagesBlock += '<p>An object element set uses English labels only.</p>';
    break;
    case "rof":
    theLanguagesBlock += '<p>The element set uses English labels only.</p>';
    break;
    default:
    theLanguagesBlock += '<ul class="m-0 p-0">';
    window.regLanguages.forEach(getLanguageIsUsed);
    theLanguagesBlock += window.vocLanguagesSelector;
    theLanguagesBlock += '</ul>';
  }
  return theLanguagesBlock;
}
function formatSemanticsBlock() {
  var theSemanticsBlock = "";
  theSemanticsBlock += '<h3>Semantics</h3>';
  switch (window.theVocKind) {
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
    case "datatype":
    var theVocToParent = '<a href="' + window.theVocURI.replace("/datatype", "") + '">' + window.theVocTitle.replace("datatype properties", "properties") + '</a>';
    theSemanticsBlock += '<p>Each property in the datatype element set:</p>';
    theSemanticsBlock += '<ul class="list-unstyled ms-3 my-0 ps-2">';
    theSemanticsBlock += '<li>has a domain of the class that represents the ' + window.theVocDomain + ' entity.</li>';
    theSemanticsBlock += '<li>has a range of <em>rdfs:Literal</em>.</li>';
    theSemanticsBlock += '<li>is linked to its parent <strong>canonical</strong> property in ' + theVocToParent + ' by <em>rdfs:subPropertyOf</em>.</li>';
    theSemanticsBlock += '</ul>';
    break;
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
	case "unconstrained":
    theSemanticsBlock += '<p>The properties in the unconstrained element set have no domain or range and have semantics that are independent of the IFLA Library Reference Model.</p>';
	break;
    default:
    theSemanticsBlock = "";
  }
  return theSemanticsBlock;
}
function filterData(obj, index) {
  return index > 0;
}
function filterPublished(value, index, array) {
  var isPublished = false;
  if (index > 0) {
    if (value[ "status"][ "label"] == "Published") {
      isPublished = true;
    }
  }
  return isPublished;
}
if (typeof dataSource !== "undefined") {
  $(document).ready(
  function () {
    var pageTable = $("#pindex");
    var table;
    table = pageTable.DataTable({
      "ajax": {
        "url": dataSource,
        "dataType": 'json',
        "dataSrc": function (json) {
          window.theVocMetadata = json[ "@graph"][0];
          json.data = json[ "@graph"].filter(filterData);
          window.theVocData = json.data;
          getVocPrefix();
          window.theVocURI = window.theVocMetadata[ "@id"];
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
          return makeColumnRow(getLink(row, false, window.theVocPrefix), "dataDisplay");
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
        setVocDetails(json);
        $("#lang_" + window.theCurrentLanguageCode).css({
          "padding": "0.2rem", "border": "3px solid #446e9b", "border-radius": "0.5rem"
        });
      },
      "order":[[2, 'asc']],
      "lengthMenu":[[25, 50, 100, -1],[25, 50, 100, "All"]],
      "pagingType": 'simple_numbers',
      "dom": window.domSetting,
      "language": window.theDTStrings,
      //      "responsive": true,
      "deferRender": true
    });
    pageTable.children("tbody").on('click', 'td.detailsControl', function () {
      var tr = $(this).closest('tr');
      var row = table.row(tr);
      if (row.child.isShown()) {
        row.child.hide();
        $(this).html('<button class="btnExpand" type="button"><i class="bi bi-arrows-expand"> </i></button>');
      } else {
        row.child(formatDetail(row.data())).show();
        $(this).html('<button class="btnCollapse" type="button"><i class="bi bi-arrows-collapse"> </i></button>');
      }
    });
    if (window.localIDToSearch.length > 0) {
      var pageInfo = "";
      var row = "";
      table.column('Curie:name').search(window.localIDToSearch);
      pageInfo = table.page.info();
      row = table.row(pageInfo.start);
      row.child(formatDetail(row.data())).show();
    }
    $.protip({
      defaults: {
        delayIn: 500,
        gravity: true,
        position: 'top-left-corner'
      }
    })
  });
}
