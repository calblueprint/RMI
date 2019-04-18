/**
 * Gets array of question objects for a building by building ID.
 * @param { number } buildingId - the building ID of the questionnaire
 * @param { Object } state - state in store
 * @returns { Array[] } the array of question objects
 */
export function getQuestionsByBuilding(buildingId, state) {
  const questions = state.buildings[buildingId].questions;
  return questions.map((questionId) => {
    return state.questions[questionId];
  });
}

/**
 * Gets array of question objects for a buildingType by buildingType ID.
 * @param { number } buildingTypeId - the buildingType ID
 * @param { Object } state - state in store
 * @returns { Array[] } the array of question objects
 */
export function getQuestionsByBuildingType(buildingTypeId, state) {
  return state.building_types[buildingTypeId].questions.map((questionId) => {
    return state.questions[questionId];
  });
}

/**
 * Returns a hash of dependent questions for the given options,
 * where the keys are option ids and values are arrays of question objects.
 *
 * @param { Array[] } optionIds       An array of option IDs whose dependent questions we want to find
 * @param { String }  questionType    The type of question (DropdownOption, RangeOption, or free)
 * @param { Object }  state           state in store
 *
 * @returns { Object } hash of option ids to dependent question arrays
 *
 *      {
 *         option_id: [{ <question> }, { <question> }, { <question> }],
 *      }
 */
export function getDependentQuestionsForOptionIds(optionIds, questionType, state) {
  const questions = {};
  for (let id of optionIds) {
    const dependent_questions = getDependentQuestionsForOption(id, questionType, state);
    if (dependent_questions.length != 0) {
      questions[id] = dependent_questions
    }
  }
  return questions;
}

export function getDependentQuestionsForOption(optionId, optionType, state) {
  return Object.keys(state.questions).filter((questionId) => {
    // We need to check that the option's type matches what is expected by the potential dependent question,
    // because there could be a DropdownOption and RangeOption with the same id.
    return state.questions[questionId].parent_option_id == optionId &&
      state.questions[questionId].parent_option_type.includes(optionType);
  }).map((questionId) => {
    return state.questions[questionId];
  });
}

/**
 * Recursively find all potentially dependent questions on the given question.
 *
 */
export function getPotentialDependentQuestions(parentQuestion, state) {
  var potentialChildren = [].concat(
    ...Object.values(parentQuestion.options).map((option) => {
      return getDependentQuestionsForOption(option.id, parentQuestion.question_type, state);
    })
  );

  if (potentialChildren.length == 0) {
    return [];
  } else {
    return potentialChildren.concat(potentialChildren.map(
      (child) => getPotentialDependentQuestions(child, state)
    ));
  }
}

/**
 * Get an array of question objects given categoryID (non-dependent questions only)
 *
 * @param {Number} categoryId - id for category
 * @param {Object} state - state
 * returns a list questions
 */
export function getQuestionsByCategoryId(categoryId, state) {
  return state.categories[categoryId].questions.map((questionId) => {
    return state.questions[questionId];
  });
}

/**
 * Returns a list of all active questions belonging to the given category id,
 * including any dependent questions
 */
export function getAllActiveQuestionsForCategory(categoryId, buildingId, state) {
  const buildingQuestionIds = state.buildings[buildingId].questions.map((id) => parseInt(id));

  // Get list of non-dependent questions for the current category
  // that were assigned to this user
  const rootQuestions = state.categories[categoryId].questions.filter((questionId) => {	
    return buildingQuestionIds.includes(questionId);	
  });	
  
  return getAllActiveQuestions(rootQuestions, buildingId, state);
}

/**
 * Helper function: given a list of "root" (non-dependent) questions, recursively
 * finds all active questions in their chain(s).
 */
export function getAllActiveQuestions(rootQuestions, buildingId, state) {
  let questions = [];

  for (let questionId of rootQuestions) {
    const rootQuestion = state.questions[questionId];

    if (rootQuestion) {
      questions.push(rootQuestion);

      const answer = state.buildings[buildingId].answers[questionId];
      if (answer && answer.selected_option_id) {
        const dependents = getDependentQuestionsForOption(answer.selected_option_id,
          rootQuestion.question_type, state);

        questions.push(...getAllActiveQuestions(dependents, buildingId, state));
      }
    }
  }

  return questions;
}
