import { Header } from "@/components/header";

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}