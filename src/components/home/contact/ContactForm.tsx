import { zodResolver } from "@hookform/resolvers/zod";
import { InputMask } from "@react-input/mask";
import { z } from "astro/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

const schema = z.object({
  name: z.string({ required_error: "Ім'я є обов'язковим" }).min(1, "Ім'я є обов'язковим"),
  phone: z.string({ required_error: "Телефон є обов'язковим" }).min(1, "Телефон є обов'язковим"),
  comment: z.string({ required_error: "Коментар є обов'язковим" }).min(1, "Коментар є обов'язковим"),
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
    watch,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });
  const onSubmit: SubmitHandler<Schema> = (data: Schema) => {
    // TODO: Form submit
  };
  return (
    <form className="flex w-full max-w-xl flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
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
      <button
        type="submit"
        className="bg-yellow px-3 py-2 font-medium text-xl uppercase"
        data-aos="fade-right"
        data-aos-delay="300"
      >
        {buttonText}
      </button>
    </form>
  );
}
