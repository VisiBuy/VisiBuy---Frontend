import {
  VALIDATION_INVALID_FIELD,
  VALIDATION_MAX_LENGTH,
  VALIDATION_MIN_LENGTH,
  VALIDATION_REQUIRED,
} from "@/lib/systemConfig";
import { z, ZodType } from "zod";

export interface SupportCardProps {
  title: string;
  icon: string;
  link:string;
  key:string
}

export interface FeedbackDto {
  name: string;
  email: string;
  issue: string;
}
export interface FaqProps{
  question:string;
  answer:string;
}
export const FeedbackSchema: ZodType<FeedbackDto> = z.object({
  email: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Email"),
    })
    .email({
      message: VALIDATION_INVALID_FIELD.replace("{{FIELD}}", "Email"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Email"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Email"),
    }),
  name: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Name"),
      invalid_type_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Name"),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Name"),
    })
    .max(100, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Name"),
    }),
  issue: z
    .string({
      required_error: VALIDATION_REQUIRED.replace("{{FIELD}}", "Issue Message"),
      invalid_type_error: VALIDATION_INVALID_FIELD.replace(
        "{{FIELD}}",
        "Issue Message"
      ),
    })
    .min(2, {
      message: VALIDATION_MIN_LENGTH.replace("{{FIELD}}", "Issue Message"),
    })
    .max(250, {
      message: VALIDATION_MAX_LENGTH.replace("{{FIELD}}", "Issue Message"),
    }),
});

export type TSellerFedbackResponse = {
  msg: string;
  report: string;
};
