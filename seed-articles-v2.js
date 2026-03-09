// seed-articles-v2.js - Populate Sanity with full-length blog posts
import { projectId, dataset, apiVersion } from './sanity-config.js';
import https from 'https';

const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error('Please set SANITY_AUTH_TOKEN environment variable');
  process.exit(1);
}

const posts = [
  {
    _type: 'post',
    title: 'Welcome to WebCraftio Blog',
    slug: { _type: 'slug', current: 'welcome-to-webcraftio-blog' },
    excerpt: 'Introducing our new blog powered by Sanity CMS. Discover insights about e-commerce, Shopify, and digital marketing.',
    content: [
      { _type: 'block', children: [{ _type: 'span', text: 'Welcome to the WebCraftio blog! We\'re excited to share our knowledge and insights about e-commerce, Shopify development, digital marketing, and business growth strategies. This is more than just a blog—it\'s your destination for practical, actionable advice from a team of digital experts.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'At WebCraftio, we\'ve spent years working with businesses of all sizes. We\'ve seen what works, what doesn\'t, and everything in between. Through our blog, we\'re committed to sharing that hard-won knowledge with you.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Our blog is now powered by Sanity CMS, allowing us to deliver high-quality content more efficiently. This modern approach to content management ensures you always get fresh, relevant information in an engaging format.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'What can you expect to find here? We cover e-commerce trends, Shopify development techniques, digital marketing strategies, AI and automation solutions, and real-world case studies from our client projects.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Whether you\'re building your first online store, optimizing an existing platform, or implementing AI solutions, you\'ll find valuable insights here. We believe in transparency and genuine advice rather than marketing fluff.' }] }
    ],
    tags: ['WebCraftio', 'Blog', 'Sanity CMS'],
    author: 'WebCraftio Team',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'post',
    title: 'Getting Started with Shopify Development',
    slug: { _type: 'slug', current: 'getting-started-shopify-development' },
    excerpt: 'A comprehensive guide for developers looking to build custom Shopify stores and themes. Learn the essentials of Shopify development.',
    content: [
      { _type: 'block', children: [{ _type: 'span', text: 'Shopify development offers endless possibilities for creating unique e-commerce experiences. Whether you\'re building custom themes, apps, or integrations, Shopify provides a robust platform for growth. This guide will walk you through the fundamentals.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'First, understand what makes Shopify powerful. Unlike traditional frameworks, Shopify handles infrastructure, security, and payment processing. You can focus on creating exceptional user experiences and building features that impact your business results.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'The Shopify ecosystem is built on three key technologies: Liquid (templating language), GraphQL (data queries), and REST API (backend operations). Liquid powers your theme templates, creating dynamic content based on products and store data.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'When starting, you have options: modify existing themes, build custom themes from scratch, develop apps, or create integrations. We recommend starting with modifying existing themes to understand the structure before moving to complex development.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Set up your development environment with Node.js, Git, and Shopify CLI. This setup enables testing locally before pushing to production. Your theme structure includes layouts, templates, snippets, and CSS/JS assets—organize them properly.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Common mistakes include not leveraging the Storefront API, poor responsive design, and inefficient Liquid code impacting page speed. Page speed matters—even one second delays reduce conversions significantly in e-commerce.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Best practices include using Shopify\'s native features first, keeping code organized, implementing error handling, and testing across devices. Remember: Shopify stores serve customers worldwide, so optimize for performance.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'As you progress, explore building apps that extend Shopify functionality. Apps can provide custom features, integrate external services, or solve unique problems. The Shopify App Store is a thriving marketplace for your creations.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Continuous learning is essential—Shopify regularly updates its platform and introduces new APIs. Join the developer community, follow official documentation, and stay updated with latest trends in e-commerce development.' }] }
    ],
    tags: ['Shopify', 'Development', 'E-commerce'],
    author: 'WebCraftio Team',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'post',
    title: 'How AI Chatbots Are Transforming UK Business Customer Service',
    slug: { _type: 'slug', current: 'ai-chatbots-transforming-uk-business-customer-service' },
    excerpt: 'Discover how AI chatbots revolutionize customer service for UK businesses with real examples and ROI data from our implementations.',
    content: [
      { _type: 'block', children: [{ _type: 'span', text: 'In today\'s fast-paced business environment, customers expect instant responses and personalized service 24/7. Gone are the days of traditional office-hours support. AI chatbots have emerged as a game-changer for UK businesses providing round-the-clock support without massive overhead.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'The shift to AI-powered customer service isn\'t just technology adoption—it\'s meeting customer expectations where they are. Today\'s consumers want instant answers whether shopping at 2 AM or during lunch break. They expect businesses to remember preferences and provide personalized recommendations.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'At WebCraftio, we\'ve helped numerous UK businesses implement AI chatbots handling everything from inquiries to complex order processing. Our Voistra AI Restaurant Agent uses GPT-4 to manage orders, reservations, customer inquiries, and menu recommendations around the clock.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'The real business impact is dramatic: response times drop from hours to seconds. Customers get instant answers to common questions. This consistency is difficult for human teams, especially during peak times. AI performs identically, every time, delivering excellent service at scale.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Financial impact is compelling. Businesses typically see 30-50% reduction in customer service costs while improving satisfaction scores. Your human support team focuses on complex, high-value issues requiring judgment and empathy, while AI handles high-volume, routine queries.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Competitive advantage is significant. Studies show 67% of consumers prefer chatbots for quick support. If competitors offer instant AI support but you don\'t, you\'re disadvantaged. Customers migrate to faster, more responsive competitors.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'AI chatbots don\'t remove human touch—the best implementations use hybrid approaches. AI handles routine inquiries and gathers information, then seamlessly escalates complex issues to human agents. Customers always get appropriate support for their specific need.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Different businesses benefit differently. E-commerce stores use chatbots for recommendations and tracking. Restaurants use them for bookings and orders. Service businesses use them for scheduling. Healthcare providers use them for reminders and basic inquiries. The versatility is remarkable.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Privacy and security are valid concerns. Reputable implementations include robust encryption, GDPR compliance, and clear data handling policies. Your business data is sensitive and deserves proper protection.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'The technology is mature, proven, and accessible. The real question isn\'t whether to implement AI chatbots, but how quickly you can get them working. Contact us to learn how we can implement a custom solution for your business.' }] }
    ],
    tags: ['AI Chatbots', 'Customer Service', 'UK Business', 'Automation'],
    author: 'WebCraftio Team',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'post',
    title: 'The ROI of AI-Powered E-commerce: Real Results from UK Businesses',
    slug: { _type: 'slug', current: 'roi-ai-powered-ecommerce-uk-businesses' },
    excerpt: 'Explore measurable returns on investment from AI-enhanced e-commerce platforms with case studies from our UK clients.',
    content: [
      { _type: 'block', children: [{ _type: 'span', text: 'As a UK-based AI development agency, we\'ve seen firsthand how AI dramatically improves e-commerce performance. AI-enhanced platforms don\'t just look modern—they deliver measurable business results. The question isn\'t whether AI improves e-commerce; it\'s which solutions give the best ROI.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Let\'s start with a real example: SmartCFO, an AI-powered financial platform for a UK accounting firm. It automates invoicing, cash flow analysis, and expense categorization—tasks consuming 70% of their team\'s time. The result? 70% reduction in manual data entry and 40% faster month-end reporting, plus dramatically improved accuracy.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'For e-commerce specifically, AI impacts three critical areas: increasing average order value, reducing customer service costs, and optimizing inventory—each directly affecting the bottom line.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Personalized product recommendations are arguably the highest-impact AI application. When you show customers genuinely interested products based on browsing, purchase history, and behavior patterns, they buy more. Clients typically see 25-35% increase in average order value. A store doing £100,000 monthly revenue gains £25,000-£35,000 additional revenue.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Second, AI-powered chatbots reduce support tickets by 50%. Customers get instant answers to common questions. Support teams focus on complex issues. Cost savings alone justify the investment.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Third, predictive analytics revolutionizes inventory management. AI forecasts demand based on historical sales, seasonal trends, and market conditions. You stock exactly what you need—no excess capital tied up, no missed sales. Clients see 30% inventory turnover improvement and 20% holding cost reduction.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Calculate cumulative ROI for a mid-sized business: 30% AOV increase adds £150,000 annually. 50% support cost reduction saves £40,000. 30% inventory efficiency saves £30,000. Total annual impact: £220,000 from £50,000 investment—that\'s 440% year-one ROI.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Critical caveat: not all AI implementations deliver the same results. The key is choosing the right features for your specific business. Luxury retailers need different AI solutions than fast-moving consumer goods businesses.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'AI implementations range from basic chatbots (£5,000-£15,000) to full automation suites (£50,000-£150,000). Understand your business priorities and whether expected ROI justifies investment.' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'The competitive landscape is changing rapidly. AI is becoming table stakes in e-commerce. Businesses implementing AI now will have significant advantage over competitors in 2-3 years. Let\'s talk about what\'s possible for your business.' }] }
    ],
    tags: ['AI E-commerce', 'ROI', 'UK Business', 'Case Studies'],
    author: 'WebCraftio Team',
    publishedAt: new Date().toISOString()
  }
];

async function createPost(post) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      mutations: [
        {
          create: post
        }
      ]
    });

    const options = {
      hostname: `${projectId}.api.sanity.io`,
      port: 443,
      path: `/v${apiVersion}/data/mutate/${dataset}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(body);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('Seeding blog posts...');
  for (const post of posts) {
    try {
      await createPost(post);
      console.log(`✅ Created post: ${post.title}`);
    } catch (error) {
      console.error(`❌ Failed to create post "${post.title}": ${error.message}`);
    }
  }
  console.log('Seeding complete!');
}

main();
