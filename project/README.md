# Introduction
This application is written with the [Sails](http://sailsjs.org framework

# Front-end
The front-end uses ReactJS

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


# Back-end
The back-end uses the sails framework