import type { Block, TextStyle } from '../types';

export const convertStrapiBlocksToHtml = (blocks: Block[]): string => {
  if (!blocks || !Array.isArray(blocks)) return '';

  const processBlock = (block: Block): string => {
    switch (block.type) {
      case 'paragraph':
        return `<p>${block.children?.map(child => processChild(child)).join('') || ''}</p>`;
      
      case 'heading':
        const level = block.level || 1;
        return `<h${level}>${block.children?.map(child => processChild(child)).join('') || ''}</h${level}>`;
      
      case 'list':
        const tag = block.format === 'ordered' ? 'ol' : 'ul';
        return `<${tag}>${block.children?.map(child => processChild(child)).join('') || ''}</${tag}>`;
      
      case 'list-item':
        return `<li>${block.children?.map(child => processChild(child)).join('') || ''}</li>`;
      
      case 'link':
        return `<a href="${block.url}" ${block.openInNewTab ? 'target="_blank"' : ''}>${
          block.children?.map(child => processChild(child)).join('') || ''
        }</a>`;
      
      case 'image':
        return `<img src="${block.url}" alt="${block.alternativeText || ''}" />`;
      
      case 'code':
        return `<pre><code${block.language ? ` class="language-${block.language}"` : ''}>${
          block.children?.map(child => processChild(child)).join('') || ''
        }</code></pre>`;
      
      case 'quote':
        return `<blockquote>${block.children?.map(child => processChild(child)).join('') || ''}</blockquote>`;
      
      default:
        let _block: any = block;
        return _block.children ? _block.children.map((child: any) => processChild(child)).join('') : '';
    }
  };

  const processChild = (child: Block | TextStyle): string => {
    if ('text' in child) {
      let text = child.text;
      
      if (child.bold) text = `<strong>${text}</strong>`;
      if (child.italic) text = `<em>${text}</em>`;
      if (child.underline) text = `<u>${text}</u>`;
      if (child.strikethrough) text = `<del>${text}</del>`;
      if (child.code) text = `<code>${text}</code>`;
      
      return text;
    }
    
    return processBlock(child);
  };

  return blocks.map(block => processBlock(block)).join('\n');
};