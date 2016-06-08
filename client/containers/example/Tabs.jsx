import './tabs.css'
import React from 'react'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import { Tab, Tabs } from 'material-ui/Tabs'

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
}, {
	logo: '/img/label.png',
	title: 'Bable',
	content: 'Babel is a compiler for writing next generation JavaScript.'
}, {
	logo: '/img/normalize.png',
	title: 'normalize.css',
	content: 'A modern alternative to CSS resets'
}, {
	logo: '/img/gulp.png',
	title: 'Gulp.js',
	content: 'The streaming build system'
}, {
	logo: '/img/bootstrap.png',
	title: 'Bootstrap.js',
	content: 'The most popular HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.'
}, {
	logo: '/img/d3.png',
	title: 'D3.js',
	content: 'A JavaScript library for manipulating documents based on data'
}, {
	logo: '/img/material-ui.png',
	title: 'Material ui',
	content: 'React Component that Implement Google\'s Material Design'
}, {
	logo: '/img/react.png',
	title: 'React',
	content: 'A JavaScript library for building user interfaces'
}, {
	logo: '/img/express.png',
	title: 'Express',
	content: 'Fast, unopinionated, minimalist web framework for Node.js'
}]

export default class UserList extends React.Component {
	render() {
		return (
			<Paper className="f-example-tabs" zDepth={1}>
				<Toolbar style={{backgroundColor: '#fff', borderBottom: '1px solid #EBEBEB'}}>
					<ToolbarTitle text="Dependencies" />
				</Toolbar>
				<Tabs>
					<Tab label="Develop">
						<ul className="list-unstyled user-list-wrap">
							{dependencies.map((item, index) => {
								return (
									<li key={index}>
										<header style={{backgroundImage: `url(${item.logo})`}} />
										<section>
											<div className="title text-ellipsis">{item.title}</div>
											<p className="text-ellipsis">{item.content}</p>
										</section>
									</li>
								)
							})}
						</ul>
					</Tab>
					<Tab label="Production">
					</Tab>
				</Tabs>
			</Paper>
		);
	}
}