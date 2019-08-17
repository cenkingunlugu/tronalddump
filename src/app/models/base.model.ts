import { Interpolation } from '@angular/compiler';

export class BaseModel {
    [prop: string]: any;
    deserialize(input: any) {
        if (input.quote_id) {
            input.quoteId = input.quote_id;
            delete input.quote_id;
        }
        Object.assign(this, input);
        return this;
    }
}
