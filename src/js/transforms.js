import * as changeCase from 'change-case-all'
import { square, sansSerif, fraktur, circle, script } from 'unicode-fonts-js'
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
    name: 'Random',
    group: 'prose',
    func: changeCase.spongeCase,
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
    func: (string) => sansSerif(string, { fontStyle: 'bold' }),
  },
  {
    name: 'Italic',
    group: 'unicode',
    func: (string) => sansSerif(string, { fontStyle: 'italic' }),
  },
  {
    name: 'Script',
    group: 'unicode',
    func: script,
  },
  {
    name: 'Fraktur',
    group: 'unicode',
    func: fraktur,
  },
  {
    name: 'Circle',
    group: 'unicode',
    func: circle,
  },
  {
    name: 'Square',
    group: 'unicode',
    func: square,
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
