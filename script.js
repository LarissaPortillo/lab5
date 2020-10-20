d3.csv("https://cdn.glitch.com/53c237f9-1754-427d-899a-6c561b761a18%2Fcoffee-house-chains.csv?v=1602833142227", d3.autoType)
   .then(data=>{
  data=data;
  console.log(data);
  
  const margin = {top: 20, right: 10, bottom: 20, left: 10};
  const width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  
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
  //.domain(d3.range(company.length))
  .domain(company)
  .rangeRound([0, width])
  .paddingInner(0.1);

  
//add an if for maxRev or maxStore
const yScale = d3.scaleLinear()
    .domain([0,maxRev])
    .range([height,0])
    .clamp(true);
          
  
})