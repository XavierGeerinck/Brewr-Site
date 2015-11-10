import forms from 'newforms';

var SigninForm = forms.Form.extend({
    email: forms.EmailField(),
    password: forms.CharField({ widget: forms.PasswordInput })
});

export default SigninForm;
