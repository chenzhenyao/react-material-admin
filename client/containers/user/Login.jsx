import React from 'react'
import V from 'validator'
import LinkedStateMixin from 'react/lib/LinkedStateMixin'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { alert } from 'components/alarm'
import Password from 'components/password'

import { reduxForm } from 'redux-form'
import * as authActions from 'store/modules/user/auth'

const styles = {
	paper: {
		maxWidth: 360,
		padding: '112px 48px 64px',
		margin: '180px auto',
		background: 'url(/img/logo-nd.png) no-repeat center 40px',
		backgroundSize: 48,
	},
	submitBtn: {
		width: '100%', 
		margin: '24px 0 16px'
	}
}

class Login extends React.Component {
	static propTypes = {
		login: React.PropTypes.func
	}
	submit = (values) => {
		let {
			userName = '', 
			password = ''
		} = values
		
		let t = V.isNull(userName) ? '请输入账号' :
			V.isNull(password) ? '请输入密码' : ''

		if (t) return alert(t);
		this.props.login(values)
	}
  render() {
		const {
			fields: {
				userName,
				password
			},
			handleSubmit
		} = this.props
		
    return (
			<Paper style={styles.paper} zDepth={3}>
				<form onSubmit={handleSubmit(this.submit)}>
					<TextField
						floatingLabelText="账号"
						hintText="账号" 
						fullWidth 
						{...userName}
					/>
					<Password
	          floatingLabelText="密码" 
	          hintText="密码"
						fullWidth
						{...password}
					/>
	        <RaisedButton 
						label="登录"  
						secondary
						fullWidth
						style={styles.submitBtn} 
						type="submit" 
					/>
				</form>
			</Paper>
    );
  }
}

export default Login = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
	form: 'login', // a unique name for this form
	fields: ['userName', 'password'], // all the fields in your form
}, null, {
	...authActions
})(Login)