// 11ty Filters for Social Media Previews
// Add these filters to your .eleventy.js configuration file

module.exports = function(eleventyConfig) {
    
    // Extract page title from content (fallback for when title is missing)
    eleventyConfig.addFilter("getPageTitle", function(content) {
        if (!content) return 'Note';
        
        // Look for h1 tags in the content
        const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
        if (h1Match) {
            return h1Match[1].replace(/<[^>]*>/g, '').trim();
        }
        
        // Look for markdown h1
        const mdH1Match = content.match(/^#\s+(.+)$/m);
        if (mdH1Match) {
            return mdH1Match[1].trim();
        }
        
        return 'Note';
    });

    // Extract meta description from AI-assisted summary
    eleventyConfig.addFilter("extractSummary", function(content) {
        if (!content) return '';
        
        // Look for AI-assisted summary section
        const summaryPatterns = [
            /## AI-assisted [Ss]ummary\s*\n(.*?)\n---/s,
            /## AI-assisted [Ss]ummary\s*\n(.*?)\n##/s,
            /## AI-assisted [Ss]ummary\s*\n(.*?)$/s
        ];
        
        for (const pattern of summaryPatterns) {
            const match = content.match(pattern);
            if (match) {
                let summary = match[1]
                    .replace(/\n+/g, ' ')           // Replace newlines with spaces
                    .replace(/<[^>]*>/g, '')        // Remove HTML tags
                    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove markdown bold
                    .replace(/\*(.*?)\*/g, '$1')     // Remove markdown italic
                    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove markdown links
                    .trim();
                
                // Limit to 160 characters for social media
                if (summary.length > 160) {
                    summary = summary.substring(0, 157) + '...';
                }
                
                return summary;
            }
        }
        
        return '';
    });

    // Generate social media description with fallbacks
    eleventyConfig.addFilter("getSocialDescription", function(description, content) {
        // Use provided description first
        if (description && description.trim()) {
            return description.trim();
        }
        
        // Extract from AI summary
        const extracted = this.extractSummary(content);
        if (extracted) {
            return extracted;
        }
        
        // Default fallback
        return "Notes from Erik Vaněk's second brain on design, technology, and innovation.";
    });

    // Format title for social sharing (remove common suffixes)
    eleventyConfig.addFilter("formatSocialTitle", function(title) {
        if (!title) return 'Note';
        
        return title
            .replace(/ - Reading Notes$/, '')
            .replace(/ - Notes$/, '')
            .replace(/^\d+\.\s*/, '')  // Remove leading numbers like "1. "
            .trim();
    });

    // Generate proper image URL for social sharing
    eleventyConfig.addFilter("getSocialImage", function(thumbnail, url_category, site_url) {
        const baseUrl = site_url || 'https://www.erikvanek.com';
        
        if (thumbnail) {
            return baseUrl + thumbnail;
        }
        
        // Default images based on category
        switch (url_category) {
            case 'book':
                return baseUrl + '/img/social/book-note-preview.png';
            case 'project':
                return baseUrl + '/img/social/project-preview.png';
            case 'area':
                return baseUrl + '/img/social/area-preview.png';
            default:
                return baseUrl + '/img/social/note-preview.png';
        }
    });

    // Check if note is top-level (for navigation)
    eleventyConfig.addFilter("isTopLevelNote", function(filePathStem) {
        if (!filePathStem) return true;
        
        // Remove leading slash if present
        const path = filePathStem.replace(/^\//, '');
        
        // Check if it's directly in notes folder (no subdirectories)
        return !path.includes('/') || path.split('/').length <= 2;
    });

    // Format directory name for display
    eleventyConfig.addFilter("formatDirName", function(dirName) {
        if (!dirName) return '';
        
        return dirName
            .replace(/^\d+\s*-\s*/, '')     // Remove leading numbers like "01 - "
            .replace(/[🤖🧠📚🚀🌱💽🗑️📄]/g, '') // Remove emojis
            .replace(/^\s*-\s*/, '')        // Remove leading dashes
            .trim();
    });

    // Additional configurations for social media
    eleventyConfig.addFilter("getCanonicalUrl", function(url, site_url) {
        const baseUrl = site_url || 'https://www.erikvanek.com';
        return baseUrl + url;
    });

    // Date formatting for article meta
    eleventyConfig.addFilter("toISODate", function(date) {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    });

};

/* 
Usage in .eleventy.js:

const socialFilters = require('./social-filters.js');

module.exports = function(eleventyConfig) {
    // Add social media filters
    socialFilters(eleventyConfig);
    
    // Your existing configuration...
    
    return {
        dir: {
            input: "pages",
            output: "_site"
        }
    };
};
*/