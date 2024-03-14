import Link from "next/link";
import Image from "next/image"
import React from "react";
import {Article} from "@/types/types";
import ArticleCard from "@/app/components/ArticleCard";

type Props = {
    articles : Article[]
}
const ArticleList:React.FC<Props> = (props) => {
    return <div>
        {props.articles.map(article => {
            return (
               <ArticleCard article={article} key={article.id} />
            )
        })}
    </div>
}
export default ArticleList