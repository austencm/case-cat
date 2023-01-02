/**
 * Wrapper around the storage API for easy storing/retrieving of option data
 * Handles defaults based on a configuration object initially provided
 * Stores data under the key 'options'
 */
export class OptionManager {
  /**
   * @param  {Object} defaults
   */
  constructor(defaults) {
    this.defaults = defaults
    this.get = this.get.bind(this)
  }

  /**
   * Retreive all options
   */
  async get() {
    const { options } = await chrome.storage.sync.get({
      options: this.defaults,
    })

    return options
  }

  /**
   * Set options
   */
  async set(options) {
    return chrome.storage.sync.set({ options })
  }
}
