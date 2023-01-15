import React from 'react';
import classes from '../styles/Components/ComponentLoader.module.scss'

const ComponentLoader = () => {
    return (
        <div className={classes['Loader']}>
            <div className={classes['Loader-container']}>
                <div className={classes['cube']}>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </div>
        </div>
    );
};

export default ComponentLoader;