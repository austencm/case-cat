import { config } from './config'
import { I18n } from './utils/i18n'
import { OptionManager } from './utils/option-manager'

const optionManager = new OptionManager(config.defaultOptions)
const i18n = new I18n()
const optionsForm = document.querySelector('[data-js-form]')

async function loadOptions() {
  const options = await optionManager.get()

  setFormData(optionsForm, options)
}

function getFormData(form) {
  const formData = new FormData(form)

  const dataObj = Object.fromEntries(
    Array.from(formData.keys()).map((key) => [
      key,
      form.elements[key].length > 1 ? formData.getAll(key) : formData.get(key),
    ])
  )

  return dataObj
}

function setFormData(form, data) {
  Object.entries(data).forEach(([key, value]) => {
    const input = form.elements[key]

    // Set of checkboxes
    if (input.length) {
      input.forEach((el, i) => (el.checked = value.includes(el.value)))
    }
    // Single checkbox
    else if (input.type === 'checkbox') {
      input.checked = Boolean(value)
    }
    // Other single input
    else {
      input.value = value
    }
  })
}

async function handleOptionsChange(e) {
  const newOptions = {
    replaceSelection: false,
    showTransformGroups: [],
    ...getFormData(e.currentTarget),
  }

  await optionManager.set(newOptions)
}

document.querySelector('[data-js-show-groups]').innerHTML =
  config.transformGroupIds
    .map(
      (id) => `
    <label>
      <input type="checkbox" name="showTransformGroups" value="${id}" /> ${id}
    </label>
  `
    )
    .join('')

i18n.populateText()

loadOptions().then(() =>
  optionsForm.addEventListener('change', handleOptionsChange)
)
