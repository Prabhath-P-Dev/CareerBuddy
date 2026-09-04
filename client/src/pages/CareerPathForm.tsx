import React, { useState, KeyboardEvent } from "react";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ---------- Types ----------

type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced";

interface FormState {
  interests: string[];
  skills: string[];
  experienceLevel: ExperienceLevel;
}

interface CareerPathFormProps {
  /** Called with the collected data when the user submits the form */
  onSubmit?: (data: FormState) => void;
}

// ---------- Static option lists ----------

const INTEREST_OPTIONS: string[] = [
  "Web Development",
  "Artificial Intelligence",
  "Data Science",
  "UI/UX Design",
  "Cybersecurity",
  "Mobile Development",
];

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

// ---------- Component ----------

export default function CareerPathForm({ onSubmit }: CareerPathFormProps) {
  const [interests, setInterests] = useState<string[]>(["Web Development"]);

  // Skills are append-only: new skills are always added to the END of the
  // array. Combined with justify-start below, this guarantees chips render
  // in the exact order the user typed them.
  const [skills, setSkills] = useState<string[]>([
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Express.js",
  ]);
  const [skillDraft, setSkillDraft] = useState<string>("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("Beginner");

  const toggleInterest = (interest: string): void => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const addSkill = (raw: string): void => {
    const skill = raw.trim();
    if (!skill) return;
    setSkills((prev) =>
      prev.some((s) => s.toLowerCase() === skill.toLowerCase())
        ? prev
        : [...prev, skill] 
    );
    setSkillDraft("");
  };

  const removeSkill = (index: number): void => {
    // Remove by index rather than by value, so duplicate/near-duplicate
    // skill names (different casing) never cause the wrong chip to be
    // removed or the list to visually reorder.
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillDraft);
    } else if (e.key === "Backspace" && skillDraft === "" && skills.length) {
      removeSkill(skills.length - 1);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const data: FormState = {
      interests,
      skills,
      experienceLevel,
    };
    onSubmit?.(data);
    navigate("/roadmap", { state: data });
  };

  return (
    <div className="min-h-screen w-full  bg-gradient-to-b  from-indigo-50 via-white to-violet-500  flex flex-col items-center justify-center px-4 py-8 md:px-6">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8"
      >
        <header className="text-center mb-7">
          <h1 className="text-2xl font-semibold text-slate-900">
            Tell Us About Yourself
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Share your skills and interests to create a career path tailored
            to you.
          </p>
        </header>

        {/* Interests */}
        <fieldset className="mb-6">
          <legend className="text-sm font-medium text-slate-700 mb-2">
            What are your interests?
          </legend>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const selected = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 ${
                    selected
                      ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Skills */}
        <div className="mb-6">
          <label
            htmlFor="skill-input"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            What skills do you currently have?
          </label>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 px-1 py-2 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-indigo-400">
            <div className="flex flex-wrap gap-1.5 justify-start items-end ">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="flex items-center gap-1 bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 rounded-md"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    aria-label={`Remove ${skill}`}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>
            <input
              id="skill-input"
              type="text"
              value={skillDraft}
              onChange={(e) => setSkillDraft(e.target.value)}
              onKeyDown={handleSkillKeyDown}
              onBlur={() => addSkill(skillDraft)}
              placeholder={skills.length ? "" : "Type a skill and press Enter"}
              className="flex-1 min-w-[100px] text-sm outline-none placeholder:text-slate-400 py-0.5"
            />
          </div>
        </div>

        {/* Experience level */}
        <fieldset className="mb-7">
          <legend className="text-sm font-medium text-slate-700 mb-2">
            What is your experience level?
          </legend>
          <div className="grid grid-cols-3 gap-2">
            {EXPERIENCE_LEVELS.map((level) => {
              const selected = experienceLevel === level;
              return (
                <button
                  key={level}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setExperienceLevel(level)}
                  className={`py-2 rounded-lg text-xs font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1 ${
                    selected
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-3 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        >
          Generate My Career Path
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}