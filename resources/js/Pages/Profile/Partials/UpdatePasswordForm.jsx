import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Key, CheckCircle2, Shield, Zap, Save } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const { t } = useTranslation();
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* Header with CRT Monitor Style */}
            <div className="bg-white border-b-4 border-zinc-800 px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="bg-red-400 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <span className="bg-yellow-400 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <span className="bg-green-500 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <h2 className="text-sm sm:text-base md:text-lg font-black uppercase ml-2 flex items-center gap-2">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                        {t("Update_Password")}
                    </h2>
                </div>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </div>

            {/* Content Area */}
            <div className="bg-yellow-100 border-4 border-t-0 border-zinc-800 rounded-b-xl p-4 sm:p-6 md:p-8">
                {/* Description */}
                {/* <div className="bg-yellow-100 border-3 border-zinc-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 relative z-10">
                    <p className="text-xs sm:text-sm font-mono text-zinc-700 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        {t("Ensure_your_account_is_using_a_long_,_random_password_to_stay_secure.")}
                    </p>
                </div> */}

                <form onSubmit={updatePassword} className="space-y-4 sm:space-y-6 relative z-10">
                    {/* Current Password Field */}
                    <div className="bg-white border-3 border-zinc-800 rounded-lg p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Key className="w-4 h-4 text-orange-500" />
                            <InputLabel
                                htmlFor="current_password"
                                value="Current Password"
                                className='!text-sm sm:!text-base font-black uppercase text-zinc-800'
                            />
                        </div>

                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            type="password"
                            className="mt-1 block w-full border-2 border-zinc-800 rounded focus:border-yellow-400 focus:ring-yellow-400"
                            placeholder={t("Enter_your_current_password")}
                            autoComplete="current-password"
                        />

                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    {/* New Password Grid */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                        {/* New Password Field */}
                        <div className='col-span-1 bg-white border-3 border-zinc-800 rounded-lg p-3 sm:p-4'>
                            <div className="flex items-center gap-2 mb-2">
                                <Lock className="w-4 h-4 text-orange-500" />
                                <InputLabel
                                    htmlFor="password"
                                    value="New Password"
                                    className='!text-sm sm:!text-base font-black uppercase text-zinc-800'
                                />
                            </div>

                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                type="password"
                                placeholder={t("Enter_your_new_password")}
                                className="mt-1 block w-full border-2 border-zinc-800 rounded focus:border-yellow-400 focus:ring-yellow-400"
                                autoComplete="new-password"
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* Confirm Password Field */}
                        <div className='col-span-1 bg-white border-3 border-zinc-800 rounded-lg p-3 sm:p-4'>
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                    className='!text-sm sm:!text-base font-black uppercase text-zinc-800'
                                />
                            </div>

                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                                type="password"
                                placeholder={t("Confirm_your_new_password")}
                                className="mt-1 block w-full border-2 border-zinc-800 rounded focus:border-yellow-400 focus:ring-yellow-400"
                                autoComplete="new-password"
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    {/* Success Message */}
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <div className="bg-green-100 border-3 border-zinc-800 rounded-lg p-3">
                            <p className="text-sm font-bold text-green-700 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                {t("Saved.")}
                            </p>
                        </div>
                    </Transition>

                    {/* Submit Button */}
                    <Button
                        disabled={processing}
                        className='w-full bg-orange-500 text-white font-black py-3 sm:py-4 rounded-lg sm:rounded-xl border-3 sm:border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base'
                    >
                        {processing ? (
                            <>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                {t("Saving...")}
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                                {t("Save_Changes")}
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </section>
    );
}
