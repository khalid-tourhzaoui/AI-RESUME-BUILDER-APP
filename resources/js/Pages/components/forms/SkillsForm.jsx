import "@smastrom/react-rating/style.css";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import { AlertCircle, Cpu, Plus, Send, X, Star, Loader } from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

const FormField = React.memo(({ label, icon, error, children }) => (
    <div className="flex-1">
        <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
            {React.cloneElement(icon, { size: 16 })}
            {label}
        </Label>
        {children}
        {error && (
            <div className="bg-red-100 border-[2px] border-zinc-800 rounded-lg mt-2 p-2 flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.9)]">
                <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-700 flex-shrink-0" />
                <p className="text-red-700 font-bold text-xs uppercase">{error}</p>
            </div>
        )}
    </div>
));

const SkillsForm = ({ document, handleNext }) => {
    const { t } = useTranslation();
    const initialState = useMemo(() => ({
        id: undefined,
        docId: undefined,
        name: "",
        rating: 0,
        thumbnail: "",
    }), []);

    const [skillList, setSkillList] = useState(
        document?.skills?.length ? document.skills : [initialState]
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const { put, post, delete: destroy, setData, processing } = useForm({ skills: skillList });

    const skillSchema = useMemo(() =>
        Yup.object().shape({
            name: Yup.string().required("Skill name is required").min(3, "At least 3 characters"),
            rating: Yup.number().min(1).max(5).required("Rating is required"),
        }), []
    );

    const debouncedValidation = useMemo(() =>
        debounce(async (list) => {
            try {
                const thumbnail = await generateThumbnail();
                setData({ skills: list, thumbnail });
                await Promise.all(list.map((exp) => skillSchema.validate(exp)));
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        }, 500),
        [skillSchema]
    );

    useEffect(() => {
        debouncedValidation(skillList);
        return () => debouncedValidation.cancel();
    }, [skillList]);

    const debouncedFieldValidation = useMemo(() =>
        debounce(async (index, field, value) => {
            try {
                await skillSchema.validateAt(field, { [field]: value });
                setErrors((prev) => {
                    const newErrors = [...prev];
                    if (newErrors[index]) delete newErrors[index][field];
                    return newErrors;
                });
            } catch (err) {
                setErrors((prev) => {
                    const newErrors = [...prev];
                    newErrors[index] = { ...(newErrors[index] || {}), [field]: err.message };
                    return newErrors;
                });
            }
        }, 500),
        [skillSchema]
    );

    const handleChange = useCallback((index, field, value) => {
        setSkillList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        debouncedFieldValidation(index, field, value);
        debouncedValidation(skillList);
    }, [debouncedFieldValidation, debouncedValidation, skillList]);

    const handleAdd = useCallback(
        () => setSkillList((prev) => [...prev, { ...initialState }]),
        [initialState]
    );

    const handleRemove = useCallback(async (index, id) => {
        setSkillList((prev) => prev.filter((_, i) => i !== index));
        if (id) {
            try {
                await destroy(route("profile-details.delete", id), {
                    data: { skill: [{ id }] },
                });
            } catch (error) {
                console.error("Failed to delete skill", error);
            }
        }
    }, [destroy]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            console.log("Form is not valid!");
            return;
        }

        const existingSkills = document.skills || [];
        const toUpdate = [], toAdd = [], toDelete = [];

        skillList.forEach((item) => {
            const existingItem = existingSkills.find((exp) => exp.id === item.id);
            if (existingItem) {
                const hasChanged = Object.keys(item).some((key) => item[key] !== existingItem[key]);
                if (hasChanged) toUpdate.push(item);
            } else {
                toAdd.push(item);
            }
        });

        existingSkills.forEach((existingItem) => {
            if (!skillList.some((item) => item.id === existingItem.id)) {
                toDelete.push(existingItem);
            }
        });

        try {
            if (toUpdate.length) {
                await put(route("profile-details.update", document.id), { skills: toUpdate });
            }
            if (toAdd.length) {
                await post(route("profile-details.store", document.id), { skills: toAdd });
            }
            if (toDelete.length) {
                await Promise.all(toDelete.map(async (item) => {
                    await destroy(route("profile-details.delete", item.id), { data: { skills: [item] } });
                }));
            }
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save skill details", error);
            setErrors(error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, []));
        }
    };

    const renderFormFields = useCallback((item, index) => (
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-4">
            <FormField label={t("Name")} icon={<Cpu />} error={errors[index]?.name}>
                <Input
                    name="name"
                    placeholder={t("Enter_Name_of_skill")}
                    required
                    className="w-full px-3 sm:px-3.5 py-5 sm:py-6 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                    value={item.name || ""}
                    onChange={(e) => handleChange(index, e.target.name, e.target.value)}
                />
            </FormField>
            <div className="flex flex-col items-start sm:items-end w-full sm:w-auto">
                <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 mb-1.5 flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Rating
                </Label>
                <div className="bg-white border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] p-2 sm:p-2.5 w-full sm:w-auto">
                    <Rating
                        style={{ maxWidth: 140 }}
                        isDisabled={!item.name}
                        value={item?.rating || 0}
                        onChange={(value) => handleChange(index, "rating", value)}
                    />
                </div>
                {errors[index]?.rating && (
                    <p className="text-red-600 text-xs font-bold mt-1.5">{errors[index].rating}</p>
                )}
            </div>
        </div>
    ), [handleChange, errors, t]);

    return (
        <div className="w-full max-w-full mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="bg-white border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-brutal overflow-hidden mb-4 sm:mb-5">
                    {skillList.map((item, index) => (
                        <div
                            key={index}
                            className={`relative p-4 sm:p-5 md:p-6 ${
                                index !== skillList.length - 1 ? 'border-b-[3px] border-zinc-800' : ''
                            }`}
                        >
                            {skillList.length > 1 && (
                                <Button
                                    variant="destructive"
                                    size="iconSm"
                                    type="button"
                                    disabled={processing}
                                    className="absolute -top-2 -right-2 rounded-full"
                                    onClick={() => handleRemove(index, item.id)}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                            {renderFormFields(item, index)}
                            {index === skillList.length - 1 && skillList.length < 15 && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="default"
                                    disabled={processing}
                                    onClick={handleAdd}
                                    className="w-full sm:w-auto mt-4"
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>{t("Add_More_Skills")}</span>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-start">
                    <Button
                        type="submit"
                        disabled={!isFormValid || processing}
                        variant="default"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        {processing ? (
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
};

export default SkillsForm;
