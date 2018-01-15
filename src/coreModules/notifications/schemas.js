export const notification = {
  additionalProperties: false,
  properties: {
    component: { type: 'object' },
    componentProps: { type: 'object' },
    displayType: { type: 'string' },
    priority: { type: 'number' },
    ttl: { type: 'number' },
  },
  required: ['component', 'displayType', 'priority'],
}
