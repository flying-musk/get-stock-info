import axios from 'axios';

interface Params {
  baseUrl: string;
  method: string;
}

const getConfig: Params = {
  baseUrl: 'https://get-stock-info-4dlzmrappq-de.a.run.app',
  method: 'get',
};

export const getAPI = async (itemId: number): Promise<any> => {
  return await axios({
    ...getConfig,
    url: `${getConfig.baseUrl}?itemId=${itemId}`,
  })
    .then((response) => {
      console.log(response);
      return {
        status: response.status,
        data: response.data,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        status: error.status,
        data: error.response,
      };
    });
};
