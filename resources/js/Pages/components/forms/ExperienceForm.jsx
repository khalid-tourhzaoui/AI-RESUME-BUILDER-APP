// ExperienceForm.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import {AlertCircle,Briefcase,Building,Calendar,Globe,MapPin,PlusCircleIcon,Send,X} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import RichTextEditor from "../editor";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const FormField = React.memo(({ label, icon, error, children }) => (
    <div className="col-span-1">
        <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
            {React.cloneElement(icon, { size: 16 })}
            {label}
        </Label>
        {children}
        {error && (
            <div className="bg-red-100 border-[2px] border-zinc-800 rounded-lg mt-2 p-2 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-700 flex-shrink-0" />
                <p className="text-red-700 font-bold text-xs uppercase">{error}</p>
            </div>
        )}
    </div>
));

const ExperienceForm = ({ handleNext, document }) => {
    const { t } = useTranslation();
    const initialState = useMemo(() => ({
        id: undefined,
        docId: undefined,
        title: "",
        company_name: "",
        city: "",
        country: "",
        start_date: "",
        end_date: "",
        work_summary: "",
        thumbnail: "",
        currentlyWorking: false,
    }), []);

    const [experienceList, setExperienceList] = useState(() =>
        document?.experience?.length ? document.experience : [initialState]
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const {put,post,delete: destroy,setData,processing} = useForm({ experience: experienceList });

    const experienceSchema = useMemo(() => Yup.object().shape({
        title: Yup.string().required("Position title is required").min(3, "Must be at least 3 characters"),
        company_name: Yup.string().required("Company name is required").min(3, "Must be at least 3 characters"),
        city: Yup.string().required("City is required").min(3, "Must be at least 3 characters"),
        country: Yup.string().required("Country is required").min(3, "Must be at least 3 characters"),
        start_date: Yup.date().required("Start date is required").typeError("Invalid start date"),
        end_date: Yup.date().required("End date is required"),
    }), []);

    const debouncedValidation = useMemo(
        () =>
            debounce(async (list) => {
                try {
                    const thumbnail = await generateThumbnail();
                    setData((prev) => ({ ...prev, experience: list, thumbnail }));
                    await Promise.all(list.map((exp) => experienceSchema.validate(exp)));
                    setIsFormValid(true);
                } catch (err) {
                    setIsFormValid(false);
                }
            }, 500),
        [experienceSchema]
    );

    useEffect(() => {
        debouncedValidation(experienceList);
        return () => debouncedValidation.cancel();
    }, [experienceList]);

    const debouncedFieldValidation = useMemo(
        () =>
            debounce(async (index, field, value) => {
                try {
                    await experienceSchema.validateAt(field, { [field]: value });
                    setErrors((prev) => {
                        const newErrors = [...prev];
                        if (newErrors[index]) delete newErrors[index][field];
                        return newErrors;
                    });
                } catch (err) {
                    setErrors((prev) => {
                        const newErrors = [...prev];
                        newErrors[index] = {...(newErrors[index] || {}),[field]: err.message,};
                        return newErrors;
                    });
                }
            }, 500),
        [experienceSchema]
    );

    const handleChange = useCallback((index, field, value) => {
        setExperienceList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        debouncedFieldValidation(index, field, value);
    }, [debouncedFieldValidation]);

    const handleEditorChange = useCallback((value, name, index) => {
        setExperienceList((prev) => {
            const newList = [...prev];
            newList[index] = { ...newList[index], [name]: value };
            return newList;
        });
    }, []);

    const addNewExperience = useCallback(() =>
        setExperienceList((prev) => [...prev, { ...initialState }]),
        [initialState]
    );

    const removeExperience = useCallback(async (index, id) => {
        setExperienceList((prev) => prev.filter((_, i) => i !== index));
        if (id) {
            try {
                await destroy(route("experience.delete", id), {data: { experience: [{ id }] }});
            } catch (error) {
                console.error("Failed to delete experience", error);
            }
        }
    }, [destroy]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const existingExperience = document.experience || [];
        const toUpdate = [], toAdd = [], toDelete = [];

        experienceList.forEach((item) => {
            const existingItem = existingExperience.find((exp) => exp.id === item.id);
            if (existingItem) {
                const hasChanged = Object.keys(item).some((key) => item[key] !== existingItem[key]);
                if (hasChanged) toUpdate.push(item);
            } else {
                toAdd.push(item);
            }
        });

        existingExperience.forEach((existingItem) => {
            if (!experienceList.some((item) => item.id === existingItem.id)) {
                toDelete.push(existingItem);
            }
        });

        try {
            setLoading(true);
            if (toUpdate.length) {
                await put(route("experience.update", document.id), {experience: toUpdate});
            }
            if (toAdd.length) {
                await post(route("experience.store", document.id), {experience: toAdd});
            }
            if (toDelete.length) {
                await Promise.all(toDelete.map(async (item) => {
                    await destroy(route("experience.delete", item.id), {data: { experience: [item] }});
                }));
            }
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save experience details", error);
            setErrors(error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, []));
        } finally {
            setLoading(false);
        }
    };

    const renderFormFields = useCallback((item, index) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4">
            <FormField label={t("Position_title")} icon={<Briefcase />} error={errors[index]?.title}>
                <Input name="title" placeholder={t("Enter_your_position_title")} required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                    value={item.title || ""} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            </FormField>
            <FormField label={t("Company_Name")} icon={<Building />} error={errors[index]?.company_name}>
                <Input name="company_name" placeholder={t("Enter_company_name")} required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                    value={item.company_name || ""} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            </FormField>
            <FormField label={t("City")} icon={<MapPin />} error={errors[index]?.city}>
                <Input name="city" placeholder={t("Enter_city")} required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                    value={item.city || ""} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            </FormField>
            <FormField label={t("Country")} icon={<Globe />} error={errors[index]?.country}>
                <Input name="country" placeholder={t("Enter_country")} required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                    value={item.country || ""} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            </FormField>
            <FormField label={t("Start_Date")} icon={<Calendar />} error={errors[index]?.start_date}>
                <Input name="start_date" type="date" required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                    value={item.start_date || ""} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            </FormField>
            <FormField label={t("End_Date")} icon={<Calendar />} error={errors[index]?.end_date}>
                <Input name="end_date" type="date" required
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                    value={item.end_date || ""} onChange={(e) => handleChange(index, e.target.name, e.target.value)} />
            </FormField>
            <div className="col-span-1 md:col-span-2 mt-2">
                <RichTextEditor jobTitle={item.title || ""} initialValue={item?.work_summary || ""}
                    onEditorChange={(value) => handleEditorChange(value, "work_summary", index)} />
            </div>
        </div>
    ), [handleChange, handleEditorChange, errors, t]);

    return (
        <div className="w-full max-w-full mx-auto">
            {/* <div className="bg-gradient-to-br from-orange-400 to-orange-500 border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-4 sm:p-5 md:p-6 mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                    <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    <h2 className="font-black text-lg sm:text-xl md:text-2xl uppercase text-white tracking-tight">
                        {t("Professional_Experience")}
                    </h2>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wide">
                    {t("Add_previous_job_experience")}
                </p>
            </div> */}

            <form onSubmit={handleSubmit}>
                <div className="bg-white border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden mb-4 sm:mb-5">
                    {experienceList.map((item, index) => (
                        <div key={index} className={`relative p-4 sm:p-5 md:p-6 ${index !== experienceList.length - 1 ? 'border-b-[3px] border-zinc-800' : ''}`}>
                            {experienceList.length > 1 && (
                                <Button variant="secondary" type="button"
                                    className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 text-white border-[2px] border-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-0 flex items-center justify-center z-10"
                                    onClick={() => removeExperience(index, item.id)}>
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                            {renderFormFields(item, index)}
                            {index === experienceList.length - 1 && experienceList.length < 5 && (
                                <Button type="button" onClick={addNewExperience}
                                    className="w-full sm:w-auto bg-blue-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-wide transition-all duration-200 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] hover:bg-blue-600 mt-3">
                                    <PlusCircleIcon className="w-4 h-4" />
                                    <span>{t("Add_More_Experience")}</span>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-start">
                    <Button type="submit" disabled={!isFormValid || processing}
                        className={`w-full sm:w-auto bg-gradient-to-br from-orange-400 to-orange-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-2 font-black uppercase text-sm tracking-wide transition-all duration-200 ${
                            !isFormValid || processing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px]'
                        }`}>
                        {loading ? (
                            <>
                                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
};

export default ExperienceForm;
