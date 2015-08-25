/**
 * Created by Maxim on 18/08/2015.
 */
import Constraint from './Constraint.js';


export default class ConfirmConstraint extends Constraint{

    constructor(confirmValue) {
        super();
        this.confirmValue = confirmValue;
    }

    validate(value) {

        if(value == this.confirmValue) {
            this.validateConstraint();
        }

        return this.isValid;
    }
}