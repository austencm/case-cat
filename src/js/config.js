import { transforms } from './transforms'

const transformGroupIds = [...new Set(transforms.map(({ group }) => group))]

export const config = {
  defaultOptions: {
    replaceSelection: true,
    showTransformGroups: transformGroupIds,
  },
  contextMenuId: 'case-cat',
  transformGroupIds,
}
