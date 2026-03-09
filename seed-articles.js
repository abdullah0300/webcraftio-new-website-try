// seed-articles.js - Populate Sanity with initial blog posts
import { projectId, dataset, apiVersion } from './sanity-config.js';
import https from 'https';

const token = process.env.SANITY_AUTH_TOKEN; // Set this environment variable

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
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Welcome to the WebCraftio blog! We\'re excited to share our knowledge and insights about e-commerce, Shopify development, digital marketing, and business growth strategies.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our blog is now powered by Sanity CMS, allowing us to deliver high-quality content more efficiently and provide you with the latest industry insights.'
          }
        ]
      }
    ],
    tags: ['WebCraftio', 'Blog', 'Sanity CMS'],
    author: 'WebCraftio Team',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'post',
    title: 'Getting Started with Shopify Development',
    slug: { _type: 'slug', current: 'getting-started-shopify-development' },
    excerpt: 'A comprehensive guide for developers looking to build custom Shopify stores and themes.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Shopify development offers endless possibilities for creating unique e-commerce experiences. Whether you\'re building custom themes, apps, or integrations, Shopify provides a robust platform for growth.'
          }
        ]
      }
    ],
    tags: ['Shopify', 'Development', 'E-commerce'],
    author: 'WebCraftio Team',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'post',
    title: 'How AI Chatbots Are Transforming UK Business Customer Service',
    slug: { _type: 'slug', current: 'ai-chatbots-transforming-uk-business-customer-service' },
    excerpt: 'Discover how AI chatbots are revolutionizing customer service for UK businesses, with real examples and ROI data from our implementations.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'In today\'s fast-paced business environment, customers expect instant responses and personalized service. AI chatbots have emerged as a game-changer for UK businesses looking to provide 24/7 customer support without the overhead of human staff.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'At WebCraftio, we\'ve helped numerous UK businesses implement AI chatbots that handle everything from basic inquiries to complex order processing. Our Voistra AI Restaurant Agent, for example, uses GPT-4 to manage restaurant orders, reservations, and customer queries around the clock.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The key benefits include: reduced response times from hours to seconds, consistent service quality, and significant cost savings. Businesses typically see a 30-50% reduction in customer service costs while improving satisfaction scores.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Whether you\'re a restaurant, retailer, or service business, AI chatbots can transform your customer experience. Contact us to learn how we can implement a custom solution for your business.'
          }
        ]
      }
    ],
    tags: ['AI Chatbots', 'Customer Service', 'UK Business', 'Automation'],
    author: 'WebCraftio Team',
    publishedAt: new Date().toISOString()
  },
  {
    _type: 'post',
    title: 'The ROI of AI-Powered E-commerce: Real Results from UK Businesses',
    slug: { _type: 'slug', current: 'roi-ai-powered-ecommerce-uk-businesses' },
    excerpt: 'Explore the measurable returns on investment from AI-enhanced e-commerce platforms, with case studies from our UK clients.',
    content: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'As a UK-based AI development agency, we\'ve seen firsthand how AI can dramatically improve e-commerce performance. Our AI-enhanced platforms don\'t just look modern—they deliver measurable business results.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Take SmartCFO, our AI-powered financial platform we built for a UK accounting firm. The system automates invoicing, cash flow analysis, and expense categorization. The result? 70% reduction in manual data entry time and 40% faster month-end reporting.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'For e-commerce specifically, AI can boost conversion rates through personalized product recommendations, automated customer support, and intelligent inventory management. Our clients typically see: 25-35% increase in average order value through personalized recommendations, 50% reduction in customer service tickets via AI chatbots, and 30% improvement in inventory turnover with predictive analytics.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The key to success is choosing the right AI features for your specific business needs. From basic chatbots to full automation suites, we help UK businesses implement AI solutions that deliver real ROI.'
          }
        ]
      }
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
        'Content-Length': data.length,
        'Authorization': `Bearer ${token}`
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`Failed to create post: ${res.statusCode} ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function seedPosts() {
  console.log('Seeding blog posts...');

  for (const post of posts) {
    try {
      const result = await createPost(post);
      console.log(`✅ Created post: ${post.title}`);
    } catch (error) {
      console.error(`❌ Failed to create post "${post.title}":`, error.message);
    }
  }

  console.log('Seeding complete!');
}

// Run the seeder
seedPosts().catch(console.error);