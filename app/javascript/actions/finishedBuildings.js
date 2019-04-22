import {
  ADD_FINISHED_BUILDING,
} from '../constants';

export function addFinishedBuilding(building) {
  return {
    type: ADD_FINISHED_BUILDING,
    building
  };
}