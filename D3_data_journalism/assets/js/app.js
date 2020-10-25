
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

        let chartGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

        // let xAxis = 'State'
        // let yAxis = 'Poverty'

        data.forEach(function(data) {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
        }); 

        //Create scales
        let xLinearScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.poverty))
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
       

       //My code that works
        let circlesGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append('circle')
                .attr('cx', d => xLinearScale(d.poverty))
                .attr('cy', d => yLinearScale(d.healthcare))
                .attr('r', 10)
                .style('fill', 'blue')
                .attr('opacity', "50%")
                .attr('text-anchor', 'middle')
                .attr('text', d => d.abbr)

                
        circlesGroup.append("g")

        circlesGroup.append('text')
            .attr('text-anchor', 'middle')
            .text(d => {d.abbr})
        
                
                
    }).catch(err => console.log(err))
};

makeResponsive();

d3.select(window).on("resize", makeResponsive);