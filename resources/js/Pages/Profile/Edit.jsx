import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react';
import DateTimeDisplay from '../components/common/DateTimeDisplay ';

export default function Edit({ mustVerifyEmail, status }) {
    const { t } = useTranslation();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center space-x-2">
                        <User className="text-gray-800 text-2xl" />
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            {t('Profile')}
                        </h2>
                    </div>

                    <div>
                        <DateTimeDisplay />
                    </div>
                </div>
            }
        >
            <Head title="Profile" />

            <div className="py-8">
                {/* Main Content Grid */}
                <div className="max-w-8xl mx-auto px-1 sm:px-3 lg:px-4">
                    {/* Profile Information and Password Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-3">
                        {/* Profile Information Card */}
                        <div className="w-full">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="w-full"
                            />
                        </div>

                        {/* Update Password Card */}
                        <div className="w-full">
                            <UpdatePasswordForm className="w-full" />
                        </div>
                    </div>

                    {/* Delete Account Card - Full Width */}
                    <div className="w-full max-w-3xl mx-auto">
                        <DeleteUserForm className="w-full" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
