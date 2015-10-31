/**
 * Created by Maxim on 18/08/2015.
 */
import Constraint from './Constraint.js';


export default class LengthConstraint extends Constraint {

    constructor(min, max) {
        super();
        this.min = min;
        this.max = max;
    }

    validate(value) {

        if(typeof value === "undefined") {
            return false;
        }

        if(typeof this.max != "undefined" && this.max > 0) {
            if(value.length <= this.max) {
                this.validateConstraint();
            }
        }

        if(typeof this.min != "undefined" && typeof this.min == "number") {
            if(value.length >= this.min) {
                this.validateConstraint();
            }
        }

        return this.isValid;
    }
}
