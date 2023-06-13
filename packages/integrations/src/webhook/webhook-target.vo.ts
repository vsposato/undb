import { recordEvents, tableIdSchema } from '@undb/core'
import { ValueObject } from '@undb/domain'
import { z } from 'zod'

export const webhookTargetSchema = z
  .object({
    type: z.literal('table'),
    id: tableIdSchema,
    events: z.enum(recordEvents).array(),
  })
  .nullable()

export type IWebhookTarget = z.infer<typeof webhookTargetSchema>

export class WebhookTarget extends ValueObject<IWebhookTarget> {
  public get id() {
    return this.unpack()?.id
  }

  public get type() {
    return this.unpack()?.type
  }

  public get events() {
    return this.unpack()?.events
  }
}
