"use client";
import { useEffect, useState } from "react";
import styles from "./News.module.css";

const News = () => {
  const [news, setNews] = useState(
    typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("news")
      ? JSON.parse(localStorage.getItem("news"))
      : ["hi", "how", "are", "you", "a long long long text which will overflow eventually when I make it even longer and broader and heavier"]
  );

  const changeNews = (n) => {setNewsIndex((newsIndex + news.length + n) % news.length )}
  
  const [newsIndex, setNewsIndex] = useState(0);


  useEffect(() =>{
    const interval = setInterval(() => {changeNews(1)}, 2000);

    return () => clearInterval(interval);

  }, [newsIndex])
  
  return (
    <div className={styles.container}>
      <div className={styles.news}>
      {news[newsIndex]}
    </div>
    <div className={styles.sides} onClick={() => changeNews(-1)}/>
    <div className={`${styles.sides} ${styles.right}`} onClick={() => changeNews(1)}/>
    </div>
  );
};

export default News;
