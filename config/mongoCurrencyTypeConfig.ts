import mongoose, { SchemaTypeOptions, SchemaTypes, SchemaType } from 'mongoose';
import util from 'util';

function Currency(path: string, options?: SchemaTypeOptions<number> | any) {
    mongoose.Schema.Types.Number.call(this, path, options);
}

util.inherits(Currency, mongoose.Schema.Types.Number);

Currency.prototype.cast = function(val: any): number | Error {
    if (isType('String', val)) {
        const currencyAsString: string = val.toString();
        const findDigitsAndDotRegex: RegExp = /\d*\.\d{1,2}/;
        const findCommasAndLettersRegex: RegExp = /\,+|[a-zA-Z]+/g;
        const findNegativeRegex: RegExp = /^-/;
        let currency: string | number;

        let currencyAsStringCleaned: string = currencyAsString.replace(findCommasAndLettersRegex, "");
        currency = parseFloat(findDigitsAndDotRegex.exec(currencyAsStringCleaned + ".0")[0]); // Adds .0 so it works with whole numbers

        if (findNegativeRegex.test(currencyAsString)) {
            return parseFloat((currency* -100).toFixed(0)); // Parse the result to a float
        } else {
            return parseFloat((currency* 100).toFixed(0)); // Parse the result to a float
        }
    } else if (isType('Number', val)) {
        return (val.toFixed(0)); // Parse the result to a float
    } else {
        return new Error('Should pass in a number or string');
    }
};

function isType(type: string, obj: any): boolean {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
}

const loadType = (mongoose: typeof import("mongoose")): typeof Currency => {
    (mongoose.Types as any).Currency=(mongoose.Schema.Types as any).Currency = Currency; // Extend Schema.Types with your custom type
    return Currency;
};

export default loadType

