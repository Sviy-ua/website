import type { APIRoute } from "astro";
import { GOOGLE_RECAPTCHA_SECRET_KEY, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, SMARTORANGE_CRM_ORIGIN, SMARTORANGE_CRM_API_KEY } from "astro:env/server";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import ky from "ky";
import constant from "lodash/constant";

const TELEGRAM_API_ROUTE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

const SMARTORANGE_CRM_AUTHENTICATION_URL = `${SMARTORANGE_CRM_ORIGIN}/v1/authentication/`;
const SMARTORANGE_CRM_LEAD_ADD_URL = `${SMARTORANGE_CRM_ORIGIN}/v1/crm/leadAdd`;

const forms: Record<string, string> = {
  contact_individual: "Запиc на індивідуальну консультацію",
  get_free_plans: "Отримати підбірку вільних планувань",
  get_free_consultation: "Отримати консультацію",
};

function GenerateTelegramMessage(username: string, phone: string, comment: string, formId: string) {
  return `🔔 Нове сповіщення з сайту
🧑 Від: ${username}
📞 Номер телефону: ${phone}

📄 Форма: ${forms[formId]}

💬 Повідомлення:
${comment}`;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, phone, comment, captcha, formId } = await request.json();
    if (!(name && phone && comment && captcha)) {
      return new Response(null, {
        status: 400,
      });
    }

    const response = await ky
      .post("https://www.google.com/recaptcha/api/siteverify", {
        searchParams: {
          secret: GOOGLE_RECAPTCHA_SECRET_KEY,
          response: captcha,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .json<{ success: boolean }>()
      .catch(constant(null));

    if (!response?.success) {
      return new Response(null, {
        status: 429,
      });
    }

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const responseCreateTopic = await ky
      .post(`${TELEGRAM_API_ROUTE}/createForumTopic`, {
        json: {
          chat_id: TELEGRAM_CHAT_ID,
          name: `${name} ${dayjs.tz(new Date(), "Europe/Kyiv").format("DD.MM.YYYY HH:mm")}`,
        },
      })
      .json<{ result: { message_thread_id: number } }>()
      .catch(constant(null));

    if (!responseCreateTopic?.result?.message_thread_id) {
      return new Response(null, {
        status: 500,
      });
    }

    const responseCreateMessage = await ky
      .post(`${TELEGRAM_API_ROUTE}/sendMessage`, {
        json: {
          chat_id: TELEGRAM_CHAT_ID,
          message_thread_id: responseCreateTopic.result.message_thread_id,
          text: GenerateTelegramMessage(name, phone, comment, formId),
        },
      })
      .catch(constant(null));

    if (!responseCreateMessage) {
      return new Response(null, {
        status: 500,
      });
    }

    const devbaseAutorization: any = await ky.post(SMARTORANGE_CRM_AUTHENTICATION_URL, {
      json: {
        api_key: SMARTORANGE_CRM_API_KEY,
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).json();

    if (devbaseAutorization.access_token) {
      const devbaseLeadAdd = await ky.post(SMARTORANGE_CRM_LEAD_ADD_URL, {
        json: {
          data: {
            'title': `Aristos | ${name} | ${phone} `,
            'name': name,
            'phone': phone,
            'utm_source': 'site',
        },
        'access_token': devbaseAutorization.access_token,
        },
      });
    }


    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 500,
    });
  }
};
