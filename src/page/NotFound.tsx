import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-3xl font-semibold">{'Page not found'}</div>
      <div className="text-muted-foreground">
        {'The page you are looking for does not exist.'}
      </div>
      <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
        <Link to="/">{`Back to Home`}</Link>
      </Button>
    </main>
  );
}
