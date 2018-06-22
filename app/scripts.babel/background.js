const optionManager = new OptionManager({
  default: {
    // 'copy_to_clipboard': true,
    replace_text: 'on',
  	hide_dev: false,
  	// 'notify_when_copied': 'on',
  },
});

function addContextMenus() {
  chrome.contextMenus.removeAll(() => {
  	chrome.contextMenus.create({
  		id: 'case-cat',
  		title: 'Case Cat',
  		contexts: ['selection'],
  	});

  	optionManager.get().then(options => {
  		let lastCategory = '';

  		window.Config.transforms.forEach(transform => {
        const { category } = transform;

  			if (
          options.hide_dev &&
          category &&
          (category === 'developer' || category === 'encode')
        ) {
          return;
        }

  			// Separator
  			if (category && category !== lastCategory) {
  				lastCategory = category;

  				chrome.contextMenus.create({
  					type: 'separator',
  					id: `separator-${lastCategory}`,
  					parentId: 'case-cat',
  					contexts: ['selection'],
  				});
  			}

  			chrome.contextMenus.create({
  				id: transform.id,
  				parentId: 'case-cat',
  				title: transform.title,
  				contexts: ['selection'],
  			});
  		});
  	});
  });
}

function contextItemClicked(event) {
	optionManager.get().then(options => {
		const transform = Config.transforms.find(transform => transform.id === event.menuItemId);
		const transformedText = transform.func(event.selectionText);

		copyToClipboard(transformedText);

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

		if (options.replace_text) {
			pasteInPage({
        text: transformedText,
        editable: event.editable,
      });
    }
	})
}

function pasteInPage({ text, editable = false }) {
	chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { text, editable });
  });
}

function copyToClipboard(text) {
	document.body.appendChild( document.createElement('textarea') )

	const textarea = document.querySelector('textarea');
	textarea.value = text;
	textarea.select();

	document.execCommand('copy');

	textarea.remove();
}

chrome.runtime.onInstalled.addListener(addContextMenus);

chrome.storage.onChanged.addListener(({ options }, namespace) => {
	if (options.newValue && options.newValue.hide_dev !== options.oldValue.hide_dev) {
		addContextMenus();
	}
});

chrome.contextMenus.onClicked.addListener(contextItemClicked);
