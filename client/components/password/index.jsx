import React from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import ActionVisibility from 'material-ui/svg-icons/action/visibility'
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off'

export default class Password extends React.Component {
	state = {
		eyeable: false
	}
	toggleEyeable = () => {
		this.setState({eyeable: !this.state.eyeable})
	}
	
	render() {
		let { fullWidth = false, ...other } = this.props
		let styles = {
			root: {
				position: 'relative',
				width: fullWidth ? '100%' : 256
			},
			icon: {
				position: 'absolute',
				right: 0,
				bottom: 0,
			}
		}
		return (
			<div style={styles.root}>
				<TextField
					{...other}
					fullWidth
					type={this.state.eyeable ? 'text' : 'password'}
				/>
				<IconButton style={styles.icon} onClick={this.toggleEyeable}>
					{this.state.eyeable ? <ActionVisibilityOff color="#757575" /> : <ActionVisibility color="#757575" />}
				</IconButton>
			</div>
		);
	}
}