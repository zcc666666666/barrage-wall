"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function MessageDisplay() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/message', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('获取弹幕失败');
      }

      const data = await response.json();
      
      if (data.success) {
        setMessages(data.data);
      } else {
        throw new Error(data.error || '获取弹幕失败');
      }
    } catch (error) {
      console.error("获取弹幕错误:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={fetchMessages}
        disabled={isLoading}
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-500 hover:to-blue-700"
      >
        {isLoading ? "加载中..." : "获取所有弹幕"}
      </Button>
      
      {error && (
        <div className="text-red-500 bg-red-100 p-3 rounded-md">
          错误: {error}
        </div>
      )}
      
      <div className="mt-4 space-y-2">
        {messages.length > 0 ? (
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">内容</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发送时间</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {messages.map((message) => (
                  <tr key={message._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{message.content}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(message.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : messages.length === 0 && !isLoading ? (
          <div className="text-center p-4 bg-gray-50 rounded-md">
            暂无弹幕数据
          </div>
        ) : null}
      </div>
    </div>
  );
}