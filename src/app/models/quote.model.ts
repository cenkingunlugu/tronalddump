export interface IQuoteModel {
    quoteId: string;
    tags: string[];
    value: string;
}
export class QuoteModel implements IQuoteModel {
    quoteId: string;
    tags: string[];
    value: string;
}
