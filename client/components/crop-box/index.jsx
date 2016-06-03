import React from 'react'

const maxByAbs = (a, b) => {
	return Math.abs(a) > Math.abs(b) ? a : b
}

export default class CropBox extends React.Component {
	static propTypes = {
		aspectRatio: React.PropTypes.number
	}
	static defaultProps = {
		aspectRatio: 1
	}
	state = {
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		maxWidth: 0,
		maxHeight: 0,
		lastX: 0,
		lastY: 0,
		flag: false,
		type: 'drag'
	}

	componentDidMount() {
		let { left, top, width, height, maxWidth, maxHeight} = this.state
		let { aspectRatio } = this.props

		maxWidth = this.refs.root.clientWidth
		maxHeight = this.refs.root.clientHeight
		width = maxWidth * 0.8
		height = maxHeight * 0.8

		if (aspectRatio) {
			width = Math.min(width, height * aspectRatio)
			height = Math.min(height, width / aspectRatio)
		}

		this.setState({
			left: (maxWidth - width) / 2,
			top: (maxHeight - height) / 2,
			width,
			height,
			maxWidth,
			maxHeight
		})

		document.addEventListener('mousemove', this.onMouseMove)
		document.addEventListener('mouseup', this.onMouseUp)
	}
	componentWillUnmount() {
		document.removeEventListener('mousemove', this.onMouseMove)
		document.removeEventListener('mouseup', this.onMouseUp)
	}

	resetBox = (offsetLeft = 0, offsetTop = 0, offsetWidth = 0, offsetHeight = 0) => {
		let { left, top, width, height, maxWidth, maxHeight } = this.state
		let { aspectRatio } = this.props
		// 待优化
		if (aspectRatio) {
			offsetWidth = maxByAbs(offsetWidth, offsetHeight * aspectRatio)
			offsetHeight = maxByAbs(offsetHeight, offsetWidth / aspectRatio)
		}

		left = left + offsetLeft
		top = top + offsetTop
		width = width + offsetWidth
		height = height + offsetHeight

		if (left < 0 || top < 0 || width < 0 || height < 0) return;
		if (left + width > maxWidth || top + height > maxHeight) return;

		this.setState({
			left,
			top,
			width,
			height,
		})
	}

	onMouseDown = (type, e) => {
		e.preventDefault()
		e.stopPropagation()
		let { left, top, width, height } = this.state
		this.setState({
			lastX: e.clientX,
			lastY: e.clientY,
			flag: true,
			type: type,
		})
	}

	onMouseMove = (e) => {
		let { left, top, width, height, lastX, lastY, flag, type } = this.state
		if (!flag) return;

		this.setState({
			lastX: e.clientX,
			lastY: e.clientY,
		})
		let disX = e.clientX - lastX
		let disY = e.clientY - lastY
		switch (type) {
			case 'drag': //拖拽
				this.resetBox(disX, disY, 0, 0)
				break
			case 'nw': 	//左上
				this.resetBox(disX, disY, -disX, -disY)
				break
			case 'n': 	//上
				this.resetBox(0, disY, 0, -disY)
				break
			case 'ne':  //右上
				this.resetBox(0, disY, disX, -disY)
				break
			case 'e':  //右
				this.resetBox(0, 0, disX, 0)
				break
			case 'se': //右下
				this.resetBox(0, 0, disX, disY)
				break
			case 's':  //下
				this.resetBox(0, 0, 0, disY)
				break
			case 'sw': //左下
				this.resetBox(disX, 0, -disX, disY)
				break
			case 'w':  //左
				this.resetBox(disX, 0, - disX, 0)
				break
		}
	}

	onMouseUp = (e) => {
		this.setState({
			flag: false
		})
	}

	render() {
		const { top, left, width, height } = this.state
		const dotStyle = {
			position: 'absolute',
			width: 4,
			height: 4,
			border: '1px solid #000',
			background: '#fff',
			overflow: 'hidden'
		}
		return (
			<div 
				ref="root"
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
					overflow: 'hidden'
				}}
			>
				<div 
					style={{
						position: 'absolute',
						top: top,
						left: left,
						width: width,
						height: height,
						border: '1px solid #333',
						boxSizing: 'border-box',
						cursor: 'move',
						boxShadow: '0 0 0 500px rgba(0,0,0,.32)'
					}}
					onMouseDown={this.onMouseDown.bind(this, 'drag')}
				>
					<div 
						style={{
							...dotStyle,
							top: -3,
							left: -3,
							cursor: 'nw-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 'nw')}
					/>
					<div 
						style={{
							...dotStyle,
							top: -3,
							left: '50%',
							marginLeft: -3,
							cursor: 'n-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 'n')}
					/>
					<div 
						style={{
							...dotStyle,
							top: -3,
							right: -3,
							cursor: 'ne-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 'ne')}
					/>
					<div 
						style={{
							...dotStyle,
							top: '50%',
							right: -3,
							marginTop: -3,
							cursor: 'e-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 'e')}
					/>
					<div 
						style={{
							...dotStyle,
							right: -3,
							bottom: -3,
							cursor: 'se-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 'se')}
					/>
					<div 
						style={{
							...dotStyle,
							bottom: -3,
							right: '50%',
							marginLeft: -3,
							cursor: 's-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 's')}
					/>
					<div 
						style={{
							...dotStyle,
							left: -3,
							bottom: -3,
							cursor: 'sw-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 'sw')}
					/>
					<div 
						style={{
							...dotStyle,
							top: '50%',
							left: -3,
							marginTop: -3,
							cursor: 'w-resize'
						}}
						onMouseDown={this.onMouseDown.bind(this, 'w')}
					/>
				</div>
			</div>
		)
	}
}