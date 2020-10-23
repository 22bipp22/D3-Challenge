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

    let povertyData = data.map(entry => entry.poverty)
    let stateAbbr = data.map(entry => entry.abbr)
    let healthCare = data.map(entry => entry.healthcare)

    console.log(povertyData)
    console.log(stateAbbr)
    console.log(healthCare)

    let xLinearScale = d3.scaleLinear()
        .domain(d3.extent(povertyData))
        .range([0, width])

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthCare)])
        .range([height, 0])

    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    let xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    let circlesGroup = chartGroup.selectAll("circle")
        // .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
            .attr('cx', d => xLinearScale(d[stateAbbr]))
            .attr('cy', d => yLinearScale(d[povertyData]))
            .attr('r', 2.0)
            .style('fill', '#000000')
            
}).catch(err => console.log(err))