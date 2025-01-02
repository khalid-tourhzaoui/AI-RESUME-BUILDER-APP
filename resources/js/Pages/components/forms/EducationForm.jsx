import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useForm } from "@inertiajs/react";
import {AlertCircle,Globe,Calendar,FlaskConical,GraduationCap,Loader,Medal,Plus,X, AlignLeft,} from "lucide-react";
import { debounce } from "lodash";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useTranslation } from "react-i18next";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
//---------------------------------------------------------------------------------------------------------
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

function EducationForm({ handleNext, document }) {
    const { t } = useTranslation();
    const initialState = useMemo(()=>({
        id: undefined,
        docId: undefined,
        university_name: "",
        degree: "",
        major: "",
        description: "",
        start_date: "",
        end_date: "",
    }),[]);

    const [educationList, setEducationList] = useState(() =>
        document?.education?.length ? document.education : [initialState]
    );
    const [errors, setErrors] = useState([]);
    const [isFormValid, setIsFormValid] = useState(true);
    const [loading, setLoading] = useState(false);

    const {
        put,
        post,
        delete: destroy,
        data,
        setData,
    } = useForm({ education: educationList });

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
    //---------------------------------------------------------------------------------------------------------
    const debouncedValidation = useMemo(
        () =>
            debounce(async (list) => {
                try {
                    const thumbnail = await generateThumbnail();
                    setData({ education: list, thumbnail });
                    await Promise.all(
                        list.map((exp) => educationSchema.validate(exp))
                    );
                    setIsFormValid(true);
                } catch (err) {
                    setIsFormValid(false);
                }
            }, 500),
        [educationSchema, setData]
    );
    //---------------------------------------------------------------------------------------------------------
    useEffect(() => {
        debouncedValidation(educationList);
        return () => debouncedValidation.cancel();
    }, [educationList, debouncedValidation]);
    //---------------------------------------------------------------------------------------------------------
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
    //---------------------------------------------------------------------------------------------------------
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

    //---------------------------------------------------------------------------------------------------------
    const addNewEducation = useCallback(
        () => setEducationList((prev) => [...prev, { ...initialState }]),
        [initialState]
    );
    //---------------------------------------------------------------------------------------------------------
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
    //---------------------------------------------------------------------------------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Récupérer les educations existantes depuis le document
        const existingEducation = document.education || [];

        // Initialiser les tableaux pour les educations à mettre à jour, ajouter ou supprimer
        const toUpdate = [], toAdd = [], toDelete = [];

        // Parcourir la liste des educations pour les comparer aux educations existantes
        educationList.forEach((item) => {
            const existingItem = existingEducation.find(
                (exp) => exp.id === item.id
            );

            if (existingItem) {
                // Si l'education existe et a des changements
                const hasChanged = Object.keys(item).some(
                    (key) => item[key] !== existingItem[key]
                );
                if (hasChanged) toUpdate.push(item); // Ajouter à la liste de mise à jour
            } else {
                // Si l'education n'existe pas encore, ajouter à la liste d'ajout
                toAdd.push(item);
            }
        });

        // Trouver les educations existantes qui ne sont plus présentes dans la liste
        existingEducation.forEach((existingItem) => {
            if (!educationList.some((item) => item.id === existingItem.id)) {
                toDelete.push(existingItem); // Ajouter à la liste de suppression
            }
        });

        // Traiter les ajouts, mises à jour et suppressions
        try {
            setLoading(true);

            // Si des mises à jour sont nécessaires, appeler la méthode PUT
            if (toUpdate.length) {
                await put(route("education.update", document.id), {
                    education: toUpdate,
                });
            }

            // Si de nouvelles educations doivent être ajoutées, appeler la méthode POST
            if (toAdd.length) {
                await post(route("education.store", document.id), {
                    education: toAdd,
                });
            }

            // Si des educations doivent être supprimées, appeler la méthode DELETE
            if (toDelete.length) {
                await Promise.all(
                    toDelete.map(async (item) => {
                        await destroy(route("education.delete", item.id), {
                            data: { education: [item] },
                        });
                    })
                );
            }

            // Appeler la fonction handleNext si tout s'est bien passé
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save eduaction details", error);
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
        <>
            <div className="col-span-2 sm:col-span-2 md:col-span-2">
                <FormField
                    label={t("University_Name")}
                    icon={<GraduationCap />}
                    error={errors[index]?.university_name}
                >
                    <Input
                        name="university_name"
                        placeholder={t("Enter_University_Name")}
                        required
                        className="mt-2 w-full"
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
                    icon={<Medal />}
                    error={errors[index]?.degree}
                >
                    <Input
                        name="degree"
                        placeholder={t("Enter_the_Degree")}
                        required
                        className="mt-2 w-full"
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
                    icon={<FlaskConical />}
                    error={errors[index]?.major}
                >
                    <Input
                        name="major"
                        placeholder={t("Enter_the_Major")}
                        required
                        className="mt-2 w-full"
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
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-1">
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
            </div>
            <div className="col-span-2 sm:col-span-2 md:col-span-2">
                <FormField
                    label={t("Description")}
                    icon={<AlignLeft />}
                    error={errors[index]?.description}
                >
                    <Textarea
                        name="description"
                        className="w-full mt-2 text-black"
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
        <div className="text-white">
            <div className="w-full">
                <h2 className="font-bold text-lg">
                    {t("Education")} :
                    <span className="text-lg mx-1 text-[#f68c09]">
                        {t("Add_your_education_details")}
                    </span>
                </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="border-2 w-full h-auto divide-y-[1px] rounded-md px-3 pb-4 my-5">
                    {educationList.map((item, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 mb-5 pt-4 relative">
                                {educationList.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        disabled={loading}
                                        className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black text-white"
                                        size="icon"
                                        onClick={() =>
                                            removeEducation(index, item.id)
                                        }
                                    >
                                        <X size="13px" />
                                    </Button>
                                )}
                                {renderFormFields(item, index)}
                                {/* University Name */}

                            </div>
                            {index === educationList.length - 1 &&
                                educationList.length < 5 && (
                                    <Button
                                        className="gap-1 mt-1 text-[#f68c09] border-primary/50"
                                        variant="outline"
                                        type="button"
                                        onClick={addNewEducation}
                                    >
                                        <Plus size="15px" />{" "}
                                        {t("Add_More_Education")}
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>
                <Button
                    className="mt-4 w-full"
                    type="submit"
                    disabled={!isFormValid}
                >
                    {loading && (
                        <Loader size="15px" className="animate-spin" />
                    )}{" "}
                    {t("Save_Changes")}
                </Button>
            </form>
        </div>
    );
}

export default EducationForm;
