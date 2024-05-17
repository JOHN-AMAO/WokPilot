"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {
  AuthLoading,
  Authenticated,
  Unauthenticated,
  ConvexReactClient,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider: React.FC<ConvexClientProviderProps> = ({
  children,
}) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}
      >
        <Unauthenticated>{children}</Unauthenticated>
        <Authenticated>{children}</Authenticated>
        {/* <AuthLoading><h1>Loading...</h1></AuthLoading> */}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
