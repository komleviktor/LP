var excel2Json = require('excel2json');
var fs = require('fs');
var path = './Data/';

var forGrid = function () {
  var DataGridRenderer = {

    //---------------------------------------
    // Actionscript
    //---------------------------------------

    as: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "//";
      var commentLineEnd = "";
      var outputText = "[";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loops
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += "{";
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
            var rowOutput = row[j] || "null";
          } else {
            var rowOutput = '"'+( row[j] || "" )+'"';
          };
          outputText += (headerNames[j] + ":" + rowOutput)
          if (j < (numColumns-1)) {outputText+=","};
        };
        outputText += "}";
        if (i < (numRows-1)) {outputText += ","+newLine};
      };
      outputText += "];";


      return outputText;
    },


    //---------------------------------------
    // ASP / VBScript
    //---------------------------------------

    asp: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "'";
      var commentLineEnd = "";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
            var rowOutput = row[j] || "null";
          } else {
            var rowOutput = '"'+( row[j] || "" )+'"';
          };
        outputText += 'myArray('+j+','+i+') = '+rowOutput+newLine;
        };
      };
      outputText = 'Dim myArray('+(j-1)+','+(i-1)+')'+newLine+outputText;

      return outputText;
    },


    //---------------------------------------
    // HTML Table
    //---------------------------------------

    html: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "<!--";
      var commentLineEnd = "-->";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      outputText += "<table>"+newLine;
      outputText += indent+"<thead>"+newLine;
      outputText += indent+indent+"<tr>"+newLine;

      for (var j=0; j < numColumns; j++) {
        outputText += indent+indent+indent+'<th class="'+headerNames[j]+'-cell">';
        outputText += headerNames[j];
        outputText += '</th>'+newLine;
      };
      outputText += indent+indent+"</tr>"+newLine;
      outputText += indent+"</thead>"+newLine;
      outputText += indent+"<tbody>"+newLine;
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        var rowClassName = ""
        if (i === numRows-1) {
          rowClassName = ' class="lastRow"';
        } else if (i === 0){
          rowClassName = ' class="firstRow"';
        }
        outputText += indent+indent+"<tr"+rowClassName+">"+newLine;
        for (var j=0; j < numColumns; j++) {
          outputText += indent+indent+indent+'<td class="'+headerNames[j]+'-cell">';
          outputText += row[j]
          outputText += '</td>'+newLine
        };
        outputText += indent+indent+"</tr>"+newLine;
      };
      outputText += indent+"</tbody>"+newLine;
      outputText += "</table>";

      return outputText;
    },


    //---------------------------------------
    // JSON properties
    //---------------------------------------

    json: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "//";
      var commentLineEnd = "";
      var outputText = "[";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += "{";
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
            var rowOutput = row[j] || "null";
          } else {
            var rowOutput = '"' + ( row[j] || "" ) + '"';
          };

        outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );

          if (j < (numColumns-1)) {outputText+=","};
        };
        outputText += "}";
        if (i < (numRows-1)) {outputText += ","+newLine};
      };
      outputText += "]";

      return outputText;
    },

    //---------------------------------------
    // JSON Array of Columns
    //---------------------------------------
    jsonArrayCols: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "//";
      var commentLineEnd = "";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      outputText += "{"+newLine;
      for (var i=0; i < numColumns; i++) {
        outputText += indent+'"'+headerNames[i]+'":[';
        for (var j=0; j < numRows; j++) {
          if ((headerTypes[i] == "int")||(headerTypes[i] == "float")) {
            outputText += dataGrid[j][i] || 0;
          } else {
            outputText += '"'+(dataGrid[j][i] || "")+'"' ;
          }
          if (j < (numRows-1)) {outputText+=","};
        };
        outputText += "]";
        if (i < (numColumns-1)) {outputText += ","+newLine};
      };
      outputText += newLine+"}";


      return outputText;
    },


    //---------------------------------------
    // JSON Array of Rows
    //---------------------------------------
    jsonArrayRows: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "//";
      var commentLineEnd = "";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      outputText += "["+newLine;
      for (var i=0; i < numRows; i++) {
        outputText += indent+"[";
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
            outputText += dataGrid[i][j] || 0;
          } else {
            outputText += '"'+(dataGrid[i][j] || "")+'"' ;
          }
          if (j < (numColumns-1)) {outputText+=","};
        };
        outputText += "]";
        if (i < (numRows-1)) {outputText += ","+newLine};
      };
      outputText += newLine+"]";


      return outputText;
    },



    //---------------------------------------
    // JSON Dictionary
    //---------------------------------------
    jsonDict: function(dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "//";
      var commentLineEnd = "";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      outputText += "{" + newLine;
      for (var i = 0; i < numRows; i++) {
        outputText += indent + '"' + dataGrid[i][0] + '": ';
        if (numColumns == 2) {
          outputText += _fmtVal(i, 1, dataGrid);
        } else {
          outputText += '{ ';
          for (var j = 1; j < numColumns; j++) {
            if (j > 1) outputText += ', ';
            outputText += '"' + headerNames[j] + '"' + ":" + _fmtVal(i, j, dataGrid);
          }
          outputText += '}';
        }
        if (i < (numRows - 1)) {
          outputText += "," + newLine;
        }
      }
      outputText += newLine + "}";

      function _fmtVal(i, j) {
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          return dataGrid[i][j] || 0;
        } else {
          return '"'+(dataGrid[i][j] || "")+'"' ;
        }
      }

      return outputText;
    },


    //---------------------------------------
    // MYSQL
    //---------------------------------------
    mysql: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "/*";
      var commentLineEnd = "*/";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;
      var tableName = "MrDataConverter"

      //begin render loop
      outputText += 'CREATE TABLE '+tableName+' (' + newLine;
      outputText += indent+"id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,"+newLine;
      for (var j=0; j < numColumns; j++) {
        var dataType = "VARCHAR(255)";
        if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
          dataType = headerTypes[j].toUpperCase();
        };
        outputText += indent+""+headerNames[j]+" "+dataType;
        if (j < numColumns - 1) {outputText += ","};
        outputText += newLine;
      };
      outputText += ');' + newLine;
      outputText += "INSERT INTO "+tableName+" "+newLine+indent+"(";
      for (var j=0; j < numColumns; j++) {
        outputText += headerNames[j];
        if (j < numColumns - 1) {outputText += ","};
      };
      outputText += ") "+newLine+"VALUES "+newLine;
      for (var i=0; i < numRows; i++) {
        outputText += indent+"(";
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float"))  {
            outputText += dataGrid[i][j] || "null";
          } else {
            outputText += "'"+( dataGrid[i][j] || "" )+"'";
          };

          if (j < numColumns - 1) {outputText += ","};
        };
        outputText += ")";
        if (i < numRows - 1) {outputText += ","+newLine;};
      };
      outputText += ";";

      return outputText;
    },


    //---------------------------------------
    // PHP
    //---------------------------------------
    php: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "//";
      var commentLineEnd = "";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;
      var tableName = "MrDataConverter"

      //begin render loop
      outputText += "array(" + newLine;
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += indent + "array(";
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float"))  {
            var rowOutput = row[j] || "null";
          } else {
            var rowOutput = '"'+(row[j] || "")+'"';
          };
          outputText += ('"'+headerNames[j]+'"' + "=>" + rowOutput)
          if (j < (numColumns-1)) {outputText+=","};
        };
        outputText += ")";
        if (i < (numRows-1)) {outputText += ","+newLine};
      };
      outputText += newLine + ");";

      return outputText;
    },

    //---------------------------------------
    // Python dict
    //---------------------------------------

    python: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "//";
      var commentLineEnd = "";
      var outputText = "[";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += "{";
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
            var rowOutput = row[j] || "None";
          } else {
            var rowOutput = '"'+(row[j] || "")+'"';
          };

        outputText += ('"'+headerNames[j] +'"' + ":" + rowOutput );

          if (j < (numColumns-1)) {outputText+=","};
        };
        outputText += "}";
        if (i < (numRows-1)) {outputText += ","+newLine};
      };
      outputText += "];";

      return outputText;
    },


    //---------------------------------------
    // Ruby
    //---------------------------------------
    ruby: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "#";
      var commentLineEnd = "";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;
      var tableName = "MrDataConverter"

      //begin render loop
      outputText += "[";
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += "{";
        for (var j=0; j < numColumns; j++) {
          if ((headerTypes[j] == "int")||(headerTypes[j] == "float")) {
            var rowOutput = row[j] || "nil"
          } else {
            var rowOutput = '"'+(row[j] || "")+'"';
          };
          outputText += ('"'+headerNames[j]+'"' + "=>" + rowOutput)
          if (j < (numColumns-1)) {outputText+=","};
        };
        outputText += "}";
        if (i < (numRows-1)) {outputText += ","+newLine};
      };
      outputText += "];";

      return outputText;
    },


    //---------------------------------------
    // XML Nodes
    //---------------------------------------
    xml: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "<!--";
      var commentLineEnd = "-->";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      outputText = '<?xml version="1.0" encoding="UTF-8"?>' + newLine;
      outputText += "<rows>"+newLine;
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += indent+"<row>"+newLine;
        for (var j=0; j < numColumns; j++) {
          outputText += indent+indent+'<'+headerNames[j]+'>';
          outputText += row[j] || ""
          outputText += '</'+headerNames[j]+'>'+newLine
        };
        outputText += indent+"</row>"+newLine;
      };
      outputText += "</rows>";

      return outputText;

    },



    //---------------------------------------
    // XML properties
    //---------------------------------------
    xmlProperties: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "<!--";
      var commentLineEnd = "-->";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      outputText = '<?xml version="1.0" encoding="UTF-8"?>' + newLine;
      outputText += "<rows>"+newLine;
      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += indent+"<row ";
        for (var j=0; j < numColumns; j++) {
          outputText += headerNames[j]+'=';
          outputText += '"' + row[j] + '" ';
        };
        outputText += "></row>"+newLine;
      };
      outputText += "</rows>";

      return outputText;

    },

    //---------------------------------------
    // XML Illustrator
    //---------------------------------------
    xmlIllustrator: function (dataGrid, headerNames, headerTypes, indent, newLine) {
      //inits...
      var commentLine = "<!--";
      var commentLineEnd = "-->";
      var outputText = "";
      var numRows = dataGrid.length;
      var numColumns = headerNames.length;

      //begin render loop
      outputText = '<?xml version="1.0" encoding="utf-8"?>' + newLine;
      outputText += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20001102//EN"    "http://www.w3.org/TR/2000/CR-SVG-20001102/DTD/svg-20001102.dtd" [' + newLine;
      outputText += indent+'<!ENTITY ns_graphs "http://ns.adobe.com/Graphs/1.0/">' + newLine;
      outputText += indent+'<!ENTITY ns_vars "http://ns.adobe.com/Variables/1.0/">' + newLine;
      outputText += indent+'<!ENTITY ns_imrep "http://ns.adobe.com/ImageReplacement/1.0/">' + newLine;
      outputText += indent+'<!ENTITY ns_custom "http://ns.adobe.com/GenericCustomNamespace/1.0/">' + newLine;
      outputText += indent+'<!ENTITY ns_flows "http://ns.adobe.com/Flows/1.0/">' + newLine;
      outputText += indent+'<!ENTITY ns_extend "http://ns.adobe.com/Extensibility/1.0/">' + newLine;
      outputText += ']>' + newLine;
      outputText += '<svg>' + newLine;
      outputText += '<variableSets  xmlns="&ns_vars;">' + newLine;
      outputText += indent+'<variableSet  varSetName="binding1" locked="none">' + newLine;
      outputText += indent+indent+'<variables>' + newLine;
      for (var i=0; i < numColumns; i++) {
        outputText += indent+indent+indent+'<variable varName="'+headerNames[i]+'" trait="textcontent" category="&ns_flows;"></variable>' + newLine;
      };
      outputText += indent+indent+'</variables>' + newLine;
      outputText += indent+indent+'<v:sampleDataSets  xmlns:v="http://ns.adobe.com/Variables/1.0/" xmlns="http://ns.adobe.com/GenericCustomNamespace/1.0/">' + newLine;

      for (var i=0; i < numRows; i++) {
        var row = dataGrid[i];
        outputText += indent+indent+indent+'<v:sampleDataSet dataSetName="' + row[0] + '">'+newLine;
        for (var j=0; j < numColumns; j++) {
          outputText += indent+indent+indent+indent+'<'+headerNames[j]+'>'+newLine;
          outputText += indent+indent+indent+indent+indent+'<p>' + row[j] + '</p>' +newLine;
          outputText += indent+indent+indent+indent+'</'+headerNames[j]+'>'+newLine
        };
        outputText += indent+indent+indent+'</v:sampleDataSet>'+newLine;
      };

      outputText += indent+indent+'</v:sampleDataSets>' + newLine;
      outputText += indent+'</variableSet>' + newLine;
      outputText += '</variableSets>' + newLine;
      outputText += '</svg>' + newLine;


      return outputText;

    },

  }
};

var csvParser = function () {
  ar isDecimal_re     = /^\s*(\+|-)?((\d+([,\.]\d+)?)|([,\.]\d+))\s*$/;

  var CSVParser = {

    //---------------------------------------
    // UTILS
    //---------------------------------------

    isNumber: function(string) {
      if( (string == null) || isNaN( new Number(string) ) ) {
        return false;
      }
      return true;
    },


    //---------------------------------------
    // PARSE
    //---------------------------------------
    //var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

    parse: function (input, headersIncluded, delimiterType, downcaseHeaders, upcaseHeaders, decimalSign) {

      var dataArray = [];

      var errors = [];

      //test for delimiter
      //count the number of commas
      var RE = new RegExp("[^,]", "gi");
      var numCommas = input.replace(RE, "").length;

      //count the number of tabs
      RE = new RegExp("[^\t]", "gi");
      var numTabs = input.replace(RE, "").length;

      var rowDelimiter = "\n";
      //set delimiter
      var columnDelimiter = ",";
      if (numTabs > numCommas) {
        columnDelimiter = "\t"
      };

      if (delimiterType === "comma") {
        columnDelimiter = ","
      } else if (delimiterType === "tab") {
        columnDelimiter = "\t"
      }


      // kill extra empty lines
      RE = new RegExp("^" + rowDelimiter + "+", "gi");
      input = input.replace(RE, "");
      RE = new RegExp(rowDelimiter + "+$", "gi");
      input = input.replace(RE, "");

      // var arr = input.split(rowDelimiter);
      //
      // for (var i=0; i < arr.length; i++) {
      //   dataArray.push(arr[i].split(columnDelimiter));
      // };


      // dataArray = jQuery.csv(columnDelimiter)(input);
      dataArray = this.CSVToArray(input, columnDelimiter);

      //escape out any tabs or returns or new lines
      for (var i = dataArray.length - 1; i >= 0; i--){
        for (var j = dataArray[i].length - 1; j >= 0; j--){
          dataArray[i][j] = dataArray[i][j].replace("\t", "\\t");
          dataArray[i][j] = dataArray[i][j].replace("\n", "\\n");
          dataArray[i][j] = dataArray[i][j].replace("\r", "\\r");
        };
      };


      var headerNames = [];
      var headerTypes = [];
      var numColumns = dataArray[0].length;
      var numRows = dataArray.length;
      if (headersIncluded) {

        //remove header row
        headerNames = dataArray.splice(0,1)[0];
        numRows = dataArray.length;

      } else { //if no headerNames provided

        //create generic property names
        for (var i=0; i < numColumns; i++) {
          headerNames.push("val"+String(i));
          headerTypes.push("");
        };

      }


      if (upcaseHeaders) {
        for (var i = headerNames.length - 1; i >= 0; i--){
          headerNames[i] = headerNames[i].toUpperCase();
        };
      };
      if (downcaseHeaders) {
        for (var i = headerNames.length - 1; i >= 0; i--){
          headerNames[i] = headerNames[i].toLowerCase();
        };
      };

      //test all the rows for proper number of columns.
      for (var i=0; i < dataArray.length; i++) {
        var numValues = dataArray[i].length;
        if (numValues != numColumns) {this.log("Error parsing row "+String(i)+". Wrong number of columns.")};
      };

      //test columns for number data type
      var numRowsToTest = dataArray.length;
      var threshold = 0.9;
      for (var i=0; i < headerNames.length; i++) {
        var numFloats = 0;
        var numInts = 0;
        for (var r=0; r < numRowsToTest; r++) {
          if (dataArray[r]) {
            //replace comma with dot if comma is decimal separator
            if(decimalSign='comma' && isDecimal_re.test(dataArray[r][i])){
              dataArray[r][i] = dataArray[r][i].replace(",", ".");
            }
            if (CSVParser.isNumber(dataArray[r][i])) {
              numInts++
              if (String(dataArray[r][i]).indexOf(".") > 0) {
                numFloats++
              }
            };
          };

        };

        if ((numInts / numRowsToTest) > threshold){
          if (numFloats > 0) {
            headerTypes[i] = "float"
          } else {
            headerTypes[i] = "int"
          }
        } else {
          headerTypes[i] = "string"
        }
      }

      return {'dataGrid':dataArray, 'headerNames':headerNames, 'headerTypes':headerTypes, 'errors':this.getLog()}

    },


    //---------------------------------------
    // ERROR LOGGING
    //---------------------------------------
    errorLog:[],

    resetLog: function() {
      this.errorLog = [];
    },

    log: function(l) {
      this.errorLog.push(l);
    },

    getLog: function() {
      var out = "";
      if (this.errorLog.length > 0) {
        for (var i=0; i < this.errorLog.length; i++) {
          out += ("!!"+this.errorLog[i] + "!!\n");
        };
        out += "\n"
      };

      return out;
    },



    //---------------------------------------
    // UTIL
    //---------------------------------------

      // This Function from Ben Nadel, http://www.bennadel.com/blog/1504-Ask-Ben-Parsing-CSV-Strings-With-Javascript-Exec-Regular-Expression-Command.htm
      // This will parse a delimited string into an array of
      // arrays. The default delimiter is the comma, but this
      // can be overriden in the second argument.
      CSVToArray: function( strData, strDelimiter ){
        // Check to see if the delimiter is defined. If not,
        // then default to comma.
        strDelimiter = (strDelimiter || ",");

        // Create a regular expression to parse the CSV values.
        var objPattern = new RegExp(
          (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );


        // Create an array to hold our data. Give the array
        // a default empty first row.
        var arrData = [[]];

        // Create an array to hold our individual pattern
        // matching groups.
        var arrMatches = null;


        // Keep looping over the regular expression matches
        // until we can no longer find a match.
        while (arrMatches = objPattern.exec( strData )){

          // Get the delimiter that was found.
          var strMatchedDelimiter = arrMatches[ 1 ];

          // Check to see if the given delimiter has a length
          // (is not the start of string) and if it matches
          // field delimiter. If id does not, then we know
          // that this delimiter is a row delimiter.
          if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

          }

          // Now that we have our delimiter out of the way,
          // let's check to see which kind of value we
          // captured (quoted or unquoted).
          if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[ 2 ].replace(
              new RegExp( "\"\"", "g" ),
              "\""
              );

          } else {
            // We found a non-quoted value.
            var strMatchedValue = arrMatches[ 3 ];
          }
          // Now that we have our value string, let's add
          // it to the data array.
          arrData[ arrData.length - 1 ].push( strMatchedValue );
        }
        // Return the parsed data.
        return( arrData );
      }

  }
};

var converter = function () {
  function DataConverter(nodeId) {

    //---------------------------------------
    // PUBLIC PROPERTIES
    //---------------------------------------

    this.nodeId                 = nodeId;
    this.node                   = $("#"+nodeId);

    this.outputDataTypes        = [
                                  {"text":"Actionscript",           "id":"as",               "notes":""},
                                  {"text":"ASP/VBScript",           "id":"asp",              "notes":""},
                                  {"text":"HTML",                   "id":"html",             "notes":""},
                                  {"text":"JSON - Properties",      "id":"json",             "notes":""},
                                  {"text":"JSON - Column Arrays",   "id":"jsonArrayCols",    "notes":""},
                                  {"text":"JSON - Row Arrays",      "id":"jsonArrayRows",    "notes":""},
                                  {"text":"JSON - Dictionary",      "id":"jsonDict",         "notes":""},
                                  {"text":"MySQL",                  "id":"mysql",            "notes":""},
                                  {"text":"PHP",                    "id":"php",              "notes":""},
                                  {"text":"Python - Dict",          "id":"python",           "notes":""},
                                  {"text":"Ruby",                   "id":"ruby",             "notes":""},
                                  {"text":"XML - Properties",       "id":"xmlProperties",    "notes":""},
                                  {"text":"XML - Nodes",            "id":"xml",              "notes":""},
                                  {"text":"XML - Illustrator",      "id":"xmlIllustrator",   "notes":""}];
    this.outputDataType         = "json";

    this.columnDelimiter        = "\t";
    this.rowDelimiter           = "\n";

    this.inputTextArea          = {};
    this.outputTextArea         = {};

    this.inputHeader            = {};
    this.outputHeader           = {};
    this.dataSelect             = {};

    this.inputText              = "";
    this.outputText             = "";

    this.newLine                = "\n";
    this.indent                 = "  ";

    this.commentLine            = "//";
    this.commentLineEnd         = "";
    this.tableName              = "MrDataConverter"

    this.useUnderscores         = true;
    this.headersProvided        = true;
    this.downcaseHeaders        = true;
    this.upcaseHeaders          = false;
    this.includeWhiteSpace      = true;
    this.useTabsForIndent       = false;

  }

  //---------------------------------------
  // PUBLIC METHODS
  //---------------------------------------

  DataConverter.prototype.create = function(w,h) {
    var self = this;

    //build HTML for converter
    this.inputHeader = $('<div class="groupHeader" id="inputHeader"><p class="groupHeadline">Input CSV or tab-delimited data. <span class="subhead"> Using Excel? Simply copy and paste. No data on hand? <a href="#" id="insertSample">Use sample</a></span></p></div>');
    this.inputTextArea = $('<textarea class="textInputs" id="dataInput"></textarea>');
    var outputHeaderText = '<div class="groupHeader" id="inputHeader"><p class="groupHeadline">Output as <select name="Data Types" id="dataSelector" >';
      for (var i=0; i < this.outputDataTypes.length; i++) {

        outputHeaderText += '<option value="'+this.outputDataTypes[i]["id"]+'" '
                + (this.outputDataTypes[i]["id"] == this.outputDataType ? 'selected="selected"' : '')
                + '>'
                + this.outputDataTypes[i]["text"]+'</option>';
      };
      outputHeaderText += '</select><span class="subhead" id="outputNotes"></span></p></div>';
    this.outputHeader = $(outputHeaderText);
    this.outputTextArea = $('<textarea class="textInputs" id="dataOutput"></textarea>');

    this.node.append(this.inputHeader);
    this.node.append(this.inputTextArea);
    this.node.append(this.outputHeader);
    this.node.append(this.outputTextArea);

    this.dataSelect = this.outputHeader.find("#dataSelector");

    this.outputTextArea.click(function(evt){this.select();});


    $("#insertSample").bind('click',function(evt){
      evt.preventDefault();
      self.insertSampleData();
      self.convert();
      _gaq.push(['_trackEvent', 'SampleData','InsertGeneric']);
    });

    $("#dataInput").keyup(function() {self.convert()});
    $("#dataInput").change(function() {
      self.convert();
      _gaq.push(['_trackEvent', 'DataType',self.outputDataType]);
    });

    $("#dataSelector").bind('change',function(evt){
         self.outputDataType = $(this).val();
         self.convert();
       });

    this.resize(w,h);
  }

  DataConverter.prototype.resize = function(w,h) {

    var paneWidth = w;
    var paneHeight = (h-90)/2-20;

    this.node.css({width:paneWidth});
    this.inputTextArea.css({width:paneWidth-20,height:paneHeight});
    this.outputTextArea.css({width: paneWidth-20, height:paneHeight});

  }

  DataConverter.prototype.convert = function() {

    this.inputText = this.inputTextArea.val();
    this.outputText = "";

    //make sure there is input data before converting...
    if (this.inputText.length > 0) {

      if (this.includeWhiteSpace) {
        this.newLine = "\n";
        // console.log("yes")
      } else {
        this.indent = "";
        this.newLine = "";
        // console.log("no")
      }

      CSVParser.resetLog();
      var parseOutput = CSVParser.parse(this.inputText, this.headersProvided, this.delimiter, this.downcaseHeaders, this.upcaseHeaders);

      var dataGrid = parseOutput.dataGrid;
      var headerNames = parseOutput.headerNames;
      var headerTypes = parseOutput.headerTypes;
      var errors = parseOutput.errors;

      this.outputText = DataGridRenderer[this.outputDataType](dataGrid, headerNames, headerTypes, this.indent, this.newLine);


      this.outputTextArea.val(errors + this.outputText);

    }; //end test for existence of input text
  }
  DataConverter.prototype.insertSampleData = function() {
    this.inputTextArea.val("NAME\tVALUE\tCOLOR\tDATE\nAlan\t12\tblue\tSep. 25, 2009\nShan\t13\t\"green\tblue\"\tSep. 27, 2009\nJohn\t45\torange\tSep. 29, 2009\nMinna\t27\tteal\tSep. 30, 2009");
  }
};

var converterFiles = function () {
  var file = fs.readdirSync(path);
  var reading = JSON.parse(fs.readFileSync(path+file[0]));

  console.log(file);
  console.log(file[0]);

  excel2Json(reading, {
      'convert_all_sheet': false,
      'return_type': 'File',
      'sheetName': 'survey'
  }, function(err, output) {
    console.log(err);
    console.log(output);
  });
};

var controller = function () {
  var _gaq = _gaq || [];

  $(document).ready(function(){
    var widthOffset = 345;
    var heightOffset = 35

    var d = new DataConverter('converter');

    var sidebar = $('#header');

    var win = $(window);
    var w = win.width() - widthOffset;
    var h = win.height() - heightOffset;

    d.create(w,h);

    $(".settingsElement").change(updateSettings);

    $(window).bind('resize',function() {

        w = win.width() - widthOffset;
        h = win.height() - heightOffset;
        d.resize(w,h);
        sidebar.height(h);

      });

    function updateSettings (evt) {

      if (evt) {
        _gaq.push(['_trackEvent', 'Settings',evt.currentTarget.id ]);
      };

      d.includeWhiteSpace = $('#includeWhiteSpaceCB').attr('checked');

      if (d.includeWhiteSpace) {
        $("input[name=indentType]").removeAttr("disabled");
        var indentType = $('input[name=indentType]:checked').val();
        if (indentType === "tabs") {
          d.indent = "\t";
        } else if (indentType === "spaces") {
          d.indent = "  "
        }
      } else {
        $("input[name=indentType]").attr("disabled", "disabled");
      }

      d.headersProvided = $('#headersProvidedCB').attr('checked');

      if (d.headersProvided) {
        $("input[name=headerModifications]").removeAttr("disabled");

        var hm = $('input[name=headerModifications]:checked').val();
        if (hm === "downcase") {
          d.downcaseHeaders = true;
          d.upcaseHeaders = false;
        } else if (hm === "upcase") {
          d.downcaseHeaders = false;
          d.upcaseHeaders = true;
        } else if (hm === "none") {
          d.downcaseHeaders = false;
          d.upcaseHeaders = false;
        }
      } else {
        $("input[name=headerModifications]").attr("disabled", "disabled");
      }

      d.delimiter = $('input[name=delimiter]:checked').val();
      d.decimal = $('input[name=decimal]:checked').val();

      d.useUnderscores = true;

      d.convert();
    };

    updateSettings();

  })
};
