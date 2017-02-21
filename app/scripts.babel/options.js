'use strict'

const DEFAULTS = {
	// 'copy_to_clipboard': 'on',
	// 'notify_when_copied': 'on',
	'replace_text': 'on',
	'hide_dev': false
}

function formToObj(form) {
	let obj = {},
			entries = ( new FormData(form) ).entries()

	for (let entry of entries) {
		console.log(entry)
		let name = entry[0],
				val = entry[1]

		if ( obj[name] ) {
			if (typeof obj[name] !== 'array')
				obj[name] = [ obj[name] ]
			obj[name].push(val)
		}
		else {
			obj[name] = val
		}
	}

	return obj;
}

function each(obj, iteratee) {
	let keys = Object.keys(obj)
	for (let key of keys) {
		iteratee(obj[key], key)
	}
}

function saveOptions() {
  let options = formToObj( document.querySelector('#options') )
  each(DEFAULTS, (val, key) => {
  	options[key] = options[key] || false
  })

  chrome.storage.sync.set(options)
}

function restoreOptions() {
  chrome.storage.sync.get(DEFAULTS, (items) => {
  	each(items, (val, name) => {
  		let input = document.querySelector(`input[name="${name}"]`)

  		if (input.type === 'checkbox')
  			input.checked = (val === 'on')
  		else
  			input.value = val
  	})
  })
}


document.addEventListener('DOMContentLoaded', () => {
	let checkboxes = document.querySelectorAll('input')

	Array.from(checkboxes).forEach( (checkbox) => {
	  checkbox.addEventListener('click', saveOptions)
	})
})


restoreOptions()
