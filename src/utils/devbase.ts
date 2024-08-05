import { SMARTORANGE_CRM_API_KEY, SMARTORANGE_CRM_ORIGIN } from "astro:env/server";
import ky from "ky";
import constant from "lodash/constant";

export const SMARTORANGE_CRM_AUTHENTICATION_URL = `${SMARTORANGE_CRM_ORIGIN}/v1/authentication/`;
export const SMARTORANGE_CRM_LEAD_ADD_URL = `${SMARTORANGE_CRM_ORIGIN}/v1/crm/leadAdd`;

export async function getAuthToken() {
  return ky
    .post(SMARTORANGE_CRM_AUTHENTICATION_URL, {
      json: {
        api_key: SMARTORANGE_CRM_API_KEY,
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .json<{ access_token: string }>()
    .then((res) => res.access_token)
    .catch(constant(null));
}

export async function createLead({ name, phone, form }: { name: string; phone: string; form: string }) {
  const accessToken = await getAuthToken();
  if (!accessToken) return;

  await ky.post(SMARTORANGE_CRM_LEAD_ADD_URL, {
    json: {
      data: {
        title: `Website | ${name} | ${phone} `,
        name: name,
        phone: phone,
        utm_source: "site",
        utm_content: form,
      },
      access_token: accessToken,
    },
  });
}
