import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
import Slider from 'material-ui/Slider'
import AvatarEditor from 'components/react-avatar-editor'

import { connect } from 'react-redux'
import * as userInfoActions from 'store/modules/user/info'
import * as profileActions from 'store/modules/user/profile'

@connect(
	state => ({
		userInfo: state.user.info.toJS(),
		userProfile: state.user.profile.toJS()
	}),
	{	...userInfoActions, ...profileActions }
)
export default class CropBoxExample extends React.Component {
	static propTypes = {
		userInfo: React.PropTypes.object,
		userProfile: React.PropTypes.object,
		openDialog: React.PropTypes.func,
		closeDialog: React.PropTypes.func,
		setScale: React.PropTypes.func,
		setPicture: React.PropTypes.func,
		uploadProfile: React.PropTypes.func,
	}
	componentWillMount() {
		this.props.getUserInfo()
	}
	handleSliderChange = (e, value) => {
		this.props.setScale(value)
	}
	handleFileChange = (e) => {
		let reader = new FileReader()
		let file = e.target.files[0]
    if (!file) return;

    reader.onload = (img) => this.props.setPicture(img.target.result)
    reader.readAsDataURL(file)
	}
	handleReset = (e) => {
		this.props.setPicture('')
	}
	handleSubmit = (e) => {
		let canvas = this.refs.avatarEditor.getImage()
		canvas.toBlob((blob) => {
			this.props.closeDialog()
			this.props.uploadProfile(blob)
		})
	}

	render() {
		let { profilePicture } = this.props.userInfo
		let { open, scale, picture } = this.props.userProfile
		let { openDialog, closeDialog, setScale } = this.props

		let actions = [
			<FlatButton label="取消" primary onTouchTap={closeDialog} />,
			<FlatButton label="重置" primary onTouchTap={this.handleReset} />,
			<FlatButton label="确认" primary onTouchTap={this.handleSubmit} />
		]
		return (
			<span>
				{ profilePicture && <div 
					style={{
						display: 'inline-block',
						padding: 6,
						verticalAlign: 'bottom',
						cursor: 'pointer'
					}}
					onTouchTap={openDialog}
				>
					<div style={{
						width: 36,
						height: 36,
						borderRadius: '50%',
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundImage: `url(${profilePicture})`
					}} />
				</div> }
				<Dialog
					title="修改头像"
					contentStyle={{maxWidth: 600}}
					autoScrollBodyContent
					actions={actions}
					open={open}
					onRequestClose={closeDialog}
				>	
					<input
						id="upload-portrait"
						style={{ display: 'none'}}
						type="file" 
						accept="image/*"
						onChange={this.handleFileChange}
					/>
					<div style={{
						width: 400,
						height: 400,
						margin: '42px auto',
					}}>
						{picture ? 
							<AvatarEditor
								ref="avatarEditor"
				        image={picture}
				        width={340}
				        height={340}
				        border={30}
				        color={[255, 255, 255, 0.6]} // RGBA 
				        scale={scale}
				        style={{cursor: 'move'}}
				      /> :
				      <label htmlFor="upload-portrait">
				      	<div style={{
				      		boxSizing: 'border-box',
									width: '100%',
									height: '100%',
									border: '2px dashed #00BCD4',
									color: '#00BCD4',
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
			  					alignItems: 'center'
								}}>
				      		<UploadIcon color="#00BCD4" /> 上传图片
				      	</div>
				      </label>
						}
					</div>
					<Slider
						style={{
							width: 400,
							margin: '24px auto'
						}}
						min={1}
						max={3}
						value={scale}
						onChange={this.handleSliderChange}
					/>
				</Dialog>
			</span>
		)
	}
}

