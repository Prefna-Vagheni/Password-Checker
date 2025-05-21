'use strict';

// Variables
const icons = document.querySelectorAll('.fa-regular');
const passwordState = document.querySelectorAll('.state');
const lenght = document.querySelector('.length');
const inputPassword = document.querySelector('.password');
const eyeAction = document.querySelector('.eye-action');
const openEye = document.querySelector('.open-eye');
const closeEye = document.querySelector('.close-eye');

let state = '';

const checkPasswordStrength = function (password) {
  const passwordLength = password.length;
  let strength = 0;

  //Conditions for length
  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (password.length >= 10) strength++;
  if (password.length >= 12) strength++;

  //   Condition to check for lowercase and uppercase
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const varietyCount = [hasLower, hasNumber, hasSymbol, hasUpper].filter(
    Boolean
  ).length;
  strength += varietyCount;

  // Activate
  if (hasLower) {
    document.querySelector('.lower-case-visible').classList.toggle('hidden');
    document.querySelector('.lower-case-invisible').classList.toggle('hidden');
  }

  if (hasUpper) {
    document.querySelector('.upper-case-visible').classList.toggle('hidden');
    document.querySelector('.upper-case-invisible').classList.toggle('hidden');
  }
  if (hasNumber) {
    document.querySelector('.number-visible').classList.toggle('hidden');
    document.querySelector('.number-invisible').classList.toggle('hidden');
  }
  if (hasSymbol) {
    document.querySelector('.symbol-visible').classList.toggle('hidden');
    document.querySelector('.symbol-invisible').classList.toggle('hidden');
  }

  //   Caracter finder
  const commonPasswords = new Set([
    '123456',
    '12345',
    '111111',
    '1234567',
    'sunshine',
    'iloveyou',
    'password',
    '123456789',
    'qwerty',
    'abc123',
    'welcome',
    '666666',
    'abc123',
    'football',
    'monkey',
    '!@#$%^&*',
    'qwerty123',
    'login',
    'freedom',
    'Daniel',
    'admin123',
    'london',
  ]);

  const isCommon = commonPasswords.has(password.toLowerCase());

  //   if (passwordLength <= 3 || isCommon) {
  //     state = 'very-weak';
  //   } else if (passwordLength <= 6) state = 'weak';
  //   else if (passwordLength <= 8) state = 'good';
  //   else if (passwordLength <= 10) state = 'strong';
  //   else if (passwordLength >= 11 && varietyCount > 3) state = 'very-strong';

  // Display state
  passwordState.forEach((st) => {
    if (passwordLength <= 3 || varietyCount === 1)
      st.classList.contains('very-weak')
        ? st.classList.remove('hidden')
        : st.classList.add('hidden');
    else if (passwordLength <= 6 || varietyCount === 2)
      st.classList.contains('weak')
        ? st.classList.remove('hidden')
        : st.classList.add('hidden');
    else if (passwordLength <= 8)
      st.classList.contains('good')
        ? st.classList.remove('hidden')
        : st.classList.add('hidden');
    else if (passwordLength <= 10 || varietyCount === 3)
      st.classList.contains('strong')
        ? st.classList.remove('hidden')
        : st.classList.add('hidden');
    else if (passwordLength >= 11 || varietyCount === 4)
      st.classList.contains('very-strong')
        ? st.classList.remove('hidden')
        : st.classList.add('hidden');
  });
};

//Display input field length
inputPassword.addEventListener('input', function (e) {
  lenght.innerText = this.value.length;
  checkPasswordStrength(inputPassword.value);
});

// Show and hide password
eyeAction.addEventListener('click', function (e) {
  if (!e.target.classList.contains('hidden')) {
    closeEye.classList.toggle('hidden');
    openEye.classList.toggle('hidden');

    inputPassword.type =
      inputPassword.type === 'password' ? 'text' : 'password';
  }
});
