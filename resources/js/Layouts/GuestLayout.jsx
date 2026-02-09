export default function GuestLayout({ children }) {
    return (
        <div
            className="flex justify-center items-center font-[sans-serif] h-screen w-screen overflow-hidden"
            style={{
                backgroundImage: "url(https://readymadeui.com/background-image.webp)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            {children}
        </div>
    );
}
