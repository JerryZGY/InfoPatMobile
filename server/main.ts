import {Results} from 'collections/results';
import {RemoteServer} from 'server/lib/esAPI';
import {Logger} from 'lib/logger';

Meteor.publish('results', () => Results.find());

Meteor.methods({
    search(text: string) {
        new Logger().debug(`>>> Search called at ${this.connection.clientAddress}, changedSize: ${
            Results.update(Results.findOne || {}, { $set: new RemoteServer().search(text) })
        }`);
    }
});