import { BaseModel } from './base.model';

/**
 * Interface for defining QuoteModel variables
 */
export interface IQuoteModel {
    /**
     * Id of the quote
     */
    quoteId: string;
    /**
     * tags array of the quote
     */
    tags: string[];
    /**
     * value of the quote
     */
    value: string;
}
/**
 * QuoteModel class
 */
export class QuoteModel extends BaseModel implements IQuoteModel  {
    /**
     * Id of the quote
     */
    quoteId: string;
    /**
     * tags array of the quote
     */
    tags: string[];
    /**
     * value of the quote
     */
    value: string;
}
