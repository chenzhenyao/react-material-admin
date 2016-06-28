import React from 'react'
import V from 'validator'
import { alert } from 'components/alarm'
import Checkbox from 'material-ui/Checkbox'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionDone from 'material-ui/svg-icons/action/done'

import { reduxForm } from 'redux-form'
import * as todoActions from 'store/modules/example/todo'

const styles = {
	root: {
		marginTop: 24,
		paddingBottom: 24,
	},
	toolbar: {
		backgroundColor: '#fff', 
		borderBottom: '1px solid rgb(224, 224, 224)'
	},
	ul: {
		padding: '12px 24px',
		margin: 0
	},
	li: {
		position: 'relative',
		padding: '12px 48px 12px 0',
	}
}

class TodoList extends React.Component {
	submit = (values) => {
		let { todo = '' } = values
		let t = V.isNull(todo) ? '请输入代办事项' : ''

		if (t) return alert(t);
		this.props.addTodo(todo)
	}
	addTodo = (e) => {
		if (e.keyCode === 13) {
			this.props.handleSubmit(this.submit)(e)
			this.props.resetForm()
		}
	}
	render() {
		const {
			fields: {
				todo
			},
			todoList,
			toggleTodo,
			deleteTodo
		} = this.props

		return (
			<Paper style={styles.root} zDepth={1}>
				<Toolbar style={styles.toolbar}>
					<ToolbarTitle text="Todo List" />
					<ToolbarGroup float="right">
						<IconMenu 
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
									label={item.label}
									labelStyle={{textDecoration: item.checked ? 'line-through': 'none'}}
									onCheck={toggleTodo.bind(null, item.id)}
								/>
								<IconMenu 
									anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		      				targetOrigin={{horizontal: 'right', vertical: 'top'}}
		      				style={{position: 'absolute', top: 0, right: 0}}
									iconButtonElement={
										<IconButton>
											<MoreVertIcon color="rgba(0, 0, 0, 0.45)"/>
										</IconButton>
									}
								>
									<MenuItem primaryText="Delete" onClick={deleteTodo.bind(null, item.id)} />
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
}, state => ({
	todoList: state.example.todo.toJS()
}), {
	...todoActions
})(TodoList)