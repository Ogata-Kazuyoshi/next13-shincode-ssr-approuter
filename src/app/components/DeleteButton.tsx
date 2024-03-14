"use client"
import React, {useState} from "react";
import {deleteArticle} from "@/blogApi";
import {useRouter} from "next/navigation";

type Props = {
    id : string
}
const DeleteButton:React.FC<Props> = ({id}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleDelete = async () => {
        setLoading(true)
        await deleteArticle(id)
        setLoading(false)
        router.push("/")
        router.refresh()
    }
    return <div>
        <button  onClick={handleDelete}
                 className={`py-2 px-5 border rounded-md bg-red-500  ${loading
                     ? "bg-orange-400 cursor-not-allowed"
                     : "bg-orange-500 hover:bg-red-600"}`}
                 disabled={loading}
        >
            削除
        </button>
    </div>
}
export default DeleteButton