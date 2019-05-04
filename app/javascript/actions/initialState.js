import * as buildings from "./buildings";
import * as portfolios from "./portfolios";
import * as questions from "./questions";

import { LOAD_INITIAL_STATE } from "../constants";
import { isDelegatedAnswer } from "../selectors/answersSelector";

export default { buildings, portfolios, questions };

const toObjectByKey = (entities, key) => {
  return entities.reduce((result, entity) => {
    result[entity[key]] = entity;
    return result;
  }, {});
};

const toObjectById = entities => {
  return toObjectByKey(entities, "id");
};

const filterKeys = (obj, keys) => {
  return Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((result, key) => {
      result[key] = obj[key];
      return result;
    }, {});
};

const mapFilterKeys = (objs, keys) => {
  console.log(objs)
  return objs.map(obj => {
    return filterKeys(obj, keys);
  });
};

const formatState = {
  user: function(user) {
    return filterKeys(user[0], ["id", "email", "first_name", "last_name"]);
  },
  userType: function(userType) {
    return userType[0];
  },
  buildings: function(buildings) {
    return toObjectById(
      mapFilterKeys(buildings, [
        "id",
        "name",
        "answers",
        "building_type_id",
        "portfolio_id",
        "address",
        "city",
        "state",
        "zip",
        "questions"
      ]).map(filteredBuilding => {
        if (filteredBuilding.questions) {
          const questionIds = Object.keys(filteredBuilding.questions);
          const editable = questionIds.reduce((map, qId) => {
            map[qId] = Boolean(filteredBuilding.questions[qId]["can_edit"]);
            return map;
          }, {});

          return {
            ...filteredBuilding,
            questions: questionIds,
            editable
          };
        } else {
          return filteredBuilding;
        }
      })
    );
  },
  building_types: function(buildingTypes) {
    return toObjectById(
      mapFilterKeys(buildingTypes, [
        "id",
        "name",
        "questions",
        "categories"
      ]).map(filteredBuilding => {
        return {
          ...filteredBuilding,
          questions: Object.keys(filteredBuilding.questions)
        };
      })
    );
  },
  categories: function(categories) {
    return toObjectById(
      mapFilterKeys(categories, [
        "id",
        "name",
        "building_type_id",
        "description",
        "questions"
      ])
    );
  },
  portfolios: function(portfolios) {
    console.log(portfolios)
    let a = toObjectById(
      mapFilterKeys(portfolios, ["id", "name", "asset_manager_id", "asset_manager_emails"])
    );
    console.log(a)
    return a;
  },
  contacts: function(contacts) {
    return toObjectByKey(contacts, "email");
  }
};

export function loadInitialState(initialState) {
  const formatters = Object.keys(formatState);
  const types = Object.keys(initialState).filter(type => {
    return formatters.includes(type);
  });

  let formattedState = types
    .map(type => {
      if (!Array.isArray(initialState[type])) {
        initialState[type] = [initialState[type]];
      }

      let entity = initialState[type];
      const stateFormatter = formatState[type];

      return stateFormatter(entity);
    })
    .reduce((result, shaped, index) => {
      result[types[index]] = shaped;
      return result;
    }, {});
  // Look for questions inside building_types
  if (initialState.building_types) {
    formattedState.questions = {};
    initialState.building_types.forEach(building_type => {
      formattedState = {
        ...formattedState,
        questions: {
          ...formattedState.questions,
          ...building_type.questions
        }
      };
    });
  }
  // Look for questions inside buildings
  else if (initialState.buildings) {
    formattedState.questions = {};
    initialState.buildings.forEach(building => {
      formattedState = {
        ...formattedState,
        questions: {
          ...formattedState.questions,
          ...Object.keys(building.questions).reduce((map, qId) => {
            // Remove the "can_edit" property from each question, since this is
            // only applicable for the building itself, and not the question overall
            delete building.questions[qId]["can_edit"];
            map[qId] = building.questions[qId];
            return map;
          }, {})
        }
      };
    });
  }
  // Look for contacts inside buildings
  if (initialState.buildings) {
    formattedState.contacts = {};
    initialState.buildings.forEach(building => {
      let contacts = [];
      if (!building.answers) return;
      Object.keys(building.answers).forEach(answerId => {
        const answer = building.answers[answerId];
        if (isDelegatedAnswer(answer)) {
          contacts.push({
            email: answer.delegation_email,
            first_name: answer.delegation_first_name,
            last_name: answer.delegation_last_name
          });
        }
      });
      formattedState = {
        ...formattedState,
        contacts: {
          ...formattedState.contacts,
          ...toObjectByKey(contacts, "email")
        }
      };
    });
  }

  return {
    type: LOAD_INITIAL_STATE,
    ...formattedState
  };
}
