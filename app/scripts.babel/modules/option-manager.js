/**
 * Wrapper around the storage API for easy storing/retrieving of option data
 * Handles defaults based on a configuration object initially provided
 * Stores data under the key 'options'
 */
class OptionManager {
  /**
   * @param {Object} defaults
   */
	constructor({ defaults = {}, form = null }) {
    this.form = form;
		this.defaults = defaults;
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.populate = this.populate.bind(this);
    this.extract = this.extract.bind(this);

    if (this.form) {
      this.form.addEventListener('change', () => {
        const newOptions = this.extract();
        this.set(newOptions);
      });
    }
	}

  /**
   * Retreive all options
   * @return {Promise} Contains options object on resolve
   */
	get() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get({ options: this.defaults }, items => resolve(items.options));
    });
  }

  /**
   * Set options
   * @param {Object} options Key-value pairs of options to set
   * @return {Promise}
   */
  set(options) {
  	return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ options }, resolve);
    });
  }

  populate() {
    this.get().then(options => {
      this.form
        .querySelectorAll('input')
        .forEach(field => {
          if (!options.hasOwnProperty(field.name)) return;

          const val = options[field.name];

          field.type === 'radio' || field.type === 'checkbox'
            ? field.checked = field.value === val
            : field.value = val;
        });
    });
  }

  extract() {
    const data = {};
    // Extract form data
    Array
      .from((new FormData(this.form)).entries())
      .forEach(([name, val]) => data[name] = val);

    return data;
  }
}
