type UseInformation = {
  email: string;
  password: string;
};

function validateUser(values: UseInformation) {
  const errors = {
    email: '',
    password: '',
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = '이메일을 입력해주세요.';
  }

  if (!!values.email && !emailRegex.test(values.email)) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!(values.password.length >= 8 && values.password.length <= 20)) {
    errors.password = '비밀번호는 8자 이상 20자 이하여야 합니다.';
  }

  return errors;
}

function validateLogin(values: UseInformation) {
  return validateUser(values);
}

function validateSignUp(values: UseInformation & { passwordConfirm: string }) {
  const errors = validateUser(values);
  const signupErrors = { ...errors, passwordConfirm: '' };

  if (!values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호를 한 번 더 입력해주세요.';
  }

  if (values.password !== values.passwordConfirm) {
    signupErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
  }

  return signupErrors;
}

function validateAddPost(value: { title: string; description: string }) {
  const errors = {
    title: '',
    description: '',
  };

  if (value.title.trim() === '') {
    errors.title = '제목은 1~30자 이내로 입력해주세요.';
  }

  return errors;
}

export { validateLogin, validateSignUp, validateAddPost };
