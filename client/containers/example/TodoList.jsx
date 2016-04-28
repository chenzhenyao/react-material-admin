import React from 'react'
import {
	Paper,
	Toolbar,
	ToolbarTitle,
	ToolbarGroup,
	IconMenu,
	IconButton,
	MenuItem,
	Checkbox,
	FloatingActionButton,
	TextField,
} from 'material-ui'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import ActionDone from 'material-ui/lib/svg-icons/action/done'

export default class TodoList extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		todoList: [{
			checked: false,
			label: 'Utility library delivering modularity, performance, & extras.'
		}, {
			checked: false,
			label: 'Unlike Git, which is strictly a command-line tool'
		}, {
			checked: true,
			label: 'Did he who made the Lamb make thee?'
		}, {
			checked: true,
			label: 'Avoid loud and aggressive persons,they are vexations to the spirit.'
		}, {
			checked: false,
			label: 'A starter boilerplate for a universal webapp using express, react, redux, webpack, and react-transform'
		}, {
			checked: false,
			label: 'It doesn\'t interest me who you know or how you came to be here.'
		}],
	}
	
	render() {
		let styles = {
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
			checkbox: {
			}
		}
		let { todoList = [] } = this.state
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
									<MenuItem primaryText="Delete" />
								</IconMenu>
							</li>
						)
					})}
					<div style={{padding: '0 22px 0 40px'}}>
						<TextField 
							fullWidth
							hintText="What needs to be done?"
						/>
					</div>
				</ul>
			</Paper>
		);
	}
}