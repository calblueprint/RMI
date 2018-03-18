/* @flow */
import type { Building } from 'rmi';

export function getBuildingsByPortfolio(
  portfolioId: string,
  state: any
): Array<Building> {
  return Object.keys(state.buildings).filter((buildingId) => {
    return state.buildings[buildingId].portfolio_id == portfolioId;
  }).map((buildingId) => {
    return state.buildings[buildingId];
  });
};

export function getBuildings(state: any): {
  [buildingId: string]: Building
} {
  return state.buildings
};

export function getBuildingById(buildingId, state) {
  return state.buildings[buildingId]

}
