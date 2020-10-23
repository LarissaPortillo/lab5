

// CHART INIT ------------------------------


let type= d3.select("#group-by").node().value;



// create svg with margin convention
  const margin = {top: 20, right: 10, bottom: 20, left: 40};
  const width = 650 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
  const svg = d3.select(".bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  

// create scales without domains
 const xScale = d3.scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);
  
const xxScale = d3.scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);
  
const yScale = d3.scaleLinear()
    .range([height,0]);
          

// create axes and axis title containers
svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`);
 
  
svg.append("g")
  .attr("class", "y-axis");


svg.append('text')
  .attr("class","y-axis-title");



// (Later) Define update parameters: measure type, sorting direction

// CHART UPDATE FUNCTION -------------------
function update(data,type){
    console.log("type", type);
    

      const company=data.map(d=>d.company);
      console.log(data.map(d=>d[type]));
  
    // Update scale domains
      xScale.domain(company);
      
      xxScale.domain(d3.range(company.length));
  
     yScale.domain([0,d3.max(data, (d)=>{return d[type];})]);
  
      
    const bars = svg.selectAll('.bar')
      .data(data);

      bars.enter()
      .append('rect')
      .attr("class","bar")
      .attr("x", (d,i)=>{return xxScale(i);})
      .attr("y", (d)=> yScale(d[type]))
      .merge(bars)
      .transition()
      .duration(1000)
      .attr("fill", ()=> {if (type=="stores"){
        return "blue";}
        else{return "green";}})
      .attr("x", (d,i)=>{return xxScale(i);})
      .attr("y", (d)=> yScale(d[type]))
      .attr("width", xScale.bandwidth())
      .attr("height", (d)=> {return height-yScale(d[type]);});
      
  
      bars.exit()
      .transition()
      .duration(1000)
      .attr("fill","green")
      .attr("opacity",0.0)
      .attr("x", (d,i)=>{return xxScale(i);})
      .attr('y',0)
      .attr("height",height-yScale(0))
      .remove();



    
      // Update axes and axis title
      const xAxis = d3.axisBottom(xScale);

      const yAxis = d3.axisLeft(yScale);
    
      svg.select(".x-axis")
      .transition()
      .duration(1000)
      .call(xAxis);
  
      svg.select(".y-axis")
      .transition()
      .duration(1000)
      .call(yAxis);
  
      svg.select(".y-axis-title")
      .attr("class","y-axis-title")
      .attr('x', 20 )
      .attr('y', 0 )
      .attr('text-anchor','end')
      .attr('font-family','sans-serif')
      .attr('font-size',12)
      .text(type);
 
   
};



// CHART UPDATES ---------------------------


// Loading data
d3.csv("https://cdn.glitch.com/53c237f9-1754-427d-899a-6c561b761a18%2Fcoffee-house-chains.csv?v=1602833142227", d3.autoType).then(data => {
  
  update(data.sort((a,b) => b[type]- a[type]),type);
  
  document.querySelector("#group-by").addEventListener('change', (event)=> {
    type= event.target.value;
  
   document.querySelector("#button").onclick=()=>update(data.sort((a,b) => a[type]- b[type]),type);
   update(data.sort((a,b) => b[type]- a[type]),type);
  });
 


});




  