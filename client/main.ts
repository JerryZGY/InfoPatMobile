import {Page, NavController} from 'ionic/ionic';
import {MeteorComponent} from 'angular2-meteor';

@Page({
    templateUrl: '/client/main.html'
})

export class Main extends MeteorComponent {
    constructor() {
        super();
    }
}