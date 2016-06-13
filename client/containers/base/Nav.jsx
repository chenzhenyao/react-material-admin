import React from 'react'
import { List, ListItem, MakeSelectable } from 'material-ui/List'

import { connect } from 'react-redux'
import { closeNav } from '../../redux/modules/base'
import { push } from 'react-router-redux'

let SelectableList = MakeSelectable(List)

const navItems = [{
	text: 'Charts',
	children: [{
		text: 'Bar Chart',
	}, {
		text: 'Line Chart',
	}, {
		text: 'Pie Chart',
	}, {
		text: 'Area Chart',
	}]
}, {
	text: 'Core',
	children: [{
		text: 'Selections',
	}, {
		text: 'Transitions',
	}, {
		text: 'Working with Arrays',
	}, {
		text: 'Math',
	}]
}, {
	text: 'Scales',
	children: [{
		text: 'linear scale',
	}, {
		text: 'quantize scale',
	}]
}, {
	text: 'Home',
	value: '/'
}, {
	text: 'Bar Chart',
	value: '/example/bar-chart'
}, {
	text: 'List Chart',
	value: '/example/line-chart'
}, {
	text: 'List',
	value: '/example/list'
}, {
	text: 'Tabs',
	value: '/example/tabs'
},{
	text: 'Todo List',
	value: '/example/todo-list'
}]

@connect(state => ({
	route: state.route,
}))
export default class Nav extends React.Component {
	handleRequestChangeList = (event, value = '/') => {
		this.props.dispatch(push(value))
		this.props.dispatch(closeNav())
	}

	renderNav = (navItems) => {
		return navItems.map((item, index) => {
			let { text = '', value = '', children = [] } = item
			return children.length ? (
				<ListItem
					key={index}
	        primaryText={text}
	        primaryTogglesNestedList={true}
	        nestedItems={this.renderNav(children)}
	      />
			) : (
				<ListItem 
					key={index} 
					primaryText={text}
					value={value}
				/>
			)
		})
	}

	render() {
		let { route = {} } = this.props
		console.log(route)
		return (
			<SelectableList 
				value={route.location.pathname}
				onChange={this.handleRequestChangeList}
				selectedItemStyle={{
					backgroundColor: 'rgba(0,0,0,0.2)',
					color: 'rgb(255, 64, 129)'
				}}
			>
				{this.renderNav(navItems)}
			</SelectableList >
		)
	}
}
