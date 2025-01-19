import {HttpClient} from "../../../shared/api/httpClient/HttpClient.ts";
import {Cat} from "../model/types.ts";

export const fetchCats = async (page: number, limit: number = 10): Promise<Cat[]> => {
    const response = await HttpClient.get(`/images/search`, {
        params: {
            limit,
            page,
            order: 'ASC',
        },
    });

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Failed to fetch cats: ${response.status}`);
};
