import {Article} from "@/types/types";
import axios from "axios";

export const getAllArticles = async ():Promise<Article[]> => {
    //fetchで記述する場合
    // const res = await fetch(`http://localhost:3001/posts`,{cache: "no-store"})
    // // SSR : "no-store"
    // // SSG : "no-force"
    // const articles = await res.json()

    //axiosで記述する場合 axiosは直接cacheオプションをサポートしていないので、headerのcatche-controleに直接渡す
    const res = await axios.get(`http://localhost:3001/posts`, {
        headers: {
            'Cache-Control': 'no-store' // SSRの際にキャッシュを無効にする
        }
    });
    const articles = res.data;
    return articles
}