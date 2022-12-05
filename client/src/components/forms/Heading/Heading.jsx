import React from 'react'
import styles from './Heading.module.scss';

const Heading = ({heading}) => {
        return <h2 className={styles.title}>{heading}</h2>
}

export default Heading;