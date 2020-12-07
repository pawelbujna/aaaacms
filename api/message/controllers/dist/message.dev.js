"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

var _require = require("strapi-utils"),
    parseMultipartData = _require.parseMultipartData,
    sanitizeEntity = _require.sanitizeEntity;

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */
  create: function create(ctx) {
    var entity, _parseMultipartData, data, files;

    return regeneratorRuntime.async(function create$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!ctx.is("multipart")) {
              _context.next = 7;
              break;
            }

            _parseMultipartData = parseMultipartData(ctx), data = _parseMultipartData.data, files = _parseMultipartData.files;
            _context.next = 4;
            return regeneratorRuntime.awrap(strapi.services.message.create(data, {
              files: files
            }));

          case 4:
            entity = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return regeneratorRuntime.awrap(strapi.services.message.create(ctx.request.body));

          case 9:
            entity = _context.sent;

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(strapi.plugins["email"].services.email.send({
              to: "pawelbujna@gmail.com",
              from: "pawelbujna@gmail.com",
              replyTo: entity.email,
              subject: entity.subject,
              providerOptions: {
                apiKey: "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"
              },
              html: "<div>\n      <p>".concat(entity.name, " ").concat(entity.phone ? entity.phone : "", "</p>\n      <br />\n      <p>").concat(entity.message, "</p>\n      <div>")
            }));

          case 12:
            return _context.abrupt("return", sanitizeEntity(entity, {
              model: strapi.models.message
            }));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};