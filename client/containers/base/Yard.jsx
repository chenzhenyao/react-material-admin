import './yard.css'
import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

import Nav from './Nav'

import { connect } from 'react-redux'
import { resize, toggleNavOpen } from '../../redux/modules/base'
import { logout } from '../../redux/modules/auth'

function HeadPortrait(src) {
	return (
		<div 
			style={{
				display: 'inline-block',
				padding: 6,
				verticalAlign: 'bottom'
			}}
		>
			<div style={{
				width: 36,
				height: 36,
				borderRadius: '50%',
				background: `url(${src}) no-repeat center center`,
				backgroundSize: 'cover'
			}} />
		</div>
	)
}

@connect(state => ({
	base: state.base.toJS(),
	auth: state.auth.toJS(),
}))
export default class Main extends React.Component {
	static propTypes = {
		children: React.PropTypes.object,
		base: React.PropTypes.object,
		auth: React.PropTypes.object
	}

	state = {}

	resize = () => {
		this.props.dispatch(resize(document.body.offsetWidth || window.innerWidth))
	}
	toggleNavOpen = () => {
		this.props.dispatch(toggleNavOpen())
	}
	logout = () => {
		this.props.dispatch(logout())
	}

	constructor(props) {
		super(props)
	}
	componentDidMount() {
		window.addEventListener('resize', this.resize)
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.resize)
	}
	render() {
		let styles = {
			appBar: {
				position: 'fixed',
				boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
			},
			nav: {
				transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1)',
			},
			content: {}
		}

		let { base = {}, auth = {}, children } = this.props
		let { navOpen, screenWidth } = base
		let { headPortrait } = auth
		let docked = false

		if (screenWidth > 992) {
			docked = true
			styles.nav.zIndex = 1000
			styles.nav.top = 64
			styles.nav.paddingBottom = 64
			styles.nav.boxShadow = 'rgba(0, 0, 0, 0.36) 0px 1px 1px'
			styles.content.marginLeft = 256
		}

		return (
			<div>
				<AppBar 
					style={styles.appBar}
					title="ADMIN" 
					showMenuIconButton={!docked}
					onLeftIconButtonTouchTap={this.toggleNavOpen}
					iconElementRight={
						<div>
							{HeadPortrait(headPortrait)}
							<IconMenu 
								anchorOrigin={{horizontal: 'right', vertical: 'top'}}
	      				targetOrigin={{horizontal: 'right', vertical: 'top'}}
								iconButtonElement={
									<IconButton>
										<MoreVertIcon color="#fff" />
									</IconButton>
								}
							>
								<MenuItem primaryText="退出" onClick={this.logout} />
							</IconMenu>
						</div>
					}					
				/>
				<Drawer
					containerStyle={styles.nav}
					docked={docked}
					open={docked || navOpen}
					onRequestChange={this.toggleNavOpen}
				>
					<Scrollbars
						autoHide
						autoHideTimeout={1000}
						autoHideDuration={200}
					>
						<Nav />
						<Divider />
						<List>
							<Subheader>Help</Subheader>
          		<ListItem primaryText="GitHub" value="https://github.com/callemall/material-ui" />
          	</List>
		      </Scrollbars>
        </Drawer>
				<div id="f-global-content" style={styles.content}>
					{children}
				</div>
			</div>
		)
	}
}