// Structured Data (JSON-LD) for SEO
// Implements schema.org markup for better search engine understanding

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Esther Bukola - Creative Graphics Designer",
    "alternateName": "Olowomakan Esther Bukola",
    "url": window.location.origin,
    "logo": `${window.location.origin}/icon-512.png`,
    "description": "Creative Graphics Designer & Digital Media Specialist in Ikorodu, Lagos. Building brands through visual storytelling.",
    "founder": {
      "@type": "Person",
      "name": "Olowomakan Esther Bukola"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ikorodu",
      "addressRegion": "Lagos State",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+234-814-590-4088",
      "contactType": "customer service",
      "email": "esther.olowomakan@gmail.com",
      "availableLanguage": ["English"]
    },
    "sameAs": [] // Add social media URLs here when available
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Olowomakan Esther Bukola",
    "jobTitle": "Creative Graphics Designer & Digital Media Specialist",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ikorodu",
      "addressRegion": "Lagos State",
      "addressCountry": "NG"
    },
    "email": "esther.olowomakan@gmail.com",
    "telephone": "+234-814-590-4088",
    "url": window.location.origin,
    "image": `${window.location.origin}/icon-512.png`,
    "description": "Creative Graphics Designer & Digital Media Specialist with expertise in visual storytelling, branding, and digital media.",
    "knowsAbout": [
      "Graphic Design",
      "Digital Media",
      "Branding",
      "Social Media Design",
      "Print Production",
      "Visual Storytelling"
    ]
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Esther Bukola Portfolio",
    "alternateName": "Olowomakan Esther Bukola - Creative Graphics Designer",
    "url": window.location.origin,
    "description": "Portfolio of Olowomakan Esther Bukola, showcasing creative graphics design, digital media, and branding projects.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${window.location.origin}/blog?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateBreadcrumbSchema(pathname: string) {
  const breadcrumbs = [
    { name: "Home", url: window.location.origin },
  ];

  if (pathname !== "/") {
    const pathParts = pathname.split("/").filter(Boolean);
    let currentUrl = window.location.origin;
    
    pathParts.forEach((part, index) => {
      currentUrl += `/${part}`;
      const name = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ");
      breadcrumbs.push({
        name,
        url: currentUrl
      });
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateBlogPostingSchema(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.cover,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Olowomakan Esther Bukola",
      "url": window.location.origin
    },
    "publisher": {
      "@type": "Organization",
      "name": "Esther Bukola Portfolio",
      "logo": {
        "@type": "ImageObject",
        "url": `${window.location.origin}/icon-512.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${window.location.origin}/blog/${post.id}`
    },
    "keywords": post.tag,
    "wordCount": post.body.join(" ").split(" ").length,
    "articleBody": post.body.join("\n\n")
  };
}

export function generateServiceSchema(service: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.desc,
    "provider": {
      "@type": "Person",
      "name": "Olowomakan Esther Bukola"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nigeria"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.title} Services`,
      "itemListElement": service.tags.map((tag: string, index: number) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": tag
        }
      }))
    }
  };
}

export function generateProjectSchema(project: any) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.study.objective,
    "image": project.img,
    "author": {
      "@type": "Person",
      "name": "Olowomakan Esther Bukola"
    },
    "dateCreated": project.year,
    "keywords": `${project.cat}, ${project.org}`,
    "url": `${window.location.origin}/projects/${project.id}`
  };
}

// Helper function to inject structured data into the page
export function injectStructuredData(schema: any) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
  
  return () => {
    document.head.removeChild(script);
  };
}

// Hook to manage structured data lifecycle
export function useStructuredData(schema: any) {
  if (typeof window === 'undefined') return;
  
  // Remove any existing structured data
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());
  
  // Add new structured data
  return injectStructuredData(schema);
}
