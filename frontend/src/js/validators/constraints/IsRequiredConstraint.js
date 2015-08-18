/**
 * Created by Maxim on 18/08/2015.
*/
import Constraint from './Constraint.js';


export default class IsRequiredConstraint extends Constraint{
    validate(value) {
        if(value.length > 0) {
            validate();
        }

        return this.isValid;
    }
}