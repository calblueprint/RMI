import {
  SET_QUESTIONNAIRE_EDIT_MODE,
  SET_QUESTIONNAIRE_REVIEW_MODE,
  SET_QUESTIONNAIRE_DELEGATE_MODE,
  SET_BUILDING_DASHBOARD_VIEW
} from "../constants";

export function setQuestionnaireEditMode() {
  return {
    type: SET_QUESTIONNAIRE_EDIT_MODE
  };
}

export function setQuestionnaireReviewMode() {
  return {
    type: SET_QUESTIONNAIRE_REVIEW_MODE
  };
}


export function setQuestionnaireDelegateMode() {
  return {
    type: SET_QUESTIONNAIRE_DELEGATE_MODE
  };
}

export function setBuildingDashboardView() {
  return {
    type: SET_BUILDING_DASHBOARD_VIEW
  };
}
