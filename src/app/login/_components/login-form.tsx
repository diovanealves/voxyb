import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

export function LoginForm() {
  return (
    <div className="mt-8 space-y-4">
      <Button variant="outline" className="w-full">
        <Icons.google className="mr-w h-4 w-4" />
        Continue with Google
      </Button>

      <Button variant="outline" className="w-full">
        <Icons.apple className="mr-w h-4 w-4" />
        Continue with Apple
      </Button>

      <Button variant="outline" className="w-full">
        <Icons.facebook className="mr-w h-4 w-4" />
        Continue with Facebook
      </Button>
    </div>
  );
}
