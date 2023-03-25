import axios from 'axios';

export const getAllRoom = async () => {
  const { data } = await axios.get('/room');

  const roomOptions = data.room.map((item) => {
    return {
      _id: item._id,
      label: `${item.name} || ${item?.buildingId?.name} `,
    };
  });

  return roomOptions;
};
