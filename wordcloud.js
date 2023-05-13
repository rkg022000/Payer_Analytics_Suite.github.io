// Define the words and their frequencies
var words = [
  {text: "90 Days Rx Utilization Report", size: 15, image: "image/90 Days Rx Utilization Report.png", desc: "Split by days of supply analysis"},
  {text: "Alternate Payment Method", size: 20, image: "image/Alternate Payment Method.png", desc: "Patient pay analysis"},
  {text: "Biosimilar Summary View", size: 22, image: "image/Biosimilar Summary View.png", desc: "Biosimilar impact analysis"},
  {text: "CMS Summary ", size: 18, image: "image/CMS Summary .png", desc: "Open source data"},
  {text: "Contracted SPP Copay Card", size: 14, image: "image/Contracted SPP Copay Card.png", desc: "Specialty pharmacy"},
  {text: "Copay Bridge", size: 16, image: "image/Copay Bridge.png", desc: "Bridge program evaluation"},
  {text: "Copay Dashboard", size: 12, image: "image/Copay Dashboard.png", desc: "Copay card analysis"},
  {text: "Copay Dashboard 2", size: 17, image: "image/Copay Dashboard 2.png", desc: "Copay analysis"},
  {text: "Coverage Dashboard", size: 19, image: "image/Coverage Dashboard.png", desc: "Impact of coverage change"},
  {text: "Cross Portfolio - Regional Payer Analytics", size: 21, image: "image/Cross Portfolio - Regional Payer Analytics.png", desc: "Region vs National analytics across portfolio"},
  {text: "DRG Coverage", size: 23, image: "image/DRG Coverage.png", desc: "DRG claims analysis"},
  {text: "Early Warning System", size: 19, image: "image/Early Warning System.png", desc: "Intent vs Ability to control analysis"},
  {text: "Field Force View", size: 16, image: "image/Field Force View.png", desc: "Field force dashboard"},
  {text: "Focal Point", size: 13, image: "image/Focal Point.png", desc: "Focal Point dashboard"},
  {text: "KPI Dashboard – Mx and Rx", size: 14, image: "image/KPI Dashboard – Mx and Rx.png", desc: "KPI for an Mx + Rx brand"},
  {text: "McKesson Dashboard", size: 15, image: "image/McKesson Dashboard.png", desc: "Mckesson data dashboard"},
  {text: "Oncology KPI Dashboard", size: 18, image: "image/Oncology KPI Dashboard.png", desc: "Multiple onc therapy analytics"},
  {text: "Payer Metric Tool", size: 17, image: "image/Payer Metric Tool.png", desc: "Top payer analysis"},
  {text: "Payer Performance Dashboard", size: 20, image: "image/Payer Performance Dashboard.png", desc: "Top payer performance"},
  {text: "Payer Provider Tool", size: 16, image: "image/Payer Provider Tool.png", desc: "Interaction of payer and providers"},
  {text: "Product Performance - Payer View", size: 22, image: "image/Product Performance - Payer View.png", desc: "Payer drill down"},
  {text: "Product Performance- Geo View", size: 19, image: "image/Product Performance- Geo View.png", desc: "Geography drill down"},
  {text: "Product Summary Dashboard", size: 20, image: "image/Product Summary Dashboard.png", desc: "New product launch tracking"},
  {text: "Quarterly Business Review", size: 17, image: "image/Quarterly Business Review.png", desc: "IDN business review"},
  {text: "Rx vs Mx", size: 15, image: "image/Rx vs Mx.png", desc: "Rx vs Mx analysis"},
  {text: "Specific Payer Analysis", size: 16, image: "image/Specific Payer Analysis.png", desc: "Specific payer analysis"},
  {text: "Veteran Health Administration View", size: 18, image: "image/Veteran Health Administration View.png", desc: "VA analysis"}  

];

var width = window.innerWidth * 0.8;
var height = window.innerHeight * 0.6;


var color = d3.scaleOrdinal(d3.schemeCategory10);

var layout = d3.layout.cloud()
  .size([width, height])
  .words(words)
  .padding(5)
  .rotate(function () { return 0; })
  .fontSize(function (d) { return d.size; })
  .on("end", draw);
// pass the height value to CSS
document.getElementById("word-cloud").style.height = height + "px";

layout.start();

// Define the div for the tooltip
var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var destinationLink = '';

function draw(words) {
  d3.select("#word-cloud")
    .append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
    .selectAll("text")
    .data(words)
    .enter().append("text")
    .style("font-size", function (d) { return d.size + "px"; })
    .style("font-family", "Impact")
    .style("fill", function (d, i) { return color(i); })
    .attr("text-anchor", "middle")
    .attr("transform", function (d) {
      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
    })
    .text(function (d) { return d.text; })
    .on("mouseover", function (d) {

      // Show the tooltip with image and description on mouseover
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html("<img src='" + d.image + "'><br><h3 class='h3'>" + d.desc + "</h3><br><p class='info'>Click on the word to Read More</p>")
        //   "<a href='www.google.com' class='read-more'>Read More<a/>"
        // add click event to tooltip



        .style("left", (d3.event.pageX + 10) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
      // Increase font size and font weight on mouseover
      d3.select(this)
        .style("font-size", d.size * 1.2 + "px")
        .style("font-weight", "bold")
        .style("fill", "black");


    })
    .on("mouseout", function (d) {
      // Check if mouse is over tooltip before hiding it
      var bounds = tooltip.node().getBoundingClientRect();
      var x = d3.event.clientX;
      var y = d3.event.clientY;
      if (x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom) {
        return;
      }

      // Hide the tooltip on mouseout
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
      // Restore original font size, font weight, and fill color on mouseout
      d3.select(this)
        .style("font-size", d.size + "px")
        .style("font-weight", "normal")
        .style("fill", color(words.indexOf(d)))
        .attr("class", "read-more")
        .on("click", function (d) {
          var email = prompt("Please enter your email address");
          if (email != null) {
            if (isValidEmail(email)) {
              // Extract the word, image, and description
              var word = d.text;
              var image = d.image;
              var description = d.desc;
              // Construct the URL with query parameters
              var url = "full_article.html?word=" + encodeURIComponent(word) + "&image=" + encodeURIComponent(image) + "&description=" + encodeURIComponent(description);
              // Redirect to the new page
              window.location.href = url;
            } else {
              alert("Invalid email format. Please try again.");
            }
          }
        });

      function isValidEmail(email) {
        var regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
      }




    }
    )
}

