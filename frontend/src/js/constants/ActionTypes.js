/**************************
 * DockerHubStore Events
 **************************/
export const DOCKER_HUB_SEARCH_INPUT_CHANGED = 'DOCKER_HUB_SEARCH_INPUT_CHANGED';

/**************************
 * BuilderStore Events
 **************************/
export const BUILDER_NEXT_PAGE = 'BUILDER_NEXT_PAGE';
export const BUILDER_PREVIOUS_PAGE = 'BUILDER_PREVIOUS_PAGE';
export const BUILDER_DISTRIBUTION_CHANGE = 'BUILDER_DISTRIBUTION_CHANGE';
export const BUILDER_CHANGE_MAINTAINER = 'BUILDER_CHANGE_MAINTAINER';
export const BUILDER_CHANGE_WORKDIR = 'BUILDER_CHANGE_WORKDIR';
export const BUILDER_CHANGE_USER = 'BUILDER_CHANGE_USER';
export const BUILDER_CHANGE_LABEL_ITEMS = 'BUILDER_CHANGE_LABEL';
export const BUILDER_CHANGE_RUN_ITEMS = 'BUILDER_CHANGE_RUN_ITEMS';
export const BUILDER_CHANGE_EXPOSE_ITEMS = 'BUILDER_CHANGE_EXPOSE_ITEMS';
export const BUILDER_CHANGE_VOLUME_ITEMS = 'BUILDER_CHANGE_VOLUME_ITEMS';
export const BUILDER_CHANGE_ADD_ITEMS = 'BUILDER_CHANGE_ADD_ITEMS';
export const BUILDER_CHANGE_ENV_ITEMS = 'BUILDER_CHANGE_ENV_ITEMS';
export const BUILDER_CHANGE_CMD_ITEMS = 'BUILDER_CHANGE_CMD_ITEMS';
export const BUILDER_FINISH_DOCKERFILE = 'BUILDER_FINISH_DOCKERFILE';

/**************************
 * AuthStore Events
 **************************/
// Requests (Client side events, example when pushing button)
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_USER = 'REQUEST_USER';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_REGISTER = 'REQUEST_REGISTER';

// Responses (Response from the server API call)
export const RESPONSE_USER = 'RESPONSE_USER';
export const RESPONSE_LOGIN = 'RESPONSE_LOGIN';
export const RESPONSE_REGISTER = 'RESPONSE_REGISTER';
export const RESPONSE_LOGOUT = 'RESPONSE_LOGOUT';

// Responses Errors (When something happened on the server)
export const RESPONSE_LOGIN_ERROR = 'RESPONSE_LOGIN_ERROR';
export const RESPONSE_REGISTER_ERROR = 'RESPONSE_REGISTER_ERROR';
export const RESPONSE_USER_ERROR = 'RESPONSE_USER_ERROR';
export const RESPONSE_LOGOUT_ERROR = 'RESPONSE_LOGOUT_ERROR';

export const CHANGE_SELECTED_COMPANY = 'CHANGE_SELECTED_COMPANY';
