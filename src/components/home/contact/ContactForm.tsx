import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { InputMask } from "@react-input/mask";
import { z } from "astro/zod";
import { CLOUDFLARE_TURNSTILE_SITE_KEY } from "astro:env/client";
import ky from "ky";
import { LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const schema = z
  .object({
    name: z.string({ required_error: "Ім'я є обов'язковим" }).min(1, "Ім'я є обов'язковим"),
    phone: z.string({ required_error: "Телефон є обов'язковим" }).min(1, "Телефон є обов'язковим"),
    comment: z.string({ required_error: "Коментар є обов'язковим" }).min(1, "Коментар є обов'язковим"),
    captcha: z.nullable(z.string({ required_error: "Капча є обов'язкова" }).min(1, "Капча є обов'язкова")),
  })
  .refine((data) => data.captcha, {
    message: "Капча є обов'язкова",
  });
type Schema = z.infer<typeof schema>;

interface IProps {
  formId: string;
  buttonText: string;
}

export default function ContactForm({ formId, buttonText }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const [isLoading, setIsLoading] = useState(false);
  const captchaRef = useRef<TurnstileInstance | null>(null);
  const onSubmit: SubmitHandler<Schema> = (data: Schema) => {
    setIsLoading(true);
    ky.post("/api/contact", { json: { ...data, formId } })
      .json()
      .then(() => {
        toast.success("Ваше повідомлення було відправлено. Ми звяжемося з вами найближчим часом");
      })
      .catch(() => {
        toast.error("Під час відправлення повідомлення сталася помилка. Спробуйте ще раз");
      })
      .finally(() => {
        setIsLoading(false);
        setValue("captcha", null);
        captchaRef.current?.reset();
      });
  };
  return (
    <form className="flex w-full max-w-xl flex-col gap-5" onSubmit={handleSubmit(onSubmit)} id={formId}>
      <div>
        <input
          placeholder="Ім'я"
          className="aos-init w-full bg-orange-hover px-3 py-2"
          id="name"
          {...register("name")}
          data-aos="fade-right"
          data-aos-delay="150"
        />
        {errors.name && <p className="mt-1 text-red-700 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <InputMask
          mask="+38 (0__) ___-____"
          replacement={{ _: /\d/ }}
          placeholder="+38 (0__) ___-____"
          className="aos-init w-full bg-orange-hover px-3 py-2"
          id="phone"
          {...register("phone")}
          data-aos="fade-right"
          data-aos-delay="200"
        />
        {errors.phone && <p className="mt-1 text-red-700 text-sm">{errors.phone.message}</p>}
      </div>
      <div>
        <textarea
          placeholder="Коментар"
          className="aos-init min-h-[150px] w-full bg-orange-hover px-3 py-2 duration-0"
          {...register("comment")}
          data-aos="fade-right"
          data-aos-delay="250"
        />
        {errors.comment && <p className="mt-1 text-red-700 text-sm">{errors.comment.message}</p>}
      </div>
      <Turnstile
        ref={captchaRef}
        siteKey={CLOUDFLARE_TURNSTILE_SITE_KEY}
        className="mx-auto"
        options={{
          retry: "never",
        }}
        onSuccess={(e) => setValue("captcha", e)}
        onExpire={() => setValue("captcha", null)}
        onError={() => setValue("captcha", null)}
        onReset={() => setValue("captcha", null)}
      />
      <button
        type="submit"
        className="aos-init flex flex-row items-center justify-center gap-2 bg-yellow px-3 py-2 font-medium text-xl uppercase"
        data-aos="fade-right"
        data-aos-delay="300"
        disabled={isLoading}
      >
        {isLoading && <LoaderCircle className="animate-spin" />}
        <p>{buttonText}</p>
      </button>
    </form>
  );
}
