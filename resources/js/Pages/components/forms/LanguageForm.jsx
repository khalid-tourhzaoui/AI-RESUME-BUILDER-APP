// LanguageForm.jsx
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { CheckCircle, Languages, Plus, Send, X, Loader } from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { languages } from "@/constant/languages";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

const initialState = { name: "", level: "", thumbnail: "" };
const LanguageLevel = { NATIVE: "Native", ADVANCED: "Advanced", INTERMEDIATE: "Intermediate" };

const languageSchema = Yup.object().shape({
    name: Yup.string().required("Language name is required").min(3, "Must be at least 3 characters"),
    level: Yup.string().oneOf(Object.values(LanguageLevel), "Invalid level").required("Level is required"),
});

function LanguageForm({ document, handleNext }) {
    const [languageList, setLanguageList] = useState(
        document?.languages?.length ? document.languages : [initialState]
    );
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const { put, post, delete: destroy, setData, processing } = useForm({ languages: languageList });
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    const debouncedValidation = useMemo(() =>
        debounce(async (list) => {
            try {
                const thumbnail = await generateThumbnail();
                setData({ languages: list, thumbnail });
                await Promise.all(list.map((lang) => languageSchema.validate(lang)));
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        }, 500), []
    );

    useEffect(() => {
        debouncedValidation(languageList);
        return () => debouncedValidation.cancel();
    }, [languageList]);

    const debouncedFieldValidation = useMemo(() =>
        debounce(async (index, field, value) => {
            try {
                await languageSchema.validateAt(field, { [field]: value });
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
        }, 500), []
    );

    const handleChange = useCallback((index, field, value) => {
        setLanguageList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        debouncedFieldValidation(index, field, value);
    }, [debouncedFieldValidation]);

    const addNewLanguage = useCallback(() => setLanguageList((prev) => [...prev, { ...initialState }]), []);

    const removeLanguage = useCallback(async (index, id) => {
        setLanguageList((prev) => prev.filter((_, i) => i !== index));
        if (id) {
            try {
                await destroy(route("profile-details.delete", id), { data: { language: [{ id }] } });
            } catch (error) {
                console.error("Failed to delete language", error);
            }
        }
    }, [destroy]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const existingLanguages = document.languages || [];
        const toUpdate = [], toAdd = [], toDelete = [];

        languageList.forEach((item) => {
            const existingItem = existingLanguages.find((lang) => lang.id === item.id);
            if (existingItem) {
                const hasChanged = Object.keys(item).some((key) => item[key] !== existingItem[key]);
                if (hasChanged) toUpdate.push(item);
            } else {
                toAdd.push(item);
            }
        });

        existingLanguages.forEach((existingItem) => {
            if (!languageList.some((item) => item.id === existingItem.id)) {
                toDelete.push(existingItem);
            }
        });

        try {
            if (toUpdate.length) {
                await put(route("profile-details.update", document.id), { languages: toUpdate });
            }
            if (toAdd.length) {
                await post(route("profile-details.store", document.id), { languages: toAdd });
            }
            if (toDelete.length) {
                await Promise.all(toDelete.map(async (item) => {
                    await destroy(route("profile-details.delete", item.id), { data: { languages: [item] } });
                }));
            }
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save language details", error);
            setErrors(error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, []));
        }
    };

    const filteredLanguages = languages.filter((language) =>
        language.name.toLowerCase().includes(search.toLowerCase()) ||
        language.code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-full max-w-full mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="bg-white border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-brutal overflow-hidden mb-4 sm:mb-5">
                    {languageList.map((item, index) => (
                        <div
                            key={index}
                            className={`relative p-4 sm:p-5 md:p-6 ${
                                index !== languageList.length - 1 ? 'border-b-[3px] border-zinc-800' : ''
                            }`}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                                {languageList.length > 1 && (
                                    <Button
                                        variant="destructive"
                                        size="iconSm"
                                        type="button"
                                        className="absolute -top-2 -right-2 rounded-full"
                                        disabled={processing}
                                        onClick={() => removeLanguage(index, item.id)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}

                                <div className="col-span-1">
                                    <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
                                        <Languages size={16} />
                                        {t("Name")}
                                    </Label>
                                    <Select
                                        value={item.name || ""}
                                        onValueChange={(value) => handleChange(index, "name", value)}
                                    >
                                        <SelectTrigger className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="px-2 py-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Search languages..."
                                                    className="w-full p-2 border rounded"
                                                    value={search}
                                                    onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>
                                            {filteredLanguages.map((language) => {
                                                const isDisabled = languageList.some((item) => item.name === language.name);
                                                return (
                                                    <SelectItem key={language.id} value={language.name} disabled={isDisabled}>
                                                        <div className="flex items-center">
                                                            <span className={language.flagClass + " mr-2"}></span>
                                                            {language.name}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                    {errors.find((error) => error.index === index && error.field === "name") && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors.find((error) => error.index === index && error.field === "name")?.message}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1">
                                    <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
                                        <CheckCircle size={16} />
                                        {t("Proficiency")}
                                    </Label>
                                    <Select
                                        value={item.level || ""}
                                        onValueChange={(value) => handleChange(index, "level", value)}
                                    >
                                        <SelectTrigger className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)]">
                                            <SelectValue placeholder="Select proficiency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(LanguageLevel).map((level) => (
                                                <SelectItem key={level} value={level}>{level}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.find((error) => error.index === index && error.field === "level") && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors.find((error) => error.index === index && error.field === "level")?.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {index === languageList.length - 1 && languageList.length < 15 && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="default"
                                    disabled={processing}
                                    onClick={addNewLanguage}
                                    className="w-full sm:w-auto mt-4"
                                >
                                    <Plus size={16} />
                                    {t("Add_More_Languages")}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <Button
                    type="submit"
                    disabled={!isFormValid || processing}
                    variant="default"
                    size="lg"
                    className="w-full sm:w-auto"
                >
                    {processing && <Loader className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />}
                    <Send size={16} />
                    {t("Save_Changes")}
                </Button>
            </form>
        </div>
    );
}

export default LanguageForm;
