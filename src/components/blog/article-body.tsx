/**
 * Renders the article HTML.
 *
 * `dangerouslySetInnerHTML` is safe here precisely because the HTML was
 * sanitised on the server at WRITE time, against a strict allowlist, before it
 * ever reached the database (backend `SanitizeService`). Sanitising at read
 * time would be the weaker arrangement — it would mean the database holds
 * untrusted markup.
 *
 * Styling is explicit rather than `@tailwindcss/typography`: that plugin isn't
 * installed anywhere in this project, and the legal pages already set the
 * precedent of styling prose by hand.
 */
export function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="article-body mx-auto max-w-[68ch] text-[1.05rem] leading-[1.9] text-foreground"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
