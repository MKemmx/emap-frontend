import axios from 'axios';

export const getAllBuilding = async () => {
  const { data } = await axios.get('/building');

  const buildingOptions = data.building.map((item) => {
    return {
      _id: item._id,
      label: item.name,
    };
  });

  return buildingOptions;
};
