import ApplicationAiLogo from "@/Components/ApplicationAiLogo";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { Eye, EyeOff, Loader, Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InputLabel from "@/Components/InputLabel";
import logo from "../../assets/logo.png";
import logoLogin from "../../assets/LoginImage.png";
export default function Login({ status, canResetPassword }) {
    const user = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    const handleSocialLogin = (provider) => {
        window.location.href = route("socialite.redirect", provider);
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {/* Card Horizontale - max 95% de hauteur et largeur */}
            <div className="w-[95vw] max-w-6xl h-[95vh] rounded-2xl sm:rounded-3xl border-[6px] border-zinc-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden bg-white">
                {/* Pattern de fond subtil */}
                <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] z-0"
                    style={{
                        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                    }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full">
                    {/* LEFT SIDE - Formulaire */}
                    <div className="p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-center overflow-y-auto">
                        {/* Header */}
                        <div className="mb-3 sm:mb-4">
                            <Link href="/" className="inline-block mb-2 sm:mb-3">
                                <img
                                    src={logo}
                                    className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto hover:scale-105 transition-transform duration-200"
                                    alt="AI Resume Builder Logo"
                                />
                            </Link>

                            <h1 className="text-zinc-800 text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight mb-1">
                                WELCOME BACK!
                            </h1>
                            <p className="text-zinc-600 text-xs sm:text-sm font-medium">
                                Sign in to continue building your perfect resume
                            </p>
                        </div>

                        {status && (
                            <div className="mb-3 p-2 sm:p-2.5 bg-green-100 rounded-lg border-[2px] border-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                                <p className="text-xs font-bold text-green-800 text-center">{status}</p>
                            </div>
                        )}

                        {!user ? (
                            <form onSubmit={submit} className="space-y-2.5 sm:space-y-3">
                                {/* Email */}
                                <div>
                                    <InputLabel
                                        htmlFor="email"
                                        className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1 sm:mb-1.5 flex items-center gap-1.5"
                                    >
                                        <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        EMAIL
                                    </InputLabel>
                                    <TextInput
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="exemple@email.com"
                                        value={data.email}
                                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData("email", e.target.value)}
                                    />
                                    <InputError message={errors.email} className="mt-1 font-bold text-xs" />
                                </div>

                                {/* Password */}
                                <div>
                                    <InputLabel
                                        htmlFor="password"
                                        className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1 sm:mb-1.5 flex items-center gap-1.5"
                                    >
                                        <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        PASSWORD
                                    </InputLabel>
                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="••••••••••"
                                            value={data.password}
                                            className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 pr-9 sm:pr-10 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                            autoComplete="current-password"
                                            onChange={(e) => setData("password", e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-100 rounded transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600" />
                                            ) : (
                                                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-600" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-1 font-bold text-xs" />
                                </div>

                                {/* Remember & Forgot - FLEX BETWEEN */}
                                <div className="flex items-center justify-between pt-1">
                                    <label className="flex items-center group cursor-pointer">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData("remember", e.target.checked)}
                                            className="border-[2px] border-zinc-800 rounded w-3 h-3 sm:w-3.5 sm:h-3.5"
                                        />
                                        <span className="ml-1.5 text-xs font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors">
                                            Se souvenir de moi
                                        </span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs font-black text-zinc-700 hover:text-blue-800 uppercase tracking-wide transition-colors hover:underline whitespace-nowrap"
                                        >
                                            Mot de passe oublié?
                                        </Link>
                                    )}
                                </div>

                                {/* Sign In Button */}
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm font-black uppercase tracking-wide rounded-lg text-white bg-gradient-to-br from-orange-400 to-orange-500 border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-3 sm:mt-4"
                                >
                                    {processing ? (
                                        <>
                                            <Loader size={14} className="animate-spin sm:w-4 sm:h-4" />
                                            <span>Loading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                            <span>SE CONNECTER</span>
                                        </>
                                    )}
                                </PrimaryButton>

                                {/* Register Link - FLEX BETWEEN */}
                                <div className="flex items-center justify-between pt-1.5 sm:pt-2">
                                    <p className="text-xs font-medium text-zinc-700">
                                        Vous n'avez pas de compte?
                                    </p>
                                    <Link
                                        href={route("register")}
                                        className="font-black text-zinc-700 hover:text-blue-800 text-xs uppercase tracking-wide transition-colors hover:underline inline-flex items-center gap-1 whitespace-nowrap"
                                    >
                                        <UserPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                        <span>INSCRIVEZ-VOUS</span>
                                    </Link>
                                </div>

                                {/* Divider */}
                                <div className="relative py-2 sm:py-2.5">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t-2 border-zinc-300"></div>
                                    </div>
                                    <div className="relative flex justify-center">
                                        <span className="px-2 bg-white text-xs font-black uppercase tracking-wide text-zinc-500">
                                            OR
                                        </span>
                                    </div>
                                </div>

                                {/* Social Login - Version Mobile AVEC LABELS */}
                                <div className="flex sm:hidden flex-col gap-2">
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin("google")}
                                        className="flex items-center justify-between w-full px-3 py-2.5 bg-white rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
                                        aria-label="Sign in with Google"
                                    >
                                        <span className="text-xs font-black text-zinc-800 uppercase">Continuer avec</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-zinc-800 uppercase">Google</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" className="group-hover:scale-110 transition-transform" viewBox="0 0 512 512">
                                                <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                                                <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                                                <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                                                <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                                                <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                                                <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                                            </svg>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin("github")}
                                        className="flex items-center justify-between w-full px-3 py-2.5 bg-white rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
                                        aria-label="Sign in with GitHub"
                                    >
                                        <span className="text-xs font-black text-zinc-800 uppercase">Continuer avec</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-zinc-800 uppercase">GitHub</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" className="group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </div>
                                    </button>

                                    <button
                                        type="button"
                                        className="flex items-center justify-between w-full px-3 py-2.5 bg-white rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
                                        aria-label="Sign in with Facebook"
                                    >
                                        <span className="text-xs font-black text-zinc-800 uppercase">Continuer avec</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-black text-zinc-800 uppercase">Facebook</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#007bff" className="group-hover:scale-110 transition-transform" viewBox="0 0 167.657 167.657">
                                                <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" />
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                                {/* Social Login - Version Desktop/Tablet */}
                                <div className="hidden sm:flex justify-center gap-2 md:gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin("google")}
                                        className="flex flex-col items-center justify-center w-20 md:w-24 py-2.5 md:py-3 bg-white rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
                                        aria-label="Sign in with Google"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="group-hover:scale-110 transition-transform mb-1" viewBox="0 0 512 512">
                                            <path fill="#fbbd00" d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z" />
                                            <path fill="#0f9d58" d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z" />
                                            <path fill="#31aa52" d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z" />
                                            <path fill="#3c79e6" d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z" />
                                            <path fill="#cf2d48" d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z" />
                                            <path fill="#eb4132" d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z" />
                                        </svg>
                                        <span className="text-xs font-black text-zinc-800">Google</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleSocialLogin("github")}
                                        className="flex flex-col items-center justify-center w-20 md:w-24 py-2.5 md:py-3 bg-white rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
                                        aria-label="Sign in with GitHub"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="group-hover:scale-110 transition-transform mb-1" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-xs font-black text-zinc-800">GitHub</span>
                                    </button>

                                    <button
                                        type="button"
                                        className="flex flex-col items-center justify-center w-20 md:w-24 py-2.5 md:py-3 bg-white rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 group"
                                        aria-label="Sign in with Facebook"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#007bff" className="group-hover:scale-110 transition-transform mb-1" viewBox="0 0 167.657 167.657">
                                            <path d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z" />
                                        </svg>
                                        <span className="text-xs font-black text-zinc-800">Facebook</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <Link
                                href={route("dashboard")}
                                className="w-full py-2.5 px-4 text-sm font-black uppercase tracking-wide rounded-lg text-white bg-gradient-to-br from-orange-400 to-orange-500 border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                {processing && <Loader size={16} className="animate-spin" />}
                                <span>{t("Dashboard")}</span>
                            </Link>
                        )}
                    </div>

                    {/* RIGHT SIDE - Image générée */}
                    <div className="hidden lg:flex bg-gradient-to-br from-orange-400 to-orange-500 p-0 flex-col items-center justify-center relative overflow-hidden border-l-[6px] border-zinc-800">
                        {/* Image générée en plein écran */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <img
                                src={logoLogin}
                                alt="AI Resume Builder - Login Illustration"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback si l'image n'existe pas encore
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = '<div class="text-white text-center p-8"><p class="text-2xl font-black uppercase mb-4">AI Resume Builder</p><p class="text-sm">Placez votre image générée dans:<br/><code class="bg-white/20 px-2 py-1 rounded">public/images/login-illustration.png</code></p></div>';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
