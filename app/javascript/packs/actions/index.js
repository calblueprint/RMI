import * as buildings from './buildings';
import * as portfolios from './portfolios';
import * as questions from './questions';

import { LOAD_INITIAL_STATE } from '../constants';

export default { buildings, portfolios, questions };

const toObjectById = (entities) => {
  console.log(entities)
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
  return objs.map(obj => filterKeys(obj, keys));
};

const formatState = {
  buildings: function(buildings) {
    return toObjectById(
      mapFilterKeys(buildings, ['id', 'name', 'answers'])
    );
  },
  building_types: function(buildingTypes) {
    return toObjectById(
      mapFilterKeys(buildingTypes, ['id', 'name'])
    );
  },
  questions: function(questions) {
    
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
    if (!Array.isArray(entity)) {
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
      const questions = [
        ...formattedState.questions,
        formatState.questions(buildingType.questions)
      ];
      formattedState = {...formattedState, questions};
    });
  }

  return {
    type: LOAD_INITIAL_STATE,
    ...formattedState
  };
}
