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
            text: 'Welcome to the WebCraftio blog! We\'re excited to share our knowledge and insights about e-commerce, Shopify development, digital marketing, and business growth strategies. This is more than just a blog—it\'s your destination for practical, actionable advice from a team of digital experts with years of experience helping UK businesses scale their online operations.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'At WebCraftio, we\'ve spent the last several years working with businesses of all sizes, from ambitious startups to established enterprises. We\'ve seen what works, what doesn\'t, and everything in between. Through our blog, we\'re committed to sharing that hard-won knowledge with you.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Our blog is now powered by Sanity CMS, allowing us to deliver high-quality content more efficiently and provide you with the latest industry insights. This modern approach to content management ensures that you always get fresh, relevant information delivered in an engaging format.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'What can you expect to find here? We cover a wide range of topics essential to modern business growth: e-commerce trends and best practices, Shopify development techniques, digital marketing strategies that actually work, AI and automation solutions for business efficiency, and real-world case studies from our client projects.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Whether you\'re looking to build your first online store, optimize an existing e-commerce platform, or implement cutting-edge AI solutions, you\'ll find valuable insights and practical guidance here. Each article is written by our experienced team members who understand the challenges UK businesses face in today\'s digital landscape.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We believe in transparency and sharing genuine insights rather than marketing fluff. That\'s why you\'ll find detailed breakdowns, real ROI metrics from our projects, and honest advice about both opportunities and challenges in the digital space.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Ready to take your business to the next level? Start exploring our blog posts, and if you have questions or want to discuss how WebCraftio can help your specific business, don\'t hesitate to reach out. We\'re here to help you succeed.'
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
            text: 'Shopify development offers endless possibilities for creating unique e-commerce experiences. Whether you\'re building custom themes, apps, or integrations, Shopify provides a robust platform for growth. But where do you start, especially if you\'re new to the Shopify ecosystem? This comprehensive guide will walk you through the fundamentals and help you establish a solid foundation for your Shopify development journey.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'First, it\'s important to understand what makes Shopify such a powerful platform for e-commerce businesses. Unlike traditional development frameworks, Shopify handles the infrastructure, security, and payment processing heavy lifting. This means you can focus on creating exceptional user experiences and building features that directly impact your business results.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The Shopify ecosystem is built on several key technologies: Liquid (their templating language), GraphQL for querying data, and a comprehensive REST API for backend operations. Understanding these three pillars is essential for effective Shopify development. Liquid is what powers your theme templates, allowing you to create dynamic content that changes based on products, customers, and store data.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'When starting your Shopify development journey, you have several options: you can modify an existing theme, build a custom theme from scratch, develop a Shopify app, or create integrations with third-party services. Each path has different requirements and learning curves. We recommend starting with modifying an existing theme to understand the Shopify structure before moving to more complex development.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Setting up your development environment is crucial. You\'ll need Node.js, Git, and the Shopify CLI installed on your machine. The Shopify CLI handles authentication, syncing files to your development store, and launching a local development server. This setup ensures you can test changes locally before pushing them to production.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Theme development in Shopify involves working with Liquid templates, JSON configuration files, and CSS/JavaScript for styling and interactivity. Your theme structure typically includes layout files (the main HTML structure), templates (for different page types like product pages and collections), snippets (reusable components), and assets (CSS, JS, and images).'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Common mistakes beginners make include not leveraging Shopify\'s Storefront API for performance, not properly handling responsive design, and writing inefficient Liquid code that impacts page load times. Page speed is critical in e-commerce—even a one-second delay can significantly reduce conversions.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Best practices for Shopify development include using Shopify\'s native features and APIs before building custom solutions, keeping your code organized and well-documented, implementing proper error handling, and testing thoroughly across devices and browsers. Remember that Shopify stores serve customers worldwide, so consider performance optimizations like image lazy loading and code splitting.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'As you progress in your Shopify development skills, you\'ll want to explore building apps that extend Shopify\'s functionality. Apps can provide features for specific business needs, integrate with external services, or solve unique problems for merchants. The Shopify App Store is a thriving marketplace where your creations can help thousands of store owners.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Whether you\'re building a simple store customization or complex app integrations, continuous learning is essential. Shopify regularly updates its platform, introduces new APIs, and shares best practices. Join the Shopify developer community, follow official documentation, and stay updated with the latest trends in e-commerce development.'
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
            text: 'In today\'s fast-paced business environment, customers expect instant responses and personalized service 24/7. Gone are the days when a business could operate customer support only during traditional office hours. AI chatbots have emerged as a game-changer for UK businesses looking to provide round-the-clock customer support without the massive overhead of hiring large support teams.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The shift toward AI-powered customer service isn\'t just about technology adoption—it\'s about meeting customer expectations where they are. Today\'s consumers want instant answers whether they\'re shopping at 2 AM or during lunch break on a Monday. They expect businesses to remember their preferences and provide personalized recommendations. Traditional support models simply can\'t scale to meet these demands efficiently.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'At WebCraftio, we\'ve helped numerous UK businesses implement AI chatbots that handle everything from basic inquiries to complex order processing. Our Voistra AI Restaurant Agent is a prime example. It uses GPT-4 to manage restaurant orders, reservations, customer inquiries, and menu recommendations around the clock. Restaurant owners can focus on creating great food while the AI handles customer communication.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'But what\'s the real business impact? The key benefits include dramatically reduced response times—from hours or even days down to seconds. Customers get instant answers to common questions like "What are your opening hours?", "Is this product in stock?", or "How do I track my order?". This consistency in service quality is something human teams struggle to maintain, especially during peak times. AI chatbots perform exactly the same way, every time.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The financial impact is equally compelling. Businesses typically see a 30-50% reduction in customer service costs while simultaneously improving customer satisfaction scores. How? Because your human support team can focus on complex, high-value issues that actually benefit from human judgment and empathy, while AI handles the high-volume, repetitive queries.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'There\'s also significant competitive advantage in being responsive. Studies show that 67% of consumers prefer using chatbots for quick customer service. If your competitors offer instant support via AI but you don\'t, you\'re putting yourself at a disadvantage. Customers will simply go to competitors who respond faster.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Implementing AI chatbots doesn\'t mean removing human touch from your business. The best implementations use a hybrid approach: AI handles routine inquiries, gathers information, and provides initial solutions, but seamlessly escalates complex issues to human agents. This ensures customers always get the most appropriate level of support for their specific need.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Different businesses benefit differently. E-commerce stores use chatbots for product recommendations and order tracking. Restaurants use them for bookings and order management. Service businesses use them for appointment scheduling. Healthcare providers use them for appointment reminders and basic health inquiries. The versatility is remarkable.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Privacy and data security are valid concerns when implementing AI chatbots. Reputable implementations include robust encryption, GDPR compliance, and clear data handling policies. Your business data is sensitive, and any chatbot solution should treat it as such.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Whether you\'re a restaurant looking to streamline bookings, a retail business wanting to boost customer satisfaction, or a service company aiming to reduce support costs, AI chatbots can transform your customer experience. The technology is mature, proven, and accessible. The real question isn\'t whether to implement AI chatbots, but how quickly you can get them working for your business. Contact us to learn how we can implement a custom solution tailored to your specific business needs.'
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
            text: 'As a UK-based AI development agency, we\'ve seen firsthand how AI can dramatically improve e-commerce performance. Our AI-enhanced platforms don\'t just look modern—they deliver measurable business results. The question isn\'t whether AI can improve your e-commerce performance; it\'s which AI solutions will give your business the best return on investment.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Let\'s start with a real-world example. We recently completed a project called SmartCFO, an AI-powered financial platform built for a UK accounting firm. The system automates invoicing, cash flow analysis, and expense categorization—tasks that previously consumed 70% of their team\'s time. The result? A 70% reduction in manual data entry time and 40% faster month-end reporting. But beyond the time savings, there\'s another critical benefit: dramatically improved accuracy and compliance.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'But let\'s focus specifically on e-commerce, where AI has proven particularly transformative. For online retailers, AI impacts three critical areas: increasing average order value, reducing customer service costs, and optimizing inventory management. Each of these directly affects the bottom line.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Start with personalized product recommendations. This is arguably the highest-impact AI application in e-commerce. When you show customers products they\'re genuinely interested in—based on their browsing history, purchase history, and behavior patterns—they buy more. Our clients typically see a 25-35% increase in average order value through personalized recommendations. An e-commerce store doing £100,000 monthly revenue would see an additional £25,000-£35,000 in revenue from this single change.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Second, AI-powered customer support through chatbots reduces support tickets by 50%. No more waiting for manual responses to "What\'s your return policy?" or "When will my order arrive?". Customers get instant answers, they\'re happier, and your support team can focus on complex issues that require human judgment. The cost savings alone justify the investment.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Third, predictive analytics revolutionizes inventory management. AI can forecast demand with remarkable accuracy based on historical sales data, seasonal trends, current market conditions, and external factors. This means you stock exactly what you need—not too much (which ties up capital) and not too little (which means missed sales). Our clients typically see a 30% improvement in inventory turnover and a 20% reduction in holding costs.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Let\'s calculate the cumulative ROI for a mid-sized e-commerce business with £500,000 annual revenue. By implementing these three AI solutions: (1) 30% increase in AOV adds £150,000 annually, (2) 50% reduction in support costs saves £40,000 annually, and (3) 30% improvement in inventory efficiency saves £30,000 annually. Total annual impact: £220,000 from a £50,000 implementation investment. That\'s a 440% ROI in year one.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'But there\'s a critical caveat: not all AI implementations deliver the same results. The key is choosing the right AI features for your specific business needs. A luxury goods retailer needs different AI solutions than a fast-moving consumer goods business. A B2C e-commerce platform has different needs than a B2B marketplace.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'We\'ve seen AI implementations range from basic chatbots (relatively simple, £5,000-£15,000) to full automation suites (complex, £50,000-£150,000) depending on scope and customization. The key is understanding your business priorities and whether the expected ROI justifies the investment.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'One concern we often hear is about the learning curve and implementation complexity. The reality is that modern AI platforms are increasingly user-friendly. Most can be implemented in weeks, not months. Integration with existing systems is typically straightforward, especially with established platforms like Shopify.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Another consideration is ongoing optimization. AI systems learn and improve over time, but this requires proper setup and monitoring. You need clear KPIs, regular performance reviews, and willingness to adjust your approach based on results. We\'ve seen businesses that implement AI but fail to optimize it properly—they see minimal benefit. Those that treat it as an ongoing optimization project see exceptional results.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The competitive landscape is changing rapidly. AI is no longer a nice-to-have feature—it\'s becoming table stakes in e-commerce. Businesses that implement AI solutions now will have a significant advantage over competitors in 2-3 years. At WebCraftio, we help UK businesses implement AI solutions that deliver real ROI, from basic chatbots to comprehensive automation strategies. The question isn\'t whether to invest in AI for your e-commerce business—it\'s how quickly you can get started. Let\'s talk about what\'s possible for your business.'
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