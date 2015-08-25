
# frontend (frontend)

> ...

## Running your project

The generated project includes a live-reloading static server on port `8080` (you can change the port in the `gulpfile.js` config), which will build, launch, and rebuild the app whenever you change application code. To start the server, run:

```bash
$ npm start
```

If you prefer to just build without the live reload and build-on-each-change watcher, run:

```bash
$ npm run build
```


## Generating Additional Code

You can add additional functionality to your application by invoking the subgenerators included in the Flux Generator. You can add components using the following commands:

#### Components
```bash
$ yo flux:component ComponentName
```

#### Actions
```bash
$ yo flux:action ActionCreatorName
```

#### Stores
```bash
$ yo flux:store StoreName
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