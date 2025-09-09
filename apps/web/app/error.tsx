'use client';

import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-xl font-semibold">
            {error.message ?? 'Something went wrong!'}
          </CardTitle>
          <CardDescription>
            We encountered an unexpected error. This has been logged and we'll
            look into it.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
            <p className="font-mono break-all">
              {error.message || 'An unexpected error occurred'}
            </p>
            {error.digest && (
              <p className="mt-2 text-xs opacity-70">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={reset} className="w-full" variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft />
              Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
