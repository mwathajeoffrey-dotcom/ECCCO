/**
 * Citation Export Utilities
 * Formats articles for export to citation managers (BibTeX, RIS, Zotero)
 */

interface Article {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  published: string;
  doi?: string;
  pmid?: string;
  abstract?: string;
  url: string;
}

/**
 * Export articles as BibTeX format
 * Compatible with LaTeX, Overleaf, and most reference managers
 */
export function exportToBibTeX(articles: Article[]): string {
  return articles.map((article, index) => {
    const id = article.doi?.replace(/[^a-zA-Z0-9]/g, '_') || `article_${index + 1}`;
    const authors = article.authors.join(' and ');
    const year = article.published.match(/\d{4}/)?.[0] || '2024';
    
    return `@article{${id},
  title = {${article.title}},
  author = {${authors}},
  journal = {${article.journal}},
  year = {${year}},
  ${article.doi ? `doi = {${article.doi}},` : ''}
  ${article.pmid ? `pmid = {${article.pmid}},` : ''}
  ${article.abstract ? `abstract = {${article.abstract.replace(/\n/g, ' ')}},` : ''}
  url = {${article.url}}
}`;
  }).join('\n\n');
}

/**
 * Export articles as RIS format
 * Compatible with EndNote, Mendeley, RefWorks, Zotero
 */
export function exportToRIS(articles: Article[]): string {
  return articles.map(article => {
    const year = article.published.match(/\d{4}/)?.[0] || '2024';
    const authors = article.authors.map(author => `AU  - ${author}`).join('\n');
    
    return `TY  - JOUR
TI  - ${article.title}
${authors}
JO  - ${article.journal}
PY  - ${year}
${article.doi ? `DO  - ${article.doi}` : ''}
${article.pmid ? `PMID- ${article.pmid}` : ''}
${article.abstract ? `AB  - ${article.abstract.replace(/\n/g, ' ')}` : ''}
UR  - ${article.url}
ER  -`;
  }).join('\n\n');
}

/**
 * Export articles as CSV format
 * Simple format for Excel or Google Sheets
 */
export function exportToCSV(articles: Article[]): string {
  const headers = ['Title', 'Authors', 'Journal', 'Year', 'DOI', 'PMID', 'URL', 'Abstract'];
  const rows = articles.map(article => {
    const year = article.published.match(/\d{4}/)?.[0] || '2024';
    const authors = article.authors.join('; ');
    const abstract = article.abstract?.replace(/"/g, '""').replace(/\n/g, ' ') || '';
    
    return [
      `"${article.title}"`,
      `"${authors}"`,
      `"${article.journal}"`,
      year,
      article.doi || '',
      article.pmid || '',
      article.url,
      `"${abstract}"`
    ].join(',');
  });
  
  return [headers.join(','), ...rows].join('\n');
}

/**
 * Export single article as Zotero-compatible JSON
 */
export function exportToZotero(articles: Article[]): string {
  const zoteroFormat = articles.map(article => {
    const year = article.published.match(/\d{4}/)?.[0] || '2024';
    
    return {
      itemType: 'journalArticle',
      title: article.title,
      creators: article.authors.map(name => {
        const parts = name.split(' ');
        const lastName = parts[parts.length - 1];
        const firstName = parts.slice(0, -1).join(' ');
        return {
          creatorType: 'author',
          firstName,
          lastName
        };
      }),
      publicationTitle: article.journal,
      date: year,
      DOI: article.doi || '',
      url: article.url,
      abstractNote: article.abstract || '',
      extra: article.pmid ? `PMID: ${article.pmid}` : ''
    };
  });
  
  return JSON.stringify(zoteroFormat, null, 2);
}

/**
 * Download file to user's computer
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export helper functions for React components
 */
export const exportFormats = {
  bibtex: {
    name: 'BibTeX',
    extension: '.bib',
    mimeType: 'application/x-bibtex',
    icon: '📚',
    description: 'LaTeX, Overleaf',
    export: exportToBibTeX
  },
  ris: {
    name: 'RIS',
    extension: '.ris',
    mimeType: 'application/x-research-info-systems',
    icon: '📖',
    description: 'EndNote, Mendeley',
    export: exportToRIS
  },
  csv: {
    name: 'CSV',
    extension: '.csv',
    mimeType: 'text/csv',
    icon: '📊',
    description: 'Excel, Sheets',
    export: exportToCSV
  },
  zotero: {
    name: 'Zotero JSON',
    extension: '.json',
    mimeType: 'application/json',
    icon: '🔖',
    description: 'Zotero',
    export: exportToZotero
  }
} as const;

export type ExportFormat = keyof typeof exportFormats;
