import { Dispatcher } from 'flux';

var objectAssign = require('react/lib/Object.assign');

var AppDispatcher = objectAssign(new Dispatcher(), {
    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the server.
     */
    handleServerAction: function (action) {
        var payload = {
            source: 'SERVER_ACTION',
            action: action
        };

        console.log(this);
        console.log("Is Dispatching? : " + this.isDispatching());
        console.log(payload);
        this.dispatch(payload);
    },

    /**
     * @param {object} action The details of the action, including the action's
     * type and additional data coming from the view.
     */
    handleViewAction: function (action) {
        var payload = {
            source: 'VIEW_ACTION',
            action: action
        };
                console.log(this);
                console.log("Is Dispatching? : " + this.isDispatching());
console.log(payload);

        this.dispatch(payload);
    }
});

export default AppDispatcher;
