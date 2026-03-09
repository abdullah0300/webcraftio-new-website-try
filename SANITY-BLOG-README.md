# WebCraftio Blog - Sanity CMS Integration

## Overview
This project now uses Sanity CMS as a headless content management system for blog posts. The blog content is stored in Sanity and dynamically loaded into the static HTML pages.

## Files Added/Modified

### Configuration
- `sanity-config.js` - Sanity project configuration and image URL helper

### Frontend
- `Blogs.html` - Updated to dynamically load blog posts from Sanity
- `post.html` - New single blog post page template

### Scripts
- `seed-articles.js` - Node.js script to populate initial blog posts

## How It Works

1. **Blog Listing** (`Blogs.html`):
   - Fetches all posts from Sanity using GROQ query
   - Renders blog cards dynamically
   - Links to individual post pages

2. **Single Post** (`post.html`):
   - Reads `?slug=` from URL
   - Fetches specific post content from Sanity
   - Renders full post with title, content, metadata

3. **Content Management**:
   - Add/edit posts in Sanity Studio
   - Changes appear immediately on the website
   - No need to edit HTML files

## Getting Started

### 1. Access Sanity Studio
Visit: https://d4vsae96.sanity.studio/
- Project ID: `d4vsae96`
- Dataset: `production`

### 2. Add Blog Posts
1. Go to "Blog Post" content type
2. Fill in title, content, excerpt, image, tags
3. Publish the post

### 3. Seed Initial Content (Optional)
```bash
# Set your Sanity auth token
export SANITY_AUTH_TOKEN="your_token_here"

# Run the seeder
node seed-articles.js
```

### 4. View Your Blog
- Blog listing: `/Blogs.html`
- Individual posts: `/post.html?slug=your-post-slug`

## Schema Structure

Each blog post has:
- `title` (string) - Post title
- `slug` (slug) - URL-friendly identifier
- `content` (array) - Rich text content (portable text)
- `excerpt` (text) - Short description
- `mainImage` (image) - Featured image
- `tags` (array) - Category tags
- `publishedAt` (datetime) - Publication date
- `author` (string) - Author name

## API Usage

The frontend uses Sanity's HTTP API:
```
GET https://d4vsae96.api.sanity.io/v2025-03-09/data/query/production?query=...
```

## Development Notes

- CORS is configured for `https://webcraftio.com` and `http://localhost:3000`
- API version locked to `2025-03-09` for stability
- CDN enabled for fast global content delivery
- No authentication needed for public read access

## Next Steps

1. Add more blog posts in Sanity Studio
2. Customize the blog post styling in `style.css`
3. Add search/filtering functionality
4. Implement related posts
5. Add social sharing buttons

## Support

For Sanity-related questions, check the [Sanity Documentation](https://www.sanity.io/docs).