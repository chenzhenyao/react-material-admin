import React from 'react'
import CropBox from '../../components/crop-box'

const styles = {
	root: {
		width: 480,
		height: 640,
		margin: 48,
		background: 'url(/img/head-portrait.jpg) center center no-repeat'
	}
}

export default class CropBoxExample extends React.Component {
	render() {
		return (
			<div style={styles.root}>
				<CropBox aspectRatio={1.2} />
			</div>
		)
	}
}