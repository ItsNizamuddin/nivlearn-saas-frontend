interface BlogContentProps {
  content: string;
}

/**
 * Blog body from the SkilldeckEditor: HTML + CSS only (the editor strips JavaScript on save).
 * Styled by skilldeck-rich-text.min.css (loaded in app/layout.tsx), which only applies
 * inside `.skilldeck-rich-text`, plus the site's own `.rich-text` defaults.
 */
export default function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="rich-text skilldeck-rich-text max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}
