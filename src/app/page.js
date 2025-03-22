/* ================================ */
/*           page.js               */
/* ================================ */

/* 导入 Next.js 的图片组件，优化图像加载和显示 */
import Image from "next/image";
import { Card } from "@/components/ui/card";

/* 从 components 目录导入自定义的 Button 组件 */
import { Button } from "@/components/ui/button";
import FallingAnimation from '../components/FallingAnimation';
import { UserInput } from "@/components/userinput";
import { MessageDisplay } from "@/components/message.";
/* 定义主页组件 */
export default function Home() {
  return (
    <div >
    <header className="flex flex-col items-center justify-center">
      {/* 显示标题文字，text-xl 设置文字大小为 XL，font-bold 设置加粗*/}
      <h1 className="text-xl font-bold mt-4">欢迎来到城建心语</h1>
      {/* 使用灰色文字提示用户编辑代码，text-gray-500 控制颜色 */}
      {/* <p className="text-gray-500">Get started by editing <code>src/app/page.js</code>.</p> */}
      {/* 使用导入的 Button 组件，variant="outline" 表示边框按钮 */}
      <FallingAnimation/>
    </header>
    {/* 给区块分区 */}
    <div className="flex flex-row">
      {/* 这里是放弹幕的div */}
      <div className="w-300 h-200 bg-gray-200 mb-4" style={{ backgroundColor: "rgba(169, 169, 169, 0.5)" }}><MessageDisplay/></div>
      {/* 第二、第三个 div，占据38%的宽度和20%的高度 */}
      <div className="flex flex-col">
        <div className="w-120 h-100 bg-gray-300" style={{ backgroundColor: "rgba(169, 169, 169, 0.6)" }}> <UserInput/></div>
        <div className="w-120 h-100 bg-gray-400" style={{ backgroundColor: "rgba(128, 128, 128, 0.7)" }}></div>
      </div>
    </div>
    </div>

  );
}
