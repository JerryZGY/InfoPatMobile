import {Results} from 'collections/results';
import {RemoteServer} from 'server/lib/esAPI';
import {Logger} from 'lib/logger';

if (Results.find().count() == 0)
    Results.update(Results.findOne || {}, { $set: new RemoteServer().search("test", []) }, { upsert: true });

Meteor.publish('results', () => Results.find());

Meteor.methods({
    search(text: string, country: string[], token: string) {
        var result = new RemoteServer().search(text, country);
        result["_id"] = token;
        new Logger().debug(`>>> Search called at ${this.connection.clientAddress}, changedSize: ${
            Results.update({ _id: token }, { $set: result }, { upsert: true })
        }`);
    }
});