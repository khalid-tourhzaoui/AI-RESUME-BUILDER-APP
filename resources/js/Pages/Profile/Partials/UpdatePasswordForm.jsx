import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const { t } =useTranslation();
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
            <header>
                <h2 className="text-lg font-medium text-white">
                    {t("Update_Password")}
                </h2>

                <p className="mt-1 text-sm font-medium text-[#eeeeee]">
                    {t("Ensure_your_account_is_using_a_long_,_random_password_to_stay_secure.")}
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-2 space-y-4">
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                    <div className='col-span-1'>
                        <InputLabel
                            htmlFor="current_password"
                            value="Current Password"
                            className='!text-md text-white'
                        />

                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            type="password"
                            className="mt-1 block w-full"
                            placeholder={t("Enter_your_current_password")}
                            autoComplete="current-password"
                        />

                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    <div className='col-span-1'>
                        <InputLabel htmlFor="password" value="New Password" className='!text-md text-white' />

                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type="password"
                            placeholder={t("Enter_your_new_password")}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className='!text-md text-white'
                    />

                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        placeholder={t("Confirm_your_new_password")}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>
                <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-white">
                            {t("Saved.")}
                        </p>
                    </Transition>

                <div className="flex items-center gap-4">
                    <Button eedisabled={processing} className='w-full'>{t("Save_Changes")}</Button>
                </div>
            </form>
        </section>
    );
}
