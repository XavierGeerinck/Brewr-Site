/**
 * 201 (Created) Response
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link
 * to the newly-created resource (on POST).
 * Response body content may or may not be present.
 */
module.exports = function (data, code, message, root) {
    var response = _.assign({
        code: code || 'CREATED',
        message: message
        || 'The request has resulted in a new resource being created',
        data: data || {}
    }, root);

    this.req._sails.log.silly('Sent (201 CREATED)\n', response);

    this.res.status(201);
    this.res.jsonx(response);
};
