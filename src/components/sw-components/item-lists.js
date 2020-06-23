import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService } from '../hoc-helpers';

const withChildFunction = (fn) => (Wrapped) => {
  return (props) => {
    return (
      <Wrapped {...props}>
        {fn}
      </Wrapped>
    )
  };
};

const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

const mapPersonMethodToProps = (swapiService) => {
  return  {
    getData: swapiService.getAllPeople,
  };
};

const mapPlanetMethodToProps = (swapiService) => {
  return  {
    getData: swapiService.getAllPlanets,
  };
};

const mapStarshipMethodToProps = (swapiService) => {
  return  {
    getData: swapiService.getAllStarships,
  };
};

const PersonList = withSwapiService(mapPersonMethodToProps)(
                      withData(
                        withChildFunction(renderName)(
                          ItemList)));

const PlanetList = withSwapiService(mapPlanetMethodToProps)(
                      withData(
                        withChildFunction(renderName)(
                          ItemList)));

const StarshipList = withSwapiService(mapStarshipMethodToProps)(
                      withData(
                        withChildFunction(renderModelAndName)(
                          ItemList)));

export {
  PersonList,
  PlanetList,
  StarshipList
};
