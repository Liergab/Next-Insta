/* eslint-disable @next/next/no-img-element */
"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const News = () => {
  const [news, setNews] = useState([])
  const [articleNum, setArticleNum] = useState(3)

  useEffect(() => {
    fetch('https://saurav.tech/NewsAPI/top-headlines/category/business/us.json')
    .then((res) => res.json()).then((data) => {
      setNews(data.articles)
    })
  },[])
  return (
    <div className='space-y-3 text-slate-600 bg-gray-100 rounded-xl p-4 overflow-y-auto'>
      <h1 className='font-bold  px-3'>Global News 2024</h1>
      {news.slice(0, articleNum).map((article) => (
        <div key={article.url}>
          <a href={article.url} target='_blank'></a>
          <div className='flex items-center hover:bg-slate-300 p-2 rounded-md cursor-pointer transition-all duration-300'>
            <div className='space-y-0.5'>
              <h6 className='font-bold text-sm'>{article.title}</h6>
              <p className='text-xs  font-medium text-slate-500'>{article.source.name}</p>
            </div>
            <img src={article.urlToImage} alt={article.title} width={70} height={70} className='rounded-md w-24' />
          </div>
        </div>
      ))}
      <button onClick={() => setArticleNum(articleNum+3)} className='border font-bold border-slate-400 px-10 py-2 rounded-md bg-slate-300 dark:bg-transparent dark:hover:bg-slate-300 hover:brightness-95 transition-all duration-300 shadow-md'>
        Load More
      </button>
    </div>
  )
}

export default News