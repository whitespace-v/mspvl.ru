import React from 'react';
import classes from '../styles/Components/Footer.module.scss'
import {FaMapMarkerAlt, FaPhoneAlt, FaRegClock} from "react-icons/fa";
import Layout from "./Layout";
import logo from '../assets/logo.png'
import {FiMail} from "react-icons/fi";

const Footer = () => {
    return (
        <div className={classes['Footer-container']}>
            <Layout>
                <div className={classes['Footer']}>
                    <div className={classes['Footer__logo']}>
                        <img src={logo} alt=""/>
                    </div>
                    <div className={classes['Footer__column']}>
                        <div className={classes['Footer__column-title']}>
                            Адрес:
                        </div>
                        <div className={classes['Footer__column-text']}>
                            <FaMapMarkerAlt/> г. Владивосток ул. Калинина 42/7 офис 128 (8)
                        </div>
                        <div className={classes['Footer__column-text']}>
                            <FaRegClock/> Пн-Сб 9:00-18:00, Вс - выходной
                        </div>
                    </div>
                    <div className={classes['Footer__column']}>
                        <div className={classes['Footer__column-title']}>
                            Телефоны:
                        </div>
                        <div className={classes['Footer__column-text']} onClick={() => window.open('tel:+79269418872', '_self')}>
                            <FaPhoneAlt/> +7 (926) 941-88-72
                        </div>
                        <div className={classes['Footer__column-text']} onClick={() => window.open('tel:+79510222763', '_self')}>
                            <FaPhoneAlt/> +7 (951) 022-27-63
                        </div>
                    </div>
                    <div className={classes['Footer__column']}>
                        <div className={classes['Footer__column-title']}>
                           Электронная почта:
                        </div>
                        {/*<div className={classes['Footer__column-text']}>*/}
                        {/*    <FaVk/> company_example*/}
                        {/*</div>*/}
                        {/*<div className={classes['Footer__column-text']}>*/}
                        {/*    <FaTelegram/> company_example*/}
                        {/*</div>*/}
                        {/*<div className={classes['Footer__column-text']}>*/}
                        {/*    <FaInstagram/> company_example*/}
                        {/*</div>*/}
                        <div className={classes['Footer__column-text']}>
                            Заявки: <FiMail/> offers@mspvl.ru
                        </div>
                        <div className={classes['Footer__column-text']}>
                            Для резюме: <FiMail/> hr@mspvl.ru
                        </div>
                    </div>
                </div>
            </Layout>
        </div>

    );
};

export default Footer;