function lineChart(cat, qnt, title, id){
        var width = function(){ return document.getElementById(id).offsetWidth},
            height = 500,
            xScale = d3.scaleBand(),
            yScale = d3.scaleLinear(),
            colour = "steelblue",
            x,
            y,
            margin = { top: 30, bottom: 30, left: 30, right: 30 },
            floatFormat = d3.format("." + d3.precisionFixed(0.5) + "f"),
            xAxis = d3.axisBottom(xScale),
            yAxis = d3.axisLeft(yScale);

        function my(selection){

          selection.each(function(data) {

            var svg_name = "chart_svg" + id;
            var svg = selection.append('svg')
                .attr("id", svg_name)
                .attr("width", width())
                .attr("height", height);

            var g = svg.selectAll("g")
              .data([1]);
            g = g.enter().append("g")
              .merge(g)
                .attr("class", svg_name)
                .attr("transform",
                      "translate(" + margin.left + "," + margin.top +")");


            var innerWidth = width() - margin.left - margin.right ;
            var innerHeight = function(){ return height - margin.top - margin.bottom} ;


            xScale
              .domain(data.map(function (d){ return d[x]; }))
              .range([0, (innerWidth - margin.right)]);


            // X axis
            var xAxis_name = "x-axis_" + id;
            var xAxis_call = "." + xAxis_name;
            var xAxisG = g.selectAll(xAxis_call).data([1]);
            xAxisG.enter().append("g")
                .attr("class", xAxis_name)
              .merge(xAxisG)
                .attr("transform", "translate(0," + innerHeight()  +")")
                .call(xAxis);

            // labels X ax,is
            // rotate text if is longer than...
            var rotate = 0;
            d3.select(this).select(xAxis_call).selectAll("text").each(function(){
                if (this.getBBox().width > xScale.bandwidth()){
                    rotate = 1
                    d3.select(xAxis_call).selectAll("text").attr("transform", "rotate(-90)")
                                        .attr("y", 0)
                                        .attr("x", -10)
                                        .attr("dy", ".35em")
                                        .style("text-anchor", "end");
            }});

            // adjust margin and x axis title
            var maxh = 15;
            if (rotate == 1) {
                d3.select(this).select(".x-axis").selectAll("text").each(function(){
                    if (this.getBBox().width > maxh)
                        maxh = this.getBBox().width;
            });};
            margin.bottom = margin.bottom + maxh;
            d3.select(xAxis_call).attr("transform", "translate(0," + (innerHeight()) + ")");

            var text_name = "text_" + id;
            g.append("text")
                .attr("class", text_name)
                .attr("transform", "translate(" + (innerWidth/2) + ", " + (innerHeight() + margin.bottom - 5) + ")")
                .style("font-size", "12px")
                .style("text-anchor", "middle")
                .text(cat);

            yScale
              .domain([0, d3.max(data, function (d){ return d[y] ;})])
              .range([innerHeight(), 0]);

            // Y axis
            var yAxis_name = "y-axis_" + id;
            var yAxis_call = "." + yAxis_name;
            var yAxisG = g.selectAll(yAxis_call).data([1]);
            yAxisG.enter().append("g")
                .attr("class", yAxis_name)
               .merge(yAxisG)
               .call(yAxis);

            //labels Y axis
            var maxw = 0;
            d3.select(this).select(yAxis_call).selectAll("text").each(function(){
                if (this.getBBox().width > maxw) {
                    maxw = this.getBBox().width;
                }
            });
            margin.left = margin.left + maxw;
            g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var yLabel = function(){
                         if (title == "Count"){
                            return "Count";
                         } else {
                            return qnt;
                         }};

            g.append("text")
                .attr("class", text_name)
                .attr("transform", "rotate(-90)")
                .attr("x", 0 - (innerHeight()/2))
                .attr("y", 0 - (margin.left))
                .attr("dy", "1em")
                .style("font-size", "12px")
                .style("text-anchor", "middle")
                .text(yLabel);

            //div for tooltip
            var div = d3.select("body").append("div")
                        .style("width","auto")
                        .style("height", "auto")
                        .attr("class", "tooltip")
                        .style("opacity", 0);


            // lines
            var line = d3.line()
                        .x(function(d) { return xScale(d[x]); })
                        .y(function(d) { return yScale(d[y]); });


            g.append("path")
              .data([data])
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("transform", "translate(" + (xScale.bandwidth() /2) + ", 0)")
              .attr("d", line);

            g.selectAll("dot")
             .data(data)
             .enter().append("circle")
             .attr("r", 3.5)
             .attr("transform", "translate(" + (xScale.bandwidth() /2) + ", 0)")
             .attr("cx", function(d) { return xScale(d[x]); })
             .attr("cy", function(d) { return yScale(d[y]); })
             .on("mouseover", function(d){
                 div.transition()
                    .duration(200)
                    .style("opacity", 1);
                 div.html(cat + ": " + d.key + "<br/>" + yLabel() + ": " + d.value)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 40) + "px");
                 })
             .on("mouseout", function(d) {
               div.transition()
                .duration(500)
                .style("opacity", 0);
             });

                });
    }

        my.x = function (_){
          return arguments.length ? (x = _, my) : x;
        };

        my.y = function (_){
          return arguments.length ? (y = _, my) : y;
        };

        my.width = function (_){
          return arguments.length ? (width = _, my) : width;
        };

        my.height = function (_){
          return arguments.length ? (height = _, my) : height;
        };

        my.padding = function (_){
          return arguments.length ? (xScale.padding(_), my) : xScale.padding();
        };

        return my;
      }