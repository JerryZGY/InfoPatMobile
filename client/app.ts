import {MeteorComponent} from 'angular2-meteor';
import {MeteorApp} from 'ionic2-meteor';
import {IonicApp} from 'ionic/ionic';
import {Main} from 'client/main';

@MeteorApp({
    templateUrl: '/client/app.html'
})
export class Socially {
    main: Main;
    app: IonicApp;

    constructor(app: IonicApp) {
        this.app = app;
        this.main = Main;
    }

    openPage(page) {
        let nav = this.app.getComponent('nav');
        nav.push(page);
    }
}