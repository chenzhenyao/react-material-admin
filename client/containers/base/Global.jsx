import React from 'react'
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import MyRawTheme from './nd.theme'

@ThemeDecorator(ThemeManager.getMuiTheme(MyRawTheme))
export default class Global extends React.Component {
	render() {
		return <div>{this.props.children}</div>
	}
}
