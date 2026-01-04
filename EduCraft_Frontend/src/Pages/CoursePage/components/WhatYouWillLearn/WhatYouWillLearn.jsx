import React from 'react';
import styles from './WhatYouWillLearn.module.css';
import { CircleCheckBig } from 'lucide-react';

const WhatYouWillLearn = ({ heading = "What you'll learn", items = [] }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>{heading}</h3>
      <ul className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx} className={styles.listItem}>
            <span><CircleCheckBig className={styles.check}/></span>
            <span className={styles.itemText}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhatYouWillLearn;
