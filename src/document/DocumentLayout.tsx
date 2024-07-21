/**
 * React component serving as the template for the HTML document layout.
 * Includes the `#root` mount point for the React application.
 */
export function DocumentLayout(): JSX.Element {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        {import.meta.env.PROD ? (
          <>
            <link rel="stylesheet" href="/static/assets/style.css" />
            <script type="module" src="/static/client.js" />
          </>
        ) : (
          <>
            <link rel="stylesheet" href="/src/styles/style.css" />
            <script type="module" src="/src/client.tsx" />
          </>
        )}
      </head>
      <body>
        <div id="root" />
      </body>
    </html>
  )
}
