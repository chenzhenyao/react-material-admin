import React from 'react'
import V from 'validator'
import { alert } from '../../components/alarm'

import Checkbox from 'material-ui/lib/checkbox'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Paper from 'material-ui/lib/paper'
import TextField from 'material-ui/lib/TextField'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'

import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import ActionDone from 'material-ui/lib/svg-icons/action/done'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { addTodo, toggleTodo, deleteTodo } from '../../redux/modules/todo'

const styles = {
	root: {
		marginTop: 24,
		paddingBottom: 24,
	},
	ul: {
		padding: '12px 24px',
		margin: 0
	},
	li: {
		position: 'relative',
		padding: '12px 60px 12px 0',
	},
	checkbox: {}
}

const submit = (values, dispatch) => {
	let { todo = '' } = values
	let t = V.isNull(todo) ? '请输入代办事项' : ''

	if (t) return alert(t);
	dispatch(addTodo(todo))
}

class TodoList extends React.Component {
	addTodo = (e) => {
		if (e.keyCode === 13) {
			this.props.handleSubmit(submit)(e)
			this.props.resetForm()
		}
	}
	toggleTodo = (id) => {
		this.props.dispatch(toggleTodo(id))
	}
	deleteTodo = (id) => {
		this.props.dispatch(deleteTodo(id))
	}

	render() {
		const {
			todoList,
			fields: {
				todo
			}
		} = this.props

		return (
			<Paper style={styles.root} zDepth={1}>
				<Toolbar style={{backgroundColor: '#fff', borderBottom: '1px solid rgb(224, 224, 224)'}}>
					<ToolbarTitle text="Todo List" />
					<ToolbarGroup float="right">
						<IconMenu 
							zDepth={2}
							anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      				targetOrigin={{horizontal: 'right', vertical: 'top'}}
      				style={{marginTop: 4}}
							iconButtonElement={
								<IconButton>
									<MoreVertIcon color="rgba(0, 0, 0, 0.45)"/>
								</IconButton>
							}
						>
							<MenuItem primaryText="Refresh" />
							<MenuItem primaryText="Setting" />
						</IconMenu>
					</ToolbarGroup>
				</Toolbar>
				<ul className="list-unstyled" style={styles.ul}>
					{todoList.map((item, index) => {
						return (
							<li style={styles.li} key={index}>
								<Checkbox 
									defaultChecked={item.checked}
									style={styles.checkbox} 
									label={item.label}
									labelStyle={{textDecoration: item.checked ? 'line-through': 'none'}}
									onCheck={this.toggleTodo.bind(null, item.id)}
								/>
								<IconMenu 
									zDepth={2}
									anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		      				targetOrigin={{horizontal: 'right', vertical: 'top'}}
		      				style={{position: 'absolute', top: 0, right: 0}}
									iconButtonElement={
										<IconButton>
											<MoreVertIcon color="rgba(0, 0, 0, 0.45)"/>
										</IconButton>
									}
								>
									<MenuItem primaryText="Delete" onClick={this.deleteTodo.bind(null, item.id)} />
								</IconMenu>
							</li>
						)
					})}
					<div style={{padding: '0 22px 0 40px'}}>
						<TextField 
							refs="todo"
							fullWidth
							hintText="What needs to be done?"
							onKeyDown={this.addTodo} 
							{...todo}
						/>
					</div>
				</ul>
			</Paper>
		);
	}
}

export default TodoList = reduxForm({
		form: 'todos',
		fields: ['todo']
	},
	state => ({
		todoList: state.todo.toJS()
	})
)(TodoList)