'use strict'

const DEFAULTS = {
	// copy_to_clipboard: 'on',
	// notify_when_copied: 'on',
	replace_text: 'on',
	hide_dev: false
}

function getOptions(defaults = {}) {
	return new Promise( (resolve, reject) => {
		chrome.storage.sync.get(DEFAULTS, (options) => {
			resolve(options)
		})
	})
}

function addContextMenus() {
	chrome.contextMenus.create({
		id: 'case-cat',
		title: 'Case Cat',
		contexts: ['selection']
	})

	getOptions().then( (options) => {
		let currentCategory = ''

		_.each(Config.transforms, (transform) => {
			if (options.hide_dev && transform.category && transform.category === 'developer')
				return

			// Separator
			if (transform.category && transform.category !== currentCategory) {
				currentCategory = transform.category

				chrome.contextMenus.create({
					type: 'separator',
					id: `separator-${currentCategory}`,
					parentId: 'case-cat',
					contexts: ['selection']
				})
			}

			chrome.contextMenus.create({
				id: transform.id,
				parentId: 'case-cat',
				title: transform.title,
				contexts: ['selection']
			})
		})
	})
}

function contextItemClicked(event) {

	getOptions().then( (options) => {
		let transform = _.findWhere(Config.transforms, { id: event.menuItemId }),
				transformedText = transform.func(event.selectionText)

		copyToClipboard(transformedText)

		// if (options.copy_to_clipboard) {
		// 	copyToClipboard(transformedText)

			// NOTIFICATIONS
			//
			// if (options.notify_when_copied) {
			// 	chrome.notifications.create('textCopied', {
			// 		type: 'basic',
			// 		iconUrl: 'images/icon-128.png',
			// 		title: 'Text copied to clipboard',
			// 		message: `${transformedText}`,
			// 		buttons: [{
			// 			title: 'I know, you can stop telling me!'
			// 		}]
			// 	})

			// 	chrome.notifications.onButtonClicked.addListener( (notificationId, buttonIndex) => {
			// 		if (notificationId === 'textCopied') {
			// 			chrome.notifications.clear(notificationId)
			// 			chrome.storage.sync.set({ notify_when_copied: false })
			// 		}
			// 	})
			// }
		// }

		if (options.replace_text && event.editable)
			pasteInPage()
	})
}

function pasteInPage() {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {})
  })
}

function copyToClipboard(text) {
	document.body.appendChild( document.createElement('textarea') )

	let textarea = document.querySelector('textarea')
	textarea.value = text
	textarea.select()

	document.execCommand('copy')

	textarea.remove()
}

chrome.runtime.onInstalled.addListener( addContextMenus )

chrome.storage.onChanged.addListener( (changes, namespace) => {
	if ( Object.keys(changes).includes('hide_dev') ) {
		chrome.contextMenus.removeAll( addContextMenus )
	}
})

chrome.contextMenus.onClicked.addListener( contextItemClicked )