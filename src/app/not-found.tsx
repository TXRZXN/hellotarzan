import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
        <div className="space-y-2">
          <p className="text-7xl font-extrabold text-blue-600 dark:text-blue-400">404</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา หน้าดังกล่าวอาจถูกย้าย หรือ URL ไม่ถูกต้อง
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              กลับหน้าหลัก (Back to Home)
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2 bg-transparent">
            <Link href="/projects">
              <ArrowLeft className="h-4 w-4" />
              ดูผลงานทั้งหมด
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
