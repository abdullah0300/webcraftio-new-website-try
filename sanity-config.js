// sanity-config.js
export const projectId = 'd4vsae96';
export const dataset = 'production';
export const apiVersion = '2025-03-09'; // use current date
export const useCdn = true; // `false` if you want to ensure fresh data

// Helper function for image URLs
export function urlFor(source) {
  if (!source) return '';
  const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;
  const { _ref } = source.asset || source;
  if (!_ref) return '';
  const [id, dimensions, format] = _ref.split('-');
  return `${baseUrl}${id}-${dimensions}.${format}`;
}