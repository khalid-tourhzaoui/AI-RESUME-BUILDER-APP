import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Lock, Shield, Loader } from 'lucide-react';
import { useState } from 'react';
import logo from "../../assets/logo.png";

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            {/* Card Centrée */}
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl sm:rounded-3xl border-[6px] border-zinc-800 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.4)] overflow-hidden">
                    {/* Pattern de fond subtil */}
                    <div
                        className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-[0.03] z-0"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 4px)",
                        }}
                    />

                    <div className="relative z-10 p-6 sm:p-8 md:p-10">
                        {/* Header */}
                        <div className="mb-6 text-center">
                            <Link href="/" className="inline-block mb-4">
                                <img
                                    src={logo}
                                    className="h-14 sm:h-16 w-auto mx-auto hover:scale-105 transition-transform duration-200"
                                    alt="AI Resume Builder Logo"
                                />
                            </Link>

                            <h1 className="text-zinc-800 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-2">
                                CONFIRM PASSWORD
                            </h1>
                            <p className="text-zinc-600 text-sm font-medium">
                                This is a secure area. Please confirm your password before continuing.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            {/* Password */}
                            <div>
                                <InputLabel
                                    htmlFor="password"
                                    className="text-xs font-black uppercase tracking-wide text-zinc-700 mb-1.5 flex items-center gap-1.5"
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                    PASSWORD
                                </InputLabel>
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                    isFocused={true}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-1 font-bold text-xs" />
                            </div>

                            {/* Submit Button */}
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="w-full py-2.5 px-4 text-sm font-black uppercase tracking-wide rounded-lg text-white bg-gradient-to-br from-orange-400 to-orange-500 border-[2px] border-zinc-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-6"
                            >
                                {processing ? (
                                    <>
                                        <Loader size={16} className="animate-spin" />
                                        <span>Confirming...</span>
                                    </>
                                ) : (
                                    <>
                                        <Shield className="w-4 h-4" />
                                        <span>Confirm</span>
                                    </>
                                )}
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
