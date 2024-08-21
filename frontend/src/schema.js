import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: " Invalid.",
    })
    .email("Please enter a valid email"),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const SignUpForm = z
  .object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    email: z
      .string()
      .min(2, {
        message: "Please Enter Valid Email",
      })
      .email("Please enter a valid email"),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });
export const ResetPasswordForm = z
  .object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });
