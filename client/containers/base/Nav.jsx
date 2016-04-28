import React from 'react'

import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance'

import { connect } from 'react-redux'
import { closeNav } from '../../redux/modules/base'
import { push } from 'react-router-redux'

const SelectableList = SelectableContainerEnhance(List)

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
	text: 'List',
	value: '/list'
},{
	text: 'Bar Chart'
}, {
	text: 'Line Chart'
}, {
	text: 'Pie Chart'
}, {
	text: 'Area Chart'
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
		return (
			<SelectableList
				valueLink={{
					value: route.location.pathname,
					requestChange: this.handleRequestChangeList
				}}
				selectedItemStyle={{
					backgroundColor: 'rgba(0,0,0,0.2)',
					color: 'rgb(255, 64, 129)'
				}}
			>
				{this.renderNav(navItems)}
			</SelectableList>
		)
	}
}
