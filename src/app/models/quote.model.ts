import { BaseModel } from './base.model';

export interface IQuoteModel {
    quoteId: string;
    tags: string[];
    value: string;
}
export class QuoteModel extends BaseModel implements IQuoteModel  {
    quoteId: string;
    tags: string[];
    value: string;
}
