"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.message.create(data, { files });
    } else {
      entity = await strapi.services.message.create(ctx.request.body);
    }

    await strapi.plugins["email"].services.email.send({
      to: "pawelbujna@gmail.com",
      from: entity.email,
      replyTo: entity.email,
      subject: entity.subject,
      html: `<div>
      <p>${entity.name} ${entity.phone ? entity.phone : ""}</p>
      <br />
      <p>${entity.message}</p>
      <div>`,
    });

    return sanitizeEntity(entity, { model: strapi.models.message });
  },
};
