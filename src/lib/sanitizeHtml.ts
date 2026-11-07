import sanitizeHtmlLib from 'sanitize-html';

const ALLOWED_TAGS = [
  ...sanitizeHtmlLib.defaults.allowedTags,
  'img',
  'h1',
  'h2',
  'span',
  'div',
  'figure',
  'figcaption',
  'sub',
  'sup',
  'video',
  'source',
  'svg',
  'path',
  'g',
  'circle',
  'rect',
  'line',
  'polyline',
  'polygon',
  'defs',
  'clippath',
  'use',
];

const ALLOWED_ATTRIBUTES: sanitizeHtmlLib.IOptions['allowedAttributes'] = {
  ...sanitizeHtmlLib.defaults.allowedAttributes,
  '*': ['class', 'id', 'style', 'aria-label', 'aria-hidden', 'role', 'title'],
  a: ['href', 'name', 'target', 'rel', 'aria-label', 'aria-hidden', 'role', 'title'],
  img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
  video: ['src', 'controls', 'width', 'height', 'poster'],
  source: ['src', 'srcset', 'type'],
  svg: [
    'xmlns',
    'viewbox',
    'width',
    'height',
    'fill',
    'stroke',
    'stroke-width',
    'aria-hidden',
    'focusable',
    'role',
  ],
  path: [
    'd',
    'fill',
    'stroke',
    'stroke-width',
    'stroke-linecap',
    'stroke-linejoin',
    'clip-rule',
    'fill-rule',
  ],
  g: ['fill', 'stroke', 'clip-path'],
  circle: ['cx', 'cy', 'r', 'fill', 'stroke'],
  rect: ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'stroke'],
  line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width'],
  polyline: ['points', 'fill', 'stroke'],
  polygon: ['points', 'fill', 'stroke'],
  use: ['href', 'xlink:href'],
};

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return sanitizeHtmlLib(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
  });
}

