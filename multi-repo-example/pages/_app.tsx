'use client'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import type { Schema } from '@/data-schema'
import { Amplify } from 'aws-amplify'
import awsconfig from '../amplify_outputs.json'
import { useEffect } from 'react'
import { generateClient } from 'aws-amplify/data'

Amplify.configure(awsconfig)

const client = generateClient<Schema>()

export default function App({ Component, pageProps }: AppProps) {
  const createTodo = async () => {
    const todo = await client.models.Todo.create({
      content: 'My Todo',
    })
    console.log(todo)
  }

  useEffect(() => {
    createTodo()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.models.Todo.list()
      console.log(data)
    }
    fetchData()
  }, [])

  return <Component {...pageProps} />
}
