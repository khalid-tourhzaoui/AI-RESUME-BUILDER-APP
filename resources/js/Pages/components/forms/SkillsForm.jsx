import "@smastrom/react-rating/style.css";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import { Cpu, Loader, Plus, X } from "lucide-react";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { debounce } from "lodash";

const FormField = React.memo(({ label, icon, error, children }) => (
    <div className="col-span-1">
        <Label className="text-md font-semibold">
            {label}
            <span className="text-[#f68c09] mx-1">
                (
                {React.cloneElement(icon, {
                    size: 20,
                    className: "inline-flex",
                })}
                )
            </span>{" "}
            :
        </Label>
        {children}
        {error && (
            <p className="text-red-500 text-sm mt-3">
                (<AlertCircle size={20} className="inline-flex" />
                ): {error}
            </p>
        )}
    </div>
));

const SkillsForm = ({ document, handleNext }) => {
    const { t } = useTranslation();
    const initialState = useMemo(
        () => ({
            id: undefined,
            docId: undefined,
            name: "",
            rating: 0,
            thumbnail: "",
        }),
        []
    );
    const [skillList, setSkillList] = useState(
        document?.skills?.length ? document.skills : [initialState]
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(false);
    const {
        put,
        post,
        delete: destroy,
        setData,
        processing,
    } = useForm({ skills: skillList });

    const skillSchema = useMemo(
        () =>
            Yup.object().shape({
                name: Yup.string()
                    .required("Skill name is required")
                    .min(3, "At least 3 characters"),
                rating: Yup.number()
                    .min(1)
                    .max(5)
                    .required("Rating is required"),
            }),
        []
    );
    //---------------------------------------------------------------------------------------------------------
    const debouncedValidation = useMemo(
        () =>
            debounce(async (list) => {
                try {
                    const thumbnail = await generateThumbnail();
                    setData({ skills: list, thumbnail });
                    await Promise.all(
                        list.map((exp) => skillSchema.validate(exp))
                    );
                    setIsFormValid(true);
                } catch (err) {
                    setIsFormValid(false);
                }
            }, 500),
        [skillSchema, setData]
    );
    //---------------------------------------------------------------------------------------------------------
    useEffect(() => {
        debouncedValidation(skillList);
        return () => debouncedValidation.cancel();
    }, [skillList, debouncedValidation]);
    //---------------------------------------------------------------------------------------------------------
    const debouncedFieldValidation = useMemo(
        () =>
            debounce(async (index, field, value) => {
                try {
                    await skillSchema.validateAt(field, {
                        [field]: value,
                    });
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
        [skillSchema]
    );
    //---------------------------------------------------------------------------------------------------------
    const handleChange = useCallback(
        (index, field, value) => {
            setSkillList((prev) =>
                prev.map((item, i) =>
                    i === index ? { ...item, [field]: value } : item
                )
            );
            debouncedFieldValidation(index, field, value);
        },
        [debouncedFieldValidation]
    );

    //---------------------------------------------------------------------------------------------------------
    const handleAdd = useCallback(
        () => setSkillList((prev) => [...prev, { ...initialState }]),
        [initialState]
    );
    //---------------------------------------------------------------------------------------------------------
    const handleRemove = useCallback(
        async (index, id) => {
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
        },
        [destroy]
    );
    //---------------------------------------------------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();

        const existingSkills = document.skills || [];
        const toUpdate = [],
            toAdd = [],
            toDelete = [];

        skillList.forEach((item) => {
            const existingItem = existingSkills.find(
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

        existingSkills.forEach((existingItem) => {
            if (!skillList.some((item) => item.id === existingItem.id)) {
                toDelete.push(existingItem);
            }
        });

        try {
            if (toUpdate.length) {
                await put(route("profile-details.update", document.id), {
                    skills: toUpdate,
                });
            }

            if (toAdd.length) {
                await post(route("profile-details.store", document.id), {
                    skills: toAdd,
                });
            }

            if (toDelete.length) {
                await Promise.all(
                    toDelete.map(async (item) => {
                        await destroy(
                            route("profile-details.delete", item.id),
                            {
                                data: { skills: [item] },
                            }
                        );
                    })
                );
            }
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save skill details", error);
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, [])
            );
        }
    };
    //---------------------------------------------------------------------------------------------------------
    const renderFormFields = useCallback(
        (item, index) => (
            <>
                <div className="flex-1 mb-1">
                    <FormField
                        label={t("Name")}
                        icon={<Cpu />}
                        error={errors[index]?.name}
                    >
                        <Input
                            name="name"
                            placeholder={t("Enter_Name_of_skill")}
                            required
                            className="mt-2 w-full"
                            value={item.name || ""}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    e.target.name,
                                    e.target.value
                                )
                            }
                        />
                    </FormField>
                </div>
                <div className="shrink-0 pt-5">
                    <Rating
                        style={{ maxWidth: 120 }}
                        isDisabled={!item.name}
                        value={item?.rating || 0}
                        onChange={(value) =>
                            handleChange(index, "rating", value)
                        }
                    />
                    {errors[index]?.rating && (
                        <p className="text-red-500 text-sm">
                            {errors[index].rating}
                        </p>
                    )}
                </div>
            </>
        ),
        [handleChange, errors, t]
    );

    return (
        <div>
            <h2 className="font-bold text-lg">
                {t("Skills")} :{" "}
                <span className="text-[#f68c09]">
                    {t("Add_your_skills_information")}
                </span>
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="border-2 border-black w-full h-auto divide-y-[3px]  rounded-md px-3 pb-4 my-5">
                    {skillList.map((item, index) => (
                        <div key={index} className="border-black">
                            <div className="relative flex items-center justify-between mb-5 pt-4 gap-3">
                                {skillList.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black text-white"
                                        size="icon"
                                        disabled={processing}
                                        onClick={() =>
                                            handleRemove(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}
                                {renderFormFields(item, index)}
                            </div>
                            {index === skillList.length - 1 &&
                                skillList.length < 15 && (
                                    <Button
                                        variant="outline"
                                        className="gap-1 mt-1 text-primary border-primary/50"
                                        type="button"
                                        disabled={processing}
                                        onClick={handleAdd}
                                    >
                                        <Plus size="15px" />{" "}
                                        {t("Add_More_Skills")}
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="w-full"
                    type="submit"
                    disabled={!isFormValid || processing}
                >
                    {processing && (
                        <Loader size="15px" className="animate-spin" />
                    )}
                    {t("Save_Changes")}
                </Button>
            </form>
        </div>
    );
};

export default SkillsForm;
