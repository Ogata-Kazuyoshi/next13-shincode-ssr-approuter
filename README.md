# Next.js13の基本コード（Approuter）

<details open="open">
<summary>目次</summary>



- [Nextjsセットアップ](#Nextjsセットアップ)
- [CSRの書き方](#CSRの書き方)
- [クライアントサイドしか使用できない](#クライアントサイドしか使用できない)
- [suspenseについて](#suspenseについて)
- [ダイナミックルーティング](#ダイナミックルーティング)
- [デプロイ関係](#デプロイ関係)


- [参考](#参考)

</details>

# Nextjsセットアップ

<summary> 1. 下記コマンドでNextAppを作成</summary>


```zh
 npx create-next-app@latest
```

<summary> 2. 下記の設定を聞かれる</summary>

```zh
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like to use `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes => AppRouterにするとpage.tsxしかルーティングできなくなる
Would you like to customize the default import alias (@/*)? No / Yes
What import alias would you like configured? @/*
```

# CSRの書き方
- CSR(client side rendering)はNextjsではデフォルでは実行できな（デフォがSSR）
- useEffectやuseStateなどのメソッドはCSR用のメソッドで使用できない。
- CSRでレンダリングしたい時は下記の様に、use clientを書いてあげる
- CSR：初回レンダリングがClient依存のため遅い。２回目以降はキャッシュデータを使用
- SSR：初回レンダリングは早い。２回目以降も毎回サーバー側でレンダリングするのでCSRより遅い

```tsx
'use client'

export default  function Home() {
    useEffect(() => {
        const getArticle = async () => {
            const res = await fetch('http://localhost/3001/posts', {cache: "force-cache"})
            return await res.json()
        }
        getArticle()
    })

    return (
        <div className='md:flex'>
            <section className='w-full md:w-2/3 flex flex-col items-center px-3'>
                <ArticleList articles={articles}/>
            </section>
            ....
        </div>)
}
```

# クライアントサイドしか使用できない

- 下記はサーバーサイドでは使用できなくてデフォルトではエラーになる。そのため、必要に応じて、コンポーネントを分ける
- ページ内の一部はSSR、一部はCSRの様に適宜切り分けを実施する
- useState, useEffect, onClick, onSubmitなどなど

# suspenseについて

- 子供の要素がLoadingされるまでの間表示しておきたいコンポーネントをsuspenseコンポーネントのfallbackで定義
- Loadingのぐるぐるなどを表示したいときに使う

```tsx
<Suspense fallback={<Loading />}>
    {children}
</Suspense>
```

# ダイナミックルーティング

- 呼び出し側はLinkタグのhref属性で飛びにいく

```tsx
<Link href={`/articles/${article.id}`} />
```

- 遷移先のpageの作成は、app配下に該当のパスに相当するフォルダ階層を設ける
- page.tsxのパスパラメータで指定したい変数名をもったフォルダを作成。今回の例は [id] フォルダを作成

```tsx
const Article:React.FC<GetStaticPropsContext> = async ({params}) => {
    const detailArticle = await getDetailArticle(params?.id)

    return <div >
        <h1>{detailArticle.title}</h1>
        <div>
            <p>{detailArticle.content}</p>
        </div>
    </div>
}
export default Article
```

# デプロイ関係

- supabaseのDBを使用してVercelにデプロイ
- 設定した環境変数は①SupabaseURL②SupabaseANON _KEY③Vercelドメイン
- json.parse()の部分がうまく走らず、axiosを使用した形に変更
- app/page.tsxを仮にCSRで書き直した場合をコメントアウトで残しておく

[verselリンク]URL(https://next13-shincode-ssr-approuter-g5t67.vercel.app/)
[supabaseURL]URL(https://supabase.com/dashboard/project/lcbhcmaqosvqckbhroxq/editor/28645)




# 参考
- [Nextjsの公式ドキュメント](https://nextjs.org/docs)
