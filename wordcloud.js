// Define the words and their frequencies
var words = [
    {text: "90 Days Rx Utilization Report", size: 15, image: "image1.jpg", desc: "Split by days of supply analysis",link:"index.html"},
    {text: "Alternate Payment Method", size: 20, image: "image1.jpg", desc: "Patient pay analysis",link:"#"},
    {text: "Biosimilar Summary View", size: 22, image: "image1.jpg", desc: "Biosimilar impact analysis",link:"#"},
    {text: "CMS Summary ", size: 18, image: "image1.jpg", desc: "Open source data",link:"#"},
    {text: "Contracted SPP Copay Card", size: 14, image: "image1.jpg", desc: "Specialty pharmacy",link:"#"},
    {text: "Copay Bridge", size: 16, image: "image1.jpg", desc: "Bridge program evaluation",link:"#"},
    {text: "Copay Dashboard", size: 12, image: "image1.jpg", desc: "Copay card analysis",link:"#"},
    {text: "Copay Dashboard 2", size: 17, image: "image1.jpg", desc: "Copay analysis",link:"#"},
    {text: "Coverage Dashboard", size: 19, image: "image1.jpg", desc: "Impact of coverage change",link:"#"},
    {text: "Cross Portfolio - Regional Payer Analytics", size: 21, image: "image1.jpg", desc: "Region vs National analytics across portfolio",link:"#"},
    {text: "DRG Coverage", size: 23, image: "image1.jpg", desc: "DRG claims analysis",link:"#"},
    {text: "Early Warning System", size: 19, image: "image1.jpg", desc: "Intent vs Ability to control analysis",link:"#"},
    {text: "Field Force View", size: 16, image: "image1.jpg", desc: "Field force dashboard",link:"#"},
    {text: "Focal Point", size: 13, image: "image1.jpg", desc: "Focal Point dashboard",link:"#"},
    {text: "KPI Dashboard – Mx and Rx", size: 14, image: "image1.jpg", desc: "KPI for an Mx + Rx brand",link:"#"},
    {text: "McKesson Dashboard", size: 15, image: "image1.jpg", desc: "Mckesson data dashboard",link:"#"},
    {text: "Oncology KPI Dashboard", size: 18, image: "image1.jpg", desc: "Multiple onc therapy analytics",link:"#"},
    {text: "Payer Metric Tool", size: 17, image: "image1.jpg", desc: "Top payer analysis",link:"#"},
    {text: "Payer Performance Dashboard", size: 20, image: "image1.jpg", desc: "Top payer performance",link:"#"},
    {text: "Payer Provider Tool", size: 16, image: "image1.jpg", desc: "Interaction of payer and providers",link:"#"},
    {text: "Product Performance - Payer View", size: 22, image: "image1.jpg", desc: "Payer drill down",link:"#"},
    {text: "Product Performance- Geo View", size: 19, image: "image1.jpg", desc: "Geography drill down",link:"#"},
    {text: "Product Summary Dashboard", size: 20, image: "image1.jpg", desc: "New product launch tracking",link:"#"},
    {text: "Quarterly Business Review", size: 17, image: "image1.jpg", desc: "IDN business review",link:"#"},
    {text: "Rx vs Mx", size: 15, image: "image1.jpg", desc: "Rx vs Mx analysis",link:"#"},
    {text: "Specific Payer Analysis", size: 16, image: "image1.jpg", desc: "Specific payer analysis",link:"#"},
    {text: "Veteran Health Administration View", size: 18, image: "image1.jpg", desc: "VA analysis",link:"#"}
    
  ];
  
  var width = window.innerWidth * 0.8;
  var height = window.innerHeight * 0.6;

  
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  
  var layout = d3.layout.cloud()
    .size([width, height])
    .words(words)
    .padding(5)
    .rotate(function() { return 0; })
    .fontSize(function(d) { return d.size; })
    .on("end", draw);
    // pass the height value to CSS
document.getElementById("word-cloud").style.height = height + "px";
      
  layout.start();
  
  // Define the div for the tooltip
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    
  
  
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
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return color(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; })
      .on("mouseover", function(d) {
            
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
      .on("mouseout", function(d) {
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
        window.open(d.link); 
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
  
