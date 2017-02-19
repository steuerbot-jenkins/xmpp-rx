import {ConnectionBuilder} from './src/connection/ConnectionBuilder';

let jid = 'beta_bot.steuerbot.com';

// let con = ConnectionBuilder.ofTypeClient().withCredentials('marc@steuerbot.com', 'marc').build();
// con.connect().subscribe(r => {
//     console.log('online');
//     con.sendPresence('ypypypyp');
// });

let con2 = ConnectionBuilder.ofTypeComponent().withCredentials(jid, 'beta_bot', 'steuerbot.com', 5226).build();
con2.getRawMessages().subscribe(console.log);
con2.sendPresence();

// let component = new Component({jid: jid, password: 'beta_bot', host: 'steuerbot.com', port: 5226});

// let con = new connection(component);

// let con = ConnectionBuilder.ofTypeClient().build();
// let con2 = ConnectionBuilder.ofTypeComponent().withCredentials('marc@steuerbot.com', 'marc').build();


// component.on('stanza', (r: Stanza) => {
//     console.log('stanza received', r);
//     let from = new JID(r.from);
//     let to = new JID(r.to);
//     let text = r.getChildText('body', null);
//
//     if (r.is('message') && r.type === 'chat') {
//         let response = createMessage(to, from, text);
//         component.send(response);
//     }
// });
//
// component.on('offline', function () {
//     console.log('Component is offline')
// });
//
// component.on('connect', function () {
//     console.log('Component is connected')
// });
//
// component.on('reconnect', function () {
//     console.log('Component reconnects …')
// });
//
// component.on('disconnect', function (e) {
//     console.log('Component is disconnected', e)
// });
//
// component.on('error', function (e) {
//     console.error(e)
//     process.exit(1)
// });
//
// process.on('exit', function () {
//     component.end()
// });

// let createMessage = (from: JID, to: JID, body) => {
//     let reply = new Stanza('message', {
//         from: from.toString(),
//         to: to.toString(),
//         type: 'chat'
//     });
//     reply.c('body').t(body ? body : 'Du musst schon etwas schreiben...');
//     return reply;
// };