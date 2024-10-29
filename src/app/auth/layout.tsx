type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      {children}
    </div>
  );
}
