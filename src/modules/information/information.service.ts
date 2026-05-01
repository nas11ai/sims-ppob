import * as informationRepository from './information.repository';

export const getBanners = async () => {
  return await informationRepository.getBanners();
};

export const getServices = async () => {
  return await informationRepository.getServices();
};
