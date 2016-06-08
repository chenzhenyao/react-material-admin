import './barChart.css'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import d3 from 'd3'

export default class Home extends React.Component {
	render() {
		let width = 1200
		let	height = 420
		let m = {
			top: 60,
			right: 50,
			bottom: 30,
			left: 120,
			offsetTop: 40,
		}
		
		let x = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		let y = [0, 20, 40, 60, 80, 100]

		let xScale = d3.scale.ordinal().domain(x).rangePoints([0, width - m.right - m.left])
		let yScale = d3.scale.linear().domain([0, 100]).range([0, height - m.top - m.bottom - m.offsetTop])

		let data = [50, 88, 60, 40, 20, 24, 16, 8, 25, 32, 36, 48]
		
		return (
			<Paper className="f-example-bar-chart" zDepth={1}>
				<Toolbar style={{backgroundColor: '#fff', borderBottom: '1px solid rgb(224, 224, 224)'}}>
					<ToolbarTitle text="Bar Chart" />
				</Toolbar>
				<div className="bar-chart-wrap">
					<svg viewBox={`0, 0, ${width}, ${height}`}>
						<g transform={`translate(0, ${m.top})`}>
							<line x1="0" x2={width} strokeWidth="1" strokeDasharray="7,3" />
							<g transform={`translate(${m.left * 0.5}, ${m.offsetTop})`}>
								{y.map((item, index) => {
									return (
										<g transform={`translate(0, ${height - m.top - m.bottom - m.offsetTop - yScale(item)})`} key={index}>
											<text textAnchor="middle">{y[index]}</text>
										</g>
									)
								})}
							</g>
						</g>
						<g transform={`translate(${m.left}, ${m.top})`}>
							{xScale.range().map((item, index) => {
								let h = yScale(data[index])
								return (
									<g className="bar" transform={`translate(${item}, 0)`} key={index}>
										<text y="-1.5em" textAnchor="middle">{x[index]}</text>
										<circle r="3" />
										<line y1="24" y2={height - m.top - m.bottom - h - 24} strokeWidth="1" />
										<rect x="-16" width="32" y={height - m.top - m.bottom - h} height={h} />
									</g>
								)
							})}
						</g>
					</svg>
				</div>
			</Paper>
		)
	}
}