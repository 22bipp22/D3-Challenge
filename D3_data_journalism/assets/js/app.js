d3.csv('assets/data/data.csv').then(data => {
    console.log(data)

    //Set up the chart    
    let svgWidth = 960;
    let svgHeight = 500;

    let margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
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

    // let povertyData = data.map(entry => entry.poverty)
    // let stateAbbr = data.map(entry => entry.abbr)
    // let healthCare = data.map(entry => entry.healthcare)

    // console.log(povertyData)
    // console.log(stateAbbr)
    // console.log(healthCare)

    //Create scales
    let xLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.poverty)])
        .range([0, width])

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([height, 0])

    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // let xAxis = chartGroup.append("g")
    //     .classed("x-axis", true)
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(bottomAxis);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // line generator
    let line = d3.line()
        .x(d => xLinearScale(d.poverty))
        .y(d => yLinearScale(d.healthcare));

    // create path
    chartGroup.append("path")
        .data([data])
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "blue");


    let circlesGroup = chartGroup.selectAll("circle")
        // .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
            .attr('cx', d => xLinearScale(d.poverty))
            .attr('cy', d => yLinearScale(d.healthcare))
            .attr('r', 2.0)
            .style('fill', '#000000')
            
}).catch(err => console.log(err))