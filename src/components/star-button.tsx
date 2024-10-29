import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

export function StarButton() {
  const [stars, setStars] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getStars = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://api.github.com/repos/agusgarcia3007/argentina-al-dia/stargazers"
        );
        setStars(data.length);
      } catch (error) {
        if (process.env.NODE_ENV !== "production") console.error(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getStars();
  }, []);

  if (error) return null;

  if (isLoading) {
    return <Skeleton className="py-0 pe-0 w-32 h-9" />;
  }

  return (
    <Link
      target="_blank"
      href="https://github.com/agusgarcia3007/argentina-al-dia"
    >
      <Button className="py-0 pe-0 w-fit" variant="outline">
        <GitHubLogoIcon
          className="opacity-60"
          strokeWidth={2}
          aria-hidden="true"
        />
        Star
        <span className="relative ms-3 inline-flex h-full items-center justify-center rounded-full px-3 text-xs font-medium text-muted-foreground before:absolute before:inset-0 before:left-0 before:w-px before:bg-input">
          {stars}
        </span>
      </Button>
    </Link>
  );
}
