'use strict';
const { sanitizeEntity } = require('strapi-utils');
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
		const data = await strapi.services.events.find({user: user.id})
		if (!data) {
			return ctx.response.notFound()
		}
		return sanitizeEntity(data, {model: strapi.models.events})
	}
};
