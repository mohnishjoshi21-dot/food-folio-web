'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, Form, useForm } from 'react-hook-form'
import {zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validations/login.schema'
import z from 'zod'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import axios  from 'axios'
import { getErrorMessage } from '@/lib/errorHandler'

const LoginPage = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  })
const onSubmit = async (data: z.infer<typeof loginSchema>) => {
  setIsSubmitting(true);
  setError("");

  try {
    const res = await axios.post("/api/admin/auth/login", data);

    // ✅ Success Response
    if (res.data.success) {
      toast.success(res.data.message);
      router.refresh(); 
   
    }
  } catch (err: any) {
    // ✅ API Error Handling    
    const errorMessage = getErrorMessage(err)
    setError(errorMessage)
    toast.error(errorMessage)
  } finally {
    setIsSubmitting(false);
  }
};

  return (
  <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm text-center">
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
      
                    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="text-left">
                            
                            {/* Email Field */}
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input 
                                            {...field} 
                                            type="email" 
                                            placeholder="admin@example.com" 
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                            {/* Password Field */}
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Password</FieldLabel>
                                        <Input 
                                            {...field} 
                                            type="password" 
                                            placeholder="••••••••" 
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                            />

                        </FieldGroup>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button 
                        type="submit" 
                        form="login-form" // Form ID se link kiya
                        className="w-full" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
  )
}

export default LoginPage