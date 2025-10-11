export function NotFound() {
  return (
    <div className="flex h-screen">
      <div className="m-auto p-8 items-center justify-center text-center">
        <img
          src="/illustrations/notfound.svg"
          className="max-w-96 max-h-96 mx-auto"
        />
        <h1 className="text-2xl md:text-4xl text-primary font-bold">
          404 Not Found
        </h1>
        <h2 className="text-lg md:text-xl text-foreground">
          It just doesn't exist. I don't know what to tell you.
        </h2>
      </div>
    </div>
  );
}
