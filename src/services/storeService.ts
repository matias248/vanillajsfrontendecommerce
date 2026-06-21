import type { StoreDTO } from '../models/Store';
import axios, { type AxiosResponse } from 'axios';
import { currentStores } from '../localData/Stores';
import { currentProducts } from '../localData/Products';
import { filterStores, getNextId } from '../utils/sharedComponents/utilsFunctions';

const url = import.meta.env.VITE_APP_URL_API ?? "";

export const getStores = async (): Promise<StoreDTO[]> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        
        return currentStores;
    }
    try {
        const resp: AxiosResponse<StoreDTO[]> = await axios.get(url + "/stores/");
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const getStoresFilteredByNameCityCodeZip = async (text: string): Promise<StoreDTO[]> => {

    if (import.meta.env.VITE_APP_ENV === "test") {
        return filterStores(currentStores, text);
    }
    try {
        const resp: AxiosResponse<StoreDTO[]> = await axios.get(url + "/stores?textfilter=" + text);
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const getStoreById = async (storeId: number): Promise<StoreDTO> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        const store: StoreDTO | undefined = currentStores.find((store) => { return store.id === storeId });
        if (store)
            return Promise.resolve({...store});
        else {
            throw new Error('store not found!');
        }
    }
    try {
        const resp = await axios.get(url + "/stores/" + storeId);
        return resp.data;
    } catch (err) {
        throw err;
    }

};


export const updateStoreById = async (storeId: number, updateData: StoreDTO): Promise<StoreDTO> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        const id: number = currentStores.findIndex((store) => { return store.id === storeId });
        if (id !== -1) {
            currentStores[id] = updateData;
            return Promise.resolve({...currentStores[id]});
        }
        else {
            throw new Error('store not found!');
        }
    }
    try {
        const resp = await axios.patch(url + "/stores/" + storeId, updateData);
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const deleteStoreById = async (storeId: number): Promise<StoreDTO> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        const id: number = currentStores.findIndex((store) => { return store.id === storeId });
        if (id !== -1) {
            const storeDeleted = currentStores[id];
            currentStores.splice(id, 1)
            for (let i = currentProducts.length - 1; i >= 0; i--) {
                if (currentProducts[i].storeId === storeId) {
                    currentProducts.splice(i, 1);
                }
            }
            return Promise.resolve({...storeDeleted});
        }
        else {
            throw new Error('store not found!');
        }
    }
    try {
        const resp = await axios.delete(url + "/stores/" + storeId);
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const createStoreById = async (data: StoreDTO): Promise<StoreDTO> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        let storeToSet = data;
        storeToSet.id = getNextId(currentStores)
        currentStores.push(data);
        return Promise.resolve({...data});
    }
    try {
        const resp = await axios.post(url + "/stores/", data);
        return resp.data;
    } catch (err) {
        throw err;
    }
};