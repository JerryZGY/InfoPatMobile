import {Results} from 'collections/results';
import {RemoteServer} from 'server/lib/esAPI';
import {Logger} from 'lib/logger';

Meteor.publish('results', () => Results.find());

Meteor.methods({
    search(text: string, country: string[], token: string) {
        var result = new RemoteServer().search(text, country);
        result["_id"] = token;
        new Logger().debug(`>>> Meteor method search called, changedSize: ${Results.update({ _id: token }, { $set: result }, { upsert: true })}`);
    }
});