import Head from '@/components/admin/header/Head'
import Main from '@/components/admin/main/Main'

export default function AdminPage() {

    return (
        <div className="bg-background h-screen w-screen text-foreground overflow-hidden select-none">
            <Head />
            <Main />
        </div>
    )
}
