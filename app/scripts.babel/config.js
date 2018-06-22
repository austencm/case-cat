window.Config = {
	transforms: [
		{
			id: 'sentence',
			title: 'Sentence',
			func: text => Case.sentence(text).replace(/\bi\b/g, 'I'),
		}, {
			id: 'title',
			title: 'Title',
			func: Case.title
		}, {
			id: 'upper',
			title: 'Upper',
			func: Case.upper
		}, {
			id: 'lower',
			title: 'Lower',
			func: Case.lower
		}, {
			id: 'capital',
			title: 'Capitalize',
			func: Case.capital
		}, {
			id: 'hyphen',
			title: 'Hyphenated',
			category: 'developer',
			func: Case.kebab
		}, {
			id: 'underscore',
			title: 'Underscored',
			category: 'developer',
			func: Case.snake
		}, {
			id: 'camel',
			title: 'Camel',
			category: 'developer',
			func: Case.camel
		}, {
			id: 'constant',
			title: 'Constant',
			category: 'developer',
			func: Case.constant
		}
	]
}
