import Footer from "@/components/Footer";

export const metadata = {
    title: "User - Motivation Blog",
    description: "Your daily dose of motivation and inspiration.",
};

export default function UserLayout({ children }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}
