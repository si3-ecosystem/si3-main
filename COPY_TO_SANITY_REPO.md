# Files to Copy to Your Sanity Repository

## Required Files

### 1. Main Schema File
**File**: `schemas/seoSchema.ts`
**Description**: Enhanced SEO schema with structured data fields

### 2. Shared Component
**File**: `schemas/shared/Emoji.tsx`
**Description**: Emoji component used in schema icons

## Schema Configuration

Add this to your Sanity schema configuration (usually `sanity.config.ts` or schema index file):

```typescript
import seoSettings from './schemas/seoSchema'

// Add to your schema types array:
seoSettings,
```

## Updated Functions

The following functions in your Next.js project have been updated to use the new schema fields:

### `utils/sharedMetadata.ts`

Key changes:
- `generateOrganizationSchema()` - Now uses structured fields with fallbacks
- `generateWebsiteSchema()` - Now uses structured fields with fallbacks

## GROQ Query Update (Optional)

If you want to use the new schema type, update your GROQ query:

```typescript
// In lib/sanity/groq.ts
export const seoData = groq`*[_type == 'seoSettings'][0]`;
```

Or keep the existing query to maintain backward compatibility:

```typescript
// Keep existing for backward compatibility
export const seoData = groq`*[_type == 'utils'][0]`;
```

## New Schema Features

### Organized Field Groups:
1. **Basic SEO** - Title, description, favicon, logo
2. **Organization Schema** - Name, founding date, contact info
3. **Website Schema** - Website-specific settings, search config
4. **Social Links** - All social media URLs and additional links

### Key New Fields:
- `organizationName` - Official organization name
- `alternateName` - Alternative name (e.g., "SI/HER")
- `foundingDate` - Year founded
- `contactEmail` - Main contact email
- `addressCountry` - Country code
- `organizationDescription` - Detailed org description
- `websiteName` - Website name
- `websiteDescription` - Website description
- `searchEnabled` - Enable/disable search functionality
- `searchUrl` - Custom search URL pattern
- `github` - GitHub organization URL
- `additionalSocialLinks` - Array for additional social platforms

### Legacy Field Support:
All existing fields (`title`, `seoTitle`, `overview`, `favicon`, `seoLogo`, `twitter`, `linkedIn`, etc.) are preserved for backward compatibility.

## Usage in Sanity Studio

After copying the files:

1. Create a new "SEO & Structured Data Settings" document
2. Fill in the organized fields across the four groups
3. The structured data functions will automatically use these values
4. Legacy fields are still supported as fallbacks

## Benefits

- ✅ Full control over structured data from Sanity
- ✅ Better organization with grouped fields
- ✅ Backward compatibility with existing data
- ✅ Enhanced SEO capabilities
- ✅ Flexible social media link management
- ✅ Configurable search functionality

## Testing

After setup:
1. Create the new SEO settings document in Sanity
2. Verify structured data appears correctly in page source
3. Test with Google's Rich Results Test tool
4. Validate with Schema.org validator
