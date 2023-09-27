import { AppDispatch } from '../store';
import { $authHost, $host } from '../../hof/http';
import imageCompression from 'browser-image-compression';
import { ICatalogCategory, ICatalogProduct } from '../../models/BaseItems';
import { priceSlice } from '../slices/PriceSlice';

export const createCatalogCategory = (category: string, image: FileList) => async (dispatch: AppDispatch) => {
	try {
		dispatch(priceSlice.actions.loading());
		const minImage = await imageCompression(image[0], { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true });
		const data = new FormData();
		data.append('name', category);
		data.append('img', minImage);
		await $authHost.post('api/price/category', data);
		dispatch(priceSlice.actions.success());
	} catch (e) {
		dispatch(priceSlice.actions.error());
	}
};

export const createCatalogProduct = (category: ICatalogCategory, name: string) => async (dispatch: AppDispatch) => {
	try {
		dispatch(priceSlice.actions.loading());
		const data = new FormData();
		data.append('name', name);
		data.append('priceCategoryId', category.id.toString());
		await $authHost.post('api/price/item', data);
		dispatch(priceSlice.actions.success());
	} catch (e) {
		dispatch(priceSlice.actions.error());
	}
};

export const fetchCatalogCategories = () => async (dispatch: AppDispatch) => {
	try {
		dispatch(priceSlice.actions.loading());
		const { data } = await $host.get('api/price');
		dispatch(priceSlice.actions.fetchingCatalogCategoriesSuccess(data));
	} catch (e) {
		dispatch(priceSlice.actions.error());
	}
};

export const setCurrentCatalogCategory = (category: ICatalogCategory) => (dispatch: AppDispatch) => {
	dispatch(priceSlice.actions.loading());
	dispatch(priceSlice.actions.setCurrentCatalogCategory(category));
	dispatch(priceSlice.actions.success());
};
export const setDefaultCatalogCategory = () => (dispatch: AppDispatch) => {
	dispatch(priceSlice.actions.loading());
	dispatch(priceSlice.actions.setDefaultCatalogCategory());
	dispatch(priceSlice.actions.success());
};
export const deleteCatalogCategory = (category: ICatalogCategory) => async (dispatch: AppDispatch) => {
	try {
		dispatch(priceSlice.actions.loading());
		await $authHost({ method: 'DELETE', url: `api/price/category/${category.id}` });
		dispatch(priceSlice.actions.setCurrentCatalogCategory(category));
	} catch (e) {
		dispatch(priceSlice.actions.error());
	}
};

export const deleteCatalogProduct = (product: ICatalogProduct) => async (dispatch: AppDispatch) => {
	try {
		dispatch(priceSlice.actions.loading());
		 await $authHost({ method: 'DELETE', url: `api/price/item/${product.id}` });
		dispatch(priceSlice.actions.success());
	} catch (e) {
		dispatch(priceSlice.actions.error());
	}
};

export const setPage = (page: number) => (dispatch: AppDispatch) => {
	dispatch(priceSlice.actions.setPage(page));
};
