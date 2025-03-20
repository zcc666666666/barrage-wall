/* ================================ */
/*           page.js               */
/* ================================ */

/* 导入 Next.js 的图片组件，优化图像加载和显示 */
import Image from "next/image";

/* 从 components 目录导入自定义的 Button 组件 */
import { Button } from "@/components/ui/button";

/* 定义主页组件 */
export default function Home() {
  return (
    /* 使用 Tailwind 的 flex 布局，使内容垂直居中 */
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      
      {/* 显示标题文字，text-xl 设置文字大小为 XL，font-bold 设置加粗 */}
      <h1 className="text-xl font-bold mt-4">Welcome to Next.js!</h1>

      {/* 使用灰色文字提示用户编辑代码，text-gray-500 控制颜色 */}
      <p className="text-gray-500">Get started by editing <code>src/app/page.js</code>.</p>

      {/* 使用导入的 Button 组件，variant="outline" 表示边框按钮 */}
      <Button variant="outline">Button</Button>

    </div>
  );
}
