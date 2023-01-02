import * as changeCase from 'change-case-all'
import toUnicode from 'to-unicode'
import zalgo from 'to-zalgo'

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
    func: (string) => btoa(unescape(encodeURIComponent(string))),
  },

  {
    name: 'Bold',
    group: 'unicode',
    func: (string) => toUnicode(string, 'mathSansBold'),
  },
  {
    name: 'Italic',
    group: 'unicode',
    func: (string) => toUnicode(string, 'mathSansItalic'),
  },
  {
    name: 'Cursive',
    group: 'unicode',
    func: (string) => toUnicode(string, 'mathBoldScript'),
  },
  {
    name: 'Fraktur',
    group: 'unicode',
    func: (string) => toUnicode(string, 'mathBoldFraktur'),
  },
  {
    name: 'Small Caps',
    group: 'unicode',
    func: (string) => toUnicode(string, 'smallCaps'),
  },
  {
    name: 'Flipped',
    group: 'unicode',
    func: (string) => toUnicode(string, 'inverted'),
  },
  {
    name: 'Circled',
    group: 'unicode',
    func: (string) => toUnicode(string, 'circled'),
  },
  {
    name: 'Squared',
    group: 'unicode',
    func: (string) => toUnicode(string, 'squared'),
  },
  {
    name: 'Zalgo',
    group: 'unicode',
    func: zalgo,
  },
  {
    name: 'Zalgo (max curse)',
    group: 'unicode',
    func: (string) => zalgo(string, { size: 'maxi' }),
  },
]
