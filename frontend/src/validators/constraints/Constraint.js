/**
 * Created by Maxim on 18/08/2015.
 */
export default class Constraint {

    constructor() {
        if (this.constructor === Constraint) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }

        // for forcing overriding of method
        //if (this.method === undefined) {
        //    // or maybe test typeof this.method === "function"
        //    throw new TypeError("Must override method");
        //}

        this.isValid = false;
    }

    invalidate() {
        this.isValid = false;
    }

    validateConstraint() {
        this.isValid = true;
    }
}
