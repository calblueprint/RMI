import {
  SET_QUESTIONNAIRE_DELEGATE_MODE,
  SET_QUESTIONNAIRE_EDIT_MODE,
  SET_QUESTIONNAIRE_REVIEW_MODE
} from "../constants";
import { INITIAL_VIEW_CONTEXT } from "../actions/initialState";
import { SET_BUILDING_DASHBOARD_VIEW } from "../constants/index";

function setQuestionnaireEditMode(state, action) {
  return setQuestionnaireMode('edit_mode', state, action);
}

function setQuestionnaireDelegateMode(state, action) {
  return setQuestionnaireMode('delegate_mode', state, action);
}

function setQuestionnaireReviewMode(state, action) {
  return setQuestionnaireMode('review_mode', state, action);
}

function setQuestionnaireMode(mode, state, action) {
  const default_values = INITIAL_VIEW_CONTEXT[state.user_type];

  return {
    ...default_values,
    questionnaire_view: {
      ...default_values.questionnaire_view,
      [mode]: true
    }
  };
}

function setBuildingDashboardView(state, action) {
  const default_values = INITIAL_VIEW_CONTEXT[state.user_type];

  return {
    ...default_values,
    building_dashboard_view: true
  }
}

export default function viewContext(state={}, action) {
  switch (action.type) {
    case SET_QUESTIONNAIRE_EDIT_MODE: return setQuestionnaireEditMode(state, action);
    case SET_QUESTIONNAIRE_DELEGATE_MODE: return setQuestionnaireDelegateMode(state, action);
    case SET_QUESTIONNAIRE_REVIEW_MODE: return setQuestionnaireReviewMode(state, action);
    case SET_BUILDING_DASHBOARD_VIEW: return setBuildingDashboardView(state, action);
    default: return state;
  }
}
