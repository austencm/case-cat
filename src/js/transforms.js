import * as changeCase from 'change-case-all'

export const transforms = [
  {
    name: 'Sentence',
    group: 'prose',
    func: changeCase.sentenceCase,
  },
  {
    name: 'Title',
    group: 'prose',
    func: changeCase.titleCase,
  },
  {
    name: 'Upper',
    group: 'prose',
    func: changeCase.upperCase,
  },
  {
    name: 'Lower',
    group: 'prose',
    func: changeCase.lowerCase,
  },
  {
    name: 'Capitalize',
    group: 'prose',
    func: changeCase.upperCaseFirst,
  },

  {
    name: 'Camel',
    group: 'code',
    func: changeCase.camelCase,
  },
  {
    name: 'Constant',
    group: 'code',
    func: changeCase.constantCase,
  },
  {
    name: 'Dot',
    group: 'code',
    func: changeCase.dotCase,
  },
  {
    name: 'Header',
    group: 'code',
    func: changeCase.headerCase,
  },
  {
    name: 'Param',
    group: 'code',
    func: changeCase.paramCase,
  },
  {
    name: 'Path',
    group: 'code',
    func: changeCase.pathCase,
  },
  {
    name: 'Snake',
    group: 'code',
    func: changeCase.snakeCase,
  },

  {
    name: 'URI Encode',
    group: 'utility',
    func: encodeURIComponent,
  },
  {
    name: 'Base64',
    group: 'utility',
    func: (text) => btoa(unescape(encodeURIComponent(text))),
  },
]
