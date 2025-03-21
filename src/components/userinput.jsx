"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export function ProfileForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mb-3">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>输入弹幕</FormLabel>
                            <FormControl>
                                <Input placeholder="在这里发表你的心情吧😊" {...field} />
                            </FormControl>
                            {/* <Button
                                type="submit"
                                className="bg-gradient-to-r from-slate-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-slate-600 hover:to-blue-600">
                                Submit
                            </Button> */}


                        </FormItem>
                    )}
                />              
            </form>
            <Button
                    className="bg-gradient-to-r from-zinc-400 to-gray-700 text-white py-2 px-4 rounded-lg hover:from-zinc-500 hover:to-gray-800">
                    发送
            </Button>
        </Form>
    );
}
