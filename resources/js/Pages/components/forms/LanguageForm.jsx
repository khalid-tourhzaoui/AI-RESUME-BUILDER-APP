import "@smastrom/react-rating/style.css";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { FlagIcon, Loader, Plus, X } from "lucide-react";
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

const initialState = {
    name: "",
    level: "",
};

function LanguageForm({ document, handleNext }) {
    const [languageList, setLanguageList] = useState(() =>
        document?.languages?.length ? document.languages : [initialState]
    );
    const [search, setSearch] = useState("");

    // Filter the languages based on the search query
    const filteredLanguages = languages.filter(
        (language) =>
            language.name.toLowerCase().includes(search.toLowerCase()) ||
            language.code.toLowerCase().includes(search.toLowerCase())
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const {
        put,
        post,
        delete: destroy,
        data,
        setData,
        processing,
    } = useForm({ languages: languageList });
    //-------------------------------------------------------------------------------------------------------------------------
    const LanguageLevel = {
        NATIVE: "Native",
        ADVANCED: "Advanced",
        INTERMEDIATE: "Intermediate",
    };

    const languageSchema = Yup.object().shape({
        name: Yup.string()
            .required("Language name is required")
            .min(3, "Language name must be at least 3 characters long"),
        level: Yup.string()
            .oneOf(
                [
                    LanguageLevel.NATIVE,
                    LanguageLevel.ADVANCED,
                    LanguageLevel.INTERMEDIATE,
                ],
                "Invalid language level"
            )
            .required("Language level is required"),
    });
    
    //-------------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        const processLanguageList = async () => {
            try {
                // Fetch thumbnail
                const thumbnail = await generateThumbnail();
                setData({ languages: languageList, thumbnail });

                // Validate the form
                await Promise.all(
                    languageList.map((exp) => languageSchema.validate(exp))
                );
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processLanguageList();
    }, [languageList]);
    //-------------------------------------------------------------------------------------------------------------------------
    const validateLanguage = async (index, field, value) => {
        try {
            await languageSchema.validateAt(field, { [field]: value });
            setErrors((prev) => {
                const newErrors = [...prev];
                if (newErrors[index]) {
                    delete newErrors[index][field];
                }
                return newErrors;
            });
            setIsFormValid(true);
        } catch (err) {
            setErrors((prev) => {
                const newErrors = [...prev];
                if (!newErrors[index]) {
                    newErrors[index] = {};
                }
                newErrors[index][field] = err.message;
                return newErrors;
            });
            setIsFormValid(false);
        }
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const handleChange = (index, field, value) => {
        setLanguageList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        );
        validateLanguage(index, field, value);
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const addNewLanguage = () => {
        setLanguageList((prev) => [...prev, { ...initialState }]);
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const removeLanguage = (index, id) => {
        setLanguageList((prev) => prev.filter((_, i) => i !== index));
        removeLanguageBack(id);
    };
    //-------------------------------------------------------------------------------------------------------------------------

    const removeLanguageBack = async (id) => {
        try {
            await destroy(route("profile-details.delete", id), {
                data: { language: [{ id }] },
            });
        } catch (error) {
            console.error("Failed to delete language", error);
        }
    };
    //-------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const existingLanguage = document.languages || [];
            const toUpdate = [];
            const toAdd = [];

            // Identify items to update, add, or delete
            languageList.forEach((item) => {
                const existingItem = existingLanguage.find(
                    (edu) => edu.id === item.id
                );

                if (existingItem) {
                    const hasChanged = Object.keys(item).some(
                        (key) => item[key] !== existingItem[key]
                    );
                    if (hasChanged) {
                        toUpdate.push(item);
                    }
                } else {
                    toAdd.push(item);
                }
            });

            existingLanguage.forEach((existingItem) => {
                const isDeleted = !languageList.some(
                    (item) => item.id === existingItem.id
                );
                if (isDeleted) {
                    toDelete.push(existingItem);
                }
            });

            // Update modified records
            if (toUpdate.length > 0) {
                await put(route("profile-details.update", document.id), {
                    languages: toUpdate,
                });
            }

            // Add new records
            if (toAdd.length > 0) {
                await post(route("profile-details.store", document.id), {
                    languages: toAdd,
                });
            }
            // Move to the next step
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
    console.log(isFormValid);

    //-------------------------------------------------------------------------------------------------------------------------

    return (
        <div>
            <div className="w-full">
                <h2 className="font-bold text-lg">Lnaguages</h2>
                <p className="text-sm">Add your languages information</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {languageList.map((item, index) => (
                        <div key={index}>
                            <div className="relative flex items-center justify-between mb-5 pt-4 gap-3">
                                {languageList?.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black
                                         dark:!bg-gray-600 text-white"
                                        size="icon"
                                        disabled={processing}
                                        onClick={() =>
                                            removeLanguage(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}

                                <div className="flex-1">
                                    <Label className="text-sm">Name </Label>
                                    
                                    <Select name={item.name || ""} onValueChange={(value) => handleChange(index, "name", value)}>
                                        <SelectTrigger className="w-full">
                                        <SelectValue placeholder={item.name} />
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
                                            {filteredLanguages.map((language) =>{
                                                const isDisabled = languageList.some(item => item.name === language.name);
                                                return(

                                                    <SelectItem
                                                        key={language.id}
                                                        value={language.name}
                                                        name={item.name || ""}
                                                        disabled={isDisabled}
                                                    >
                                                        <div className="flex items-center">
                                                            <span className={language.flagClass+" mr-2"}></span>
                                                            {language.name}
                                                        </div>
                                                    </SelectItem>
                                                )
                                                
                                            }
                                                    
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors[index]?.name && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].name}
                                        </p>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <Label className="text-sm">
                                        Proficiency
                                    </Label>
                                    <Select
                                        value={item?.level || ""}
                                        onValueChange={(value) =>
                                            handleChange(index, "level", value)
                                        }
                                        name={item.level}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select proficiency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                value={LanguageLevel.NATIVE}
                                            >
                                                Native
                                            </SelectItem>
                                            <SelectItem
                                                value={LanguageLevel.ADVANCED}
                                            >
                                                Advanced
                                            </SelectItem>
                                            <SelectItem
                                                value={
                                                    LanguageLevel.INTERMEDIATE
                                                }
                                            >
                                                Intermediate
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors[index]?.level && (
                                        <p className="text-red-500 text-sm">
                                            {errors[index].level}
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
                                        Add More Lnaguages
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4"
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
