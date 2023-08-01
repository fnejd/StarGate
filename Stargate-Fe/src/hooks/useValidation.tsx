interface userType {
  email: string;
  name: string;
  nickname: string;
  pw: string;
  pwCheck: string;
  phone: string;
  birth: string;
}

interface adminType {
  email: string;
  company: string;
  bizNum: string;
  pw: string;
  pwCheck: string;
}

const userValidationCheck = (user: userType) => {
  // email Checking
  const regexEmail = new RegExp(
    // eslint-disable-next-line no-control-regex
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  const email = user.email;
  if (email.length == 0 || !regexEmail.test(email)) {
    return '이메일 형식이 올바르지 않습니다.';
  }

  // pw Checking
  const pw = user.pw;
  const pwCheck = user.pwCheck;
  const regexPw = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  );
  // 일치하지 않는 경우
  if (pw != pwCheck || pw.length == 0) {
    return '비밀번호가 일치하지 않습니다.';
  }
  if (!regexPw.test(pw)) {
    return '비밀번호 형식을 다시 확인해주세요.';
  }

  // phoneNumber formatting & Checking
  const phone = user.phone;
  const numArr = phone.split('');
  const regexPhone = new RegExp(/^\d{3}-\d{3,4}-\d{4}$/);

  if (
    numArr[0] != '0' ||
    numArr[1] != '1' ||
    numArr.length != 11 ||
    regexPhone.test(phone)
  ) {
    return '잘못된 전화번호 형식입니다.';
  }

  // name Checking
  const name = user.name;
  const regexName = new RegExp(/^[a-zA-Zㄱ-힣_]{1,20}$/);

  if (!regexName.test(name)) {
    return '이름에는 한글만 들어갈 수 있습니다.';
  }

  // nickName Checking
  const nickName = user.nickname;
  const regexNick = new RegExp(/[^a-zA-Z0-9ㄱ-힣]/g);

  if (
    regexNick.test(nickName) ||
    !(nickName.length >= 3 && nickName.length <= 20)
  ) {
    return '닉네임에는 특수문자가 포함될 수 없습니다.';
  }

  return 'SUCCESS';
}

const adminValidationCheck = (admin: adminType) => {
  // email Checking
  const regexEmail = new RegExp(
    // eslint-disable-next-line no-control-regex
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  const email = admin.email;
  if (email.length == 0 || !regexEmail.test(email)) {
    return '이메일 형식이 올바르지 않습니다.';
  }

  // pw Checking
  const pw = admin.pw;
  const pwCheck = admin.pwCheck;
  const regexPw = new RegExp(
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
  );
  // 일치하지 않는 경우
  if (pw != pwCheck || pw.length == 0) {
    return '비밀번호가 일치하지 않습니다.';
  }
  if (!regexPw.test(pw)) {
    return '비밀번호 형식을 다시 확인해주세요.';
  }

  // nickName Checking
  const nickName = admin.company;
  const regexNick = new RegExp(/[^a-zA-Z0-9ㄱ-힣]/g);

  if (
    regexNick.test(nickName) ||
    !(nickName.length >= 3 && nickName.length <= 20)
  ) {
    return '닉네임에는 특수문자가 포함될 수 없습니다.';
  }

  return 'SUCCESS';
}

export { userValidationCheck, adminValidationCheck };