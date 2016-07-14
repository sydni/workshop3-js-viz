window.onload = function(){
  function color(d){
    return d.color;
  }
  function radius(d){
    return d.r + "px";
  }
  function cx(d){
    return d.cx + "px";
  }
  function changeColor(d){
    return "blue";
  }

  function zoomed(){
    svgMap.select('path')
          .attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')' );
  }

  // ADD THE attributesEnter HERE!
  // var attributesEnter = ;

  var zoom = d3.behavior.zoom()
                      .scaleExtent([1, 5])
                      .on("zoom", zoomed);

  var svgCircles = d3.select("svg.circles");
  var svgMap = d3.select("svg.map").call(zoom);

  var attributesEnter = [{color: 'red', r: 40, cx: 100},  //example line
                          {color: 'blue', r: 4, cx:100},
                          {color: 'red', r: 8, cx:200},
                          {color: 'green', r: 10, cx:12}];

  var circles = svgCircles.selectAll('circle')
                          .data(attributesEnter)
                          .enter()
                          .append("circle")
                          .attr('fill', color)
                          .attr('r', radius)
                          .attr('cx', cx)
                          .attr('cy', '50px');



  // ADD THE attributesExit HERE! Remember to repeat at least one of the elements of attributesEnter
  // var attributesExit = ;
  //
  // svgCircles.selectAll('circle')
  //             .data(attributesExit)
  //             .exit()
  //             .attr("fill", changeColor);


  d3.json("usa.json", function(error, usa) {
    if (error) return console.error(error);

    var scale = 800;  // around 800 should be fine
    var center = [-72, 43];
    var zoomOffset = 10.0;  // the amount the zoom center should deviate from the map's center

    zoom.center(center.map(function(el){return el + zoomOffset;}));

    var usaObject = usa.objects.layer1;
    var topoUsaFeatures = topojson.feature(usa, usaObject);

    var projectionLittle = d3.geo.mercator()
                                .scale(scale)
                                .center(center);

    var path = d3.geo.path()
                      .projection(projectionLittle);
                      svgMap.append("path")
                      .datum(topoUsaFeatures)
                      .attr("d", path);
    });
};
