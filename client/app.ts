import {bootstrap} from 'angular2-meteor';
import {Component, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig, APP_BASE_HREF} from 'angular2/router';
import {Main} from 'client/main';
@Component({ selector: 'app', template: '<router-outlet></router-outlet>', directives: [ROUTER_DIRECTIVES] })
@RouteConfig([
    { path: '/', component: Main, as: 'Main', useAsDefault: true }
])
export class InfoPat { }
bootstrap(InfoPat, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);