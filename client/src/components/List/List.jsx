import React from "react";
import styles from "./List.module.css";
const List = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return (
          <section key={index}>
            <strong>Email: {item.email}</strong>
            <p>Number: {item.number}</p>
          </section>
        );
      })}
    </div>
  );
};

export default List;
