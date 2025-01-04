import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { useTranslation } from 'react-i18next';

export default function Edit({ mustVerifyEmail, status }) {
    const { t }=useTranslation();
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {t("Profile")}
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="flex justify-around items-center flex-wrap">
                    <div className="bg-[url('https://readymadeui.com/background-image.webp')] p-4 shadow sm:rounded-lg sm:p-8">

                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-[url('https://readymadeui.com/background-image.webp')] mt-4 p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                </div>
                <div className='mx-auto max-w-max mt-4 space-y-6 sm:px-6 lg:px-8'>
                    <div className="bg-[url('https://readymadeui.com/background-image.webp')] p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
