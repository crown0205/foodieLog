type UseInformation = {
  email: string;
  password: string;
};

function validateLogin(values: UseInformation) {
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

export {validateLogin};
