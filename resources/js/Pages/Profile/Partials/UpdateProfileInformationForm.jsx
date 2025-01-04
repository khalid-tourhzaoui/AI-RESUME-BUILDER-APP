import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const { t }=useTranslation();
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-white">
                    {t("Profile_Information")}
                </h2>

                <p className="mt-1 text-sm font-medium text-[#eeeeee]">
                    {t("Update_your_account's_profile_information_and_email_address.")}
                </p>
            </header>


            <form onSubmit={submit} className="mt-3 space-y-6">

                <div>
                    <InputLabel htmlFor="name" value="Name" className='!text-md text-white' />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        placeholder={t("Enter_your_name")}
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className='!text-md text-white'/>

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        placeholder={t("Enter_your_email")}
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            {t("Your_email_address_is_unverified.")}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {t("Click_here_to_re-send_the_verification_email.")}
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                {("A_new_verification_link_has_been_sent_to_your_email_address.")}
                            </div>
                        )}
                    </div>
                )}
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
                    <Button className="w-full" disabled={processing}>{t("Save_Changes")}</Button>
                </div>

            </form>
        </section>
    );
}
