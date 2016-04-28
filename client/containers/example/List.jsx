import React from 'react'
import Toolbar from 'material-ui/lib/toolbar/toolbar'
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title'
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group'
import RaisedButton from 'material-ui/lib/raised-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FlatButton from 'material-ui/lib/raised-button'
import IconButton from 'material-ui/lib/icon-button'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'
import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'

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