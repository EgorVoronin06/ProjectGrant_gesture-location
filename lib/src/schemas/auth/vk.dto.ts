import { InferInput, object, pipe, string, value } from "valibot";

export const VKAuthSchema = object({
  code: string(),
  state: string(),
  type: pipe(
    string(),
    value('code_v2')
  ),
  device_id: string()
})

export type VKAuthDto = InferInput<typeof VKAuthSchema>