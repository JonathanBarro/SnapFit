import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Grafica = () => {
    const ref = useRef(); // Use useRef to reference the SVG container

    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const svg = d3.select(ref.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv", function(d) {
            return { date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value };
        }).then(data => {
            const x = d3.scaleTime()
                .domain(d3.extent(data, d => d.date))
                .range([ 0, width ]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            const y = d3.scaleLinear()
                .domain([8000, 9200])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "#69b3a2")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))
                );

            svg.append("g")
                .selectAll("dot")
                .data(data)
                .join("circle")
                .attr("cx", d => x(d.date))
                .attr("cy", d => y(d.value))
                .attr("r", 5)
                .attr("fill", "#69b3a2");
        });

        return () => {
            d3.select(ref.current).select("svg").remove();
        };
    }, []);

    return (
        <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '100%', maxWidth: '500px' }}> {/* Adjusted to make the SVG responsive and centered */}
                {/* SVG is appended here by D3 */}
            </div>
        </div>
    );
};

export default Grafica;
