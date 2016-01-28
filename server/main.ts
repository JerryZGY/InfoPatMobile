import {Results} from 'collections/results';
import {RemoteServer} from 'server/lib/esAPI';

new RemoteServer().search("test", (data) => Results.update(Results.findOne() || {}, { $set: data }, { upsert: true }));

Meteor.publish('results', () => Results.find());

Meteor.methods({
    search(text: string) {
        Results.update(Results.findOne() || {}, { $set: { test: text , updatedAt: new Date() } });
        console.log();
    }
});