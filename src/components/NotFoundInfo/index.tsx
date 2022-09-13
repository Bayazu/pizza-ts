import React, { FC } from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundInfo: FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundInfo;
