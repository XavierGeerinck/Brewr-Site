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
        if(typeof max != "undefined" && max > 0) {
            if(value.length <= this.max) {
                validate();
            }
        }

        if(typeof min != "undefined" && typeof min == "Number") {
            if(value.length >= this.min) {
                validate();
            }
        }

        return this.isValid;
    }
}
