import axios, {AxiosResponse} from 'axios'

export default class BaseApi
{
    static fetchData(apiUri: string, onDataFetched: (any) => void) {
        axios.get(apiUri)
            .then((response: AxiosResponse) => {
                onDataFetched(response.data);
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }

    static fetchDataByResourceId(apiUri: string, resourceId: number, onDataFetched: (any) => void) {
        BaseApi.fetchData(`${apiUri}/${resourceId}`, onDataFetched);
    }

    static deleteData(apiUri: string, onDataDeleted: () => void) {
        axios.delete(apiUri)
            .then((response: AxiosResponse) => {
                if (response.data.success) {
                    onDataDeleted();
                } else {

                }
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }

    static deleteDataByResourceId(apiUrl: string, resourceId: number, onDataDeleted: () => void) {
        BaseApi.deleteData(`${apiUrl}/${resourceId}`, onDataDeleted);
    }

    static updateData(apiUri: string, data: object, onDataUpdated: () => void) {
        axios.put(apiUri, data)
            .then((response: AxiosResponse) => {
                if (response.data.success) {
                    onDataUpdated();
                } else {

                }
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }

    static updateDataByResourceId(apiUrl: string, data: object, resourceId: number, onDataUpdated: () => void) {
        BaseApi.updateData(`${apiUrl}/${resourceId}`, data, onDataUpdated);
    }

    static postData(apiUri: string, data: object, onDataPosted: () => void) {
        axios.post(apiUri, data)
            .then((response: AxiosResponse) => {
                if (response.data.success) {
                    onDataPosted();
                } else {

                }
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }
}