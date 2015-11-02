# Help in porting
## Regex for css
Find:    `"Footer-(.*)"`
Replace: `{styles.$1}`

`var\(\-\-(.*)\)`
`$$$1`

## Css --> JS
1. `\.(.*)\ \{` --> `$1: {`
2. `px` -> ``
3. `(.*): (.*);` -> `$1: '$2'`

# frontend (frontend)
## FAQ
Run npm install as administrator!

## Grid system
We use https://www.npmjs.com/package/purecss for the grid system, you can import it and apply it as style components

## Best practices
1. DO NOT let a component use a store or an action, try to do this through the pages or layouts, this way we allow maximum reusability.
2. When performing requests, always implement the RESPONSE and RESPONSE_ERROR types. This allows for detailed error handling.
3. We bind the changeListeners on the componentDidMount and componentWillUnmount
4. We will not execute view actions in a store! so no Navigation.transitionTo things, the view will do this (see login page for an example)

## Directory Structure
```
- build/
- src/
    - images/                           # deprecated -- to be removed
    - js/
        - actions/                      # Actions will be called by components and they will adapt a store, everything that ends on Creators does an API call
        - components/
            - App/                      # Main entry points of the app
            - elements/                 # consists out of all the different elements (drag and drop). These are STORELESS
            - layouts/                  # Different page layouts, made abstract
            - pages/                    # consists out of a collection of elements mostly. These can have a store
            - BaseComponents.js
            - variables.css             # File containing the different variables used in the elements
        - constants/                    # Contains the constants such as the actionTypes
        - dispatchers/                  # Dispatchers
        - services/                     # API Calls, should be refactored into API
        - stores/                       # The stores contain the state of a page as a whole
        - utils/
        - validators/
        - Constants.js                  # deprecated -- to be removed
        - index.js
        - routes.js
    - styles/                           # deprecated -- to be removed
    - index.html
- .babelrc                              # babel config, set on level 1
- .editorconfig
- .gitignore                            # files not to be pushed to git
- bower.json
- package.json                          # dependencies
- README.md                             # this file
- webpack.config.js                     # workflow configuration
```

## Class Boilerplate

```
import React, { PropTypes } from 'react';

class CLASSNAME extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="CLASSNAME">
            </div>
        );
    }
};

CLASSNAME.propTypes = {

};

CLASSNAME.defaultProps = {

};

export default CLASSNAME;
```

## Running your project

The generated project includes a live-reloading static server on port `8080` (you can change the port in the `gulpfile.js` config), which will build, launch, and rebuild the app whenever you change application code. To start the server, run:

```bash
$ npm start
```

If you prefer to just build without the live reload and build-on-each-change watcher, run:

```bash
$ npm run build
```

## Validations

For validations the validator instance can be used

1. import the validator

```javascript
import Validator from '../../../validators/Validator.js';
```

2. Add the validation constraints in the constructor of the component
```javascript
this.validate = {
  form: "register_form",
  validations: {
    email: {
      constraints: [
        {test: new LengthConstraint(6), message: "Must be longer than 6 characters"},
        {test: new EmailConstraint, message: "E-mail must be a valid email adress"}
      ]
    },
    password: {
      constraints: [
        {test: new LengthConstraint(6), message: "Password should be at least 6 characters long"}
      ]
    },
    password_confirm: {
      constraints: [
        {test: new LengthConstraint(6), message: "Confirm Password should be at least 6 characters long"},
        // {test: new ConfirmConstraint(this.state.password), message: "Passwords must match"}
      ]
    }
  }
};
```

3. validate, first argument is the component, second is the promise of the executed function in the backend
```javascript
var valid = Validator.validate(
    self,
     RegisterService.registerUser(
      self.refs["email"].state.value,
      self.refs["password"].state.value
    )
);
```
