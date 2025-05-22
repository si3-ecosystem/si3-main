import * as z from "zod";

export const formSchema = z.object({
  selfIdentity: z
    .string()
    .min(1, "Self Identity is required")
    .max(100, "Self Identity must be at most 100 characters"),

  selfIdentityCustom: z
    .string()
    .max(100, "Custom Identity must be at most 100 characters")
    .optional(),

  ageRange: z
    .string()
    .min(1, "Age Range is required")
    .max(50, "Age Range must be at most 50 characters"),

  ethnicity: z
    .array(z.string())
    .min(1, "At least one ethnicity must be selected")
    .or(z.string().min(1, "Ethnicity is required")),

  disability: z
    .array(z.string())
    .min(1, "At least one disability option must be selected")
    .or(z.string().min(1, "Disability status is required")),

  sexualOrientation: z
    .string()
    .min(1, "Sexual Orientation is required")
    .max(100, "Sexual Orientation must be at most 100 characters"),

  equityScale: z
    .number()
    .min(1, "Equity Scale must be at least 1")
    .max(10, "Equity Scale must be at most 10"),

  // Optional fields
  improvementSuggestions: z
    .string()
    .max(1000, "Improvement Suggestions must be at most 1000 characters")
    .optional(),

  grantProvider: z
    .string()
    .max(200, "Grant Provider must be at most 200 characters")
    .optional(),

  grantRound: z
    .string()
    .max(100, "Grant Round must be at most 100 characters")
    .optional(),

  suggestions: z
    .string()
    .max(1000, "Suggestions must be at most 1000 characters")
    .optional(),

  activeGrantsParticipated: z
    .string()
    .max(100, "Active Grants Participated must be at most 100 characters")
    .optional(),

  // Accessibility
  offeringClear: z
    .string()
    .min(1, "Clarity of organization's offering is required")
    .refine(
      (val) => ["yes", "no", "somewhat"].includes(val.toLowerCase()),
      "Invalid selection for organization's offering clarity",
    ),

  claritySuggestions: z
    .string()
    .max(1000, "Clarity suggestions must be at most 1000 characters")
    .optional(),

  engagementChannels: z.union([
    z
      .string()
      .array()
      .nonempty("At least one engagement channel must be selected"),
    z
      .string()
      .min(1, "At least one engagement channel must be selected")
      .refine(
        (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
        "Invalid selection for engagement channels",
      ),
  ]),

  // Transparency
  decentralizedDecisionMaking: z
    .string()
    .min(1, "Decentralized decision making status is required")
    .refine(
      (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
      "Invalid selection for decentralized decision making",
    ),

  hasRoadmap: z
    .string()
    .min(1, "Roadmap status is required")
    .refine(
      (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
      "Invalid selection for roadmap status",
    ),

  reportsFinancials: z
    .string()
    .min(1, "Financial reporting status is required")
    .refine(
      (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
      "Invalid selection for financial reporting status",
    ),

  runsGrantPrograms: z
    .string()
    .min(1, "Grant programs status is required")
    .refine(
      (val) => ["yes", "no"].includes(val.toLowerCase()),
      "Invalid selection for grant programs status",
    ),

  grantRoundParticipation: z
    .string()
    .max(500, "Grant round participation must be at most 500 characters")
    .optional(),

  grantExperience: z
    .string()
    .max(1000, "Grant experience must be at most 1000 characters")
    .optional(),

  // Inclusivity
  diversityInitiatives: z
    .string()
    .min(1, "Diversity initiatives status is required")
    .refine(
      (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
      "Invalid selection for diversity initiatives",
    ),

  diverseTeam: z
    .string()
    .min(1, "Diverse team status is required")
    .refine(
      (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
      "Invalid selection for diverse team",
    ),

  underrepresentedLeadership: z
    .string()
    .min(1, "Underrepresented leadership status is required")
    .refine(
      (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
      "Invalid selection for underrepresented leadership",
    ),

  highlightsUnderrepresented: z
    .string()
    .min(1, "Highlights underrepresented status is required")
    .refine(
      (val) => ["yes", "no", "unsure"].includes(val.toLowerCase()),
      "Invalid selection for highlights underrepresented",
    ),

  // Impact
  uniqueValue: z
    .string()
    .min(10, "Please provide some information about unique value")
    .max(1000, "Unique value must be at most 1000 characters"),

  marketImpact: z
    .string()
    .min(10, "Please provide some information about market impact")
    .max(1000, "Market impact must be at most 1000 characters"),
});

export type FormValues = z.infer<typeof formSchema>;
