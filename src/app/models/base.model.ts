/**
 * Base model class
 */
export class BaseModel {
    [prop: string]: any;
    /**
     * deserialization method
     * @param input any thing to deserialize
     */
    deserialize(input: any) {
        if (input.quote_id) {
            input.quoteId = input.quote_id;
            delete input.quote_id;
        }
        Object.assign(this, input);
        return this;
    }
}
