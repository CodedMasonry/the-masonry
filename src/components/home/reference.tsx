import type React from "react";

export function Reference({
  name,
  company,
  phone,
  email,
  children,
}: {
  name: string;
  company: string;
  phone: string;
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-primary text-xl">{name}</h3>
      <p>{company}</p>
      <p>{phone}</p>
      <p>{email}</p>
      <p className="mt-2 max-w-3xl">{children}</p>
    </div>
  );
}
