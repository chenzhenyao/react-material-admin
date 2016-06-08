import './lineChart.css'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import d3 from 'd3'

export default class LineChart extends React.Component {
	render() {
		let width = 1000
		let height= 300
		let margin = {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		}
		let viewBox = {
			x: - margin.left,
			y: - margin.top - height,
			width: margin.left + width + margin.right,
			height: margin.top + height + margin.bottom,
		}

		let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		let data = [21, 18, 23, 20, 22, 20, 26, 22]
		let data1 = [16, 19, 19, 17, 19, 16, 18, 19]


		let weekScale = d3.scale.ordinal().domain(week).rangeBands([0, width])

		function createPath (data = []) {
			let xScale = d3.scale.linear().domain([0, data.length - 1]).range([0, width])
			let yScale = d3.scale.linear().domain([15, 30]).range([height * 0.1, height * 0.6])
			let d = data.map((item, index) => {
				return `L${xScale(index)} ${-yScale(item)}`
			})
			return `${d.toString().replace('L', 'M')},V0,H0,Z`
		}

		window.d3 = d3
		return (
			<Paper className="f-example-line-chart" zDepth={0}>
				<Toolbar style={{backgroundColor: '#fff', borderBottom: '1px solid rgb(224, 224, 224)'}}>
					<ToolbarTitle text="Line Chart" />
				</Toolbar>
				<div className="line-chart-wrap">
					<svg viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}>
						<defs>
							<filter id="rectShadow">
								<feGaussianBlur stdDeviation="5"/>
							</filter>
						</defs>
						<path d={createPath(data)}/>
						<g>
							{week.map((item, index) => {
								return (
									<g transform={`translate(${weekScale(item)}, 0)`} key={index}>
										<rect y={-height} width={weekScale.rangeBand()} height={height} filter="url(#rectShadow)" />
										<text y={- height} x="12" dy="1.7em" fill="#878787">{week[index]}</text>
									</g>
								)
							})}
						</g>
					</svg>
				</div>
			</Paper>
		);
	}
}