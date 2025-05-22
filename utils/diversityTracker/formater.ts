import { FormValues } from "@/validations/diversityTracker/schema";

export const transformFormData = (data: FormValues) => {
  return {
    formData: {
      // Personal Information
      selfIdentity: data.selfIdentity,
      selfIdentityCustom: data.selfIdentityCustom,
      ageRange: data.ageRange,
      ethnicity: data.ethnicity,
      disability: data.disability,
      sexualOrientation: data.sexualOrientation,
      equityScale: data.equityScale,

      // Optional fields
      improvementSuggestions: data.improvementSuggestions,
      grantProvider: data.grantProvider,
      grantRound: data.grantRound,
      suggestions: data.suggestions,
      activeGrantsParticipated: data.activeGrantsParticipated,

      // Accessibility
      offeringClear: data.offeringClear,
      claritySuggestions: data.claritySuggestions,
      engagementChannels: data.engagementChannels,

      // Transparency
      decentralizedDecisionMaking: data.decentralizedDecisionMaking,
      hasRoadmap: data.hasRoadmap,
      reportsFinancials: data.reportsFinancials,
      runsGrantPrograms: data.runsGrantPrograms,
      grantRoundParticipation: data.grantRoundParticipation,
      grantExperience: data.grantExperience,

      // Inclusivity
      diversityInitiatives: data.diversityInitiatives,
      diverseTeam: data.diverseTeam,
      underrepresentedLeadership: data.underrepresentedLeadership,
      highlightsUnderrepresented: data.highlightsUnderrepresented,

      // Impact
      uniqueValue: data.uniqueValue,
      marketImpact: data.marketImpact,
    },
  };
};
