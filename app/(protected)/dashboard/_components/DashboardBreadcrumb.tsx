import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

const DashboardBreadcrumb = () => {
  const pathName = usePathname();
   "/dashboard/antrian"
  const paths = pathName.split("/");
  paths.shift();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((p, index) => {
          return (
            <div key={p} className="flex items-center gap-x-2">
              <BreadcrumbItem>
                <BreadcrumbLink href={pathName.split(p)[0] + p}>
                  {p}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index != paths.length - 1 && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;
