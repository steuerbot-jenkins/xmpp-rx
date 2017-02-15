"use strict";
var rxjs_1 = require('rxjs');
var node_xmpp_client_1 = require('node-xmpp-client');
var Connection = (function () {
    function Connection(domain, resource) {
        this.domain = domain;
        this.resource = resource;
        this.rawMessageSubject = new rxjs_1.Subject();
    }
    Connection.prototype.connect = function (username, password) {
        var _this = this;
        this.client = new node_xmpp_client_1.Client({
            jid: createJid(username, this.domain),
            password: password
        });
        this.client.on('stanza', function (r) { return _this.rawMessageSubject.next(r); });
        this.client.connect();
        return rxjs_1.Observable.create(function (obs) {
            _this.client.on('online', function () {
                obs.next('online');
                obs.complete();
                _this.attachListeners();
            });
        });
    };
    Connection.prototype.disconnect = function () {
        this.client.disconnect();
    };
    Connection.prototype.sendPresence = function (message) {
        var stanza = new node_xmpp_client_1.Client.Stanza('presence', {})
            .c('show').t('chat').up()
            .c('status').t(message);
        this.client.send(stanza);
    };
    Connection.prototype.sendMessage = function (to, jid, body) {
        var reply = new node_xmpp_client_1.Client.Stanza('message', {
            to: to,
            from: jid,
            type: 'chat'
        });
        reply.c('body').t(body);
        this.client.send(reply);
    };
    Connection.prototype.getRawMessages = function () {
        return this.rawMessageSubject.asObservable();
    };
    Connection.prototype.getChatMessageStream = function () {
        return this.rawMessageSubject.asObservable();
    };
    Connection.prototype.attachListeners = function () {
    };
    return Connection;
}());
exports.Connection = Connection;
var createJid = function (username, domain, resource) {
    return username + '@' + domain;
};
var parseStanza = function (r) { return r.is('message') && r.attrs.type === 'chat'; };
// }