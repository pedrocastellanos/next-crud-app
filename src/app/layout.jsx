import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { TaskProvider } from '@/context/TaskContext'
import './globals.css'
import { Toaster } from './Toaster'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <TaskProvider>
          <NavBar />
          <Layout>
            {children}
          </Layout>
          <Toaster />
        </TaskProvider>
      </body>
    </html>
  )
}
