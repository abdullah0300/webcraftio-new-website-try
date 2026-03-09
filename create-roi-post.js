// create-roi-post.js - Create the ROI blog post
import { projectId, dataset, apiVersion } from './sanity-config.js';
import https from 'https';

const token = process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error('Please set SANITY_AUTH_TOKEN environment variable');
  process.exit(1);
}

const roiPost = {
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
};

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
  try {
    console.log('Creating ROI blog post...');
    await createPost(roiPost);
    console.log('✅ Created post: The ROI of AI-Powered E-commerce: Real Results from UK Businesses');
  } catch (error) {
    console.error('❌ Failed to create post:', error.message);
  }
}

main();