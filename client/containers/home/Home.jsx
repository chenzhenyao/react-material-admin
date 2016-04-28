import './home.css'
import React from 'react'
import BarChart from '../example/BarChart'
import LineChart from '../example/LineChart'
import Tabs from '../example/Tabs'
import TodoList from '../example/TodoList'

export default class Home extends React.Component {
	render() {
		return (
			<div id="f-demo-home">
				<div className="main">
					<TodoList />
					<BarChart />
				</div>
				<div className="left">
					<Tabs />
				</div>
			</div>
		)
	}
}