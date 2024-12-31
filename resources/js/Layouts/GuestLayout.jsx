

export default function GuestLayout({ children }) {
    return (
        <div
                className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
                style={{
                    backgroundImage: "url(https://readymadeui.com/background-image.webp)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
            {/* <div className="mt-6 w-full overflow-hidden bg-black px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg"> */}
                {children}
            {/* </div> */}
        </div>
    );
}
