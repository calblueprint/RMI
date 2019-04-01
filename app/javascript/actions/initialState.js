import * as buildings from './buildings';
import * as portfolios from './portfolios';
import * as questions from './questions';

import { LOAD_INITIAL_STATE } from '../constants';

export default { buildings, portfolios, questions };

const toObjectByKey = (entities, key) => {
  return entities.reduce((result, entity) => {
    result[entity[key]] = entity;
    return result;
  }, {});
};

const toObjectById = (entities) => {
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
  return objs.map(obj => {
    return filterKeys(obj, keys);
  });
};

const formatState = {
  user: function(user) {
      return filterKeys(user[0], ['id', 'email', 'first_name', 'last_name']);
  },
  buildings: function(buildings) {
    return toObjectById(
      mapFilterKeys(
        buildings,
        ['id', 'name', 'answers', 'building_type_id', 'portfolio_id', 'address', 'city', 'state', 'zip', 'questions']
      ).map((filteredBuilding) => {
        if (filteredBuilding.questions) {
          return {
            ...filteredBuilding,
            questions: Object.keys(filteredBuilding.questions)
          };
        } else {
          return filteredBuilding;
        }
      })
    );
  },
  building_types: function(buildingTypes) {
    return toObjectById(
      mapFilterKeys(buildingTypes, ['id', 'name', 'questions', 'categories'])
      .map((filteredBuilding) => {
        return {
          ...filteredBuilding,
          questions: Object.keys(filteredBuilding.questions)
        };
      })
    );
  },
  categories: function(categories) {
    return toObjectById(mapFilterKeys(categories, ['id', 'name', 'building_type_id', 'description', 'questions']));
  },
  portfolios: function(portfolios) {
    return toObjectById(
      mapFilterKeys(
        portfolios,
        ['id', 'name', 'asset_manager_id']
      )
    );
  },
  contacts: function(contacts) {
    return toObjectByKey(contacts, 'email');
  }
};

export function loadInitialState(initialState) {
  const formatters = Object.keys(formatState);
  const types = Object.keys(initialState).filter((type) => {
    return formatters.includes(type);
  });

  let formattedState = types.map((type) => {
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
  // Look for questions inside building_types
  if (initialState.building_types) {
    console.log('hmm')
    formattedState.questions = [];
    initialState.building_types.forEach((building_type) => {
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
    console.log('heh')
    formattedState.questions = [];
    initialState.buildings.forEach((building) => {
      formattedState = {
        ...formattedState,
        questions: {
          ...formattedState.questions,
          ...building.questions
        }
      };
    });
  }

  return {
    type: LOAD_INITIAL_STATE,
    ...formattedState
  };
}
