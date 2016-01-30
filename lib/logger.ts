import Ws = require('winston');
type WinstonInterface = typeof Ws;

export class Logger {
    private isServer: boolean;
    private Winston: WinstonInterface;

    constructor() {
        this.isServer = Meteor.isServer;
        this.Winston = this.isServer ? Meteor.npmRequire("winston") : null;
    }

    private log(level: string, msg: string, meta?: any) {
        meta = meta || "";
        if (this.isServer) {
            this.Winston.level = "debug";
            this.Winston.log(level, msg, meta);
        }
        else
            switch (level) {
                case "info":
                    console.info(msg, meta);
                    break;
                case "debug":
                    console.debug(msg, meta);
                    break;
                case "error":
                    console.error(msg, meta);
                    break;
                default:
                    break;
            }
    }

    info(msg: string, meta?: any) { this.log("info", msg, meta); }
    debug(msg: string, meta?: any) { this.log("debug", msg, meta); }
    error(msg: string, meta?: any) { this.log("error", msg, meta); }
}