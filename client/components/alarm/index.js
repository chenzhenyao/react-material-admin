var alarm = function() {
	// initialize
	var rootEl = document.createElement('div');
	rootEl.style.position = 'fixed';
	rootEl.style.right = '0';
	rootEl.style.bottom = '0';
	rootEl.style.left = '0';
	rootEl.style.display = 'flex';
	rootEl.style.zIndex = '9999';
	rootEl.style.transform = 'translate3d(0px, 100%, 0px)';
	rootEl.style.transition = 'all 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';

	var wrapEl = document.createElement('div');
	wrapEl.style.boxSizing = 'border-box';
	wrapEl.style.padding = '12px 24px';
	wrapEl.style.width = '100%';
	wrapEl.style.minHeight = '48px';
	wrapEl.style.textAlign = 'center';
	wrapEl.style.backgroundColor = 'rgba(0, 0, 0, 0.870588)';
	
	var textEl = document.createElement('span');
	textEl.style.color = 'rgb(255, 255, 255)';
	textEl.style.fontSize = '14px';
	textEl.style.lineHeight = '1.7';
	
	wrapEl.appendChild(textEl);
	rootEl.appendChild(wrapEl);
	document.body.appendChild(rootEl);

	function clickAway() {
		if (!rootEl.locked) {
			rootEl.style.transform = 'translate3d(0px, 100%, 0px)';
		}
	}
	
	window.addEventListener('mouseup', clickAway);
	window.addEventListener('touchend', clickAway);		
	
	function alert(message) {
		textEl.innerHTML = message;
		rootEl.style.transform = 'translate3d(0px, 0px, 0px)';
		rootEl.locked = true		
		setTimeout(function() {
			rootEl.locked = false
		}, 400)
	}

	return {
		alert: alert,
	}
}();

if (typeof module !== 'undefined' && module) {
  module.exports = alarm;
}