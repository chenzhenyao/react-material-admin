import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import ndTheme from './nd.theme'

const theme = getMuiTheme(ndTheme)

export default class Global extends React.Component {
	render() {
		return (
			<MuiThemeProvider muiTheme={theme}>
				{this.props.children}
			</MuiThemeProvider>
		)
	}
}
