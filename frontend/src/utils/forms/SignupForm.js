import forms from 'newforms';

var SignupForm = forms.Form.extend({
    username: forms.CharField(),
    email: forms.EmailField(),
    password: forms.CharField({widget: forms.PasswordInput}),
    firstName: forms.CharField(),
    lastName: forms.CharField(),
    confirmPassword: forms.CharField({widget: forms.PasswordInput}),
    acceptTerms: forms.BooleanField({required: true})
});

export default SignupForm;
