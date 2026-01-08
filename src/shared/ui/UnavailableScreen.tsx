export function UnavailableScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 text-6xl">
          <span role="img" aria-label="mobile phone">📱</span>
        </div>
        <h1 className="mb-4 text-2xl font-bold text-foreground">
          Mobile Only
        </h1>
        <p className="text-muted-foreground">
          This app is designed for mobile devices. Please visit on a phone or
          resize your browser to a mobile width (480px or less) to continue.
        </p>
      </div>
    </div>
  )
}
