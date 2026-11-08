import { LinkButton } from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-24 text-center">
      <div className="text-6xl font-extrabold text-gray-200">404</div>
      <h1 className="mt-4 text-2xl font-bold text-gray-800">Page not found</h1>
      <p className="mt-2 text-sm text-gray-500">
        The page you're looking for doesn't exist or has moved.
      </p>
      <div className="mt-6">
        <LinkButton to="/">Back to home</LinkButton>
      </div>
    </div>
  );
}