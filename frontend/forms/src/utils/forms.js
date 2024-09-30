const getFormFields = (e) => {
  const result = [];
  const boxes = e.target.querySelectorAll('.question-box');

  boxes.forEach((box) => {
    const question = box.querySelector('[name="question-name"]');
    const questionId = question.id;
    const questionName = question.value;
    const required = box.querySelector('[name="required"]').checked;

    const questionData = {
      name: questionName,
      type_id: question.getAttribute('type_id'),
      is_required: required
    };

    questionId && (questionData.id = questionId);

    // const options = box.querySelector('[name="options"]');
    const options = box.querySelector('.question-box-body');

    

    if (options) {
      const optionInputs = options.querySelectorAll('input');

      const optionsArray = [];

      optionInputs.forEach((input) => {
        optionsArray.push(input.value);
      });

      questionData.options = optionsArray;
    }
    result.push(questionData);
  });

  return result;
};

const query = (selector) => document.querySelector(selector);

export { getFormFields , query};