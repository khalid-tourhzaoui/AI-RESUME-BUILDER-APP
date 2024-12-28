import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { CheckCircle, Languages, Loader, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { languages } from "@/constant/languages";

const initialState = { name: "", level: "", thumbnail: "" };
const LanguageLevel = {
    NATIVE: "Native",
    ADVANCED: "Advanced",
    INTERMEDIATE: "Intermediate",
};

const languageSchema = Yup.object().shape({
    name: Yup.string()
        .required("Language name is required")
        .min(3, "Must be at least 3 characters"),
    level: Yup.string()
        .oneOf(Object.values(LanguageLevel), "Invalid level")
        .required("Level is required"),
});

function LanguageForm({ document, handleNext }) {
    const [languageList, setLanguageList] = useState(
        () => document?.languages || [initialState]
    );
    const [search, setSearch] = useState("");
    const {
        put,
        post,
        delete: destroy,
        setData,
        processing,
    } = useForm({ languages: languageList });
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const processLanguages = async () => {
            try {
                const thumbnail = await generateThumbnail();
                setData({ languages: languageList, thumbnail: thumbnail });
                await Promise.all(
                    languageList.map((lang) => languageSchema.validate(lang))
                );
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processLanguages();
    }, [languageList]);

    const handleChange = async (index, field, value) => {
        const updatedList = [...languageList];
        updatedList[index] = { ...updatedList[index], [field]: value };
        setLanguageList(updatedList);
        try {
            await languageSchema.validateAt(field, { [field]: value });
            setErrors(
                errors.filter(
                    (error) => !(error.index === index && error.field === field)
                )
            );
            setIsFormValid(true);
        } catch (err) {
            setErrors([...errors, { index, field, message: err.message }]);
            setIsFormValid(false);
        }
    };

    const addNewLanguage = () =>
        setLanguageList([...languageList, initialState]);

    const removeLanguage = async (index, id) => {
        setLanguageList(languageList.filter((_, i) => i !== index));
        try {
            await destroy(route("profile-details.delete", id), {
                data: { language: [{ id }] },
            });
        } catch (error) {
            console.error("Failed to delete language", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const existingLanguages = document.languages || [];
            const toUpdate = [],
                toAdd = [],
                toDelete = [];

            languageList.forEach((item) => {
                const existingItem = existingLanguages.find(
                    (lang) => lang.id === item.id
                );
                if (existingItem) {
                    if (
                        Object.keys(item).some(
                            (key) => item[key] !== existingItem[key]
                        )
                    ) {
                        toUpdate.push(item);
                    }
                } else {
                    toAdd.push(item);
                }
            });

            existingLanguages.forEach((existingItem) => {
                if (!languageList.some((item) => item.id === existingItem.id)) {
                    toDelete.push(existingItem);
                }
            });

            if (toUpdate.length > 0)
                await put(route("profile-details.update", document.id), {
                    languages: toUpdate,
                });
            if (toAdd.length > 0)
                await post(route("profile-details.store", document.id), {
                    languages: toAdd,
                });
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save language details", error);
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, [])
            );
        }
    };

    const filteredLanguages = languages.filter(
        (language) =>
            language.name.toLowerCase().includes(search.toLowerCase()) ||
            language.code.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Languages</h2>
                <p className="text-sm">Add your language information</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {languageList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                                {languageList.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                                        size="icon"
                                        disabled={processing}
                                        onClick={() =>
                                            removeLanguage(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}

                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">
                                        Name ({" "}
                                        <Languages
                                            size="20px"
                                            className="inline-flex"
                                        />{" "}
                                        ) :
                                    </Label>
                                    <Select
                                        value={item.name || ""}
                                        onValueChange={(value) =>
                                            handleChange(index, "name", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="px-2 py-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Search languages..."
                                                    className="w-full p-2 border rounded"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            {filteredLanguages.map(
                                                (language) => {
                                                    const isDisabled =
                                                        languageList.some(
                                                            (item) =>
                                                                item.name ===
                                                                language.name
                                                        );
                                                    return (
                                                        <SelectItem
                                                            key={language.id}
                                                            value={
                                                                language.name
                                                            }
                                                            disabled={
                                                                isDisabled
                                                            }
                                                        >
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={
                                                                        language.flagClass +
                                                                        " mr-2"
                                                                    }
                                                                ></span>
                                                                {language.name}
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.find(
                                        (error) =>
                                            error.index === index &&
                                            error.field === "name"
                                    ) && (
                                        <p className="text-red-500 text-sm">
                                            {
                                                errors.find(
                                                    (error) =>
                                                        error.index === index &&
                                                        error.field === "name"
                                                )?.message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1 sm:col-span-1 md:col-span-1">
                                    <Label className="text-sm">
                                        Proficiency ({" "}
                                        <CheckCircle
                                            size="20px"
                                            className="inline-flex"
                                        />{" "}
                                        ) :
                                    </Label>
                                    <Select
                                        value={item.level || ""}
                                        onValueChange={(value) =>
                                            handleChange(index, "level", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select proficiency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(LanguageLevel).map(
                                                (level) => (
                                                    <SelectItem
                                                        key={level}
                                                        value={level}
                                                    >
                                                        {level}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.find(
                                        (error) =>
                                            error.index === index &&
                                            error.field === "level"
                                    ) && (
                                        <p className="text-red-500 text-sm">
                                            {
                                                errors.find(
                                                    (error) =>
                                                        error.index === index &&
                                                        error.field === "level"
                                                )?.message
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>

                            {index === languageList.length - 1 &&
                                languageList.length < 15 && (
                                    <Button
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        variant="outline"
                                        type="button"
                                        disabled={processing}
                                        onClick={addNewLanguage}
                                    >
                                        <Plus size="15px" />
                                        Add More Languages
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4 w-full"
                    type="submit"
                    disabled={!isFormValid || processing}
                >
                    {processing && (
                        <Loader size="15px" className="animate-spin" />
                    )}
                    Save Changes
                </Button>
            </form>
        </div>
    );
}

export default LanguageForm;
