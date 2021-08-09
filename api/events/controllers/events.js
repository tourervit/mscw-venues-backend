'use strict';
const { parseMultipartData ,sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async me(ctx) {
		const user = ctx.state.user
		if( !user) {
			return ctx.response.badRequest(null, [{message: [{id: "Not authorized - no authorization header"}]}])
		}
		let entities;
    if (ctx.query._q) {
      entities = await strapi.services.events.search({user: user.id, ...ctx.query });
    } else {
      entities = await strapi.services.events.find({user: user.id, ...ctx.query });
    }

		
		if (!entities) {
			return ctx.response.notFound()
		}
		return sanitizeEntity(entities, {model: strapi.models.events})
	},

	async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.events.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user;
      entity = await strapi.services.events.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.events });
  },
	
	async update(ctx) {
    const { id } = ctx.params;
    let entity;
    const [events] = await strapi.services.events.find({
      id: ctx.params.id,
      'user.id': ctx.state.user.id,
    });

    if (!events) {
      return ctx.unauthorized(`This event doesn't belong to you`);
    }

    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.events.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.events.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.events });
  },
	
	async delete(ctx) {
    const { id } = ctx.params;

    const [events] = await strapi.services.events.find({
      id: ctx.params.id,
      'user.id': ctx.state.user.id,
    });

    if (!events) {
      return ctx.unauthorized(`This event doesn't belong to you`);
    }

		const entity = await strapi.services.events.delete({ id });

    return sanitizeEntity(entity, { model: strapi.models.events });
  }
};
