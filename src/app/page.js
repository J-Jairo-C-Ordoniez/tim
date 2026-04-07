import Head from '@/components/home/header/Head'
import Main from '@/components/home/main/Main'

export default function Home() {
  return (
    <div className="bg-background h-screen w-screen text-foreground overflow-hidden select-none">
      <Head />
      <Main />
    </div>
  )
}
