import React from 'react'
import V from 'validator'
import LinkedStateMixin from 'react/lib/LinkedStateMixin'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { alert } from 'components/alarm'
import Password from 'components/password'

import { reduxForm } from 'redux-form'
import { login } from 'store/modules/user/auth'

const styles = {
	paper: {
		maxWidth: 360,
		padding: '112px 48px 64px',
		margin: '180px auto',
		background: 'url(/img/logo-nd.png) no-repeat center 40px',
		backgroundSize: 48,
	}
}

const submit = (values, dispatch) => {
	let {
		userName = '', password = ''
	} = values
	
	let t = V.isNull(userName) ? '请输入账号' :
		V.isNull(password) ? '请输入密码' : ''

	if (t) return alert(t);
	dispatch(login(values))
}

class Login extends React.Component {
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
				<form onSubmit={handleSubmit(submit)}>
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
						style={{width: '100%', margin: '24px 0 16px'}} 
						type="submit" 
					/>
				</form>
			</Paper>
    );
  }
}

export default Login = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'login',                           // a unique name for this form
  fields: ['userName', 'password'], // all the fields in your form
})(Login)