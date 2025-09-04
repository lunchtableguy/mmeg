export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const theme = savedTheme || (prefersDark ? 'dark' : 'light');
            document.documentElement.classList.add(theme);
          } catch (e) {
            console.error('Theme initialization error:', e);
          }
        `,
      }}
    />
  )
}