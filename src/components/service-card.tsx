import Link from "next/link";
import { Service } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategoryVisual } from "@/lib/category-images";

export function ServiceCard({ service }: { service: Service }) {
  const { icon: Icon, gradient } = getCategoryVisual(service.category?.name);

  return (
    <Link href={`/technicians/${service.technicianProfileId}`} className="block h-full">
      <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-md">
        <div className={`flex h-32 w-full items-center justify-center bg-gradient-to-br ${gradient}`}>
          <Icon className="h-12 w-12 text-white/90" strokeWidth={1.5} />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{service.title}</CardTitle>
            {service.category && <Badge variant="secondary">{service.category.name}</Badge>}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
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
          <p className="font-[family-name:var(--font-mono)] text-lg font-semibold text-primary">
            ৳{Number(service.price).toFixed(0)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}