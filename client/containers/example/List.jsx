import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import ContentAdd from 'material-ui/svg-icons/content/add'

let dependencies = [{
	logo: '/img/stylus.png',
	title: 'stylus',
	content: 'Expressive, robust, feature-rich CSS language built for nodejs'
}, {
	logo: '/img/grunt.png',
	title: 'Grunt',
	content: 'The JavaScript Task Runner'
}, {
	logo: '/img/pm2.png',
	title: 'pm2',
	content: 'Production process manager for Node.js apps with a built-in load balancer'
}, {
	logo: '/img/webpack.png',
	title: 'webpack',
	content: 'A bundler for javascript and friends.'
}]

let styles = {
	li: {
		position: 'relative',
		minHeight: 72,
		borderBottom: '1px solid rgb(224, 224, 224)',
	}
}

export default class List extends React.Component {
	render() {
		return (
			<div style={{maxWidth: 1300}}>
				<Toolbar style={{
					position: 'relative',
					marginTop: 24,
					backgroundColor: 'initial',
					borderBottom: '1px solid rgb(224, 224, 224)',
				}}>
					<ToolbarTitle text="服务器管理" />
					<ToolbarGroup float="right" style={{
						position: 'absolute',
						top: 27,
						right: 20,
						zIndex: 1,
					}}>
						<FloatingActionButton secondary={true}>
			      <ContentAdd />
			    </FloatingActionButton>
					</ToolbarGroup>
				</Toolbar>
				<Table selectable={false}>
					<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn style={{width: 36}}>编号</TableHeaderColumn>
							<TableHeaderColumn>服务器名</TableHeaderColumn>
							<TableHeaderColumn>描述</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false}>
						{dependencies.map((item, index) => {
							return (
								<TableRow key={index}>
					        <TableRowColumn style={{width: 36}}>{index}</TableRowColumn>
					        <TableRowColumn>{item.title}</TableRowColumn>
					        <TableRowColumn>{item.content}</TableRowColumn>
					        <TableRowColumn>
										<IconMenu 
											anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				      				targetOrigin={{horizontal: 'right', vertical: 'top'}}
											iconButtonElement={
												<IconButton>
													<MoreVertIcon color="rgba(0, 0, 0, 0.45)"/>
												</IconButton>
											}
										>
											<MenuItem primaryText="修改" />
											<MenuItem primaryText="删除" />
										</IconMenu>
					        </TableRowColumn>
					      </TableRow>
							)
						})}
					</TableBody>
				</Table>
				<div style={{marginTop: 12, textAlign: 'right'}}>
					<FlatButton label="上一页" style={{marginRight: 16}} disabled />
					<FlatButton label="下一页" />
				</div>
			</div>
		);
	}
}