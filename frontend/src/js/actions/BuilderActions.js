import AppDispatcher from '../dispatchers/AppDispatcher.js';
import * as types from '../constants/ActionTypes';

class BuilderActions {
    static changeDistribution(distribution, distribution_version) {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_DISTRIBUTION_CHANGE,
            distribution: distribution,
            distribution_version: distribution_version
        });
    }

    static nextPage() {
        AppDispatcher.dispatch({
            actionType: types.BUILDER_NEXT_PAGE,
        });
    }
}

export default BuilderActions;
