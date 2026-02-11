// SocialMedia.jsx
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Link, Network, Plus, Send, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { socialMediaListData } from "@/constant/socialMedia";
import { SocialIcon } from "react-social-icons";
import { useTranslation } from "react-i18next";

const initialState = { name: "", link: "", thumbnail: "" };

function SocialMedia({ document, handleNext }) {
    const [SocialMediaList, setSocialMediaList] = useState(() =>
        document?.social_medias?.length
            ? document.social_medias
            : [initialState],
    );
    const [search, setSearch] = useState("");
    const { t } = useTranslation();
    const filteredSocialMedias = socialMediaListData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
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
    } = useForm({ social_medias: SocialMediaList });

    const socialMediaSchema = Yup.object().shape({
        name: Yup.string().required("Social Media name is required"),
        link: Yup.string().required("Social media link is required"),
    });

    useEffect(() => {
        const processSocialMediaList = async () => {
            try {
                const thumbnail = await generateThumbnail();
                setData({
                    social_medias: SocialMediaList,
                    thumbnail: thumbnail,
                });
                await Promise.all(
                    SocialMediaList.map((exp) =>
                        socialMediaSchema.validate(exp),
                    ),
                );
                setIsFormValid(true);
            } catch (err) {
                setIsFormValid(false);
            }
        };
        processSocialMediaList();
    }, [SocialMediaList]);

    const validateSocialMedia = async (index, field, value) => {
        try {
            await socialMediaSchema.validateAt(field, { [field]: value });
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

    const handleChange = (index, field, value) => {
        setSocialMediaList((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item,
            ),
        );
        validateSocialMedia(index, field, value);
    };

    const addNewLanguage = () => {
        setSocialMediaList((prev) => [...prev, { ...initialState }]);
    };

    const removeSocialMedia = (index, id) => {
        setSocialMediaList((prev) => prev.filter((_, i) => i !== index));
        removeSocialMediaBack(id);
    };

    const removeSocialMediaBack = async (id) => {
        try {
            await destroy(route("profile-details.delete", id), {
                data: { social_media: [{ id }] },
            });
        } catch (error) {
            console.error("Failed to delete social media", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const existingSocialMedia = document.social_medias || [];
            const toUpdate = [];
            const toAdd = [];

            SocialMediaList.forEach((item) => {
                const existingItem = existingSocialMedia.find(
                    (edu) => edu.id === item.id,
                );
                if (existingItem) {
                    const hasChanged = Object.keys(item).some(
                        (key) => item[key] !== existingItem[key],
                    );
                    if (hasChanged) {
                        toUpdate.push(item);
                    }
                } else {
                    toAdd.push(item);
                }
            });

            existingSocialMedia.forEach((existingItem) => {
                const isDeleted = !SocialMediaList.some(
                    (item) => item.id === existingItem.id,
                );
                if (isDeleted) {
                    toDelete.push(existingItem);
                }
            });

            if (toUpdate.length > 0) {
                await put(route("profile-details.update", document.id), {
                    social_medias: toUpdate,
                });
            }
            if (toAdd.length > 0) {
                await post(route("profile-details.store", document.id), {
                    social_medias: toAdd,
                });
            }
            if (handleNext) handleNext();
        } catch (error) {
            console.error("Failed to save social media details", error);
            setErrors(
                error.inner.reduce((acc, curr) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, []),
            );
        }
    };

    return (
        <div className="w-full max-w-full mx-auto">
            {/* <div className="bg-gradient-to-br from-orange-400 to-orange-500 border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-4 sm:p-5 md:p-6 mb-4 sm:mb-5">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
                    <Network className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    <h2 className="font-black text-lg sm:text-xl md:text-2xl uppercase text-white tracking-tight">
                        {t("Social_Medias")}
                    </h2>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wide">
                    {t("Add_your_social_medias_information")}
                </p>
            </div> */}

            <form onSubmit={handleSubmit}>
                <div className="bg-white border-[3px] border-zinc-800 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden mb-4 sm:mb-5">
                    {SocialMediaList.map((item, index) => (
                        <div
                            key={index}
                            className={`relative p-4 sm:p-5 md:p-6 ${
                                index !== SocialMediaList.length - 1
                                    ? "border-b-[3px] border-zinc-800"
                                    : ""
                            }`}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                                {SocialMediaList?.length > 1 && (
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500 text-white border-[2px] border-zinc-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all p-0 flex items-center justify-center z-10"
                                        disabled={processing}
                                        onClick={() =>
                                            removeSocialMedia(index, item.id)
                                        }
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                )}

                                <div className="col-span-1">
                                    <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
                                        <Network size={16} />
                                        {t("Name")}
                                    </Label>
                                    <Select
                                        name={item.name || ""}
                                        onValueChange={(value) =>
                                            handleChange(index, "name", value)
                                        }
                                    >
                                        <SelectTrigger className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
                                            <SelectValue
                                                placeholder={item.name}
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <div className="px-2 py-1">
                                                <Input
                                                    type="text"
                                                    placeholder="Search Social medias..."
                                                    className="w-full p-2 border rounded"
                                                    value={search}
                                                    onChange={(e) =>
                                                        setSearch(
                                                            e.target.value,
                                                        )
                                                    }
                                                />
                                            </div>
                                            {filteredSocialMedias.map(
                                                (social) => {
                                                    const isDisabled =
                                                        SocialMediaList.some(
                                                            (item) =>
                                                                item.name ===
                                                                social.name,
                                                        );
                                                    return (
                                                        <SelectItem
                                                            key={social.id}
                                                            value={social.name}
                                                            name={
                                                                social.name ||
                                                                ""
                                                            }
                                                            disabled={
                                                                isDisabled
                                                            }
                                                        >
                                                            <div className="flex items-center">
                                                                <SocialIcon
                                                                    className="mr-2"
                                                                    url={
                                                                        social.url
                                                                    }
                                                                    style={{
                                                                        height: 30,
                                                                        width: 30,
                                                                    }}
                                                                />
                                                                {social.name}
                                                            </div>
                                                        </SelectItem>
                                                    );
                                                },
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors[index]?.name && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors[index].name}
                                        </p>
                                    )}
                                </div>

                                <div className="col-span-1">
                                    <Label className="text-xs sm:text-sm font-black uppercase text-zinc-700 flex items-center gap-1.5 mb-1.5">
                                        <Link size={16} />
                                        {t("Link")}
                                    </Label>
                                    <Input
                                        name="link"
                                        placeholder="www.example.com"
                                        required
                                        className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-lg border-[2px] border-zinc-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all duration-200 font-medium"
                                        autoComplete="off"
                                        value={item.link || ""}
                                        onChange={(e) =>
                                            handleChange(
                                                index,
                                                "link",
                                                e.target.value,
                                            )
                                        }
                                    />
                                    {errors[index]?.link && (
                                        <p className="text-red-600 text-xs mt-1">
                                            {errors[index].link}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {index === SocialMediaList.length - 1 &&
                                SocialMediaList.length < 15 && (
                                    <Button
                                        type="button"
                                        disabled={processing}
                                        onClick={addNewLanguage}
                                        className="w-full sm:w-auto bg-blue-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] px-4 sm:px-5 py-2 sm:py-2.5 flex items-center justify-center gap-2 font-black uppercase text-xs tracking-wide transition-all duration-200 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] hover:bg-blue-600 mt-4"
                                    >
                                        <Plus size={16} />
                                        {t("Add_More_Social_Media")}
                                    </Button>
                                )}
                        </div>
                    ))}
                </div>

                <Button
                    type="submit"
                    disabled={!isFormValid || processing}
                    className={`w-full sm:w-auto bg-gradient-to-br from-orange-400 to-orange-500 text-white border-[2px] border-zinc-800 rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] px-6 sm:px-8 py-2.5 sm:py-3 flex items-center justify-center gap-2 font-black uppercase text-sm tracking-wide transition-all duration-200 ${
                        !isFormValid || processing
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.3)] active:translate-x-[3px] active:translate-y-[3px]"
                    }`}
                >
                    {processing && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    <Send size={16} />
                    {t("Save_Changes")}
                </Button>
            </form>
        </div>
    );
}

export default SocialMedia;
