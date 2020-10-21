d3.csv("https://cdn.glitch.com/53c237f9-1754-427d-899a-6c561b761a18%2Fcoffee-house-chains.csv?v=1602833142227", d3.autoType)
   .then(data=>{
  data=data;
  console.log(data);
  
  const margin = {top: 20, right: 10, bottom: 20, left: 40};
  const width = 650 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;
  
 const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
 const company=data.map(d=>d.company);
 console.log(company);
  
 const maxRev = d3.max(data, (d)=>{return d.revenue;});
 console.log('maxRev',maxRev);
  
 const maxStore = d3.max(data, (d)=>{return d.stores;});
 console.log('maxStore',maxStore);
  
 const xScale = d3.scaleBand()
  .domain(data.map((d)=>d.company))
  .rangeRound([0, width])
  .paddingInner(0.1);

const xxScale = d3.scaleBand()
  .domain(d3.range(company.length))
  .rangeRound([0, width])
  
  
//add an if for maxRev or maxStore
const yScale = d3.scaleLinear()
    .domain([0,maxStore])
    .range([height,0])
    .clamp(true);
          
svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr("fill", 'blue')

  .attr("x", (d,i)=>{return xxScale(i);})
  .attr("y", (d)=> yScale(d.stores))
  .attr("width", xScale.bandwidth())
  .attr("height", (d)=> {return height-yScale(d.stores);});

const xAxis = d3.axisBottom()
  .scale(xScale);
  
const yAxis = d3.axisLeft()
  .scale(yScale);
  
svg.append("g")
  .attr("class", "axis x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);
  
svg.append("g")
  .attr("class", "axis y-axis")
  .call(yAxis);
   
})