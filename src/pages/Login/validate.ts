import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';

export const validationSchema = toTypedSchema(
    zod.object({
        username: zod.string().nonempty('This is required'),
    })
);
  