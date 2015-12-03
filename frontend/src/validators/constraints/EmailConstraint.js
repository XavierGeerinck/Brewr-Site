/**
 * Created by Maxim on 18/08/2015.
 */
import Constraint from './Constraint.js';


export default class EmailConstraint extends Constraint{

    validate(value) {

        if(typeof value == "undefined") {
            return false;
        }

        const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if(regex.test(value)) {
            this.validateConstraint();
        }

        return this.isValid;
    }
}