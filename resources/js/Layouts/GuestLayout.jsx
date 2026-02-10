export default function GuestLayout({ children }) {
    return (
        <div
            className="flex justify-center items-center font-[sans-serif] h-screen w-screen overflow-hidden"
            style={{
                backgroundImage: "url(https://preline.co/assets/svg/examples/polygon-bg-element.svg)",
            }}
        >
            {children}
        </div>
    );
}
