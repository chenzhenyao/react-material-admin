import React from 'react'
import ReactDOM from 'react-dom'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import Slider from 'material-ui/Slider'
import AvatarEditor from '../../components/react-avatar-editor'

export default class CropBoxExample extends React.Component {
	state = {
		image: '',
		scale: 1
	}
	changeFile = (e) => {
		let reader = new FileReader()
		let file = e.target.files[0]

    if (!file) return;

    reader.onload = (img) => {
    	this.setState({
    		image: img.target.result
    	})
    }
    reader.readAsDataURL(file)
	}
	changeScale = (e, value) => {
		this.setState({
			scale: value
		})
	}
	render() {
		let { image, scale } = this.state
		return (
			<div>
				<input 
					id="upload-portrait"
					style={{ display: 'none'}}
					type="file" 
					accept="image/*"
					onChange={this.changeFile}
				/>
				<label htmlFor="upload-portrait">
					<FlatButton
						icon={
							<AddIcon />
						}
						label="选择图片"
						containerElement="a"
						style={{
							appearance: 'initial'
						}}
					/>
				</label>
				{image && 
					<AvatarEditor
		        image={image}
		        width={160}
		        height={160}
		        border={40}
		        color={[255, 255, 255, 0.6]} // RGBA
		        scale={scale} 
		      />
				}
				<Slider
					min={1}
					max={3}
					value={scale}
					onChange={this.changeScale}
				/>
			</div>
			
		)
	}
}

