import Head from 'next/head';
import { usePathname } from 'next/navigation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
  canonical?: string;
}

const defaultSEO = {
  title: 'ECCCO - Evidence-Based Critical Care Education',
  description: 'Master critical care medicine with evidence-based learning. Access 5,000+ exam questions, 170M+ research articles, and 1,500+ clinical guidelines for ACLS, PALS, ATLS, and more.',
  keywords: [
    'critical care',
    'emergency medicine',
    'ACLS',
    'PALS',
    'ATLS',
    'medical education',
    'exam preparation',
    'evidence-based medicine',
    'clinical guidelines',
    'medical research',
    'PubMed',
    'medical questions',
    'physician training',
    'nurse training',
    'paramedic training'
  ],
  image: '/og-image.png', // You'll need to create this
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://eccco.app',
  twitterHandle: '@eccco_app', // Update with your actual handle
};

export function SEO({
  title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
  canonical,
}: SEOProps) {
  const pathname = usePathname();
  const fullTitle = title ? `${title} | ECCCO` : defaultSEO.title;
  const pageUrl = url || `${defaultSEO.siteUrl}${pathname}`;
  const imageUrl = image.startsWith('http') ? image : `${defaultSEO.siteUrl}${image}`;
  const canonicalUrl = canonical || pageUrl;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="ECCCO" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:site" content={defaultSEO.twitterHandle} />
      <meta property="twitter:creator" content={defaultSEO.twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#3B82F6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    </Head>
  );
}

interface JsonLdProps {
  type: 'Website' | 'Article' | 'Course' | 'FAQPage' | 'Organization';
  data: Record<string, any>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(baseData) }}
    />
  );
}

// Predefined structured data schemas
export const structuredData = {
  website: {
    '@type': 'WebSite',
    name: 'ECCCO',
    description: defaultSEO.description,
    url: defaultSEO.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultSEO.siteUrl}/evidence-search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  
  organization: {
    '@type': 'Organization',
    name: 'ECCCO',
    url: defaultSEO.siteUrl,
    logo: `${defaultSEO.siteUrl}/logo.png`,
    description: defaultSEO.description,
    sameAs: [
      // Add your social media links here
      // 'https://twitter.com/eccco_app',
      // 'https://linkedin.com/company/eccco',
    ],
  },
  
  educationalOrganization: {
    '@type': 'EducationalOrganization',
    name: 'ECCCO',
    url: defaultSEO.siteUrl,
    description: defaultSEO.description,
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['Medical Student', 'Physician', 'Nurse', 'Paramedic'],
    },
  },
};

// Helper function to generate course structured data
export function generateCourseSchema(courseName: string, description: string) {
  return {
    '@type': 'Course',
    name: courseName,
    description,
    provider: {
      '@type': 'Organization',
      name: 'ECCCO',
      url: defaultSEO.siteUrl,
    },
    educationalLevel: 'Professional',
    inLanguage: 'en',
  };
}

// Helper function to generate FAQ structured data
export function generateFAQSchema(questions: Array<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}
