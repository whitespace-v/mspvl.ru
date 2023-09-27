import React, { useEffect } from 'react';
import classes from '../../styles/Price/PriceCatalog.module.scss';
import PriceCatalogItem from './PriceCatalogItem';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCatalogCategories } from '../../store/ActionCreators/PriceActionCreators';
import { Element } from 'react-scroll';

const PriceCatalog = () => {
	const { catalogCategories } = useAppSelector((state) => state.priceReducer);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchCatalogCategories());
	}, [dispatch]);

	return (
		<div className={classes['PriceCatalog']}>
			{catalogCategories.map((item) => (
				<Element key={item.id} name={String(item.id)}>
					<PriceCatalogItem name={item.name} img={item.img} id={item.id} />
				</Element>
			))}
		</div>
	);
};

export default PriceCatalog;
