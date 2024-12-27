import "@smastrom/react-rating/style.css";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useForm } from "@inertiajs/react";
import { Rating } from "@smastrom/react-rating";
import { Loader, Plus, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { generateThumbnail } from "@/lib/helper";
import * as Yup from "yup";

const initialState = { name: "", rating: 0 };

const SkillsForm = ({ document, handelNext }) => {
  const [skillList, setSkillList] = useState(document?.skills?.length ? document.skills : [initialState]);
  const [errors, setErrors] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const { put, post, delete: destroy, setData, processing } = useForm({ skills: skillList });

  const skillSchema = Yup.object().shape({
    name: Yup.string().required("Skill name is required").min(3, "At least 3 characters"),
    rating: Yup.number().min(1).max(5).required("Rating is required")
  });

  useEffect(() => {
    const processSkills = async () => {
      try {
        setData({ skills: skillList, thumbnail: await generateThumbnail() });
        await Promise.all(skillList.map((exp) => skillSchema.validate(exp)));
        setIsFormValid(true);
      } catch {
        setIsFormValid(false);
      }
    };
    processSkills();
  }, [skillList]);

  const validateField = async (index, field, value) => {
    try {
      await skillSchema.validateAt(field, { [field]: value });
      setErrors((prev) => prev.map((err, i) => i === index ? { ...err, [field]: undefined } : err));
    } catch (err) {
      setErrors((prev) => {
        const newErrors = [...prev];
        newErrors[index] = { ...newErrors[index], [field]: err.message };
        return newErrors;
      });
    }
  };

  const handleChange = (index, field, value) => {
    setSkillList((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
    validateField(index, field, value);
  };

  const handleAdd = () => setSkillList((prev) => [...prev, { ...initialState }]);

  const handleRemove = async (index, id) => {
    setSkillList((prev) => prev.filter((_, i) => i !== index));
    try {
      await destroy(route("profile-details.delete", id), { data: { skill: [{ id }] } });
    } catch (error) {
      console.error("Failed to delete skill", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const toUpdate = [], toAdd = [];
      skillList.forEach((item) => {
        const existingItem = document.skills?.find((edu) => edu.id === item.id);
        if (existingItem) {
          if (Object.keys(item).some((key) => item[key] !== existingItem[key])) {
            toUpdate.push(item);
          }
        } else {
          toAdd.push(item);
        }
      });
      if (toUpdate.length) await put(route("profile-details.update", document.id), { skills: toUpdate });
      if (toAdd.length) await post(route("profile-details.store", document.id), { skills: toAdd });
    } catch (error) {
      console.error("Failed to save skills", error);
      setErrors(error.inner.reduce((acc, curr) => ({ ...acc, [curr.path]: curr.message }), []));
    }
  };

  return (
    <div>
      <h2 className="font-bold text-lg">Skills</h2>
      <p className="text-sm">Add your skills information</p>
      <form onSubmit={handleSubmit}>
        <div className="border w-full divide-y rounded-md px-3 pb-4 my-5">
          {skillList.map((item, index) => (
            <div key={index}>
              <div className="relative flex items-center justify-between mb-5 pt-4 gap-3">
                {skillList.length > 1 && (
                  <Button
                    variant="secondary"
                    type="button"
                    className="size-[20px] text-center rounded-full absolute -top-3 -right-5 !bg-black dark:!bg-gray-600 text-white"
                    size="icon"
                    disabled={processing}
                    onClick={() => handleRemove(index, item.id)}
                  >
                    <X size="13px" />
                  </Button>
                )}
                <div className="flex-1">
                  <Label className="text-sm">Name</Label>
                  <Input
                    name="name"
                    required
                    className="mt-2"
                    value={item.name || ""}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                  />
                  {errors[index]?.name && <p className="text-red-500 text-sm">{errors[index].name}</p>}
                </div>
                <div className="shrink-0 pt-5">
                  <Rating
                    style={{ maxWidth: 120 }}
                    isDisabled={!item.name}
                    value={item?.rating || 0}
                    onChange={(value) => handleChange(index, "rating", value)}
                  />
                  {errors[index]?.rating && <p className="text-red-500 text-sm">{errors[index].rating}</p>}
                </div>
              </div>
              {index === skillList.length - 1 && skillList.length < 15 && (
                <Button
                  variant="outline"
                  className="gap-1 mt-1 text-primary border-primary/50"
                  type="button"
                  disabled={processing}
                  onClick={handleAdd}
                >
                  <Plus size="15px" /> Add More Skills
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button type="submit" disabled={!isFormValid || processing}>
          {processing && <Loader size="15px" className="animate-spin" />}
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default SkillsForm;
