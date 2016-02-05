/// <reference path="main.d.ts" />
/// <reference path="angular2-meteor/angular2-meteor.d.ts" />
// Type definitions for meteorhacks:npm 1.5.0
// https://github.com/meteorhacks/npm/
// Modify by: JerryZGY
declare module Meteor {
    // export function npmRequire(moduleName: string): Function;
    export function npmRequire(moduleName: string): any;
}
declare module Async {
    export function runSync(func: (done: (error: any, result: any) => void) => void): { error: any; result: any; };
    export function wrap(funcOrObject: Function | Object, functionNameOrFunctionNameList?: string | string[]): Function;
}

// Type definitions for materialize:materialize 0.97.5
// https://github.com/Dogfalo/materialize/
// Definitions by: JerryZGY
interface JQuery {
    carousel(): JQuery;
    characterCounter(): JQuery;
    collapsible(): JQuery;
    scrollTo(): JQuery;
    dropdown(): JQuery;
    material_select(): JQuery;
    materialbox(): JQuery;
    parallax(): JQuery;
    pushpin(): JQuery;
    scrollSpy(): JQuery;
    sideNav(): JQuery;
    slider(): JQuery;
    tabs(): JQuery;
    tooltip(): JQuery;
}

// Type definitions for d4nyll:odometeor 0.2.1
// https://github.com/d4nyll/odometeor
// Definitions by: JerryZGY
declare module Odometeor {
    export function create(id: string, beforeId: string, options: Object);
}