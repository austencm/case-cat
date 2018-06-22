/////////////////////////////////////////
// Loaded modules: OptionManager       //
/////////////////////////////////////////

const optionManager = new OptionManager({
  form: document.querySelector('#options-form'),
  default: {
    'replace_text': 'on',
  	'hide_dev': false,
    // 'copy_to_clipboard': 'on',
  	// 'notify_when_copied': 'on',
  },
});

optionManager.populate();
