/////////////////////////////////////////
// Loaded modules: OptionManager       //
/////////////////////////////////////////

const optionManager = new OptionManager({
  form: document.querySelector('#options-form'),
  default: {
    // 'copy_to_clipboard': true,
    'replace_text': true,
  	'hide_dev': false,
  	// 'notify_when_copied': 'on',
  },
});

optionManager.populate();
