import { type SchemaTypeDefinition } from 'sanity'

import portfolioSchema from '../schema/portfolio-schema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioSchema],
}
