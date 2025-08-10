# SEO Schema Migration Guide

## Overview

This guide explains how to migrate from the current `utils` schema to the new enhanced `seoSettings` schema that makes `generateOrganizationSchema` and `generateWebsiteSchema` fully editable in Sanity.

## What's Changed

### New Schema: `seoSettings`

The new schema (`schemas/seoSchema.ts`) provides:

1. **Organized Groups**: Fields are organized into logical groups:
   - Basic SEO
   - Organization Schema
   - Website Schema  
   - Social Links

2. **Enhanced Fields**: New fields for complete structured data control:
   - `organizationName` - Official organization name
   - `alternateName` - Alternative name/acronym
   - `foundingDate` - Year organization was founded
   - `contactEmail` - Main contact email
   - `addressCountry` - Country code
   - `organizationDescription` - Detailed organization description
   - `websiteName` - Website name
   - `websiteDescription` - Website description
   - `searchEnabled` - Toggle search functionality
   - `searchUrl` - Custom search URL pattern
   - `github` - GitHub organization URL
   - `additionalSocialLinks` - Array of additional social platforms

3. **Backward Compatibility**: All existing fields are preserved as legacy fields

## Migration Steps

### Step 1: Add the New Schema to Your Sanity Project

1. Copy `schemas/seoSchema.ts` to your Sanity project's schemas directory
2. Copy `schemas/shared/Emoji.tsx` to your Sanity project's schemas/shared directory
3. Add the schema to your Sanity schema configuration:

```typescript
// In your sanity.config.ts or schema index
import seoSettings from './schemas/seoSchema'

export default defineConfig({
  // ... other config
  schema: {
    types: [
      // ... other schemas
      seoSettings,
    ],
  },
})
```

### Step 2: Update Your GROQ Query (Optional)

If you want to fetch the new fields, update your `seoData` query in `lib/sanity/groq.ts`:

```typescript
export const seoData = groq`*[_type == 'seoSettings'][0]`;
```

Or keep using the existing query if you want to maintain the current `utils` schema:

```typescript
export const seoData = groq`*[_type == 'utils'][0]`;
```

### Step 3: Create New SEO Settings Document

1. Go to your Sanity Studio
2. Create a new "SEO & Structured Data Settings" document
3. Fill in the enhanced fields for better structured data control

### Step 4: Update Functions (Already Done)

The `generateOrganizationSchema` and `generateWebsiteSchema` functions have been updated to:
- Use new structured fields when available
- Fall back to legacy fields for backward compatibility
- Provide sensible defaults

## Field Mapping

### Organization Schema Fields

| New Field | Legacy Fallback | Default |
|-----------|----------------|---------|
| `organizationName` | `seoTitle` | "SI<3> Ecosystem - Empowering Women & Non-Binary Leaders in Web3" |
| `alternateName` | - | "SI/HER" |
| `organizationDescription` | `overview` | Default description |
| `foundingDate` | - | "2021" |
| `contactEmail` | - | "hello@si3.space" |
| `addressCountry` | - | "US" |

### Website Schema Fields

| New Field | Legacy Fallback | Default |
|-----------|----------------|---------|
| `websiteName` | `seoTitle` | Organization name |
| `websiteDescription` | `overview` | Default description |
| `searchEnabled` | - | `true` |
| `searchUrl` | - | "/search?q={search_term_string}" |

### Social Links

| New Field | Legacy Fallback | Default |
|-----------|----------------|---------|
| `twitter` | `twitter` | "http://x.com/si3_ecosystem" |
| `linkedIn` | `linkedIn` | "https://www.linkedin.com/company/si3ecosystem/" |
| `github` | - | "https://github.com/si3-ecosystem" |
| `additionalSocialLinks` | - | [] |

## Benefits

1. **Full Control**: Edit all structured data fields directly in Sanity
2. **Better Organization**: Fields are logically grouped and documented
3. **Flexibility**: Add custom social links and configure search functionality
4. **SEO Optimization**: Better control over how your site appears in search results
5. **Backward Compatibility**: Existing data continues to work

## Testing

After migration:

1. Check that structured data is properly generated:
   - View page source and look for JSON-LD scripts
   - Use Google's Rich Results Test tool
   - Validate with Schema.org validator

2. Verify fallbacks work:
   - Test with both new and legacy data
   - Ensure defaults are applied when fields are empty

## Rollback Plan

If you need to rollback:

1. Keep using the existing `utils` schema
2. The updated functions will continue to work with legacy fields
3. Remove the new `seoSettings` schema if not needed

## Next Steps

1. Gradually populate the new structured fields in Sanity
2. Consider deprecating legacy fields once migration is complete
3. Add validation rules for required fields
4. Set up content workflows for SEO team

## Support

The new schema maintains full backward compatibility, so you can migrate at your own pace without breaking existing functionality.
