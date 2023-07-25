
import * as Joi from 'joi';

export class CreateRecordDto {
  readonly title: string;
  readonly content: string;
}
export class UpdateRecordDto {
  readonly title: string;
  readonly content: string;
}

export const CreateRecordSchema = Joi.object({
  title: Joi.string().required().max(25),
  content: Joi.string().required(),
});

