// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width / 3.9;

var labelArea = 110;

var tPadBot = 40;
var tPadLeft = 40;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class","chart");

  // create circles for plot
  var radius;
  function rad() {
    if (width <= 430) {
      circRadius = 5;
    }
    else {
      circRadius = 15;
    }
  }
  rad();

  //svg.append("g").attr("class", "xText");
  // xText will allows us to select the group without excess code.
  //var xText = d3.select(".xText");


// Append an SVG group
 svg.append("g").attr("class", "x_axis_text");

  var x_axis_text = d3.select(".x_axis_text");

  function refresh_x_axis() {
    x_axis_text.attr(
      "transform",
      "translate(" +
        ((width - labelArea) / 2 + labelArea) +
        ", " +
        (height - margin - tPadBot) +
        ")"
    );
  }
  refresh_x_axi();
  
// x axis variables

  // 1. Poverty
x_axis_text
.append("text")
.attr("y", -26)
.attr("data-name", "poverty")
.attr("data-axis", "x")
.attr("class", "aText active x")
.text("In Poverty (%)");
// 2. Age
x_axis_text
.append("text")
.attr("y", 0)
.attr("data-name", "age")
.attr("data-axis", "x")
.attr("class", "aText inactive x")
.text("Age (Median)");

//set up y variables

var ltextX = margin + tPadLeft;
var ltextY = (height + labelArea) / 2 - labelArea;

svg.append("g").attr("class", "y_axis_text");
var x_axis_text = d3.select(".y_axis_text");

function refresh_y_axis() {
    yText.attr(
      "transform",
      "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
    );
  }
  refresh_y_axis();


  // select y variables

  y_axis_text
  .append("text")
  .attr("y", 26)
  .attr("data-name", "noHealthInsurance")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Lacks Healthcare (%)");

  yText
  .append("text")
  .attr("x", 0)
  .attr("data-name", "smokes")
  .attr("data-axis", "y")
  .attr("class", "aText inactive y")
  .text("Smokes (%)");


// Get csv data and visualize
d3.csv("data.csv", function(data) {
    visualize(data);
  });

  function visualize(theData) {
    var curX = "poverty";
    var curY = "healthcare";

    
    var xMin;
    var xMax;
    var yMin;
    var yMax;

    var toolTip = d3
    .tip()
    .attr("class", "d3-tip")
    .offset([40, -60])
    .html(function(d) {
      // x key
      var theX;
     
      var theState = "<div>" + d.state + "</div>";
      
      var theY = "<div>" + curY + ": " + d[curY] + "%</div>";
     
      if (curX === "poverty") {
        
        theX = "<div>" + curX + ": " + d[curX] + "%</div>";
      }
      else {
       
        theX = "<div>" +
          curX +
          ": " +
          parseFloat(d[curX]).toLocaleString("en") +
          "</div>";
      }
      // Display what we capture.
      return theState + theX + theY;
    });
  // Call the toolTip function.
  svg.call(toolTip);
