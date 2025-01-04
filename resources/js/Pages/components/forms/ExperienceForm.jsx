import React, { useEffect, useState, useCallback, useMemo } from "react";
import { debounce } from "lodash";
import {AlertCircle,Briefcase,Building,Calendar,Globe,Loader,MapPin,PlusCircleIcon,Send,X} from "lucide-react";
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
        <Label className="text-md font-semibold">
            {label}
            <span className="text-[#f68c09] mx-1">
                ({React.cloneElement(icon, { size: 20, className: "inline-flex" })})
            </span> :
        </Label>
        {children}
        {error && (
            <p className="text-red-500 text-sm mt-3">
                (<AlertCircle size={20} className="inline-flex" />): {error}
            </p>
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

    const {
        put,
        post,
        delete: destroy,
        setData,
        processing
    } = useForm({ experience: experienceList });

    const experienceSchema = useMemo(() => Yup.object().shape({
        title: Yup.string().required("Position title is required").min(3, "Must be at least 3 characters"),
        company_name: Yup.string().required("Company name is required").min(3, "Must be at least 3 characters"),
        city: Yup.string().required("City is required").min(3, "Must be at least 3 characters"),
        country: Yup.string().required("Country is required").min(3, "Must be at least 3 characters"),
        start_date: Yup.date().required("Start date is required").typeError("Invalid start date"),
        end_date: Yup.date().required("End date is required"),
    }), []);

    //---------------------------------------------------------------------------------------------------------

    // );
    const debouncedValidation = useMemo(
        () =>
            debounce(async (list) => {
                try {
                    const thumbnail = await generateThumbnail();
                    setData((prev) => ({ ...prev, experience: list, thumbnail }));
                    await Promise.all(
                        list.map((exp) => experienceSchema.validate(exp))
                    );
                    setIsFormValid(true);
                } catch (err) {
                    setIsFormValid(false);
                }
            }, 500),
        [experienceSchema]
    );

    //---------------------------------------------------------------------------------------------------------

    useEffect(() => {
        debouncedValidation(experienceList);
        return () => debouncedValidation.cancel();
    }, [experienceList]);

    //---------------------------------------------------------------------------------------------------------

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
                        newErrors[index] = {
                            ...(newErrors[index] || {}),
                            [field]: err.message,
                        };
                        return newErrors;
                    });
                }
            }, 500),
        [experienceSchema]
    );

    //---------------------------------------------------------------------------------------------------------
    const handleChange = useCallback((index, field, value) => {
        setExperienceList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        debouncedFieldValidation(index, field, value);
    }, [debouncedFieldValidation]);
    //---------------------------------------------------------------------------------------------------------
    const handleEditorChange = useCallback((value, name, index) => {
        setExperienceList((prev) => {
            const newList = [...prev];
            newList[index] = { ...newList[index], [name]: value };
            return newList;
        });
    }, []);
    //---------------------------------------------------------------------------------------------------------
    const addNewExperience = useCallback(() =>
        setExperienceList((prev) => [...prev, { ...initialState }]),
        [initialState]
    );
    //---------------------------------------------------------------------------------------------------------
    const removeExperience = useCallback(async (index, id) => {
        setExperienceList((prev) => prev.filter((_, i) => i !== index));
        if (id) {
            try {
                await destroy(route("experience.delete", id), {
                    data: { experience: [{ id }] },
                });
            } catch (error) {
                console.error("Failed to delete experience", error);
            }
        }
    }, [destroy]);
    //---------------------------------------------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        const existingExperience = document.experience || [];

        const toUpdate = [], toAdd = [], toDelete = [];

        experienceList.forEach((item) => {
            const existingItem = existingExperience.find(
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

        existingExperience.forEach((existingItem) => {
            if (!experienceList.some((item) => item.id === existingItem.id)) {
                toDelete.push(existingItem);
            }
        });

        try {
            setLoading(true);
            if (toUpdate.length) {
                await put(route("experience.update", document.id), {
                    experience: toUpdate,
                });
            }

            if (toAdd.length) {
                await post(route("experience.store", document.id), {
                    experience: toAdd,
                });
            }
            if (toDelete.length) {
                await Promise.all(
                    toDelete.map(async (item) => {
                        await destroy(route("experience.delete", item.id), {
                            data: { experience: [item] },
                        });
                    })
                );
            }

            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save experience details", error);
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

    //---------------------------------------------------------------------------------------------------------
    const renderFormFields = useCallback((item, index) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <FormField
                label={t("Position_title")}
                icon={<Briefcase />}
                error={errors[index]?.title}
            >
                <Input
                    name="title"
                    placeholder={t("Enter_your_position_title")}
                    required
                    className="mt-2 w-full"
                    value={item.title || ""}
                    onChange={(e) =>
                        handleChange(index, e.target.name, e.target.value)
                    }
                />
            </FormField>

            <FormField
                label={t("Company_Name")}
                icon={<Building />}
                error={errors[index]?.company_name}
            >
                <Input
                    name="company_name"
                    placeholder={t("Enter_company_name")}
                    required
                    className="mt-2 w-full"
                    value={item.company_name || ""}
                    onChange={(e) =>
                        handleChange(index, e.target.name, e.target.value)
                    }
                />
            </FormField>

            <FormField
                label={t("City")}
                icon={<MapPin />}
                error={errors[index]?.city}
            >
                <Input
                    name="city"
                    placeholder={t("Enter_city")}
                    required
                    className="mt-2 w-full"
                    value={item.city || ""}
                    onChange={(e) =>
                        handleChange(index, e.target.name, e.target.value)
                    }
                />
            </FormField>

            <FormField
                label={t("Country")}
                icon={<Globe />}
                error={errors[index]?.country}
            >
                <Input
                    name="country"
                    placeholder={t("Enter_country")}
                    required
                    className="mt-2 w-full"
                    value={item.country || ""}
                    onChange={(e) =>
                        handleChange(index, e.target.name, e.target.value)
                    }
                />
            </FormField>

            <FormField
                label={t("Start_Date")}
                icon={<Calendar />}
                error={errors[index]?.start_date}
            >
                <Input
                    name="start_date"
                    type="date"
                    required
                    className="mt-2 w-full"
                    value={item.start_date || ""}
                    onChange={(e) =>
                        handleChange(index, e.target.name, e.target.value)
                    }
                />
            </FormField>

            <FormField
                label={t("End_Date")}
                icon={<Calendar />}
                error={errors[index]?.end_date}
            >
                <Input
                    name="end_date"
                    type="date"
                    required
                    className="mt-2 w-full"
                    value={item.end_date || ""}
                    onChange={(e) =>
                        handleChange(index, e.target.name, e.target.value)
                    }
                />
            </FormField>

            <div className="col-span-1 md:col-span-2 mt-1">
                <RichTextEditor
                    jobTitle={item.title || ""}
                    initialValue={item?.work_summary || ""}
                    onEditorChange={(value) =>
                        handleEditorChange(value, "work_summary", index)
                    }
                />
            </div>
        </div>
    ), [handleChange, handleEditorChange, errors, t]);

    return (
        <div className="text-white">
            <div className="w-full">
                <h2 className="font-bold text-lg">
                    {t("Professional_Experience")} :{" "}
                    <span className="text-lg font-bold text-[#f68c09]">
                        {t("Add_previous_job_experience")}
                    </span>
                </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border-2 w-full h-auto border-white divide-y-[1px] divide-white rounded-md px-3 pb-4 my-5">
                    {experienceList.map((item, index) => (
                        <div key={index} className="relative pt-4">
                            {experienceList.length > 1 && (
                                <Button
                                    variant="secondary"
                                    type="button"
                                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 text-white"
                                    size="icon"
                                    onClick={() => removeExperience(index, item.id)}
                                >
                                    <X size="13px" />
                                </Button>
                            )}
                            {renderFormFields(item, index)}
                            {index === experienceList.length - 1 &&
                                experienceList.length < 5 && (
                                    <Button
                                        className="gap-1 mt-1 border-primary/50"
                                        variant="generate"
                                        type="button"
                                        onClick={addNewExperience}
                                    >
                                        <PlusCircleIcon
                                            size={30}
                                            className="hover:text-[#f68c09] mr-2"
                                        />
                                        {t("Add_More_Experience")}
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4"
                    type="submit"
                    disabled={!isFormValid}
                >
                    {loading && <Loader size="15px" className="animate-spin" />}
                    <><Send/> {t("Save_Changes")}</>
                </Button>
            </form>
        </div>
    );
};

export default ExperienceForm;
