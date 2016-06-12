import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import UploadIcon from 'material-ui/svg-icons/file/file-upload'
import Slider from 'material-ui/Slider'
import AvatarEditor from '../../components/react-avatar-editor'

export default class CropBoxExample extends React.Component {
	static propTypes = {
		image: React.PropTypes.string
	}
	static defaultProps = {
		image: ''
	}
	state = {
		open: false,
		file: '',
		scale: 1
	}

	open = () => this.setState({open: true})
	close = () => this.setState({open: false})
	reset = () => this.setState({file: ''})
	changeScale = (e, value) => this.setState({scale: value})
	changeFile = (e) => {
		let reader = new FileReader()
		let file = e.target.files[0]

    if (!file) return;

    reader.onload = (img) => {
    	this.setState({
    		file: img.target.result
    	})
    }
    reader.readAsDataURL(file)
	}
	upload = (e) => {
		let canvas = this.refs.avatarEditor.getImage()
		canvas.toBlob((blob) => {
			console.log(blob)
			console.log(arguments)
		})
	}

	render() {
		let { image } = this.props
		let { open, file, scale } = this.state
		let actions = [
			<FlatButton label="取消" primary onTouchTap={this.close} />,
			<FlatButton label="重置" primary onTouchTap={this.reset} />,
			<FlatButton label="确认" primary onTouchTap={this.upload} />
		]
		return (
			<span>
				<div 
					style={{
						display: 'inline-block',
						padding: 6,
						verticalAlign: 'bottom',
						cursor: 'pointer'
					}}
					onTouchTap={this.open}
				>
					<div style={{
						width: 36,
						height: 36,
						borderRadius: '50%',
						background: `url(${image}) no-repeat center center`,
						backgroundSize: 'cover'
					}} />
				</div>
				<Dialog
					title="修改头像"
					contentStyle={{maxWidth: 600}}
					autoScrollBodyContent
					actions={actions}
					open={open}
					onRequestClose={this.close}
				>	
					<input
						id="upload-portrait"
						style={{ display: 'none'}}
						type="file" 
						accept="image/*"
						onChange={this.changeFile}
					/>
					<div style={{
						width: 400,
						height: 400,
						margin: '42px auto',
					}}>
						{file ? 
							<AvatarEditor
								ref="avatarEditor"
				        image={file}
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
						onChange={this.changeScale}
					/>
				</Dialog>
			</span>
		)
	}
}

