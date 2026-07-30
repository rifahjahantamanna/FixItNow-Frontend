import Link from "next/link";
import { Service } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/technicians/${service.technicianProfileId}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{service.title}</CardTitle>
            {service.category && <Badge variant="secondary">{service.category.name}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {service.description}
          </p>
          {service.technicianProfile?.user && (
            <p className="mt-2 text-sm">
              By <span className="font-medium">{service.technicianProfile.user.name}</span>
            </p>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-lg font-semibold">৳{Number(service.price).toFixed(0)}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}