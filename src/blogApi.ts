import { Article } from '@/types/types';
import axios from 'axios';
import {notFound} from "next/navigation";

export const getAllArticles = async (): Promise<Article[]> => {
  //fetchで記述する場合
  // const res = await fetch(`http://localhost:3001/posts`,{cache: "no-store"})
  // // SSR : "no-store"
  // // SSG : "no-force"
  // const articles = await res.json()

  //axiosで記述する場合 axiosは直接cacheオプションをサポートしていないので、headerのcatche-controleに直接渡す
  const res = await axios.get(`http://localhost:3001/posts`, {
    headers: {
      'Cache-Control': 'no-store', // SSRの際にキャッシュを無効にする
    },
  });
  if (!res) throw new Error();
  const articles = res.data;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return articles;
};

export const getDetailArticle = async (id: string | string[] | undefined): Promise<Article> => {
    //ISR
  //axiosはnextオプションに対応していない＆リクエストヘッダーにも書けないので、ISRの時はfetchの方が良さそう
  const res = await fetch(`http://localhost:3001/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
      notFound()
  }

  if (!res) throw new Error();
  const articles = res.json();


  await new Promise((resolve) => setTimeout(resolve, 1000));

  return articles;
};

export const createArticle = async (id: string, title:string, content:string): Promise<Article> => {

  const currentDateTime = new Date().toISOString()
  const res = await axios.post("http://localhost:3001/posts",{id,title,content,createdAt: currentDateTime})


  if (!res) throw new Error();
  const newArticles = res.data


  await new Promise((resolve) => setTimeout(resolve, 1000));

  return newArticles
};

export const deleteArticle = async (id: string): Promise<Article> => {

  const currentDateTime = new Date().toISOString()
  const res = await axios.delete(`http://localhost:3001/posts/${id}`)


  if (!res) throw new Error();
  const deleteArticles = res.data


  await new Promise((resolve) => setTimeout(resolve, 1000));

  return deleteArticles
};
