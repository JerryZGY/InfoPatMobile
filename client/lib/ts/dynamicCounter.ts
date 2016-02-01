// A wrapper for d4nyll:odometeor 0.2.1
// Original library: http://github.hubspot.com/odometer
// Wrapped library: https://github.com/d4nyll/odometeor
interface DynamicCounterOptions {
    value: number,
    format: string,
    duration: number,
    theme: string,
    animation: string
}

export class DynamicCounter {
    constructor(id: string, value: number, format?: string, duration?: number) {
        let options: DynamicCounterOptions = {
            // REQUIRED
            value: 0,
            // Change how digit groups are formatted, and how many digits are shown after the decimal point
            format: format || "(,ddd)",
            // Change how long the javascript expects the CSS animation to take
            duration: duration || 750,
            // Specify the theme (if you have more than one theme css file on the page)
            theme: "plaza",
            // Count is a simpler animation method which just increments the value
            animation: "count"
        };
        Odometeor.create("dynamicCounter", id, options);
        document.getElementById("dynamicCounter").innerHTML = value.toString();
        document.getElementById(id).remove();
    }
}