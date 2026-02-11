import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import { AlertCircle, Calendar, FlaskConical, GraduationCap, Loader, Medal, Plus, X, AlignLeft, Send } from "lucide-react";
import { debounce } from "lodash";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useTranslation } from "react-i18next";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";

const FormField = React.memo(({ label, icon, error, children, required }) => (
    <div className="col-span-1">
        <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
            {icon}
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
        </Label>
        {children}
        {error && (
            <div className="bg-red-100 border-[2px] border-zinc-800 rounded-lg mt-2 p-2 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]">
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-700 flex-shrink-0" />
                <p className="text-red-700 font-bold text-xs uppercase">
                    {error}
                </p>
            </div>
        )}
    </div>
));

function EducationForm({ handleNext, document }) {
    const { t } = useTranslation();

    const initialState = useMemo(() => ({
        id: undefined,
        docId: undefined,
        university_name: "",
        degree: "",
        major: "",
        description: "",
        start_date: "",
        end_date: "",
    }), []);

    const [educationList, setEducationList] = useState(() =>
        document?.education?.length ? document.education : [initialState]
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { put, post, delete: destroy, data, setData } = useForm({ education: educationList });

    const educationSchema = useMemo(
        () =>
            Yup.object().shape({
                university_name: Yup.string()
                    .required("University name is required")
                    .min(3),
                degree: Yup.string().required("Degree is required").min(3),
                major: Yup.string().required("Major is required"),
                description: Yup.string().max(1000),
                start_date: Yup.date().required("Start date is required"),
                end_date: Yup.date().required("End date is required"),
            }),
        []
    );

    const debouncedValidation = useMemo(
        () =>
            debounce(async (list) => {
                try {
                    const thumbnail = await generateThumbnail();
                    setData((prev) => ({ ...prev, education: list, thumbnail }));
                    await Promise.all(
                        list.map((exp) => educationSchema.validate(exp))
                    );
                    setIsFormValid(true);
                } catch (err) {
                    setIsFormValid(false);
                }
            }, 500),
        [educationSchema]
    );

    useEffect(() => {
        debouncedValidation(educationList);
        return () => debouncedValidation.cancel();
    }, [educationList]);

    const debouncedFieldValidation = useMemo(
        () =>
            debounce(async (index, field, value) => {
                try {
                    await educationSchema.validateAt(field, { [field]: value });
                    setErrors((prev) => {
                        const newErrors = [...prev];
                        if (newErrors[index]) delete newErrors[index][field];
                        return newErrors;
                    });
                } catch (err) {
                    setErrors((prev) => {
                        const newErrors = [...prev];
                        newErrors[index] = {
                            ...(newErrors[index] || {}),
                            [field]: err.message,
                        };
                        return newErrors;
                    });
                }
            }, 500),
        [educationSchema]
    );

    const handleChange = useCallback(
        (index, field, value) => {
            setEducationList((prev) =>
                prev.map((item, i) =>
                    i === index ? { ...item, [field]: value } : item
                )
            );
            debouncedFieldValidation(index, field, value);
        },
        [debouncedFieldValidation]
    );

    const addNewEducation = useCallback(
        () => setEducationList((prev) => [...prev, { ...initialState }]),
        [initialState]
    );

    const removeEducation = useCallback(
        async (index, id) => {
            setEducationList((prev) => prev.filter((_, i) => i !== index));
            if (id) {
                try {
                    await destroy(route("education.delete", id), {
                        data: { education: [{ id }] },
                    });
                } catch (error) {
                    console.error("Failed to delete education", error);
                }
            }
        },
        [destroy]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingEducation = document.education || [];
        const toUpdate = [], toAdd = [], toDelete = [];

        educationList.forEach((item) => {
            const existingItem = existingEducation.find(
                (exp) => exp.id === item.id
            );

            if (existingItem) {
                const hasChanged = Object.keys(item).some(
                    (key) => item[key] !== existingItem[key]
                );
                if (hasChanged) toUpdate.push(item);
            } else {
                toAdd.push(item);
            }
        });

        existingEducation.forEach((existingItem) => {
            if (!educationList.some((item) => item.id === existingItem.id)) {
                toDelete.push(existingItem);
            }
        });

        try {
            setLoading(true);
            if (toUpdate.length) {
                await put(route("education.update", document.id), {
                    education: toUpdate,
                });
            }

            if (toAdd.length) {
                await post(route("education.store", document.id), {
                    education: toAdd,
                });
            }

            if (toDelete.length) {
                await Promise.all(
                    toDelete.map(async (item) => {
                        await destroy(route("education.delete", item.id), {
                            data: { education: [item] },
                        });
                    })
                );
            }

            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save education details", error);
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, [])
            );
        } finally {
            setLoading(false);
        }
    };

    const renderFormFields = useCallback((item, index) => (
        <>
            <div className="col-span-2 sm:col-span-2 md:col-span-2">
                <FormField
                    label={t("University_Name")}
                    icon={<GraduationCap size={16} />}
                    error={errors[index]?.university_name}
                >
                    <Input
                        name="university_name"
                        placeholder={t("Enter_University_Name")}
                        required
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                        value={item.university_name || ""}
                        onChange={(e) =>
                            handleChange(index, e.target.name, e.target.value)
                        }
                    />
                </FormField>
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
                <FormField
                    label={t("Degree")}
                    icon={<Medal size={16} />}
                    error={errors[index]?.degree}
                >
                    <Input
                        name="degree"
                        placeholder={t("Enter_the_Degree")}
                        required
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                        value={item.degree || ""}
                        onChange={(e) =>
                            handleChange(index, e.target.name, e.target.value)
                        }
                    />
                </FormField>
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
                <FormField
                    label={t("Major")}
                    icon={<FlaskConical size={16} />}
                    error={errors[index]?.major}
                >
                    <Input
                        name="major"
                        placeholder={t("Enter_the_Major")}
                        required
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                        value={item.major || ""}
                        onChange={(e) =>
                            handleChange(index, e.target.name, e.target.value)
                        }
                    />
                </FormField>
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
                <FormField
                    label={t("Start_Date")}
                    icon={<Calendar size={16} />}
                    error={errors[index]?.start_date}
                >
                    <Input
                        name="start_date"
                        type="date"
                        required
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                        value={item.start_date || ""}
                        onChange={(e) =>
                            handleChange(index, e.target.name, e.target.value)
                        }
                    />
                </FormField>
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
                <FormField
                    label={t("End_Date")}
                    icon={<Calendar size={16} />}
                    error={errors[index]?.end_date}
                >
                    <Input
                        name="end_date"
                        type="date"
                        required
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                        value={item.end_date || ""}
                        onChange={(e) =>
                            handleChange(index, e.target.name, e.target.value)
                        }
                    />
                </FormField>
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-2">
                <FormField
                    label={t("Description")}
                    icon={<AlignLeft size={16} />}
                    error={errors[index]?.description}
                >
                    <Textarea
                        name="description"
                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium min-h-[100px]"
                        placeholder={t("Enter_the_Description")}
                        value={item.description || ""}
                        onChange={(e) =>
                            handleChange(index, e.target.name, e.target.value)
                        }
                    />
                </FormField>
            </div>
        </>
    ), [handleChange, errors, t]);

    return (
        <div className="w-full max-w-full mx-auto">
            <form onSubmit={handleSubmit}>
                {/* Education List Container */}
                <div className="bg-white border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-brutal overflow-hidden mb-4 sm:mb-5">
                    {educationList.map((item, index) => (
                        <div
                            key={index}
                            className={`relative p-4 sm:p-5 md:p-6 ${
                                index !== educationList.length - 1 ? 'border-b-[3px] border-zinc-800' : ''
                            }`}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4">
                                {educationList.length > 1 && (
                                    <Button
                                        variant="destructive"
                                        size="iconSm"
                                        type="button"
                                        disabled={loading}
                                        className="absolute -top-2 -right-2 rounded-full"
                                        onClick={() =>
                                            removeEducation(index, item.id)
                                        }
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}
                                {renderFormFields(item, index)}
                            </div>
                            {index === educationList.length - 1 &&
                                educationList.length < 5 && (
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="default"
                                        onClick={addNewEducation}
                                        className="w-full sm:w-auto"
                                    >
                                        <Plus className="w-4 h-4" />
                                        <span>{t("Add_More_Education")}</span>
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-start">
                    <Button
                        type="submit"
                        disabled={!isFormValid || loading}
                        variant="default"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                                <span className="hidden sm:inline">Saving...</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span>{t("Save_Changes")}</span>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EducationForm;
