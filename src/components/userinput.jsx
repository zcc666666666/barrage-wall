// components/ProfileForm.js
"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    message: z.string().min(2, {
        message: "弹幕内容必须至少2个字符",
    }),
});

export function UserInput() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // 成功提交
                form.reset();
                alert("弹幕发送成功！");
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '发送弹幕失败');
            }
        } catch (error) {
            console.error("提交弹幕错误:", error);
            alert(`发送失败: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-3">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>输入弹幕</FormLabel>
                            <FormControl>
                                <Input placeholder="在这里发表你的心情吧😊" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-zinc-400 to-gray-700 text-white py-2 px-4 rounded-lg hover:from-zinc-500 hover:to-gray-800"
                >
                    发送
                </Button>
            </form>
        </Form>
    );
}