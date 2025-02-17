'use client'
import type { Schema } from '@/data-schema'
import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'
import { useCallback, useEffect } from 'react'
import awsconfig from '../amplify_outputs.json'
import './globals.css'

Amplify.configure(awsconfig)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const client = generateClient<Schema>()

  const createTodo = useCallback(async () => {
    await client.models.Todo.create({
      content: 'Test',
    })
  }, [client])

  useEffect(() => {
    createTodo()
  }, [createTodo])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
