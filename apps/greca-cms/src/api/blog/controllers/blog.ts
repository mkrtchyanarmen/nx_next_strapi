/**
 * blog controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController(
  'api::blog.blog',
  ({ strapi }) => ({
    async findOne(ctx) {
      const { id: slug } = ctx.params;
      const { query } = ctx;
      if (!query.filters) query.filters = {};
      query.filters.slug = { $eq: slug };
      const entity = await strapi.service('api::blog.blog').find(query);
      const { results } = (await this.sanitizeOutput(entity, ctx)) as {
        results: unknown;
      };

      return this.transformResponse(results[0]);
    },
  })
);
