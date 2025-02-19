/* eslint-disable @next/next/no-img-element */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const url = "https://dxgc3f8f0p.ufs.sh/f/" + slug;

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
