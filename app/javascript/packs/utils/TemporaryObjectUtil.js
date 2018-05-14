export function generateTempId() {
  return "TEMP" + Date.now();
}

export function isTempId(tempId) {
  return tempId.slice(0, 4) === "TEMP"
}

/**
 * Returns a temporary question object with given question arguments if specified in hash form
 * @param {Hash} args - any question arguments
 * @returns {{id: *, text: string, building_type_id: null, category_id: null, options: {}, question_type: null, parameter: string, parent_option_type: null, parent_option_id: null}}
 */
export function newDefaultQuestion(args={}) {
  const newQuestion =  {
    id: generateTempId(),
    text: "Add new question",
    building_type_id: null,
    category_id: null,
    options: {},
    question_type: null,
    parameter: "default_export_parameter",
    parent_option_type: null,
    parent_option_id: null
  };

  return {...newQuestion, ...args}
}
