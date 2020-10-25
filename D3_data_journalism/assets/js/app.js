
function makeResponsive() {

    d3.csv('assets/data/data.csv').then(data => {
        console.log(data)

        let svgArea = d3.select("body").select("svg");
        if (!svgArea.empty()) {
            svgArea.remove();
        }

        //Set up the chart    
        let svgWidth = window.innerWidth;
        let svgHeight = window.innerHeight;

        let margin = {
            top: 20,
            right: 40,
            bottom: 50,
            left: 50
        };

        let width = svgWidth - margin.left - margin.right
        let height = svgHeight - margin.top - margin.bottom

        let svg = d3
            .select('#scatter')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight)

        //set the chart inside the margins
        let chartGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

        //make the data numeric
        data.forEach(function(data) {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
        }); 

        //Create scales
        let xLinearScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.poverty - 1), d3.max(data, d => d.poverty)])
            .range([0, width])
            

        let yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.healthcare)])
            .range([height, 0])

        let bottomAxis = d3.axisBottom(xLinearScale);
        let leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        //Set up the x axis label
        chartGroup.append('text')
        //position the text
        // center and below bottom axis
        .attr('transform', `translate(${width / 2}, ${height + margin.bottom})`)
        .attr("text-anchor", "middle")
        //make font size responsive to window size
        .attr('font-size', width/20)
        .attr('fill', 'dodgerblue')
        .text('In Poverty (%)');

        //Set up the y axis label 
        //position text left and centered vertically
        chartGroup.append('text')
        .attr('transform', `translate(${0 - margin.left + 25}, ${height/2} ) rotate(270)`)
        .attr("text-anchor", "middle")
        //make font size responsive to window size
        .attr('font-size', height/20)
        .attr('rotation', '90')
        .attr('fill', 'dodgerblue')
        .text('Lacks Healthcare (%)');
       

       //create a circles group
        let circlesGroup = chartGroup.selectAll('g')
            .data(data)
            .enter()
            .append("g")
        
        //append the circles onto the chart
        circlesGroup.append("circle")
            .attr('cx', d => xLinearScale(d.poverty))
            .attr('cy', d => yLinearScale(d.healthcare))
            .attr('r', 10)
            .style('fill', 'blue')
            .attr('opacity', "50%")
        
        //append the state abbreviation onto the circles
        circlesGroup.append('text') 
            .html(function(d) {return d.abbr})
            .attr('opacity', ".75")
            .attr('font-size', "8px")
            .attr("x", d => xLinearScale(d.poverty)-5)
            .attr("y", d => yLinearScale(d.healthcare)+3)
            
                
    }).catch(err => console.log(err))
};

makeResponsive();

d3.select(window).on("resize", makeResponsive);