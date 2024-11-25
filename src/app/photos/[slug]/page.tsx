/* eslint-disable @next/next/no-img-element */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const url = "https://utfs.io/a/dxgc3f8f0p/" + slug;

  return (
    <div className="flex h-screen">
      <img
        src={url}
        alt=""
        className="m-4 mx-auto flex object-contain align-middle drop-shadow-lg"
      />
    </div>
  );
}
