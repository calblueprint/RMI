import * as buildings from './buildings';
import * as portfolios from './portfolios';
import * as questions from './questions';

import { LOAD_INITIAL_STATE } from '../constants';

export default { buildings, portfolios, questions };

const toObjectById = (entities) => {
  return entities.reduce((result, entity) => {
    result[entity.id] = entity;
    return result;
  }, {});
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
  return objs.map(obj => {
    return filterKeys(obj, keys);
  });
};

const formatState = {
  buildings: function(buildings) {
    return toObjectById(
      mapFilterKeys(
        buildings,
        ['id', 'name', 'answers', 'address', 'city', 'state', 'zip']
      )
    );
  },
  building_types: function(buildingTypes) {
    return toObjectById(
      mapFilterKeys(buildingTypes, ['id', 'name', 'questions'])
      .map((filteredBuilding) => {
        return {
          ...filteredBuilding,
          questions: Object.keys(filteredBuilding.questions)
        };
      })
    );
  },
  questions: function(questions) {
    return toObjectById(
      Object.keys(questions).map((id) => {
        const question = questions[id];
        if (question.options.length > 0) {
          question.options = toObjectById(question.options);
        } else {
          question.options = {};
        }
        return question;
      })
    );
  },
  portfolios: function(portfolios) {

  }
}

export function loadInitialState(initialState) {
  const types = Object.keys(initialState);
  const formatters = Object.keys(formatState);

  let formattedState = types.filter((type) => {
    return formatters.includes(type);
  }).map((type) => {
    if (!Array.isArray(initialState[type])) {
      initialState[type] = [initialState[type]];
    }

    let entity = initialState[type];
    const stateFormatter = formatState[type];

    return stateFormatter(entity);
  }).reduce((result, shaped, index) => {
    result[types[index]] = shaped;
    return result;
  }, {});

  // Look for questions inside buildingTypes
  if (initialState.building_types) {
    formattedState.questions = [];
    initialState.building_types.forEach((buildingType) => {
      formattedState = {
        ...formattedState,
        questions: formatState.questions(buildingType.questions)
      };
    });
  }

  return {
    type: LOAD_INITIAL_STATE,
    ...formattedState
  };
}
