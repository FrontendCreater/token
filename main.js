const form = document.querySelector('#form');
const inputs = document.querySelectorAll('#form input');
const submit = document.querySelector('#form button');

function toggleButton() {
  submit.disabled = ![...inputs].every((item) => item.value.length);
}

function isNumber(char) {
  return !isNaN(parseInt(char, 10));
}

inputs[0]?.focus();

inputs.forEach((input, index) => {
  input.addEventListener('beforeinput', (evt) => {
    if ('.,-+'.includes(evt.data)) {
      evt.preventDefault();
    }

    if (evt.inputType === 'deleteContentBackward') {
      evt.preventDefault();

      if (input.value.length === 0) inputs[index - 1]?.focus();

      input.value = '';

      toggleButton();
    }
  });

  input.addEventListener('input', (evt) => {
    if (input.value) input.value = input.value[0];

    if (
      inputs[index + 1] &&
      evt.inputType === 'insertText' &&
      !inputs[index + 1].value.length
    )
      inputs[index + 1]?.focus();

    toggleButton();
  });

  input.addEventListener('paste', (evt) => {
    const text = evt.clipboardData.getData('Text').split('');
    const nums = text.filter(isNumber).slice(0, inputs.length);

    nums.forEach((char, index) => (inputs[index].value = char));

    toggleButton();

    for (let input of inputs) {
      if (input.value.length === 0) return input.focus();
    }

    inputs[inputs.length - 1]?.focus();
  });
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(form);

  alert('Code: ' + formData.getAll('token').join(''));
});
