import { upperCaseFirst } from 'change-case-all'
import { config } from './config'
import { transforms } from './transforms'
import { OptionManager } from './utils/option-manager'

const optionManager = new OptionManager(config.defaultOptions)

function addContextMenu() {
  chrome.contextMenus.removeAll(async () => {
    chrome.contextMenus.create({
      id: config.contextMenuId,
      title: 'Transform Text',
      contexts: ['selection'],
    })

    const options = await optionManager.get()

    let lastGroup = ''

    transforms.forEach(({ name, group }) => {
      if (!options.showTransformGroups.includes(group)) {
        return
      }

      // Separator
      if (group !== lastGroup) {
        if (lastGroup) {
          chrome.contextMenus.create({
            type: 'separator',
            id: group,
            parentId: config.contextMenuId,
            contexts: ['selection'],
          })
        }

        chrome.contextMenus.create({
          id: `${group}-title`,
          parentId: config.contextMenuId,
          title: upperCaseFirst(group),
          contexts: ['selection'],
          enabled: false,
        })

        lastGroup = group
      }

      chrome.contextMenus.create({
        id: name,
        parentId: config.contextMenuId,
        title: name,
        contexts: ['selection'],
      })
    })
  })
}

async function onContextItemClick(event) {
  const options = await optionManager.get()

  const transform = transforms.find(
    (transform) => transform.name === event.menuItemId
  )

  const transformedText = transform.func(event.selectionText)

  // IDEA: notifications
  //
  // if (options.notifyWhenCopied) {
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

  const [activeTab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  })

  chrome.scripting.executeScript({
    target: { tabId: activeTab.id },
    func: copyAndPaste,
    args: [transformedText, event.editable, options],
  })
}

async function copyAndPaste(text, editable, options) {
  await window.navigator.clipboard.writeText(text)

  if (options.replaceSelection) {
    if (editable) {
      document.execCommand('paste')
    } else {
      const selection = window.getSelection()

      if (selection.rangeCount) {
        const range = selection.getRangeAt(0)

        range.deleteContents()
        range.insertNode(document.createTextNode(text))
      }
    }
  }
}

chrome.runtime.onInstalled.addListener(addContextMenu)
chrome.runtime.onStartup.addListener(addContextMenu)

// Update context menu when transform group option is changed
chrome.storage.onChanged.addListener(({ options }) => {
  if (
    options.newValue.showTransformGroups.join() !==
    options.oldValue.showTransformGroups.join()
  ) {
    addContextMenu()
  }
})

chrome.contextMenus.onClicked.addListener(onContextItemClick)
