import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, AlertTriangle, Shield, Zap, XCircle } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();
    const { t } = useTranslation();
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`${className}`}>
            {/* Header with CRT Monitor Style */}
            <div className="bg-white border-b-4 border-zinc-800 px-4 sm:px-6 py-3 sm:py-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="bg-red-400 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <span className="bg-yellow-400 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <span className="bg-green-500 h-3 w-3 sm:h-4 sm:w-4 rounded-full border-2 border-zinc-800"></span>
                    <h2 className="text-sm sm:text-base md:text-lg font-black uppercase ml-2 flex items-center gap-2">
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                        {t("Delete_Account")}
                    </h2>
                </div>
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>

            {/* Content Area */}
            <div className="bg-yellow-100 border-4 border-t-0 border-zinc-800 rounded-b-xl p-4 sm:p-6 md:p-8">
                {/* Warning Message */}
                {/* <div className="bg-red-100 border-3 border-zinc-800 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 relative z-10">
                    <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm font-mono text-red-800">
                            {t("delete_text")}
                        </p>
                    </div>
                </div> */}

                {/* Delete Button */}
                <button
                    onClick={confirmUserDeletion}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-3 sm:py-4 rounded-lg sm:rounded-xl border-3 sm:border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 uppercase tracking-wide text-sm sm:text-base relative z-10"
                >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t("Delete_Account")}
                </button>
            </div>

            {/* Modal */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <div className="bg-zinc-100 border-4 border-zinc-800 rounded-2xl overflow-hidden">
                    {/* Modal Header */}
                    <div className="bg-red-500 border-b-4 border-zinc-800 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-6 h-6 text-white" />
                            <h2 className="text-lg font-black uppercase text-white">
                                {t("Are_you_sure_you_want_to_delete_your_account?")}
                            </h2>
                        </div>
                    </div>

                    <form onSubmit={deleteUser} className="p-6">
                        {/* Warning Box */}
                        <div className="bg-yellow-100 border-3 border-zinc-800 rounded-lg p-4 mb-6 relative z-10">
                            <p className="text-sm font-mono text-zinc-800 flex items-center gap-2">
                                <Shield className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                {t("delete_text")}
                            </p>
                        </div>

                        {/* Password Input */}
                        <div className="bg-white border-3 border-zinc-800 rounded-lg p-4 mb-6 relative z-10">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="!text-sm font-black uppercase text-zinc-800 mb-2 flex items-center gap-2"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="block w-full border-2 border-zinc-800 rounded focus:border-red-400 focus:ring-red-400"
                                isFocused
                                placeholder={t("Enter_your_password")}
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 relative z-10">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="flex-1 bg-white hover:bg-gray-100 text-zinc-800 font-black py-3 sm:py-4 rounded-lg sm:rounded-xl border-3 sm:border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 uppercase tracking-wide text-sm sm:text-base"
                            >
                                <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                {t("Cancel")}
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black py-3 sm:py-4 rounded-lg sm:rounded-xl border-3 sm:border-4 border-zinc-800 shadow-[rgba(0,0,0,0.9)_0px_4px_0px_0px] sm:shadow-[rgba(0,0,0,0.9)_0px_6px_0px_0px] hover:shadow-[rgba(0,0,0,0.9)_0px_2px_0px_0px] hover:translate-y-1 transition-all duration-150 flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 sm:border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t("Deleting...")}
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        {t("Delete_Account")}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </section>
    );
}
