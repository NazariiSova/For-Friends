'use client'
import React from 'react'
import Link from 'next/link'
import Layout from '@/app/layout'

export default function Custom404() {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">
          404 - Сторінку не знайдено
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          На жаль, ми не змогли знайти те, що ви шукаєте.
        </p>
        <Link href="/">
          <div className="mt-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-950">
            Повернутися на головну
          </div>
        </Link>
      </main>
    </Layout>
  )
}
